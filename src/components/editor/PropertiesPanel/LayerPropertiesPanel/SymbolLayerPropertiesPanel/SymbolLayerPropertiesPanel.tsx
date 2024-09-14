import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import type {
  SourceSpecification,
  SymbolLayerSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { GeneralProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/GeneralProperties';
import { RawDataProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type SymbolLayerPropertiesPanelProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  layer: SymbolLayerSpecification;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const SymbolLayerPropertiesPanel = forwardRef<
  HTMLDivElement,
  SymbolLayerPropertiesPanelProps
>(({ children, layer, sources, onChange, className, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={cn('flex flex-col gap-2', className)}>
      <GeneralProperties layer={layer} sources={sources} onChange={onChange} />
      <RawDataProperties layer={layer} />
      {children}
    </div>
  );
});
