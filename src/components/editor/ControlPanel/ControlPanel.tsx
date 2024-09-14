import type { ComponentProps, FC } from 'react';

import { ZoomLevelControl } from '~/components/editor/ControlPanel/ZoomLevelControl';
import { ZoomLevelViewer } from '~/components/editor/ControlPanel/ZoomLevelViewer';
import { cn } from '~/utils/tailwindUtil';

export type ControlPanelProps = {} & ComponentProps<'div'>;

export const ControlPanel: FC<ControlPanelProps> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn('pointer-events-none relative', className)}>
      <ZoomLevelViewer className={'absolute top-0 right-0'} />
      <ZoomLevelControl className={'absolute top-10 right-0'} />
      {children}
    </div>
  );
};

ControlPanel.displayName = 'ControlPanel';
