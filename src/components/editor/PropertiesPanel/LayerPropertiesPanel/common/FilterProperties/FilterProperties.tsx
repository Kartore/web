import type { ComponentProps, FC } from 'react';

import type {
  BackgroundLayerSpecification,
  LayerSpecification,
} from '@maplibre/maplibre-gl-style-spec';
import { Editor } from '@monaco-editor/react';

import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type FilterPropertiesProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  layer: Exclude<LayerSpecification, BackgroundLayerSpecification>;
  onChange?: onChangeType;
};

export const FilterProperties: FC<FilterPropertiesProps> = ({ className, layer, onChange }) => {
  return (
    <Editor
      className={cn('', className)}
      value={JSON.stringify(layer.filter)}
      onChange={(value) => {
        if (onChange && value) onChange(layer, undefined, 'filter', JSON.parse(value));
      }}
    />
  );
};

FilterProperties.displayName = 'FilterProperties';
