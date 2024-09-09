import type { FC } from 'react';
import { useRef } from 'react';

import type { AriaSliderThumbOptions } from 'react-aria';
import { mergeProps, useFocusRing, useSliderThumb, VisuallyHidden } from 'react-aria';
import type { SliderState } from 'react-stately';

import { cn } from '~/utils/tailwindUtil';

export type RangeSliderThumbProps = {
  className?: string;
  state: SliderState;
} & Omit<AriaSliderThumbOptions, 'inputRef'>;

export const RangeSliderThumb: FC<RangeSliderThumbProps> = ({
  state,
  trackRef,
  index,
  name,
  className,
}) => {
  const inputRef = useRef(null);
  const { thumbProps, inputProps, isDragging } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
      name,
    },
    state
  );

  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <div
      {...thumbProps}
      className={cn(
        `thumb ${isFocusVisible ? 'focus' : ''} ${isDragging ? 'dragging' : ''}`,
        className
      )}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </div>
  );
};
