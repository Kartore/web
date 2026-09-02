<script lang="ts">
	import { Plus } from 'phosphor-svelte';

	import { Button } from '#lib/components/common/Button';

	let {
		onAddLayer
	}: {
		onAddLayer: () => void;
	} = $props();
</script>

<div class="flex h-full flex-col items-center justify-center px-6 text-center">
	<p class="text-[12px] font-semibold text-ink-1">No layers</p>
	<p class="mt-1 text-[10.5px] leading-[1.5] text-ink-3">
		Add your first layer to edit its properties here.
	</p>
	<Button
		class="mt-3 flex h-7 items-center gap-1.5 rounded-[6px] bg-accent px-3 text-[11px] font-semibold text-white hover:bg-accent"
		onclick={onAddLayer}
	>
		<Plus size={14} weight="regular" aria-hidden="true" />
		Add layer
	</Button>
</div>
