import type { ComponentProps, FC } from 'react';

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
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const PropertiesPanel: FC<PropertiesPanelProps> = ({
  className,
  sources,
  layer,
  onChange,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        'pointer-events-auto overflow-y-auto rounded-lg border border-gray-300 bg-white py-4',
        className
      )}
    >
      <LayerPropertiesPanel layer={layer} sources={sources} onChange={onChange} />
      {children}
    </div>
  );
};

PropertiesPanel.displayName = 'PropertiesPanel';
