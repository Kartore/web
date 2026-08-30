import { validateStyleMin, type StyleSpecification } from '@maplibre/maplibre-gl-style-spec';
import { describe, expect, it } from 'vitest';

import { createDisplayStyle } from '#lib/fonts/displayStyle.ts';
import { GLYPH_PROTOCOL_TEMPLATE } from '#lib/fonts/glyphProtocol.ts';

import {
	createStyleExport,
	createStyleExports,
	VARIABLE_MODE_GLOBAL_STATE_KEY
} from './styleExport.ts';
import { BINDINGS_METADATA_KEY, VARIABLES_METADATA_KEY } from './styleVariables.ts';
import { VARIABLE_MODES_METADATA_KEY } from './variableModes.ts';

const variableModeStyle = (): StyleSpecification =>
	({
		version: 8,
		name: 'テーマ',
		state: {
			locale: { default: 'ja' }
		},
		metadata: {
			[VARIABLES_METADATA_KEY]: {
				version: 1,
				variables: [
					{ id: 'brand', name: 'Brand', type: 'color', value: '#fefefe' },
					{ id: 'width', name: 'Width', type: 'number', value: 2 },
					{ id: 'shared', name: 'Shared', type: 'number', value: 0.75 },
					{ id: 'curve', name: 'Curve', type: 'interpolation', value: ['linear'] }
				]
			},
			[VARIABLE_MODES_METADATA_KEY]: {
				version: 1,
				activeModeId: 'light',
				modes: [
					{
						id: 'light',
						name: 'ライト',
						values: { brand: '#ffffff', width: 1, curve: ['linear'] }
					},
					{
						id: 'dark',
						name: 'ダーク',
						values: { brand: '#101010', width: 4, curve: ['exponential', 2] }
					}
				]
			}
		},
		sources: {
			roads: {
				type: 'geojson',
				data: { type: 'FeatureCollection', features: [] }
			}
		},
		layers: [
			{
				id: 'background',
				type: 'background',
				metadata: {
					[BINDINGS_METADATA_KEY]: {
						'paint:background-color': 'brand',
						'paint:background-opacity': 'shared'
					}
				},
				paint: { 'background-color': '#fefefe', 'background-opacity': 0.75 }
			},
			{
				id: 'roads',
				type: 'line',
				source: 'roads',
				metadata: {
					[BINDINGS_METADATA_KEY]: {
						'paint:line-width': 'width',
						'paint:line-opacity@interpolation': 'curve'
					}
				},
				paint: {
					'line-width': 2,
					'line-opacity': ['interpolate', ['linear'], ['zoom'], 0, 0.25, 12, 1]
				}
			}
		]
	}) as StyleSpecification;

