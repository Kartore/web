import type { StyleSpecification } from '@maplibre/maplibre-gl-style-spec';

import {
	getStyleVariables,
	replaceStyleVariables,
	type StyleVariable
} from '#lib/utils/styleVariables.ts';

export const VARIABLE_MODES_METADATA_KEY = 'kartore:variableModes';
export const LIGHT_MODE_ID = 'light';

export type StyleVariableMode = {
	id: string;
	name: string;
	values: Record<string, StyleVariable['value']>;
};

export type StyleVariableModes = {
	activeModeId: string;
	modes: StyleVariableMode[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const cloneValue = <Value extends StyleVariable['value']>(value: Value): Value =>
	JSON.parse(JSON.stringify(value)) as Value;

const currentValues = (style: StyleSpecification): Record<string, StyleVariable['value']> =>
	Object.fromEntries(getStyleVariables(style).map(({ id, value }) => [id, cloneValue(value)]));

const valueMatchesType = (variable: StyleVariable, value: unknown): boolean =>
	(variable.type === 'color' && typeof value === 'string') ||
	(variable.type === 'number' && typeof value === 'number') ||
	(variable.type === 'interpolation' && Array.isArray(value));

const completeModeValues = (
	variables: StyleVariable[],
	values: Record<string, unknown>
): Record<string, StyleVariable['value']> =>
	Object.fromEntries(
		variables.map((variable) => {
			const candidate = values[variable.id];
			const value = valueMatchesType(variable, candidate)
				? (candidate as StyleVariable['value'])
				: variable.value;
			return [variable.id, cloneValue(value)];
		})
	);

const isMode = (value: unknown): value is StyleVariableMode =>
	isRecord(value) &&
	typeof value.id === 'string' &&
	value.id !== '' &&
	typeof value.name === 'string' &&
	isRecord(value.values);

export const getStyleVariableModes = (style: StyleSpecification): StyleVariableModes => {
	const variables = getStyleVariables(style);
	const raw = isRecord(style.metadata) ? style.metadata[VARIABLE_MODES_METADATA_KEY] : undefined;
	if (
		isRecord(raw) &&
		typeof raw.activeModeId === 'string' &&
		Array.isArray(raw.modes) &&
		raw.modes.every(isMode) &&
		raw.modes.some(({ id }) => id === raw.activeModeId)
	) {
		return {
			activeModeId: raw.activeModeId,
			modes: raw.modes.map((mode) => ({
				...mode,
				values: completeModeValues(variables, mode.values)
			}))
		};
	}
	return {
		activeModeId: LIGHT_MODE_ID,
		modes: [{ id: LIGHT_MODE_ID, name: 'ライト', values: completeModeValues(variables, {}) }]
	};
};

const withModes = (style: StyleSpecification, value: StyleVariableModes): StyleSpecification => ({
	...style,
	metadata: {
		...(isRecord(style.metadata) ? style.metadata : {}),
		[VARIABLE_MODES_METADATA_KEY]: {
			version: 1,
			activeModeId: value.activeModeId,
			modes: value.modes
		}
	}
});

const captureActiveValues = (
	style: StyleSpecification,
	value: StyleVariableModes
): StyleVariableModes => ({
	...value,
	modes: value.modes.map((mode) =>
		mode.id === value.activeModeId ? { ...mode, values: currentValues(style) } : mode
	)
});

export const duplicateStyleVariableMode = (
	style: StyleSpecification,
	name: string,
	id: string
): { style: StyleSpecification; mode: StyleVariableMode } => {
	const captured = captureActiveValues(style, getStyleVariableModes(style));
	const mode: StyleVariableMode = {
		id: id.trim(),
		name: name.trim(),
		values: currentValues(style)
	};
	return {
		style: withModes(style, { ...captured, modes: [...captured.modes, mode] }),
		mode
	};
};

export const renameStyleVariableMode = (
	style: StyleSpecification,
	modeId: string,
	name: string,
	id: string
): StyleSpecification => {
	const nextName = name.trim();
	const nextId = id.trim();
	const captured = captureActiveValues(style, getStyleVariableModes(style));
	if (
		!nextName ||
		!nextId ||
		!captured.modes.some((mode) => mode.id === modeId) ||
		captured.modes.some((mode) => mode.id !== modeId && mode.id === nextId)
	) {
		return style;
	}

	return withModes(style, {
		activeModeId: captured.activeModeId === modeId ? nextId : captured.activeModeId,
		modes: captured.modes.map((mode) =>
			mode.id === modeId ? { ...mode, id: nextId, name: nextName } : mode
		)
	});
};

export const activateStyleVariableMode = (
	style: StyleSpecification,
	modeId: string
): StyleSpecification => {
	const captured = captureActiveValues(style, getStyleVariableModes(style));
	const target = captured.modes.find(({ id }) => id === modeId);
	if (!target || captured.activeModeId === modeId) return withModes(style, captured);
	const variables = getStyleVariables(style).map((variable) => {
		const value = target.values[variable.id];
		return valueMatchesType(variable, value)
			? ({ ...variable, value: cloneValue(value) } as StyleVariable)
			: variable;
	});
	return withModes(replaceStyleVariables(style, variables), {
		...captured,
		activeModeId: modeId
	});
};
