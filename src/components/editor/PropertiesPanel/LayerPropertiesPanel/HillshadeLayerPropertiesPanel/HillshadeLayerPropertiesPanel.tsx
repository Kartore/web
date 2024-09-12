import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';

import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';

export type HillshadeLayerPropertiesPanelProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange'
> & {
  layer: LayerSpecification;
  onChange?: onChangeType;
};

export const HillshadeLayerPropertiesPanel = forwardRef<
  HTMLDivElement,
  HillshadeLayerPropertiesPanelProps
>(({ layer, onChange, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});
