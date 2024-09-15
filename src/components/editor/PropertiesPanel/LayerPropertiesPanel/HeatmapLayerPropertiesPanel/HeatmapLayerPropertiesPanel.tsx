import type { ComponentProps, FC } from 'react';

import type {
  HeatmapLayerSpecification,
  SourceSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { GeneralProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/GeneralProperties';
import { RawDataProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type HeatmapLayerPropertiesPanelProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  layer: HeatmapLayerSpecification;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const HeatmapLayerPropertiesPanel: FC<HeatmapLayerPropertiesPanelProps> = ({
  children,
  layer,
  sources,
  onChange,
  className,
  ...props
}) => {
  return (
    <div {...props} className={cn('flex flex-col gap-6', className)}>
      <GeneralProperties layer={layer} sources={sources} onChange={onChange} />
      <RawDataProperties layer={layer} onChange={onChange} />
      {children}
    </div>
  );
};

HeatmapLayerPropertiesPanel.displayName = 'HeatmapLayerPropertiesPanel';
