<script lang="ts">
	import type { StyleSpecification } from 'maplibre-gl';
	import { BracketsCurly, Palette, Plus } from 'phosphor-svelte';

	import { BoxRadioGroup } from '#lib/components/common/BoxRadioGroup';
	import { Button } from '#lib/components/common/Button';
	import { NumberField } from '#lib/components/common/NumberField';
	import { Select } from '#lib/components/common/Select';
	import { TextField } from '#lib/components/common/TextField';
	import { RootPropertyField } from '#lib/components/editor/StylePropertiesPanel/RootPropertyField';
	import { getRootProperties, type RootPropertyKind } from '#lib/utils/layerSpec.ts';
	import type { StyleSettingChange, StyleSettingKey } from '#lib/utils/styleRoot.ts';
	import { cn } from '#lib/utils/tailwindUtil.ts';

	let {
		class: className,
		mapStyle,
		styleErrors,
		search = '',
		managedSprite = false,
		onChangeStyleSetting,
		onChangeRoot,
		onSetRootObject,
		onOpenStyleJson,
		onUseCurrentView,
		onOpenVariables
	}: {
		class?: string;
		mapStyle: StyleSpecification;
		styleErrors: string[];
		search?: string;
		managedSprite?: boolean;
		onChangeStyleSetting?: StyleSettingChange;
		onChangeRoot?: (kind: RootPropertyKind, key: string, value: unknown) => void;
		onSetRootObject?: (kind: RootPropertyKind, value: object | undefined) => void;
		onOpenStyleJson?: () => void;
		onUseCurrentView?: () => void;
		onOpenVariables?: () => void;
	} = $props();

	const lightProperties = getRootProperties('light');
	const skyProperties = getRootProperties('sky');
	const projectionItems = [
		{ value: 'mercator', label: 'mercator' },
		{ value: 'globe', label: 'globe' }
	];

	const projectionType = $derived(mapStyle.projection?.type as unknown);
	const projectionIsSegmented = $derived(
		projectionType === undefined ||
			(typeof projectionType === 'string' &&
				projectionItems.some(({ value }) => value === projectionType))
	);
	const segmentedProjectionType = $derived(projectionType === 'globe' ? 'globe' : 'mercator');
	const spriteEditable = $derived(
		mapStyle.sprite === undefined || typeof mapStyle.sprite === 'string'
	);
	const spriteJSON = $derived(JSON.stringify(mapStyle.sprite, null, '\t'));
	const terrainObject = $derived(mapStyle.terrain as Record<string, unknown> | undefined);
	const terrainSource = $derived(
		typeof terrainObject?.source === 'string' ? terrainObject.source : undefined
	);
	const rasterDemSourceIds = $derived(
		Object.entries(mapStyle.sources)
			.filter(([, source]) => source.type === 'raster-dem')
			.map(([sourceId]) => sourceId)
	);
	const terrainSourceItems = $derived.by(() => {
		const items = [
			{ value: '', label: 'None' },
			...rasterDemSourceIds.map((sourceId) => ({
				value: sourceId,
				label: sourceId
			}))
		];
		if (terrainSource && !rasterDemSourceIds.includes(terrainSource)) {
			items.unshift({
				value: terrainSource,
				label: `${terrainSource} (not found)`
			});
		}
		return items;
	});
	const terrainExaggeration = $derived(
		typeof terrainObject?.exaggeration === 'number' ? terrainObject.exaggeration : 1
	);

	let confirmingRemoveSky = $state(false);
	const matchesSearch = (...terms: string[]): boolean => {
		const query = search.trim().toLocaleLowerCase();
		return query === '' || terms.some((term) => term.toLocaleLowerCase().includes(query));
	};

	const commitStringSetting = (
		key: Extract<StyleSettingKey, 'name' | 'sprite' | 'glyphs'>,
		raw: string
	) => {
		const trimmed = raw.trim();
		const next = trimmed === '' ? undefined : trimmed;
		const current = typeof mapStyle[key] === 'string' ? mapStyle[key] : undefined;
		if (next === current) return;
		onChangeStyleSetting?.(key, next);
	};
	const commitCenterCoordinate = (index: 0 | 1, value: number) => {
		const center: [number, number] = mapStyle.center ? [...mapStyle.center] : [0, 0];
		center[index] = value;
		onChangeStyleSetting?.('center', center);
	};
	const getRootPropertyValue = (kind: RootPropertyKind, key: string): unknown => {
		return (mapStyle[kind] as Record<string, unknown> | undefined)?.[key];
	};
	const fallbackValue = (value: unknown) => {
		if (value === undefined) return '';
		const json = JSON.stringify(value);
		return json === undefined ? String(value) : json;
	};
</script>

