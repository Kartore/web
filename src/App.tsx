import type { LayerSpecification, StyleSpecification } from 'maplibre-gl';
import { useEffect, useState } from 'react';
import { MapProvider } from 'react-map-gl/maplibre';

import { ControlPanel } from '~/components/editor/ControlPanel';
import { MapPanel } from '~/components/editor/MapPanel';
import { NavigationPanel } from '~/components/editor/NavigationPanel/NavigationPanel.tsx';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { replaceLayerData } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { PropertiesPanel } from '~/components/editor/PropertiesPanel/PropertiesPanel.tsx';
import { osmLibertyMigrated } from '~/samples/osm-liberty.ts';
import { localStorageMapStyleStoreAdapter, useMapStyleStore } from '~/stores/mapStyle';

function App() {
	const { mapStyle, setMapStyle, isLoading } = useMapStyleStore({
		adapter: localStorageMapStyleStoreAdapter,
		initialStyle: osmLibertyMigrated,
	});

	const [selectedLayerId, setSelectedLayerId] = useState<string>(osmLibertyMigrated.layers[4].id);
	const selectedLayer =
		mapStyle.layers.find((layer) => layer.id === selectedLayerId) ?? mapStyle.layers[0];

	useEffect(() => {
		if (!mapStyle.layers.some((layer) => layer.id === selectedLayerId)) {
			setSelectedLayerId(mapStyle.layers[0].id);
		}
	}, [mapStyle.layers, selectedLayerId]);

	const handleChangeLayerOrder = (layer: LayerSpecification[]) => {
		setMapStyle((currentStyle: StyleSpecification) => {
			return { ...currentStyle, layers: layer };
		});
	};

	const handleChangeLayerData: onChangeType = (layer, group, key, value) => {
		setMapStyle((currentStyle: StyleSpecification) => {
			return replaceLayerData(currentStyle, layer, group, key, value);
		});
	};

	if (isLoading) {
		return (
			<div className={'flex min-h-screen items-center justify-center text-sm text-gray-600'}>
				Loading map style...
			</div>
		);
	}

	return (
		<MapProvider>
			<div className={'relative flex max-h-screen min-h-screen w-full flex-row overflow-hidden'}>
				<MapPanel mapStyle={mapStyle} />
				<div className={'pointer-events-none absolute inset-2 flex gap-2'}>
					<NavigationPanel
						className={'w-1/5'}
						mapStyle={mapStyle}
						onChangeLayerOrder={handleChangeLayerOrder}
						selectedLayerId={selectedLayerId}
						onClickLayer={(layer) => {
							setSelectedLayerId(layer.id);
						}}
					/>

					<ControlPanel className={'flex-1'} />

					<PropertiesPanel
						className={'w-2/5'}
						sprite={mapStyle.sprite}
						layer={selectedLayer}
						sources={mapStyle.sources}
						onChange={handleChangeLayerData}
					/>
				</div>
			</div>
		</MapProvider>
	);
}

export default App;
