import type { LayerSpecification, StyleSpecification } from 'maplibre-gl';

import { pruneDefaultValues } from './stylePrune.ts';
import { serializeStyle } from './styleSerialize.ts';
import { getLayerBindings, parseBindingKey } from './styleVariables.ts';
import {
	activateStyleVariableMode,
	getStyleVariableModes,
	type StyleVariableMode
} from './variableModes.ts';

export type StyleExport = {
	contents: string;
	fileName: string;
};

export type StyleExportKind = 'current-mode' | 'mode-files' | 'runtime';

export const VARIABLE_MODE_GLOBAL_STATE_KEY = 'mode';

type LayerPropertyGroup = Record<string, unknown>;
type MaterializedMode = { mode: StyleVariableMode; style: StyleSpecification };

const cloneValue = <Value>(value: Value): Value => JSON.parse(JSON.stringify(value)) as Value;

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const withoutKartoreMetadata = (metadata: unknown): unknown | undefined => {
	if (!isRecord(metadata)) return metadata;
	const entries = Object.entries(metadata).filter(([key]) => !key.startsWith('kartore:'));
	return entries.length > 0 ? Object.fromEntries(entries) : undefined;
};

const stripEditorMetadata = (style: StyleSpecification): StyleSpecification => {
	const nextStyle = {
		...style,
		layers: style.layers.map((layer) => {
			const nextLayer = { ...layer };
			const metadata = withoutKartoreMetadata(layer.metadata);
			if (metadata === undefined) delete nextLayer.metadata;
			else nextLayer.metadata = metadata;
			return nextLayer;
		})
	};
	const metadata = withoutKartoreMetadata(style.metadata);
	if (metadata === undefined) delete nextStyle.metadata;
	else nextStyle.metadata = metadata;
	return nextStyle;
};

