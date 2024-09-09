import { type ComponentPropsWithoutRef, forwardRef, useMemo } from 'react';

import type {
  BackgroundLayerSpecification,
  LayerSpecification,
  SourceSpecification,
} from '@maplibre/maplibre-gl-style-spec';
import { Item } from 'react-stately';

import { RangeSlider } from '~/components/common/RangeSlider';
import { Select } from '~/components/common/Select';
import { useSourceLayers } from '~/components/editor/PropertiesPanel/hooks/useSourceLayers/useSourceLayers.ts';
import type { onChangeType } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { isVectorSource } from '~/components/editor/PropertiesPanel/utils/SourceUtil/SourceUtil.ts';
import { cn } from '~/utils/tailwindUtil';

export type GeneralPropertiesProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  layer: Exclude<LayerSpecification, BackgroundLayerSpecification>;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const GeneralProperties = forwardRef<HTMLDivElement, GeneralPropertiesProps>(
  ({ layer, sources, onChange, children, className, ...props }, ref) => {
    const sourceData = useMemo(() => sources[layer.source], [layer.source, sources]);
    const sourceLayers = useSourceLayers(isVectorSource(sourceData) ? sourceData : undefined);

    return (
      <div ref={ref} {...props} className={cn('flex flex-col gap-2 px-3', className)}>
        <Select
          label={'Source'}
          selectedKey={layer.source}
          onSelectionChange={(value) => {
            if (onChange) onChange(layer, undefined, 'source', value as string);
          }}
        >
          {Object.keys(sources).map((sourceId) => {
            return <Item key={sourceId}>{sourceId}</Item>;
          })}
        </Select>
        {isVectorSource(sourceData) ? (
          <Select
            label={'Source Layer'}
            selectedKey={layer['source-layer']}
            onSelectionChange={(value) => {
              if (onChange) onChange(layer, undefined, 'source-layer', value as string);
            }}
          >
            {sourceLayers?.map(({ id }) => {
              return <Item key={id}>{id}</Item>;
            })}
          </Select>
        ) : null}
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
        {children}
      </div>
    );
  }
);
