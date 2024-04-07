import 'maplibre-gl/dist/maplibre-gl.css';
import { Map } from 'react-map-gl/maplibre';
import { osmLiberty } from '~/samples/osm-liberty.ts';
import { CSSProperties, FC } from 'react';

export const MapPanel: FC<{
  style?: CSSProperties;
}> = ({ style }) => {
  return (
    <Map
      initialViewState={{
        longitude: 139.767,
        latitude: 35.681,
        zoom: 15,
      }}
      style={{ height: '100%', width: 'auto', ...style }}
      mapStyle={osmLiberty}
    />
  );
};
