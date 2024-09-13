import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';

import { useMap } from 'react-map-gl/maplibre';

import { ZoomLevelControlButton } from '~/components/editor/ControlPanel/ZoomLevelControl/ZoomLevelControlButton';
import { CompassIcon, MinusIcon, PlusIcon } from '~/components/icons';
import { useZoomLevel } from '~/hooks/useZoomLevel.ts';
import { cn } from '~/utils/tailwindUtil';

export type ZoomLevelControlProps = {} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export const ZoomLevelControl = forwardRef<HTMLDivElement, ZoomLevelControlProps>(
  ({ className, ...props }, ref) => {
    const { backgroundMap } = useMap();
    const zoomLevel = useZoomLevel();
    const isMaxZoom = useMemo(() => {
      return zoomLevel === backgroundMap?.getMaxZoom().toFixed(2);
    }, [zoomLevel, backgroundMap]);
    const isMinZoom = useMemo(() => {
      return zoomLevel === backgroundMap?.getMinZoom().toFixed(2);
    }, [zoomLevel, backgroundMap]);
    const handleZoomIn = useCallback(() => {
      if (isMaxZoom) return;
      backgroundMap?.zoomIn();
    }, [backgroundMap, isMaxZoom]);
    const handleZoomOut = useCallback(() => {
      if (isMinZoom) return;
      backgroundMap?.zoomOut();
    }, [backgroundMap, isMinZoom]);
    const handleResetNorthPitch = useCallback(() => {
      backgroundMap?.resetNorthPitch();
    }, [backgroundMap]);
    const subscribe = useCallback(
      (callback: () => void) => {
        backgroundMap?.on('pitch', callback);
        backgroundMap?.on('rotate', callback);
        return () => {
          backgroundMap?.off('pitch', callback);
          backgroundMap?.off('rotate', callback);
        };
      },
      [backgroundMap]
    );
    const getSnapshot = useCallback(() => {
      if (!backgroundMap) return '';
      const pitch = backgroundMap.getPitch();
      const bearing = backgroundMap.getBearing();
      return `scale(${1 / Math.pow(Math.cos(pitch * (Math.PI / 180)), 0.5)}) rotateX(${pitch}deg) rotateZ(${bearing}deg)`;
    }, [backgroundMap]);
    const rotateCompassArrow = useSyncExternalStore(subscribe, getSnapshot);

    return (
      <div {...props} ref={ref} className={cn('pointer-events-auto flex flex-col', className)}>
        <ZoomLevelControlButton
          className={'rounded-b-none border-b-0'}
          aria-label={'Zoom In'}
          onPress={handleZoomIn}
          isDisabled={isMaxZoom}
        >
          <PlusIcon />
        </ZoomLevelControlButton>
        <ZoomLevelControlButton
          className={'rounded-none border-b-0'}
          aria-label={'Zoom Out'}
          onPress={handleZoomOut}
          isDisabled={isMinZoom}
        >
          <MinusIcon />
        </ZoomLevelControlButton>
        <ZoomLevelControlButton
          className={'rounded-t-none'}
          aria-label={'Reset North Pitch'}
          onPress={handleResetNorthPitch}
          isDisabled={isMinZoom}
        >
          <CompassIcon
            style={{
              transform: rotateCompassArrow,
            }}
          />
        </ZoomLevelControlButton>
      </div>
    );
  }
);
