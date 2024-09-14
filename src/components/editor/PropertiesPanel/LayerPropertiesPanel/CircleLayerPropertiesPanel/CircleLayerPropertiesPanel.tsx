import type { ComponentProps, FC } from 'react';

import type {
  CircleLayerSpecification,
  SourceSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { GeneralProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/GeneralProperties';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type CircleLayerPropertiesPanelProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  layer: CircleLayerSpecification;
  sources: { [key: string]: SourceSpecification };
  onChange?: onChangeType;
};

export const CircleLayerPropertiesPanel: FC<CircleLayerPropertiesPanelProps> = ({
  layer,
  sources,
  onChange,
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={cn('flex flex-col gap-6', className)}>
      <GeneralProperties layer={layer} sources={sources} onChange={onChange} />
      {children}
    </div>
  );
};

CircleLayerPropertiesPanel.displayName = 'CircleLayerPropertiesPanel';
