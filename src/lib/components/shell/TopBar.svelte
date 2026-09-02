<script lang="ts">
	import type { StyleSpecification } from 'maplibre-gl';
	import { ArrowUUpLeft, ArrowUUpRight, MagnifyingGlass } from 'phosphor-svelte';
	import { tick } from 'svelte';

	import { Button } from '#lib/components/common/Button';
	import {
		MenuCheckboxItem,
		MenuItem,
		MenuRoot,
		MenuSeparator,
		MenuSub,
		MenuTrigger
	} from '#lib/components/common/HeaderMenu';
	import { TextField } from '#lib/components/common/TextField';
	import type { EditorMenuId, EditorModule } from '#lib/editor/EditorModule.ts';
	import { collectEditorMenuSections, resolveEditorMenuSection } from '#lib/editor/editorMenu.ts';
	import { COLOR_VISION_MODE_LABELS, type ColorVisionMode } from '#lib/utils/colorVision.ts';

	type SaveState = 'saved' | 'saving' | 'error';

	let {
		mapStyle,
		adapterModules = [],
		saveState = 'saved',
		canUndo = false,
		canRedo = false,
		onUndo,
		onRedo,
		onNewStyle,
		onImport,
		onExport,
		onRenameStyle,
		onAddLayer,
		onGroupLayersByPrefix,
		onOpenStyleSettings,
		styleJsonMode = false,
		onToggleStyleJson,
		onOpenVariables,
		onOpenSources,
		onOpenSprites,
		onOpenFonts,
		colorVisionMode = 'none',
		onColorVisionModeChange,
		leftShellCollapsed = false,
		onTogglePanels,
		onSearch,
		onPreview
	}: {
		mapStyle: StyleSpecification;
		adapterModules?: EditorModule[];
		saveState?: SaveState;
		canUndo?: boolean;
		canRedo?: boolean;
		onUndo?: () => void;
		onRedo?: () => void;
		onNewStyle?: () => void;
		onImport?: () => void;
		onExport?: () => void;
		onRenameStyle?: (name: string) => void;
		onAddLayer?: () => void;
		onGroupLayersByPrefix?: () => number;
		onOpenStyleSettings?: () => void;
		styleJsonMode?: boolean;
		onToggleStyleJson?: () => void;
		onOpenVariables?: () => void;
		onOpenSources?: () => void;
		onOpenSprites?: () => void;
		onOpenFonts?: () => void;
		colorVisionMode?: ColorVisionMode;
		onColorVisionModeChange?: (mode: ColorVisionMode) => void;
		leftShellCollapsed?: boolean;
		onTogglePanels?: () => void;
		onSearch?: () => void;
		onPreview?: () => void;
	} = $props();

	const adapterMenuSections = $derived(collectEditorMenuSections(adapterModules));
	const hasHeaderActionFallbacks = $derived(
		adapterModules.some(
			(module) => !resolveEditorMenuSection(module, 'file') && module.headerAction
		)
	);
	const styleName = $derived(mapStyle.name ?? 'Untitled style');
	const filename = $derived(styleName.replace(/\.kartore$/i, ''));
	const colorVisionModes: ColorVisionMode[] = [
		'none',
		'protanopia',
		'deuteranopia',
		'tritanopia',
		'grayscale'
	];
	let isRenamingStyle = $state(false);
	let renameValue = $state('');
	let renameInput = $state<HTMLInputElement | null>(null);

	const startRenamingStyle = async () => {
		if (!onRenameStyle) return;
		renameValue = mapStyle.name ?? '';
		isRenamingStyle = true;
		await tick();
		renameInput?.focus();
		renameInput?.select();
	};

	const commitStyleName = (name: string) => {
		isRenamingStyle = false;
		if (name.trim() === '' || name === (mapStyle.name ?? '')) return;
		onRenameStyle?.(name);
	};

	const cancelStyleName = () => {
		renameValue = mapStyle.name ?? '';
		isRenamingStyle = false;
	};

	const groupLayersByPrefix = () => {
		onGroupLayersByPrefix?.();
	};
