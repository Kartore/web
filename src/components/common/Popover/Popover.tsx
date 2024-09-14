import type { FC, ReactNode, RefObject } from 'react';
import { useRef } from 'react';

import type { AriaPopoverProps } from 'react-aria';
import { DismissButton, Overlay, usePopover } from 'react-aria';
import type { OverlayTriggerState } from 'react-stately';

import { cn } from '~/utils/tailwindUtil.ts';

export type PopoverProps = Omit<AriaPopoverProps, 'popoverRef'> & {
  children: ReactNode;
  popoverRef?: RefObject<HTMLDivElement>;
  state: OverlayTriggerState;
};

export const Popover: FC<PopoverProps> = ({ state, children, ...props }) => {
  const ref = useRef(null);
  const { popoverRef = ref, ...otherProps } = props;
  const { popoverProps, underlayProps } = usePopover(
    {
      ...otherProps,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className={cn('fixed inset-0', underlayProps.className)} />
      <div {...popoverProps} ref={popoverRef}>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};

Popover.displayName = 'Popover';
