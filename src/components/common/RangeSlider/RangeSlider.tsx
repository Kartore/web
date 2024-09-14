import { forwardRef, useRef } from 'react';

import type { NumberFormatOptions } from '@internationalized/number';
import type { AriaSliderProps } from 'react-aria';
import { useNumberFormatter, useSlider } from 'react-aria';
import { useSliderState } from 'react-stately';

import { RangeSliderThumb } from '~/components/common/RangeSlider/RangeSliderThumb';
import { cn } from '~/utils/tailwindUtil';

export type RangeSliderProps = {
  formatOptions?: NumberFormatOptions;
  sliderThumbLabel?: [string, string];
  className?: string;
} & AriaSliderProps<[number, number]>;

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  ({ className, ...props }, ref) => {
    const trackRef = useRef(null);

    const numberFormatter = useNumberFormatter(props.formatOptions);
    const state = useSliderState({ ...props, numberFormatter });
    const { groupProps, trackProps, labelProps, outputProps } = useSlider(props, state, trackRef);

    return (
      <div
        {...groupProps}
        className={cn(`h-auto w-full ${state.orientation}`, className)}
        ref={ref}
      >
        {props.label && (
          <div className="flex items-center justify-between">
            <label
              {...labelProps}
              className={cn('text-sm font-semibold text-gray-600', labelProps.className)}
            >
              {props.label}
            </label>
            <output
              {...outputProps}
              className={cn('text-sm font-semibold text-gray-800', outputProps.className)}
            >
              {`${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`}
            </output>
          </div>
        )}

        <div
          {...trackProps}
          ref={trackRef}
          className={cn(
            'relative mt-2 h-0.5 w-full rounded-full bg-gray-300',
            state.isDisabled && 'opacity-60'
          )}
        >
          <div
            className={'absolute h-0.5 bg-gray-500'}
            style={{
              left: `${state.getThumbPercent(0) * 100}%`,
              right: `${100 - state.getThumbPercent(1) * 100}%`,
            }}
          />
          <RangeSliderThumb
            className={'mt-[1px] size-3 rounded-full border border-gray-500 bg-white'}
            index={0}
            state={state}
            trackRef={trackRef}
            aria-label={props.sliderThumbLabel?.[0]}
          />
          <RangeSliderThumb
            className={'mt-[1px] size-3 rounded-full border border-gray-500 bg-white'}
            index={1}
            state={state}
            trackRef={trackRef}
            aria-label={props.sliderThumbLabel?.[1]}
          />
        </div>
      </div>
    );
  }
);
