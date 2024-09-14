import { useSyncExternalStore } from 'react';

import { useMap } from 'react-map-gl/maplibre';

export const useZoomLevel = () => {
  const { backgroundMap } = useMap();
  return useSyncExternalStore(
    (callback) => {
      backgroundMap?.on('zoom', callback);
      return () => {
        backgroundMap?.off('zoom', callback);
      };
    },
    () => backgroundMap?.getZoom().toFixed(2)
  );
};
