import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import type { FillLayerSpecification, SourceSpecification } from '@maplibre/maplibre-gl-style-spec';

import { GeneralProperties } from '~/components/editor/PropertiesPanel/common/GeneralProperties';
import type { onChangeType } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';

export type FillLayerPropertiesPanelProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  layer: FillLayerSpecification;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const FillLayerPropertiesPanel = forwardRef<HTMLDivElement, FillLayerPropertiesPanelProps>(
  ({ layer, sources, onChange, children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        <GeneralProperties layer={layer} sources={sources} onChange={onChange} />
        {children}
      </div>
    );
  }
);
