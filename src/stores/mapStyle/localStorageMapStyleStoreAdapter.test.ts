import type { StyleSpecification } from 'maplibre-gl';
import { afterEach, describe, expect, it } from 'vitest';

import { osmLibertyMigrated } from '~/samples/osm-liberty.ts';

import { localStorageMapStyleStoreAdapter } from './localStorageMapStyleStoreAdapter.ts';

const STORAGE_KEY = 'kartore:style';

describe('localStorageMapStyleStoreAdapter', () => {
	afterEach(() => {
		localStorage.clear();
	});

	it('returns null when no style is stored', async () => {
		await expect(localStorageMapStyleStoreAdapter.load()).resolves.toBeNull();
	});

	it('loads a saved style', async () => {
		const style = { ...osmLibertyMigrated, name: 'Saved Style' } satisfies StyleSpecification;

		await localStorageMapStyleStoreAdapter.save(style);

		await expect(localStorageMapStyleStoreAdapter.load()).resolves.toEqual(style);
	});

	it('returns null when stored JSON is invalid', async () => {
		localStorage.setItem(STORAGE_KEY, '{');

		await expect(localStorageMapStyleStoreAdapter.load()).resolves.toBeNull();
	});
});
