import { useCallback, useSyncExternalStore } from 'react';

import { useMap } from 'react-map-gl';

export const useZoomLevel = () => {
  const { backgroundMap } = useMap();
  const subscribe = useCallback(
    (callback: () => void) => {
      backgroundMap?.on('zoom', callback);
      return () => {
        backgroundMap?.off('zoom', callback);
      };
    },
    [backgroundMap]
  );
  const getSnapshot = useCallback(() => backgroundMap?.getZoom().toFixed(2), [backgroundMap]);
  return useSyncExternalStore(subscribe, getSnapshot);
};
