import 'maplibre-gl/dist/maplibre-gl.css';
import type { CSSProperties, FC } from 'react';

import type { StyleSpecification } from 'maplibre-gl';
import { Map as ReactMaplibreGL } from 'react-map-gl/maplibre';

export const MapPanel: FC<{
	style?: CSSProperties;
	mapStyle: StyleSpecification;
}> = ({ style, mapStyle }) => {
	return (
		<ReactMaplibreGL
			id={'backgroundMap'}
			initialViewState={{
				longitude: 139.767,
				latitude: 35.681,
				zoom: 15,
			}}
			style={{ height: 'auto', width: '100%', ...style }}
			mapStyle={mapStyle}
			maplibreLogo={false}
			attributionControl={false}
		/>
	);
};

MapPanel.displayName = 'MapPanel';
