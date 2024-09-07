import {
  Box,
  Flex,
  FlexProps,
  FormControl,
  FormLabel,
  forwardRef,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
} from '@chakra-ui/react';
import {
  BackgroundLayerSpecification,
  LayerSpecification,
  SourceSpecification,
} from '@maplibre/maplibre-gl-style-spec';
import { onChangeType } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { useSourceLayers } from '~/components/editor/PropertiesPanel/hooks/useSourceLayers/useSourceLayers.ts';
import { useMemo } from 'react';
import { isVectorSource } from '~/components/editor/PropertiesPanel/utils/SourceUtil/SourceUtil.ts';

export type GeneralPropertiesProps = Omit<FlexProps, 'onChange' | 'children'> & {
  layer: Exclude<LayerSpecification, BackgroundLayerSpecification>;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const GeneralProperties = forwardRef<GeneralPropertiesProps, 'div'>(
  ({ layer, sources, onChange, ...props }, ref) => {
    const sourceData = useMemo(() => sources[layer.source], [layer.source, sources]);
    const sourceLayers = useSourceLayers(isVectorSource(sourceData) ? sourceData : undefined);
    return (
      <Flex flexDirection={'column'} gap={2} ref={ref} {...props}>
        <FormControl>
          <FormLabel>Source</FormLabel>
          <Select
            value={layer.source}
            onChange={(value) => {
              if (onChange) onChange(layer, undefined, 'source', value.target.value);
            }}
          >
            {Object.keys(sources).map((sourceId) => {
              return (
                <option key={sourceId} value={sourceId}>
                  {sourceId}
                </option>
              );
            })}
          </Select>
        </FormControl>
        {isVectorSource(sourceData) ? (
          <FormControl>
            <FormLabel>Source Layer</FormLabel>
            <Select
              value={layer['source-layer']}
              onChange={(value) => {
                onChange?.(layer, undefined, 'source-layer', value.target.value);
              }}
            >
              {sourceLayers?.map(({ id }) => {
                return (
                  <option key={id} value={id}>
                    {id}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        ) : null}
        <FormControl>
          <FormLabel>Zoom Level Range</FormLabel>
          <Box px={2}>
            <RangeSlider
              min={0}
              max={24}
              aria-label={['Min Zoom', 'Max Zoom']}
              value={[layer.minzoom ?? 0, layer.maxzoom ?? 24]}
              onChange={([minzoom, maxzoom]) => {
                if (minzoom !== layer.minzoom) {
                  onChange?.(layer, undefined, 'minzoom', minzoom === 0 ? undefined : minzoom);
                }
                if (maxzoom !== layer.maxzoom) {
                  onChange?.(layer, undefined, 'maxzoom', maxzoom === 24 ? undefined : maxzoom);
                }
              }}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </Box>
        </FormControl>
      </Flex>
    );
  }
);
