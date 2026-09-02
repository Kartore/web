<script lang="ts">
	import { Dialog, RadioGroup } from 'bits-ui';
	import type { StyleSpecification } from 'maplibre-gl';

	import Button from '#lib/components/common/Button/Button.svelte';
	import { VARIABLE_MODE_GLOBAL_STATE_KEY, type StyleExportKind } from '#lib/utils/styleExport.ts';
	import { getStyleVariableModes } from '#lib/utils/variableModes.ts';

	let {
		open = $bindable(false),
		style,
		onExport
	}: {
		open?: boolean;
		style: StyleSpecification;
		onExport: (kind: StyleExportKind) => void;
	} = $props();

	let kind = $state<StyleExportKind>('current-mode');
	const variableModes = $derived(getStyleVariableModes(style));
	const activeMode = $derived(
		variableModes.modes.find(({ id }) => id === variableModes.activeModeId)
	);
	const hasMultipleModes = $derived(variableModes.modes.length > 1);
	const selectedKindAvailable = $derived(kind === 'current-mode' || hasMultipleModes);

	const exportStyle = () => {
		if (!selectedKindAvailable) return;
		onExport(kind);
		open = false;
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
						Choose how to export Variable Modes.
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

				<div class="flex justify-end gap-2">
					<Dialog.Close
						class="h-8 cursor-pointer rounded-md px-3 text-xs font-semibold text-ink-3 hover:bg-field focus-visible:outline-2 focus-visible:outline-accent"
					>
						Cancel
					</Dialog.Close>
					<Button
						class="h-8 rounded-md bg-ink-1 px-3 text-xs font-semibold text-white hover:bg-ink-2 disabled:cursor-default disabled:bg-ink-4"
						disabled={!selectedKindAvailable}
						onclick={exportStyle}
					>
						Export
					</Button>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
