import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import type {
  CircleLayerSpecification,
  SourceSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { GeneralProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/GeneralProperties';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type CircleLayerPropertiesPanelProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  layer: CircleLayerSpecification;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const CircleLayerPropertiesPanel = forwardRef<
  HTMLDivElement,
  CircleLayerPropertiesPanelProps
>(({ layer, sources, onChange, className, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={cn('flex flex-col gap-2', className)}>
      <GeneralProperties layer={layer} sources={sources} onChange={onChange} />
      {children}
    </div>
  );
});
