import { Box, BoxProps, forwardRef } from '@chakra-ui/react';
import { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
import { onChangeType } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';

export type HeatmapLayerPropertiesPanelProps = Omit<BoxProps, 'onChange' | 'children'> & {
  layer: LayerSpecification;
  onChange?: onChangeType;
};

export const HeatmapLayerPropertiesPanel = forwardRef<HeatmapLayerPropertiesPanelProps, 'div'>(
  ({ ...props }, ref) => {
    return <Box ref={ref} {...props}></Box>;
  }
);
