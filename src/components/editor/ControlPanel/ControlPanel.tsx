import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { ZoomLevelControl } from '~/components/editor/ControlPanel/ZoomLevelControl';
import { ZoomLevelViewer } from '~/components/editor/ControlPanel/ZoomLevelViewer';
import { cn } from '~/utils/tailwindUtil';

export type ControlPanelProps = {} & ComponentPropsWithoutRef<'div'>;

export const ControlPanel = forwardRef<HTMLDivElement, ControlPanelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={cn('pointer-events-none relative', className)}>
        <ZoomLevelViewer className={'absolute top-0 right-0'} />
        <ZoomLevelControl className={'absolute top-10 right-0'} />
        {children}
      </div>
    );
  }
);