</script>

{#snippet renderAdapterMenuSections(menuId: EditorMenuId)}
	{#if adapterMenuSections[menuId].length > 0}
		<MenuSeparator />
		{#each adapterMenuSections[menuId] as section (section.moduleId)}
			{@const MenuSection = section.component}
			<MenuSection />
		{/each}
	{/if}
{/snippet}

<header
	class="flex h-11 shrink-0 items-center gap-[14px] border-b border-hairline bg-white px-3 text-[11.5px] leading-none text-ink-1"
>
	<div
		class="flex size-[22px] shrink-0 items-center justify-center rounded-[5px] bg-ink-1 text-[11.5px] font-semibold text-white"
		aria-label="Kartore"
		title="Kartore"
	>
		K
	</div>

	<div class="flex min-w-0 shrink items-center gap-[7px]">
		{#if isRenamingStyle}
			<TextField
				bind:ref={renameInput}
				class="w-40 min-w-0 [&>input]:h-6 [&>input]:w-full [&>input]:rounded-[5px] [&>input]:px-2 [&>input]:font-mono [&>input]:text-[11px] [&>input]:font-normal [&>input]:text-ink-1 focus-within:[&>input]:shadow-[inset_0_0_0_1px_var(--color-accent)]"
				aria-label="Style name"
				value={renameValue}
				onValueChange={(value) => (renameValue = value)}
				onCommit={commitStyleName}
				onCancel={cancelStyleName}
			/>
		{:else}
			<Button
				class="min-w-0 justify-start rounded-[5px] px-0 py-1 text-left text-[12.5px] font-semibold text-ink-1 hover:bg-field focus-visible:outline-2 focus-visible:outline-accent"
				aria-label={`Edit style name "${styleName}"`}
				title={`${filename}`}
				disabled={!onRenameStyle}
				onclick={startRenamingStyle}
			>
				<span class="max-w-44 truncate">
					{filename}
				</span>
			</Button>
		{/if}
		<span
			class={`size-1.5 shrink-0 rounded-full ${
				saveState === 'error' ? 'bg-danger' : saveState === 'saved' ? 'bg-ok' : 'bg-ink-3'
			}`}
			aria-label={saveState === 'error'
				? 'Save failed'
				: saveState === 'saved'
					? 'Saved'
					: 'Saving'}
			title={saveState === 'error' ? 'Save failed' : saveState === 'saved' ? 'Saved' : 'Saving…'}
		></span>
	</div>

	<div class="flex min-w-0 shrink items-center gap-1 overflow-hidden empty:hidden">
		{#each adapterModules as module (module.id)}
			{#if module.headerStatus}
				{@const HeaderStatus = module.headerStatus}
				<HeaderStatus />
			{/if}
		{/each}
	</div>

	<nav class="flex min-w-0 items-center gap-0.5" aria-label="Editor">
		<MenuRoot>
			<MenuTrigger value="file" label="File">
				<MenuItem disabled={!onNewStyle} shortcut="⌘N" onSelect={() => onNewStyle?.()}>
					New style
				</MenuItem>
				<MenuItem onSelect={() => onImport?.()}>Import style…</MenuItem>
				<MenuItem onSelect={() => onExport?.()}>Export style…</MenuItem>
				{@render renderAdapterMenuSections('file')}
				{#if hasHeaderActionFallbacks}
					<MenuSeparator />
					{#each adapterModules as module (module.id)}
						{#if !resolveEditorMenuSection(module, 'file') && module.headerAction}
							{@const HeaderAction = module.headerAction}
							<HeaderAction />
						{/if}
					{/each}
				{/if}
			</MenuTrigger>
			<MenuTrigger value="edit" label="Edit">
				<MenuItem disabled={!canUndo} shortcut="⌘Z" onSelect={() => onUndo?.()}>Undo</MenuItem>
				<MenuItem disabled={!canRedo} shortcut="⇧⌘Z" onSelect={() => onRedo?.()}>Redo</MenuItem>
				<MenuSeparator />
				<MenuItem onSelect={() => onAddLayer?.()}>Add layer…</MenuItem>
				<MenuItem disabled={onGroupLayersByPrefix === undefined} onSelect={groupLayersByPrefix}>
					Group by ID prefix
				</MenuItem>
				{@render renderAdapterMenuSections('edit')}
			</MenuTrigger>
			<MenuTrigger value="view" label="View">
				<MenuItem shortcut="⌘." onSelect={() => onTogglePanels?.()}>
					{leftShellCollapsed ? 'Show panels' : 'Hide panels'}
				</MenuItem>
				<MenuSeparator />
				<MenuItem onSelect={() => onOpenStyleSettings?.()}>Style settings</MenuItem>
				{@render renderAdapterMenuSections('view')}
				<MenuSeparator />
				<MenuItem onSelect={() => onOpenVariables?.()}>Palette</MenuItem>
				<MenuItem onSelect={() => onOpenSources?.()}>Sources</MenuItem>
				<MenuItem onSelect={() => onOpenSprites?.()}>Sprites</MenuItem>
				<MenuItem onSelect={() => onOpenFonts?.()}>Fonts</MenuItem>
				<MenuSeparator />
				<MenuSub label="Color vision simulation">
					{#each colorVisionModes as mode (mode)}
						<MenuCheckboxItem
							checked={colorVisionMode === mode}
							onCheckedChange={() => onColorVisionModeChange?.(mode)}
						>
							{COLOR_VISION_MODE_LABELS[mode]}
						</MenuCheckboxItem>
					{/each}
				</MenuSub>
			</MenuTrigger>
		</MenuRoot>
	</nav>

	<div class="ml-auto flex shrink-0 items-center gap-1">
		<Button
			class="flex h-7 items-center gap-1.5 rounded-[6px] bg-field px-2.5 text-[11px] text-ink-2 hover:bg-field focus-visible:shadow-[inset_0_0_0_1px_var(--color-accent)] focus-visible:outline-none"
			aria-label="Open command palette"
			title="Search (⌘K or /)"
			onclick={() => onSearch?.()}
		>
			<MagnifyingGlass size={14} weight="regular" aria-hidden="true" />
			<span>Search</span>
			<span class="font-mono text-[10px] font-normal text-ink-3">⌘K</span>
		</Button>
		<Button
			class={`h-7 rounded-[6px] border px-2 text-[11px] font-semibold ${
				styleJsonMode
					? 'border-accent bg-accent-soft text-accent hover:bg-accent-soft'
					: 'border-hairline text-ink-2 hover:bg-field'
			}`}
			aria-label="View full style JSON"
			aria-pressed={styleJsonMode}
			title="View full style JSON"
			onclick={() => onToggleStyleJson?.()}
		>
			JSON
		</Button>
		<Button
			class="flex size-7 items-center justify-center rounded-[6px] text-ink-2 hover:bg-field disabled:text-ink-4"
			aria-label="Undo"
			title="Undo (⌘Z)"
			disabled={!canUndo}
			onclick={() => onUndo?.()}
		>
			<ArrowUUpLeft size={16} weight="regular" aria-hidden="true" />
		</Button>
		<Button
			class="flex size-7 items-center justify-center rounded-[6px] text-ink-2 hover:bg-field disabled:text-ink-4"
			aria-label="Redo"
			title="Redo (⇧⌘Z)"
			disabled={!canRedo}
			onclick={() => onRedo?.()}
		>
			<ArrowUUpRight size={16} weight="regular" aria-hidden="true" />
		</Button>
		<span class="mx-0.5 h-[18px] w-px bg-hairline"></span>
		<Button
			class="h-7 rounded-[6px] px-1.5 text-[11.5px] font-normal text-[#4b4f53] hover:bg-field disabled:text-ink-4"
			disabled={!onPreview}
			onclick={() => onPreview?.()}
		>
			Preview
		</Button>
		<Button
			class="h-7 rounded-[6px] bg-accent px-3 text-[11.5px] font-semibold text-white hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
			onclick={() => onExport?.()}
		>
			Export
		</Button>
	</div>
</header>
