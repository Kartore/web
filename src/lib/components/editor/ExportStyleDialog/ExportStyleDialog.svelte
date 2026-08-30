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
					<Dialog.Title class="text-base font-semibold text-ink-1">スタイルを書き出す</Dialog.Title>
					<Dialog.Description class="text-xs leading-5 text-ink-3">
						Variable Mode の出力方法を選択してください。
					</Dialog.Description>
				</div>

				<RadioGroup.Root
					bind:value={kind}
					orientation="vertical"
					aria-label="出力方法"
					class="flex flex-col gap-2"
				>
					<RadioGroup.Item
						value="current-mode"
						class="flex cursor-pointer flex-col gap-1 rounded-md border border-hairline px-3 py-2.5 text-left outline-none hover:bg-field focus-visible:outline-2 focus-visible:outline-accent data-[state=checked]:border-accent data-[state=checked]:bg-accent-soft"
					>
						<span class="text-xs font-semibold text-ink-1">現在のモード</span>
						<span class="text-[11px] leading-4 text-ink-3">
							{activeMode?.name ?? 'ライト'}の値を使った JSON を1ファイル出力します。
						</span>
					</RadioGroup.Item>

					<RadioGroup.Item
						value="mode-files"
						disabled={!hasMultipleModes}
						class="flex cursor-pointer flex-col gap-1 rounded-md border border-hairline px-3 py-2.5 text-left outline-none hover:bg-field focus-visible:outline-2 focus-visible:outline-accent data-disabled:cursor-default data-disabled:opacity-45 data-[state=checked]:border-accent data-[state=checked]:bg-accent-soft"
					>
						<span class="text-xs font-semibold text-ink-1">モードごとの JSON</span>
						<span class="text-[11px] leading-4 text-ink-3">
							各モードの値を適用した JSON を {variableModes.modes.length} ファイル出力します。
						</span>
					</RadioGroup.Item>

					<RadioGroup.Item
						value="runtime"
						disabled={!hasMultipleModes}
						class="flex cursor-pointer flex-col gap-1 rounded-md border border-hairline px-3 py-2.5 text-left outline-none hover:bg-field focus-visible:outline-2 focus-visible:outline-accent data-disabled:cursor-default data-disabled:opacity-45 data-[state=checked]:border-accent data-[state=checked]:bg-accent-soft"
					>
						<span class="text-xs font-semibold text-ink-1">ランタイム切り替え</span>
						<span class="text-[11px] leading-4 text-ink-3">
							global-state の <code class="font-mono">{VARIABLE_MODE_GLOBAL_STATE_KEY}</code>
							でモードを切り替える JSON を1ファイル出力します。
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
						キャンセル
					</Dialog.Close>
					<Button
						class="h-8 rounded-md bg-ink-1 px-3 text-xs font-semibold text-white hover:bg-ink-2 disabled:cursor-default disabled:bg-ink-4"
						disabled={!selectedKindAvailable}
						onclick={exportStyle}
					>
						書き出す
					</Button>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
