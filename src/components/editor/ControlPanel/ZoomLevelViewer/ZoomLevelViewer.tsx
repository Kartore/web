import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { useZoomLevel } from '~/hooks/useZoomLevel.ts';
import { cn } from '~/utils/tailwindUtil';

export type ZoomLevelControlProps = {} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export const ZoomLevelViewer = forwardRef<HTMLDivElement, ZoomLevelControlProps>(
  ({ className, ...props }, ref) => {
    const zoomLevel = useZoomLevel();
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          'rounded-lg border border-gray-300 bg-white py-1 px-2 font-semibold tabular-nums',
          className
        )}
      >
        {zoomLevel}
      </div>
    );
  }
);
