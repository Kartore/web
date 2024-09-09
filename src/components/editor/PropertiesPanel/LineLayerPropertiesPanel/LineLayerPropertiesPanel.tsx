import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';

import type { onChangeType } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';

export type LineLayerPropertiesPanelProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  layer: LayerSpecification;
  onChange?: onChangeType;
};

export const LineLayerPropertiesPanel = forwardRef<HTMLDivElement, LineLayerPropertiesPanelProps>(
  ({ children, layer, onChange, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
