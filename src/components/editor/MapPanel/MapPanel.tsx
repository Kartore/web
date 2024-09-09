import 'maplibre-gl/dist/maplibre-gl.css';
import type { CSSProperties, FC } from 'react';

import type { StyleSpecification } from 'maplibre-gl';
import { Map } from 'react-map-gl/maplibre';

export const MapPanel: FC<{
  style?: CSSProperties;
  mapStyle: StyleSpecification;
}> = ({ style, mapStyle }) => {
  return (
    <Map
      initialViewState={{
        longitude: 139.767,
        latitude: 35.681,
        zoom: 15,
      }}
      style={{ height: '100%', ...style }}
      mapStyle={mapStyle}
      maplibreLogo
    />
  );
};
