import { Box, BoxProps, forwardRef } from '@chakra-ui/react';
import { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
import { onChangeType } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';

export type CircleLayerPropertiesPanelProps = Omit<BoxProps, 'onChange' | 'children'> & {
  layer: LayerSpecification;
  onChange?: onChangeType;
};

export const CircleLayerPropertiesPanel = forwardRef<CircleLayerPropertiesPanelProps, 'div'>(
  ({ ...props }, ref) => {
    return <Box ref={ref} {...props}></Box>;
  }
);
