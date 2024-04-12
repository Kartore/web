import 'maplibre-gl/dist/maplibre-gl.css';
import { Map } from 'react-map-gl/maplibre';
import { CSSProperties, FC } from 'react';
import { StyleSpecification } from 'maplibre-gl';

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
