import type { ComponentProps, FC } from 'react';

import type { LineLayerSpecification, SourceSpecification } from '@maplibre/maplibre-gl-style-spec';

import { FilterProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/FilterProperties';
import { GeneralProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/GeneralProperties';
import { RawDataProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties';
import { getStyleJSONSchemaDefinition } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties/schema/StyleJSONSchemaBase.ts';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type LineLayerPropertiesPanelProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  layer: LineLayerSpecification;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const LineLayerPropertiesPanel: FC<LineLayerPropertiesPanelProps> = ({
  children,
  layer,
  sources,
  onChange,
  className,
  ...props
}) => {
  return (
    <div {...props} className={cn('flex flex-col gap-6', className)}>
      <GeneralProperties layer={layer} sources={sources} onChange={onChange} />
      <FilterProperties layer={layer} onChange={onChange} />
      <RawDataProperties
        layer={layer}
        onChange={onChange}
        schema={getStyleJSONSchemaDefinition('LineLayerSpecification')}
      />
      {children}
    </div>
  );
};

LineLayerPropertiesPanel.displayName = 'LineLayerPropertiesPanel';
