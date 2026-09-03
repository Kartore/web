import type { StyleSpecification } from 'maplibre-gl';

import type { LoadedFont } from '#lib/stores/fonts';
import { buildGlyphFiles as buildGlyphFilesForFont } from '#lib/fonts/glyphDownload.ts';
import { loadGlyphore } from '#lib/fonts/glyphore.ts';
import { loadSpritore } from '#lib/sprites/spritore.ts';

import {
	createStyleExports,
	type StyleExportAssetUrls,
	type StyleExportKind
} from './styleExport.ts';
import { createStylePackArchive } from './stylePackArchive.ts';
import type { StylePackFiles } from './stylePack.ts';

const SPRITE_DIRECTORY = 'sprite';
const SPRITE_URL = `${SPRITE_DIRECTORY}/sprite`;
const GLYPH_DIRECTORY = 'glyphs';
const GLYPH_URL_TEMPLATE = `${GLYPH_DIRECTORY}/{fontstack}/{range}.pbf`;

const compareKeys = (left: string, right: string): number =>
	left < right ? -1 : left > right ? 1 : 0;

export type StyleExportArchiveAssets = {
	icons: Readonly<Record<string, string>>;
	fontstacks: readonly string[];
	getLoadedFont: (fontstack: string) => Promise<LoadedFont | null>;
};

export type StyleExportGeneratedAssets = {
	spriteFiles?: Readonly<StylePackFiles>;
	glyphFiles?: Readonly<StylePackFiles>;
};

const hasFiles = (files: Readonly<StylePackFiles> | undefined): files is StylePackFiles =>
	files !== undefined && Object.keys(files).length > 0;

const addFile = (files: StylePackFiles, path: string, value: string | Uint8Array): void => {
	if (path in files) throw new Error(`Duplicate export archive path: ${path}`);
	files[path] = value;
};

/** 生成済み asset と style JSON を、抽出後にそのまま使えるファイルマップへまとめる。 */
export const createStyleExportArchiveFiles = (
	style: StyleSpecification,
	kind: StyleExportKind,
	generated: StyleExportGeneratedAssets = {}
): StylePackFiles => {
	const assetUrls: StyleExportAssetUrls = {
		...(hasFiles(generated.spriteFiles) ? { sprite: SPRITE_URL } : {}),
		...(hasFiles(generated.glyphFiles) ? { glyphs: GLYPH_URL_TEMPLATE } : {})
	};
	const files: StylePackFiles = {};

	for (const styleExport of createStyleExports(style, kind, assetUrls)) {
		addFile(files, styleExport.fileName, styleExport.contents);
	}

	for (const [path, value] of Object.entries(generated.spriteFiles ?? {})) {
		addFile(files, `${SPRITE_DIRECTORY}/${path}`, value);
	}
	for (const [path, value] of Object.entries(generated.glyphFiles ?? {})) {
		addFile(files, `${GLYPH_DIRECTORY}/${path}`, value);
	}

	return files;
};

const buildSpriteFiles = async (
	icons: Readonly<Record<string, string>>
): Promise<StylePackFiles> => {
	const spriteIcons = Object.entries(icons)
		.sort(([left], [right]) => compareKeys(left, right))
		.map(([id, svg]) => ({ id, svg }));
	if (spriteIcons.length === 0) return {};

	const { buildSpriteSheet } = await loadSpritore();
	const [oneX, twoX] = await Promise.all([
		buildSpriteSheet(spriteIcons, 1),
		buildSpriteSheet(spriteIcons, 2)
	]);
	return {
		'sprite.json': oneX.indexJson,
		'sprite.png': oneX.png,
		'sprite@2x.json': twoX.indexJson,
		'sprite@2x.png': twoX.png
	};
};

const buildGlyphFiles = async ({
	fontstacks,
	getLoadedFont
}: StyleExportArchiveAssets): Promise<StylePackFiles> => {
	const names = [...new Set(fontstacks)].sort(compareKeys);
	if (names.length === 0) return {};

	const { generateRange } = await loadGlyphore();
	const files: StylePackFiles = {};
	for (const fontstack of names) {
		const font = await getLoadedFont(fontstack);
		if (!font) throw new Error(`Local font “${fontstack}” is no longer available.`);

		const glyphFiles = await buildGlyphFilesForFont({
			fontstack,
			ranges: font.info.coveredRanges,
			generateRange: (start) => generateRange(font, start)
		});
		for (const [path, value] of Object.entries(glyphFiles)) {
			addFile(files, path, value);
		}
	}
	return files;
};

/** ローカル sprite / glyph を生成し、style JSON と一緒に決定的な ZIP へまとめる。 */
export const createStyleExportArchive = async (
	style: StyleSpecification,
	kind: StyleExportKind,
	assets: StyleExportArchiveAssets
): Promise<Uint8Array> => {
	const [spriteFiles, glyphFiles] = await Promise.all([
		buildSpriteFiles(assets.icons),
		buildGlyphFiles(assets)
	]);
	return createStylePackArchive(
		createStyleExportArchiveFiles(style, kind, { spriteFiles, glyphFiles })
	);
};
