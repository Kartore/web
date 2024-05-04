import { ComponentPropsWithoutRef, FC } from 'react';
import { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
import { replaceLayerData } from '~/components/editor/PropertiesPanel/utils/LayerUtil/LayerUtil.ts';

type PropertiesPanelProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  layer: LayerSpecification;
  onChange?: (
    layer: Parameters<typeof replaceLayerData>[1],
    group: Parameters<typeof replaceLayerData>[2],
    key: Parameters<typeof replaceLayerData>[3],
    value: Parameters<typeof replaceLayerData>[4]
  ) => void;
};

export const PropertiesPanel: FC<PropertiesPanelProps> = ({
  className,
  layer,
  onChange,
  ...props
}) => {
  return <div {...props}>Properties</div>;
};
