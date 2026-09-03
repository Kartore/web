<script lang="ts">
	import { Dialog, RadioGroup } from 'bits-ui';
	import type { StyleSpecification } from 'maplibre-gl';

	import Button from '#lib/components/common/Button/Button.svelte';
	import { VARIABLE_MODE_GLOBAL_STATE_KEY, type StyleExportKind } from '#lib/utils/styleExport.ts';
	import { getStyleVariableModes } from '#lib/utils/variableModes.ts';

	let {
		open = $bindable(false),
		style,
		spriteCount = 0,
		fontCount = 0,
		onExport
	}: {
		open?: boolean;
		style: StyleSpecification;
		spriteCount?: number;
		fontCount?: number;
		onExport: (kind: StyleExportKind, includeAssets: boolean) => void | Promise<void>;
	} = $props();

	let kind = $state<StyleExportKind>('current-mode');
	let includeAssets = $state(false);
	let isExporting = $state(false);
	let exportError = $state<string | null>(null);
	const variableModes = $derived(getStyleVariableModes(style));
	const activeMode = $derived(
		variableModes.modes.find(({ id }) => id === variableModes.activeModeId)
	);
	const hasMultipleModes = $derived(variableModes.modes.length > 1);
	const selectedKindAvailable = $derived(kind === 'current-mode' || hasMultipleModes);
	const hasLocalAssets = $derived(spriteCount > 0 || fontCount > 0);
	const assetSummary = $derived(
		[
			spriteCount > 0 ? `${spriteCount} sprite${spriteCount === 1 ? '' : 's'}` : '',
			fontCount > 0 ? `${fontCount} font${fontCount === 1 ? '' : 's'} for glyphs` : ''
		]
			.filter(Boolean)
			.join(' · ')
	);

	const errorMessage = (error: unknown): string =>
		error instanceof Error ? error.message : String(error);

	const exportStyle = async () => {
		if (!selectedKindAvailable || isExporting) return;
		isExporting = true;
		exportError = null;
		try {
			await onExport(kind, includeAssets);
			open = false;
		} catch (error) {
			exportError = errorMessage(error);
		} finally {
			isExporting = false;
		}
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-40 bg-ink-1/30" />
		<Dialog.Content
			class="fixed top-1/2 left-1/2 z-50 w-[min(30rem,calc(100vw-1.5rem))] -translate-1/2 rounded-lg border border-hairline bg-white p-4 shadow-lg outline-none"
		>
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<Dialog.Title class="text-base font-semibold text-ink-1">Export style</Dialog.Title>
					<Dialog.Description class="text-xs leading-5 text-ink-3">
						Choose the style output and whether to include local assets.
					</Dialog.Description>
				</div>

				<RadioGroup.Root
					bind:value={kind}
					orientation="vertical"
					aria-label="Export method"
					class="flex flex-col gap-2"
				>
					<RadioGroup.Item
						value="current-mode"
						class="flex cursor-pointer flex-col gap-1 rounded-md border border-hairline px-3 py-2.5 text-left outline-none hover:bg-field focus-visible:outline-2 focus-visible:outline-accent data-[state=checked]:border-accent data-[state=checked]:bg-accent-soft"
					>
						<span class="text-xs font-semibold text-ink-1">Current mode</span>
						<span class="text-[11px] leading-4 text-ink-3">
							Exports one JSON file using the values from {activeMode?.name ?? 'Light'}.
						</span>
					</RadioGroup.Item>

					<RadioGroup.Item
						value="mode-files"
						disabled={!hasMultipleModes}
						class="flex cursor-pointer flex-col gap-1 rounded-md border border-hairline px-3 py-2.5 text-left outline-none hover:bg-field focus-visible:outline-2 focus-visible:outline-accent data-disabled:cursor-default data-disabled:opacity-45 data-[state=checked]:border-accent data-[state=checked]:bg-accent-soft"
					>
						<span class="text-xs font-semibold text-ink-1">JSON per mode</span>
						<span class="text-[11px] leading-4 text-ink-3">
							Exports {variableModes.modes.length} JSON files with each mode's values applied.
						</span>
					</RadioGroup.Item>

					<RadioGroup.Item
						value="runtime"
						disabled={!hasMultipleModes}
						class="flex cursor-pointer flex-col gap-1 rounded-md border border-hairline px-3 py-2.5 text-left outline-none hover:bg-field focus-visible:outline-2 focus-visible:outline-accent data-disabled:cursor-default data-disabled:opacity-45 data-[state=checked]:border-accent data-[state=checked]:bg-accent-soft"
					>
						<span class="text-xs font-semibold text-ink-1">Runtime switching</span>
						<span class="text-[11px] leading-4 text-ink-3">
							<code class="font-mono">{VARIABLE_MODE_GLOBAL_STATE_KEY}</code>
							to switch modes at runtime.
						</span>
					</RadioGroup.Item>
				</RadioGroup.Root>

				{#if kind === 'runtime' && hasMultipleModes}
					<div
						class="rounded-md border border-hairline-soft bg-field px-3 py-2 text-[11px] leading-4 text-ink-2"
					>
						<p class="font-mono text-[10px] break-all">
							map.setGlobalStateProperty('{VARIABLE_MODE_GLOBAL_STATE_KEY}', '&lt;mode id&gt;')
						</p>
						<ul class="mt-1.5 flex flex-col gap-0.5">
							{#each variableModes.modes as mode (mode.id)}
								<li class="flex min-w-0 items-baseline gap-2">
									<span class="shrink-0">{mode.name}</span>
									<code class="min-w-0 truncate font-mono text-[10px] text-ink-3" title={mode.id}>
										{mode.id}
									</code>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<div class="flex flex-col gap-2 border-t border-hairline-soft pt-3">
					<div class="flex flex-col gap-0.5">
						<h3 class="text-xs font-semibold text-ink-1">Local assets</h3>
						<p class="text-[11px] leading-4 text-ink-3">
							Bundle generated sprite sheets and glyph PBFs in one ZIP.
						</p>
					</div>
					<label
						class="flex cursor-pointer items-start gap-2 rounded-md border border-hairline px-3 py-2.5 outline-none hover:bg-field has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent"
					>
						<input
							type="checkbox"
							bind:checked={includeAssets}
							class="mt-0.5 size-3.5 accent-accent"
						/>
						<span class="flex min-w-0 flex-col gap-0.5">
							<span class="text-xs font-semibold text-ink-1">Include sprite and glyph assets</span>
							<span class="text-[11px] leading-4 text-ink-3">
								{#if hasLocalAssets}
									{assetSummary} will be generated alongside the JSON.
								{:else}
									No local sprites or fonts are registered; the ZIP will contain JSON only.
								{/if}
							</span>
						</span>
					</label>
				</div>

				{#if exportError}
					<p
						class="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-[11px] leading-4 text-danger"
						role="alert"
					>
						Could not export: {exportError}
					</p>
				{/if}

				<div class="flex justify-end gap-2">
					<Dialog.Close
						disabled={isExporting}
						class="h-8 cursor-pointer rounded-md px-3 text-xs font-semibold text-ink-3 hover:bg-field focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-default disabled:text-ink-4"
					>
						Cancel
					</Dialog.Close>
					<Button
						class="h-8 rounded-md bg-ink-1 px-3 text-xs font-semibold text-white hover:bg-ink-2 disabled:cursor-default disabled:bg-ink-4"
						disabled={!selectedKindAvailable || isExporting}
						onclick={exportStyle}
					>
						{isExporting ? 'Generating…' : includeAssets ? 'Export ZIP' : 'Export'}
					</Button>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