<div data-properties-panel="" class={cn('h-full overflow-y-auto bg-white', className)}>
	{#if styleErrors.length > 0}
		<div class="border-b border-hairline-soft px-3 py-2" role="alert">
			<h3 class="text-[11px] font-semibold text-ink-1">
				{styleErrors.length} errors in this style
			</h3>
			{#each styleErrors as error, index (error + index)}
				<p class="mt-1 text-[10px] break-words text-ink-2">{error}</p>
			{/each}
		</div>
	{/if}

	<div class="flex flex-col">
		{#if matchesSearch('identity', 'name', 'sprite', 'glyphs', 'font')}
			<section class="border-b border-hairline-soft px-3 pt-0.5 pb-2">
				<TextField
					label="Name"
					value={mapStyle.name ?? ''}
					onCommit={(value) => commitStringSetting('name', value)}
				/>
			</section>
		{/if}

		{#if matchesSearch('default view', 'center', 'zoom', 'bearing', 'pitch', 'current view')}
			<section class="border-b border-hairline-soft px-3 pt-1.5 pb-2.5">
				<h3 class="flex h-[22px] items-center text-[11px] font-semibold text-ink-1">
					Default view
				</h3>
				<div class="flex min-h-[30px] items-center gap-2">
					<span class="w-[52px] shrink-0 text-[10px] text-ink-2">Center</span>
					<NumberField
						class="h-6 min-w-0 flex-1"
						aria-label="Center longitude"
						value={mapStyle.center?.[0]}
						minValue={-180}
						maxValue={180}
						onValueChange={(value) => commitCenterCoordinate(0, value)}
					/>
					<NumberField
						class="h-6 min-w-0 flex-1"
						aria-label="Center latitude"
						value={mapStyle.center?.[1]}
						minValue={-90}
						maxValue={90}
						onValueChange={(value) => commitCenterCoordinate(1, value)}
					/>
				</div>
				<div class="flex min-h-[30px] items-center">
					<span class="w-[84px] shrink-0 text-[10px] text-ink-2">Zoom</span>
					<NumberField
						class="h-6 w-12"
						aria-label="Default zoom"
						value={mapStyle.zoom}
						minValue={0}
						maxValue={24}
						onValueChange={(value) => onChangeStyleSetting?.('zoom', value)}
					/>
				</div>
				{#if onUseCurrentView}
					<Button
						class="mt-0.5 h-5 px-0 text-[10px] font-semibold text-accent hover:bg-transparent"
						title="Set the current map position as the default view"
						onclick={() => onUseCurrentView()}
					>
						Use current view as default
					</Button>
				{/if}
			</section>
		{/if}

		{#if matchesSearch('projection', 'type')}
			<section class="border-b border-hairline-soft px-3 pt-1.5 pb-2.5">
				<h3 class="flex h-[22px] items-center text-[11px] font-semibold text-ink-1">Projection</h3>
				{#if projectionIsSegmented}
					<BoxRadioGroup
						label="type"
						items={projectionItems}
						value={segmentedProjectionType}
						onValueChange={(value) => {
							if (value === 'mercator') {
								onSetRootObject?.('projection', undefined);
							} else {
								onSetRootObject?.('projection', { type: value });
							}
						}}
					/>
				{:else}
					<TextField label="type" value={fallbackValue(projectionType)} disabled />
				{/if}
			</section>
		{/if}

		{#if matchesSearch('asset', 'glyphs', 'sprite', 'font')}
			<section class="border-b border-hairline-soft px-3 pt-1.5 pb-2.5">
				<h3 class="flex h-[22px] items-center text-[11px] font-semibold text-ink-1">Asset URLs</h3>
				<TextField
					label="glyphs"
					placeholder={'https://.../{fontstack}/{range}.pbf'}
					value={mapStyle.glyphs ?? ''}
					onCommit={(value) => commitStringSetting('glyphs', value)}
				/>
				{#if managedSprite}
					<div class="flex min-h-[30px] items-center">
						<p class="w-[84px] shrink-0 font-mono text-[10px] text-ink-2">sprite</p>
						<p class="text-[10px] text-ink-3">Managed by Kartore (generated locally)</p>
					</div>
				{:else if spriteEditable}
					<TextField
						label="sprite"
						value={typeof mapStyle.sprite === 'string' ? mapStyle.sprite : ''}
						onCommit={(value) => commitStringSetting('sprite', value)}
					/>
				{:else}
					<div class="flex min-h-[30px] items-start">
						<p class="w-[84px] shrink-0 pt-2 font-mono text-[10px] text-ink-2">sprite</p>
						<pre
							class="max-h-20 min-w-0 flex-1 overflow-auto rounded-[5px] bg-field px-2 py-1 font-mono text-[9px] whitespace-pre-wrap text-ink-2">{spriteJSON}</pre>
					</div>
				{/if}
			</section>
		{/if}

		{#if matchesSearch('light', 'anchor', 'position', 'color', 'intensity')}
			<section class="border-b border-hairline-soft px-3 pt-1.5 pb-1">
				<h3 class="flex h-[22px] items-center text-[11px] font-semibold text-ink-3">
					Light
					{#if mapStyle.light === undefined}
						<Button
							class="ml-auto grid size-6 place-items-center rounded-[5px] text-ink-2 hover:bg-field hover:text-ink-1"
							aria-label="Add light"
							onclick={() => onSetRootObject?.('light', {})}
						>
							<Plus size={14} weight="regular" aria-hidden="true" />
						</Button>
					{/if}
				</h3>
				{#if mapStyle.light !== undefined}
					{#each lightProperties as entry (entry.key)}
						<RootPropertyField
							{entry}
							value={getRootPropertyValue('light', entry.key)}
							onChange={(value) => onChangeRoot?.('light', entry.key, value)}
						/>
					{/each}
				{/if}
			</section>
		{/if}

		{#if matchesSearch('sky')}
			<section class="border-b border-hairline-soft px-3 pt-1.5 pb-1">
				<h3 class="flex h-[22px] items-center text-[11px] font-semibold text-ink-3">
					Sky
					{#if mapStyle.sky === undefined}
						<Button
							class="ml-auto grid size-6 place-items-center rounded-[5px] text-ink-2 hover:bg-field hover:text-ink-1"
							aria-label="Add sky"
							onclick={() => onSetRootObject?.('sky', {})}
						>
							<Plus size={14} weight="regular" aria-hidden="true" />
						</Button>
					{/if}
				</h3>
				{#if mapStyle.sky !== undefined}
					{#each skyProperties as entry (entry.key)}
						<RootPropertyField
							{entry}
							value={getRootPropertyValue('sky', entry.key)}
							onChange={(value) => onChangeRoot?.('sky', entry.key, value)}
						/>
					{/each}
					{#if confirmingRemoveSky}
						<div class="py-1">
							<p class="mb-1 text-[10px] text-ink-2">Remove sky?</p>
							<div class="flex justify-end gap-1">
								<Button
									class="h-6 rounded-[5px] px-2 text-[10px] text-ink-2 hover:bg-field"
									onclick={() => (confirmingRemoveSky = false)}
								>
									Cancel
								</Button>
								<Button
									class="h-6 rounded-[5px] bg-ink-1 px-2 text-[10px] font-semibold text-white"
									onclick={() => {
										confirmingRemoveSky = false;
										onSetRootObject?.('sky', undefined);
									}}
								>
									Remove
								</Button>
							</div>
						</div>
					{:else}
						<div class="flex justify-end">
							<Button
								class="h-6 rounded-[5px] px-2 text-[10px] text-ink-2 hover:bg-field"
								onclick={() => (confirmingRemoveSky = true)}
							>
								Remove sky
							</Button>
						</div>
					{/if}
				{/if}
			</section>
		{/if}

		{#if matchesSearch('terrain', 'source', 'exaggeration')}
			<section class="border-b border-hairline-soft px-3 pt-1.5 pb-1">
				<h3 class="flex h-[22px] items-center text-[11px] font-semibold text-ink-3">
					Terrain
					{#if terrainObject === undefined && rasterDemSourceIds.length > 0}
						<Button
							class="ml-auto grid size-6 place-items-center rounded-[5px] text-ink-2 hover:bg-field hover:text-ink-1"
							aria-label="Add terrain"
							onclick={() => onSetRootObject?.('terrain', { source: rasterDemSourceIds[0] })}
						>
							<Plus size={14} weight="regular" aria-hidden="true" />
						</Button>
					{/if}
				</h3>
				{#if rasterDemSourceIds.length === 0 && terrainObject === undefined}
					<p class="pb-1 text-[10px] text-ink-3">A raster-dem source is required.</p>
				{:else}
					<Select
						label="source"
						items={terrainSourceItems}
						value={terrainSource ?? ''}
						onValueChange={(source) => {
							if (source === '') {
								onSetRootObject?.('terrain', undefined);
							} else {
								onSetRootObject?.('terrain', {
									...terrainObject,
									source
								});
							}
						}}
					/>
				{/if}
				{#if terrainObject !== undefined}
					<NumberField
						label="Exaggeration"
						value={terrainExaggeration}
						minValue={0}
						description="×"
						onValueChange={(value) =>
							onChangeRoot?.('terrain', 'exaggeration', value === 1 ? undefined : value)}
					/>
				{/if}
			</section>
		{/if}

		<section class="flex flex-col px-3 py-2">
			{#if onOpenVariables}
				<Button
					class="flex h-6 w-full items-center gap-1.5 rounded-[5px] px-1 text-left text-[10.5px] text-ink-2 hover:bg-field hover:text-ink-1"
					onclick={() => onOpenVariables()}
				>
					<Palette size={14} weight="regular" aria-hidden="true" />
					Open palette
				</Button>
			{/if}
			<Button
				class="flex h-6 w-full items-center gap-1.5 rounded-[5px] px-1 text-left text-[10.5px] text-ink-2 hover:bg-field hover:text-ink-1"
				onclick={() => onOpenStyleJson?.()}
			>
				<BracketsCurly size={14} weight="regular" aria-hidden="true" />
				View full style JSON
			</Button>
		</section>
	</div>
</div>
