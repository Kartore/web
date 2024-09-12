import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import type {
  BackgroundLayerSpecification,
  SourceSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { RangeSlider } from '~/components/common/RangeSlider';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type BackgroundLayerPropertiesPanelProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange'
> & {
  layer: BackgroundLayerSpecification;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const BackgroundLayerPropertiesPanel = forwardRef<
  HTMLDivElement,
  BackgroundLayerPropertiesPanelProps
>(({ children, layer, sources, onChange, className, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={cn('px-4', className)}>
      <RangeSlider
        label={'Zoom Level Range'}
        minValue={0}
        maxValue={24}
        step={1}
        value={[layer.minzoom ?? 0, layer.maxzoom ?? 24]}
        onChange={([minzoom, maxzoom]) => {
          if (minzoom !== layer.minzoom) {
            onChange?.(layer, undefined, 'minzoom', minzoom === 0 ? undefined : minzoom);
          }
          if (maxzoom !== layer.maxzoom) {
            onChange?.(layer, undefined, 'maxzoom', maxzoom === 24 ? undefined : maxzoom);
          }
        }}
      />
      {children}
    </div>
  );
});
