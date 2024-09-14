import type { ComponentProps, FC } from 'react';

import type { BackgroundLayerSpecification } from '@maplibre/maplibre-gl-style-spec';

import { NumberField } from '~/components/common/NumberField';
import { RangeSlider } from '~/components/common/RangeSlider';
import { TextField } from '~/components/common/TextField';
import { RawDataProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type BackgroundLayerPropertiesPanelProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  layer: BackgroundLayerSpecification;
  onChange?: onChangeType;
};

export const BackgroundLayerPropertiesPanel: FC<BackgroundLayerPropertiesPanelProps> = ({
  children,
  layer,
  onChange,
  className,
  ...props
}) => {
  return (
    <div {...props} className={cn('flex flex-col gap-2', className)}>
      <div className={'flex flex-col gap-2 px-4'}>
        <h3 className={'font-montserrat text-sm font-semibold'}>General</h3>
        <RangeSlider
          label={'Zoom Level Range'}
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
              onChange?.(layer, 'paint', 'background-opacity', value === 1 ? undefined : value);
            }}
            value={
              layer.paint?.['background-opacity'] !== undefined
                ? layer.paint['background-opacity']
                : 1
            }
          />
        ) : (
          <TextField
            label={'Opacity'}
            value={
              layer.paint?.['background-opacity']
                ? String(layer.paint?.['background-opacity'])
                : '1'
            }
          />
        )}
      </div>
      <RawDataProperties layer={layer} />
      {children}
    </div>
  );
};

BackgroundLayerPropertiesPanel.displayName = 'BackgroundLayerPropertiesPanel';
