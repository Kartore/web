<script lang="ts">
	import type { LayerSpecification, StyleSpecification } from '@maplibre/maplibre-gl-style-spec';
	import { onDestroy } from 'svelte';

	import { Button } from '#lib/components/common/Button';
	import { CodeEditor } from '#lib/components/common/CodeEditor';
	import { sanitizeLayerBasename } from '#lib/utils/styleSplit.ts';
	import { validateMapStyle } from '#lib/utils/styleValidation.ts';

	type Diagnostic = {
		from: number;
		to: number;
		severity: 'error' | 'warning';
		message: string;
		source?: string;
	};
	type Validation = {
		draft: string;
		error?: string;
		diagnostics: Diagnostic[];
	};

	let {
		layer,
		mapStyle,
		readOnly = false,
		onApply
	}: {
		layer: LayerSpecification;
		mapStyle: StyleSpecification;
		readOnly?: boolean;
		onApply: (layer: LayerSpecification, previousId: string) => void;
	} = $props();

	const serialized = $derived(JSON.stringify($state.snapshot(layer as object), undefined, 2));
	let draft = $derived(serialized);
	let appliedDraft = $derived(serialized);
	let validation = $state<Validation | null>(null);
	let copied = $state(false);
	let validationTimer: ReturnType<typeof setTimeout> | undefined;
	const isDirty = $derived(draft !== appliedDraft);

	const diagnostic = (message: string): Diagnostic => ({
		from: 0,
		to: Math.min(1, draft.length),
		severity: 'error',
		message,
		source: 'MapLibre layer'
	});
	const updateDraft = (next: string) => {
		draft = next;
		if (validationTimer !== undefined) clearTimeout(validationTimer);
		validationTimer = setTimeout(() => {
			validationTimer = undefined;
			let parsed: unknown;
			try {
				parsed = JSON.parse(next) as unknown;
			} catch (caught) {
				const error = caught instanceof Error ? caught.message : String(caught);
				validation = { draft: next, error: `Invalid JSON: ${error}`, diagnostics: [] };
				return;
			}
			if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
				const error = 'Layer JSON must be an object.';
				validation = { draft: next, error, diagnostics: [diagnostic(error)] };
				return;
			}
			const record = parsed as Record<string, unknown>;
			if (typeof record.id !== 'string' || record.id.trim() === '') {
				const error = 'A non-empty layer ID is required.';
				validation = { draft: next, error, diagnostics: [diagnostic(error)] };
				return;
			}
			if (
				record.id !== layer.id &&
				mapStyle.layers.some((candidate) => candidate.id === record.id)
			) {
				const error = `Layer ID "${record.id}" is already in use.`;
				validation = { draft: next, error, diagnostics: [diagnostic(error)] };
				return;
			}

			const nextLayer = parsed as LayerSpecification;
			const candidateStyle: StyleSpecification = {
				...mapStyle,
				layers: mapStyle.layers.map((candidate) =>
					candidate.id === layer.id ? nextLayer : candidate
				)
			};
			const result = validateMapStyle(candidateStyle);
			const errors = result.layerErrors[nextLayer.id] ?? [];
			if (errors.length > 0) {
				const message = errors
					.map(({ path, message }) => `${path || 'layer'}: ${message}`)
					.join(' ');
				validation = { draft: next, error: message, diagnostics: [diagnostic(message)] };
				return;
			}

			validation = { draft: next, diagnostics: [] };
			if (readOnly || draft !== next || next === appliedDraft) return;
			onApply(nextLayer, layer.id);
			draft = next;
			appliedDraft = next;
		}, 200);
	};
	const lintDraft = (value: string): Diagnostic[] =>
		validation?.draft === value ? validation.diagnostics : [];
	const copyDraft = async () => {
		await navigator.clipboard.writeText(draft);
		copied = true;
		setTimeout(() => (copied = false), 1200);
	};

	onDestroy(() => {
		if (validationTimer !== undefined) clearTimeout(validationTimer);
	});
</script>

<div class="flex h-full min-h-0 flex-col bg-white">
	<div class="min-h-0 flex-1">
		<CodeEditor
			value={draft}
			{readOnly}
			lint={lintDraft}
			lintVersion={validation}
			onChange={updateDraft}
		/>
	</div>
	<div
		class="flex min-h-8 shrink-0 items-center gap-2 border-t border-hairline-soft px-3 font-mono text-[10px] text-ink-3"
	>
		<span class="min-w-0 flex-1 truncate">
			layers/{sanitizeLayerBasename(layer.id)}.json · formatted on save
		</span>
		{#if readOnly}
			<span class="shrink-0">Read-only</span>
		{:else if isDirty && validation?.draft !== draft}
			<span class="shrink-0">Validating</span>
		{:else if validation?.draft === draft && validation.error}
			<span class="size-1.5 shrink-0 rounded-full bg-danger" title={validation.error}></span>
		{/if}
		<Button
			class="h-6 shrink-0 px-1 text-[10px] font-semibold text-accent hover:bg-field"
			onclick={copyDraft}
		>
			{copied ? 'Copied' : 'Copy'}
		</Button>
	</div>
</div>
