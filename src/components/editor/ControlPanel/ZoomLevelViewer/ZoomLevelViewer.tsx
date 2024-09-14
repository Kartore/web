import type { ComponentProps, FC } from 'react';

import { useZoomLevel } from '~/hooks/useZoomLevel.ts';
import { cn } from '~/utils/tailwindUtil';

export type ZoomLevelControlProps = {} & Omit<ComponentProps<'div'>, 'children'>;

export const ZoomLevelViewer: FC<ZoomLevelControlProps> = ({ className, ...props }) => {
  const zoomLevel = useZoomLevel();
  return (
    <div
      {...props}
      className={cn(
        'rounded-lg border border-gray-300 bg-white py-1 px-2 font-semibold tabular-nums',
        className
      )}
    >
      {zoomLevel}
    </div>
  );
};

ZoomLevelViewer.displayName = 'ZoomLevelViewer';
