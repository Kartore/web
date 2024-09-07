import { Box, BoxProps, forwardRef } from '@chakra-ui/react';
import { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
import { onChangeType } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';

export type FillExtrusionLayerPropertiesPanelProps = Omit<BoxProps, 'onChange' | 'children'> & {
  layer: LayerSpecification;
  onChange?: onChangeType;
};

export const FillExtrusionLayerPropertiesPanel = forwardRef<
  FillExtrusionLayerPropertiesPanelProps,
  'div'
>(({ ...props }, ref) => {
  return <Box ref={ref} {...props}></Box>;
});
