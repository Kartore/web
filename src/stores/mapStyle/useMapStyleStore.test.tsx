import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { osmLibertyMigrated } from '~/samples/osm-liberty.ts';

import type { MapStyleStoreAdapter } from './MapStyleStoreAdapter.ts';
import { useMapStyleStore } from './useMapStyleStore.ts';

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
			mutations: {
				retry: false,
			},
		},
	});

	return ({ children }: PropsWithChildren) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

describe('useMapStyleStore', () => {
	it('reflects the loaded style in state', async () => {
		const loadedStyle = { ...osmLibertyMigrated, name: 'Loaded Style' };
		const adapter: MapStyleStoreAdapter = {
			id: 'loaded-style-test',
			load: vi.fn(async () => loadedStyle),
			save: vi.fn(async () => {}),
		};

		const { result } = renderHook(
			() => useMapStyleStore({ adapter, initialStyle: osmLibertyMigrated }),
			{ wrapper: createWrapper() },
		);

		await waitFor(() => {
			expect(result.current.mapStyle.name).toBe('Loaded Style');
		});
	});

	it('saves the next style when setMapStyle receives an updater', async () => {
		const save = vi.fn(async () => {});
		const adapter: MapStyleStoreAdapter = {
			id: 'updater-save-test',
			load: vi.fn(async () => null),
			save,
		};

		const { result } = renderHook(
			() => useMapStyleStore({ adapter, initialStyle: osmLibertyMigrated }),
			{ wrapper: createWrapper() },
		);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		act(() => {
			result.current.setMapStyle((currentStyle) => ({
				...currentStyle,
				name: 'Updated Style',
			}));
		});

		await waitFor(() => {
			expect(save).toHaveBeenCalledWith(
				expect.objectContaining({
					name: 'Updated Style',
				}),
			);
		});
		expect(result.current.mapStyle.name).toBe('Updated Style');
	});
});
