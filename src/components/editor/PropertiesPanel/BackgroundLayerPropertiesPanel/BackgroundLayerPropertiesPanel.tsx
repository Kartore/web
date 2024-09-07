import {
  Box,
  BoxProps,
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
  SourceSpecification,
} from '@maplibre/maplibre-gl-style-spec';
import { onChangeType } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';

export type BackgroundLayerPropertiesPanelProps = Omit<BoxProps, 'onChange' | 'children'> & {
  layer: BackgroundLayerSpecification;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const BackgroundLayerPropertiesPanel = forwardRef<
  BackgroundLayerPropertiesPanelProps,
  'div'
>(({ children, layer, sources, onChange, ...props }, ref) => {
  return (
    <Box ref={ref} {...props}>
      <FormControl>
        <FormLabel>Zoom Level Range</FormLabel>
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
      </FormControl>
      {children}
    </Box>
  );
});
