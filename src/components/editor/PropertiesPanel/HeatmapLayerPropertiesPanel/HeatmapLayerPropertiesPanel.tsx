import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';

import type { onChangeType } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';

export type HeatmapLayerPropertiesPanelProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  layer: LayerSpecification;
  onChange?: onChangeType;
};

export const HeatmapLayerPropertiesPanel = forwardRef<
  HTMLDivElement,
  HeatmapLayerPropertiesPanelProps
>(({ children, layer, onChange, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});
