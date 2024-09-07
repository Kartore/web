import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  forwardRef,
} from '@chakra-ui/react';
import { FillLayerSpecification, SourceSpecification } from '@maplibre/maplibre-gl-style-spec';
import { onChangeType } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { GeneralProperties } from '~/components/editor/PropertiesPanel/common/GeneralProperties';

export type FillLayerPropertiesPanelProps = Omit<BoxProps, 'onChange' | 'children'> & {
  layer: FillLayerSpecification;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const FillLayerPropertiesPanel = forwardRef<FillLayerPropertiesPanelProps, 'div'>(
  ({ layer, sources, onChange, ...props }, ref) => {
    return (
      <Accordion ref={ref} allowToggle allowMultiple defaultIndex={[0]} {...props}>
        <AccordionItem>
          <AccordionButton>General</AccordionButton>
          <AccordionPanel>
            <GeneralProperties layer={layer} sources={sources} onChange={onChange} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }
);
