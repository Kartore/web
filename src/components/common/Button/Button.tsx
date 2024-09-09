import type { ComponentPropsWithoutRef, FC, MutableRefObject } from 'react';
import { useRef } from 'react';

import type { AriaButtonOptions } from 'react-aria';
import { useButton } from 'react-aria';

export type ButtonProps = AriaButtonOptions<'button'> &
  ComponentPropsWithoutRef<'button'> & {
    buttonRef?: MutableRefObject<HTMLButtonElement | null>;
  };

export const Button: FC<ButtonProps> = (props) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonRef = ref, ...otherProps } = props;
  const { buttonProps } = useButton(otherProps, buttonRef);
  return (
    <button {...buttonProps} ref={buttonRef} style={props.style}>
      {props.children}
    </button>
  );
};
