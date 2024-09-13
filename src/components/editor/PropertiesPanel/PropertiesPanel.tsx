import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import type { LayerSpecification, SourceSpecification } from '@maplibre/maplibre-gl-style-spec';

import { LayerPropertiesPanel } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil';

export type PropertiesPanelProps = {
  layer: LayerSpecification;
  sources: {
    [key: string]: SourceSpecification;
  };
  onChange?: onChangeType;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>;

export const PropertiesPanel = forwardRef<HTMLDivElement, PropertiesPanelProps>(
  ({ className, sources, layer, onChange, children, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          'pointer-events-auto overflow-y-auto rounded-lg border border-gray-300 bg-white py-4',
          className
        )}
      >
        <LayerPropertiesPanel layer={layer} sources={sources} onChange={onChange} />
        {children}
      </div>
    );
  }
);
