import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import type { FillLayerSpecification, SourceSpecification } from '@maplibre/maplibre-gl-style-spec';

import { GeneralProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/GeneralProperties';
import { RawDataProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type FillLayerPropertiesPanelProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  layer: FillLayerSpecification;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const FillLayerPropertiesPanel = forwardRef<HTMLDivElement, FillLayerPropertiesPanelProps>(
  ({ layer, sources, onChange, children, className, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn('flex flex-col gap-2', className)}>
        <GeneralProperties layer={layer} sources={sources} onChange={onChange} />
        <RawDataProperties layer={layer} />
        {children}
      </div>
    );
  }
);
