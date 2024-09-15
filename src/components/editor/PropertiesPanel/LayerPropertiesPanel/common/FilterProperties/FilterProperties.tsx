import type { ComponentProps, FC } from 'react';

import type {
  BackgroundLayerSpecification,
  LayerSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { MonacoEditor } from '~/components/common/MonacoEditor';
import { getStyleJSONSchemaDefinition } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties/schema/StyleJSONSchemaBase.ts';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type FilterPropertiesProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  layer: Exclude<LayerSpecification, BackgroundLayerSpecification>;
  onChange?: onChangeType;
};

export const FilterProperties: FC<FilterPropertiesProps> = ({
  layer,
  onChange,
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={cn('flex flex-col gap-2 px-4', className)}>
      <h3 className={'font-montserrat text-sm font-semibold'}>Filter</h3>
      <MonacoEditor
        className={cn('min-h-16', className)}
        value={JSON.stringify({ filter: layer.filter ? layer.filter : [] }, undefined, 2)}
        onChange={(value) => {
          if (onChange && value) {
            const filterValue = JSON.parse(value).filter;
            onChange(
              layer,
              undefined,
              'filter',
              filterValue.length === 0 ? undefined : filterValue
            );
          }
        }}
        onMount={(_, monaco) => {
          monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
              {
                fileMatch: ['*'],
                uri: 'kartore://FilterSpecification.json',
                schema: {
                  type: 'object',
                  properties: {
                    filter: getStyleJSONSchemaDefinition('FilterSpecification'),
                  },
                },
              },
            ],
          });
        }}
      />
      {children}
    </div>
  );
};

FilterProperties.displayName = 'FilterProperties';
