import { forwardRef, ReactNode } from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import {
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderRoot,
  SliderRootProps,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/react';

const sliderVariants = tv({
  slots: {
    root: 'flex w-full flex-col gap-1',
    label: 'text-sm',
    control: 'relative flex h-4 items-center',
    track: 'flex h-2 flex-1 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-600',
    range: 'h-2 bg-teal-500 ',
    thumb: 'h-4 w-4 rounded-full border border-gray-300 bg-gray-50',
    marker:
      'before:relative before:-top-2 before:left-1/2 before:block before:h-1 before:w-1 before:-translate-x-1/2 before:translate-y-1/2 before:rounded-full before:bg-white before:content-[""]',
    markerGroup: '-mt-2',
  },
  variants: {},
});

export type SliderVaritantProps = VariantProps<typeof sliderVariants>;

export type SliderProps = {
  marks?: {
    value: number;
    label?: ReactNode;
  }[];
  children?: ReactNode;
} & SliderRootProps &
  SliderVaritantProps;

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ className, marks, children, ...props }, ref) => {
    const { root, control, label, marker, markerGroup, range, thumb, track } = sliderVariants();

    return (
      <SliderRoot ref={ref} className={root({ className })} {...props}>
        {(api) => (
          <>
            {children && <SliderLabel className={label()}>{children}</SliderLabel>}
            <SliderControl className={control()}>
              <SliderTrack className={track()}>
                <SliderRange className={range()} />
              </SliderTrack>
              {api.value.map((_, index) => {
                return <SliderThumb index={index} key={index} className={thumb()} />;
              })}
            </SliderControl>
            <SliderMarkerGroup className={markerGroup()}>
              {marks?.map((mark) => {
                return (
                  <SliderMarker value={mark.value} key={mark.value} className={marker()}>
                    {mark.label}
                  </SliderMarker>
                );
              })}
            </SliderMarkerGroup>
          </>
        )}
      </SliderRoot>
    );
  }
);