const safeFilePart = (value: string, fallback: string): string =>
	value.trim().replace(/[\\/:*?"<>|]/g, '_') || fallback;

const styleFileBase = (style: StyleSpecification): string =>
	safeFilePart(style.name ?? 'style', 'style');

const serializeExport = (style: StyleSpecification, fileName: string): StyleExport => ({
	contents: serializeStyle(pruneDefaultValues(stripEditorMetadata(style))),
	fileName
});

const materializeModes = (style: StyleSpecification): MaterializedMode[] => {
	const variableModes = getStyleVariableModes(style);
	const capturedStyle = activateStyleVariableMode(style, variableModes.activeModeId);
	const seenModeIds = new Set<string>();
	return variableModes.modes.flatMap((mode) => {
		if (seenModeIds.has(mode.id)) return [];
		seenModeIds.add(mode.id);
		return [{ mode, style: activateStyleVariableMode(capturedStyle, mode.id) }];
	});
};

const getLayerProperty = (
	layer: LayerSpecification,
	group: 'paint' | 'layout',
	key: string
): unknown => (layer[group] as LayerPropertyGroup | undefined)?.[key];

const setLayerProperty = (
	layer: LayerSpecification,
	group: 'paint' | 'layout',
	key: string,
	value: unknown
): LayerSpecification =>
	({
		...layer,
		[group]: {
			...((layer[group] as LayerPropertyGroup | undefined) ?? {}),
			[key]: value
		}
	}) as LayerSpecification;

const runtimeExpression = (
	modes: MaterializedMode[],
	activeModeId: string,
	layerId: string,
	group: 'paint' | 'layout',
	key: string,
	stateKey: string
): unknown[] | undefined => {
	const activeMode = modes.find(({ mode }) => mode.id === activeModeId);
	const activeLayer = activeMode?.style.layers.find(({ id }) => id === layerId);
	if (!activeLayer) return undefined;

	const fallback = getLayerProperty(activeLayer, group, key);
	if (fallback === undefined) return undefined;

	const branches: unknown[] = [];
	const seenModeIds = new Set<string>([activeModeId]);
	for (const materialized of modes) {
		if (seenModeIds.has(materialized.mode.id)) continue;
		seenModeIds.add(materialized.mode.id);
		const layer = materialized.style.layers.find(({ id }) => id === layerId);
		if (!layer) continue;
		const value = getLayerProperty(layer, group, key);
		if (value === undefined) continue;
		branches.push(materialized.mode.id, cloneValue(value));
	}

	return branches.length > 0
		? ['match', ['global-state', stateKey], ...branches, cloneValue(fallback)]
		: undefined;
};

/**
 * zoom ベースの式には interpolate を複数含められないため、補間 Variable を持つ
 * レイヤーはプロパティを match で包まず、常に Mode ごとのレイヤーへ分ける。
 */
const needsModeLayers = (layer: LayerSpecification, modes: MaterializedMode[]): boolean =>
	modes.length > 1 &&
	Object.keys(getLayerBindings(layer)).some((rawTarget) => {
		const target = parseBindingKey(rawTarget);
		return target?.slot === 'interpolation';
	});

const withModeVisibility = (
	layer: LayerSpecification,
	modeId: string,
	activeModeId: string,
	otherModeIds: string[],
	stateKey: string
): LayerSpecification => {
	const visibility = getLayerProperty(layer, 'layout', 'visibility') ?? 'visible';
	const expression =
		modeId === activeModeId
			? [
					'match',
					['global-state', stateKey],
					...otherModeIds.flatMap((id) => [id, 'none']),
					cloneValue(visibility)
				]
			: ['match', ['global-state', stateKey], modeId, cloneValue(visibility), 'none'];
	return setLayerProperty(layer, 'layout', 'visibility', expression);
};

const modeLayerIdPart = (mode: StyleVariableMode): string =>
	mode.id.replace(/[^a-zA-Z0-9_-]/g, '_') || 'mode';

const uniqueLayerId = (candidate: string, usedIds: Set<string>): string => {
	let id = candidate;
	let suffix = 2;
	while (usedIds.has(id)) {
		id = `${candidate}-${suffix}`;
		suffix += 1;
	}
	usedIds.add(id);
	return id;
};

export const createRuntimeVariableModeStyle = (
	style: StyleSpecification,
	stateKey = VARIABLE_MODE_GLOBAL_STATE_KEY
): StyleSpecification => {
	const variableModes = getStyleVariableModes(style);
	const modes = materializeModes(style);
	const activeStyle =
		modes.find(({ mode }) => mode.id === variableModes.activeModeId)?.style ?? style;
	const orderedModes = [
		...modes.filter(({ mode }) => mode.id === variableModes.activeModeId),
		...modes.filter(({ mode }) => mode.id !== variableModes.activeModeId)
	];
	const otherModeIds = orderedModes
		.filter(({ mode }) => mode.id !== variableModes.activeModeId)
		.map(({ mode }) => mode.id);
	const usedLayerIds = new Set(activeStyle.layers.map(({ id }) => id));
	const layers: LayerSpecification[] = [];

	for (const layer of activeStyle.layers) {
		if (needsModeLayers(layer, orderedModes)) {
			for (const materialized of orderedModes) {
				const modeLayer = materialized.style.layers.find(({ id }) => id === layer.id);
				if (!modeLayer) continue;
				const id =
					materialized.mode.id === variableModes.activeModeId
						? layer.id
						: uniqueLayerId(
								`${layer.id}--kartore-mode-${modeLayerIdPart(materialized.mode)}`,
								usedLayerIds
							);
				layers.push(
					withModeVisibility(
						{ ...modeLayer, id },
						materialized.mode.id,
						variableModes.activeModeId,
						otherModeIds,
						stateKey
					)
				);
			}
			continue;
		}

		let nextLayer = layer;
		const processedProperties = new Set<string>();
		for (const rawTarget of Object.keys(getLayerBindings(layer))) {
			const target = parseBindingKey(rawTarget);
			if (!target) continue;
			const propertyId = `${target.group}:${target.key}`;
			if (processedProperties.has(propertyId)) continue;
			processedProperties.add(propertyId);

			const expression = runtimeExpression(
				orderedModes,
				variableModes.activeModeId,
				layer.id,
				target.group,
				target.key,
				stateKey
			);
			if (expression) {
				nextLayer = setLayerProperty(nextLayer, target.group, target.key, expression);
			}
		}
		layers.push(nextLayer);
	}

	return {
		...activeStyle,
		state: {
			...(activeStyle.state ?? {}),
			[stateKey]: {
				...(activeStyle.state?.[stateKey] ?? {}),
				default: variableModes.activeModeId
			}
		},
		layers
	};
};

export const createStyleExport = (style: StyleSpecification): StyleExport =>
	serializeExport(style, `${styleFileBase(style)}.json`);

export const createStyleExports = (
	style: StyleSpecification,
	kind: StyleExportKind
): StyleExport[] => {
	if (kind === 'current-mode') return [createStyleExport(style)];
	if (kind === 'runtime') {
		return [
			serializeExport(createRuntimeVariableModeStyle(style), `${styleFileBase(style)}-runtime.json`)
		];
	}

	const usedFileParts = new Map<string, number>();
	return materializeModes(style).map(({ mode, style: modeStyle }) => {
		const part = safeFilePart(mode.id, 'mode');
		const occurrence = (usedFileParts.get(part) ?? 0) + 1;
		usedFileParts.set(part, occurrence);
		const suffix = occurrence === 1 ? part : `${part}-${occurrence}`;
		return serializeExport(modeStyle, `${styleFileBase(style)}-${suffix}.json`);
	});
};
