import type { FC, ComponentPropsWithoutRef, MutableRefObject } from 'react';
import { useRef } from 'react';

import { type AriaButtonOptions, useButton } from 'react-aria';

import { cn } from '~/utils/tailwindUtil';

export type ZoomLevelControlButtonProps = {
  buttonRef?: MutableRefObject<HTMLButtonElement | null>;
} & AriaButtonOptions<'button'> &
  ComponentPropsWithoutRef<'button'>;

export const ZoomLevelControlButton: FC<ZoomLevelControlButtonProps> = ({
  className,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonRef = ref, ...otherProps } = props;
  const { buttonProps } = useButton(otherProps, buttonRef);

  return (
    <button
      {...props}
      ref={buttonRef}
      className={cn(
        'size-7 cursor-pointer rounded-lg border border-gray-300 bg-white p-1 transition-colors hover:bg-gray-100 active:bg-gray-300 disabled:cursor-default disabled:bg-white disabled:text-gray-300',
        className
      )}
      {...buttonProps}
    >
      {props.children}
    </button>
  );
};
