import type { ComponentProps, FC } from 'react';

import type { FillLayerSpecification, SourceSpecification } from '@maplibre/maplibre-gl-style-spec';

import { GeneralProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/GeneralProperties';
import { RawDataProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type FillLayerPropertiesPanelProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  layer: FillLayerSpecification;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const FillLayerPropertiesPanel: FC<FillLayerPropertiesPanelProps> = ({
  layer,
  sources,
  onChange,
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={cn('flex flex-col gap-2', className)}>
      <GeneralProperties layer={layer} sources={sources} onChange={onChange} />
      <RawDataProperties layer={layer} />
      {children}
    </div>
  );
};

FillLayerPropertiesPanel.displayName = 'FillLayerPropertiesPanel';