describe('createStyleExport', () => {
	it('preserves a renamed Japanese style name in the JSON and filename', () => {
		const style: StyleSpecification = {
			version: 8,
			name: '日本語スタイル',
			sources: {},
			layers: []
		};

		const result = createStyleExport(style);

		expect(JSON.parse(result.contents)).toMatchObject({ name: '日本語スタイル' });
		expect(result.fileName).toBe('日本語スタイル.json');
	});

	it('does not export the display-only local glyph protocol', () => {
		const style: StyleSpecification = {
			version: 8,
			glyphs: 'https://example.com/{fontstack}/{range}.pbf',
			sources: {},
			layers: []
		};

		const displayStyle = createDisplayStyle(style, true);
		const result = createStyleExport(style);

		expect(displayStyle.glyphs).toBe(GLYPH_PROTOCOL_TEMPLATE);
		expect(result.contents).toContain('https://example.com/{fontstack}/{range}.pbf');
		expect(result.contents).not.toContain('kartore-glyph://');
	});

	it('removes Kartore editor metadata while preserving external metadata', () => {
		const style = {
			version: 8,
			metadata: {
				owner: 'example',
				'kartore:variables': {
					version: 1,
					variables: [{ id: 'primary', name: 'Primary', type: 'color', value: '#00aaff' }]
				},
				'kartore:variableModes': {
					version: 1,
					activeModeId: 'light',
					modes: [{ id: 'light', name: 'ライト', values: { primary: '#00aaff' } }]
				}
			},
			sources: {
				base: { type: 'vector', url: 'https://example.com/source.json' }
			},
			layers: [
				{
					id: 'water',
					type: 'fill',
					source: 'base',
					metadata: {
						description: 'Water',
						'kartore:bindings': { 'paint:fill-color': 'primary' },
						'kartore:group': 'base'
					},
					paint: { 'fill-color': '#00aaff' }
				}
			]
		} satisfies StyleSpecification;

		const result = createStyleExport(style);

		expect(JSON.parse(result.contents)).toEqual({
			version: 8,
			metadata: { owner: 'example' },
			sources: style.sources,
			layers: [
				{
					id: 'water',
					type: 'fill',
					source: 'base',
					metadata: { description: 'Water' },
					paint: { 'fill-color': '#00aaff' }
				}
			]
		});
	});

	it('prunes runtime defaults only from the downloaded export', () => {
		const style = {
			version: 8,
			sources: {
				lines: {
					type: 'geojson',
					data: { type: 'FeatureCollection', features: [] }
				}
			},
			layers: [
				{
					id: 'lines',
					type: 'line',
					source: 'lines',
					layout: { visibility: 'visible' },
					paint: { 'line-width': 1 }
				}
			]
		} as StyleSpecification;

		const result = createStyleExport(style);

		expect(JSON.parse(result.contents).layers[0]).toEqual({
			id: 'lines',
			type: 'line',
			source: 'lines'
		});
		expect(style.layers[0]).toHaveProperty('paint.line-width', 1);
	});

	it('exports one materialized style per variable mode and captures active edits', () => {
		const style = variableModeStyle();

		const results = createStyleExports(style, 'mode-files');
		const [light, dark] = results.map(({ contents }) => JSON.parse(contents));

		expect(results.map(({ fileName }) => fileName)).toEqual([
			'テーマ-light.json',
			'テーマ-dark.json'
		]);
		expect(light).not.toHaveProperty('metadata');
		expect(
			light.layers.every((layer: StyleSpecification['layers'][number]) => !layer.metadata)
		).toBe(true);
		expect(light.layers[0].paint['background-color']).toBe('#fefefe');
		expect(light.layers[1].paint['line-width']).toBe(2);
		expect(light.layers[1].paint['line-opacity'][1]).toEqual(['linear']);
		expect(dark).not.toHaveProperty('metadata');
		expect(dark.layers[0].paint['background-color']).toBe('#101010');
		expect(dark.layers[1].paint['line-width']).toBe(4);
		expect(dark.layers[1].paint['line-opacity'][1]).toEqual(['exponential', 2]);
		expect(style.layers[0]).toHaveProperty('paint.background-color', '#fefefe');
	});

	it('exports one runtime style driven by the mode global-state property', () => {
		const [result] = createStyleExports(variableModeStyle(), 'runtime');
		const runtime = JSON.parse(result.contents) as StyleSpecification;

		expect(VARIABLE_MODE_GLOBAL_STATE_KEY).toBe('mode');
		expect(result.fileName).toBe('テーマ-runtime.json');
		expect(runtime.state).toEqual({
			locale: { default: 'ja' },
			[VARIABLE_MODE_GLOBAL_STATE_KEY]: { default: 'light' }
		});
		expect(runtime.layers[0]).toHaveProperty('paint.background-color', [
			'match',
			['global-state', VARIABLE_MODE_GLOBAL_STATE_KEY],
			'dark',
			'#101010',
			'#fefefe'
		]);
		expect(runtime.layers[0]).toHaveProperty('paint.background-opacity', [
			'match',
			['global-state', VARIABLE_MODE_GLOBAL_STATE_KEY],
			'dark',
			0.75,
			0.75
		]);
		expect(runtime).not.toHaveProperty('metadata');
		expect(runtime.layers.every((layer) => !layer.metadata)).toBe(true);
		expect(runtime.layers).toHaveLength(3);
		expect(runtime.layers[1]).toMatchObject({
			id: 'roads',
			layout: {
				visibility: [
					'match',
					['global-state', VARIABLE_MODE_GLOBAL_STATE_KEY],
					'dark',
					'none',
					'visible'
				]
			},
			paint: {
				'line-width': 2,
				'line-opacity': ['interpolate', ['linear'], ['zoom'], 0, 0.25, 12, 1]
			}
		});
		expect(runtime.layers[2]).toMatchObject({
			id: 'roads--kartore-mode-dark',
			layout: {
				visibility: [
					'match',
					['global-state', VARIABLE_MODE_GLOBAL_STATE_KEY],
					'dark',
					'visible',
					'none'
				]
			},
			paint: {
				'line-width': 4,
				'line-opacity': ['interpolate', ['exponential', 2], ['zoom'], 0, 0.25, 12, 1]
			}
		});
		expect(runtime.layers[1]).toHaveProperty('paint.line-opacity', [
			'interpolate',
			['linear'],
			['zoom'],
			0,
			0.25,
			12,
			1
		]);
		expect(validateStyleMin(runtime)).toEqual([]);
	});
});
