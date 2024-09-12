import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';

import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';

export type FillExtrusionLayerPropertiesPanelProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange'
> & {
  layer: LayerSpecification;
  onChange?: onChangeType;
};

export const FillExtrusionLayerPropertiesPanel = forwardRef<
  HTMLDivElement,
  FillExtrusionLayerPropertiesPanelProps
>(({ children, layer, onChange, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});
