import type { ComponentProps, FC } from 'react';

import type {
  BackgroundLayerSpecification,
  SpriteSpecification,
} from '@maplibre/maplibre-gl-style-spec';
import { parseColor } from '@react-stately/color';
import { Item } from 'react-stately';

import { ColorField } from '~/components/common/ColorField';
import { ComboBox } from '~/components/common/ComboBox';
import { NumberField } from '~/components/common/NumberField';
import { RangeSlider } from '~/components/common/RangeSlider';
import { TextField } from '~/components/common/TextField';
import { RawDataProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties';
import { getStyleJSONSchemaDefinition } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties/schema/StyleJSONSchemaBase.ts';
import { useSpriteIds } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/hooks/useSpriteIds/useSpriteIds.ts';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type BackgroundLayerPropertiesPanelProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  layer: BackgroundLayerSpecification;
  sprite?: SpriteSpecification;
  onChange?: onChangeType;
};

export const BackgroundLayerPropertiesPanel: FC<BackgroundLayerPropertiesPanelProps> = ({
  children,
  layer,
  sprite,
  onChange,
  className,
  ...props
}) => {
  const spriteIds = useSpriteIds(sprite);
  return (
    <div {...props} className={cn('flex flex-col gap-6', className)}>
      <div className={'flex flex-col gap-2 px-4'}>
        <h3 className={'font-montserrat text-sm font-semibold'}>General</h3>
        <RangeSlider
          label={'Zoom Range'}
          minValue={0}
          maxValue={24}
          step={1}
          value={[layer.minzoom ?? 0, layer.maxzoom ?? 24]}
          onChange={([minzoom, maxzoom]) => {
            if (minzoom !== layer.minzoom) {
              onChange?.(layer, undefined, 'minzoom', minzoom === 0 ? undefined : minzoom);
            }
            if (maxzoom !== layer.maxzoom) {
              onChange?.(layer, undefined, 'maxzoom', maxzoom === 24 ? undefined : maxzoom);
            }
          }}
        />
      </div>
      <div className={'flex flex-col gap-2 px-4'}>
        <h3 className={'font-montserrat text-sm font-semibold'}>Paint</h3>
        {typeof layer.paint?.['background-opacity'] === 'number' ||
        layer.paint?.['background-opacity'] === undefined ? (
          <NumberField
            label={'Opacity'}
            onChange={(value) => {
              console.log(value);
              onChange?.(layer, 'paint', 'background-opacity', value === 1 ? undefined : value);
            }}
            value={
              layer.paint?.['background-opacity'] !== undefined
                ? layer.paint['background-opacity']
                : 1
            }
            minValue={0}
            maxValue={1}
            formatOptions={{
              style: 'percent',
              maximumFractionDigits: 2,
            }}
          />
        ) : (
          <TextField
            label={'Opacity'}
            value={
              layer.paint?.['background-opacity']
                ? String(layer.paint?.['background-opacity'])
                : undefined
            }
          />
        )}
        {typeof layer.paint?.['background-color'] === 'string' ||
        layer.paint?.['background-color'] === undefined ? (
          <ColorField
            label={'Color'}
            value={parseColor(layer.paint?.['background-color'] ?? 'rgba(255, 255, 255, 1)')}
            onChange={(color) => {
              onChange?.(layer, 'paint', 'background-color', color?.toString('rgba'));
            }}
          />
        ) : (
          <TextField
            label={'Color'}
            value={
              layer.paint?.['background-color'] ? String(layer.paint?.['background-color']) : '1'
            }
          />
        )}
        {typeof layer.paint?.['background-pattern'] === 'string' ||
        layer.paint?.['background-pattern'] === undefined ? (
          <ComboBox
            label={'Pattern'}
            allowsCustomValue
            inputValue={layer.paint?.['background-pattern']}
            selectedKey={layer.paint?.['background-pattern']}
            onInputChange={(value) => {
              if (value === layer.paint?.['background-pattern']) return;
              if (!value) {
                onChange?.(layer, 'paint', 'background-pattern', undefined);
              } else {
                onChange?.(layer, 'paint', 'background-pattern', value);
              }
            }}
            onSelectionChange={(value) => {
              if (!value || value === layer.paint?.['background-pattern']) return;
              onChange?.(layer, 'paint', 'background-pattern', value as string);
            }}
          >
            {spriteIds?.map((spriteId) => {
              return (
                <Item key={spriteId} textValue={spriteId}>
                  {spriteId}
                </Item>
              );
            })}
          </ComboBox>
        ) : (
          <TextField
            label={'Pattern'}
            value={
              layer.paint?.['background-pattern']
                ? String(layer.paint?.['background-pattern'])
                : '1'
            }
          />
        )}
      </div>
      <RawDataProperties
        layer={layer}
        onChange={onChange}
        schema={getStyleJSONSchemaDefinition('BackgroundLayerSpecification')}
      />
      {children}
    </div>
  );
};

BackgroundLayerPropertiesPanel.displayName = 'BackgroundLayerPropertiesPanel';
