import { useMutation, useQuery } from '@tanstack/react-query';
import type { StyleSpecification } from 'maplibre-gl';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useState } from 'react';

import type { MapStyleStoreAdapter } from './MapStyleStoreAdapter.ts';

type UseMapStyleStoreOptions = {
	adapter: MapStyleStoreAdapter;
	initialStyle: StyleSpecification;
};

type UseMapStyleStoreResult = {
	mapStyle: StyleSpecification;
	setMapStyle: Dispatch<SetStateAction<StyleSpecification>>;
	isLoading: boolean;
	isSaving: boolean;
	loadError: Error | null;
	saveError: Error | null;
};

const resolveMapStyleUpdate = (
	value: SetStateAction<StyleSpecification>,
	currentStyle: StyleSpecification,
) => {
	return typeof value === 'function' ? value(currentStyle) : value;
};

export const useMapStyleStore = ({
	adapter,
	initialStyle,
}: UseMapStyleStoreOptions): UseMapStyleStoreResult => {
	const [mapStyle, setMapStyleState] = useState<StyleSpecification>(initialStyle);

	const {
		data: loadedStyle,
		error: loadError,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ['mapStyle', adapter.id],
		queryFn: () => adapter.load(),
	});

	const {
		mutate: saveMapStyle,
		error: saveError,
		isPending: isSaving,
	} = useMutation({
		mutationFn: (style: StyleSpecification) => adapter.save(style),
	});

	useEffect(() => {
		if (isSuccess) {
			setMapStyleState(loadedStyle ?? initialStyle);
		}
	}, [initialStyle, isSuccess, loadedStyle]);

	const setMapStyle = useCallback<Dispatch<SetStateAction<StyleSpecification>>>(
		(value) => {
			setMapStyleState((currentStyle) => {
				const nextStyle = resolveMapStyleUpdate(value, currentStyle);

				saveMapStyle(nextStyle);

				return nextStyle;
			});
		},
		[saveMapStyle],
	);

	return {
		mapStyle,
		setMapStyle,
		isLoading,
		isSaving,
		loadError,
		saveError,
	};
};
