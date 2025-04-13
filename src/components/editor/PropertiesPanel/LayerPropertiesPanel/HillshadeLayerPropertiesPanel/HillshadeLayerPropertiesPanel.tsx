import type { ComponentProps, FC } from 'react';

import type {
	HillshadeLayerSpecification,
	SourceSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { GeneralProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/GeneralProperties';
import { RawDataProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties';
import { getStyleJSONSchemaDefinition } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties/schema/StyleJSONSchemaBase.ts';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type HillshadeLayerPropertiesPanelProps = Omit<
	ComponentProps<'div'>,
	'onChange'
> & {
	layer: HillshadeLayerSpecification;
	sources: { [key: string]: SourceSpecification };
	onChange?: onChangeType;
};

export const HillshadeLayerPropertiesPanel: FC<
	HillshadeLayerPropertiesPanelProps
> = ({ layer, sources, onChange, children, className, ...props }) => {
	return (
		<div {...props} className={cn('flex flex-col gap-6', className)}>
			<GeneralProperties layer={layer} sources={sources} onChange={onChange} />
			<RawDataProperties
				layer={layer}
				onChange={onChange}
				schema={getStyleJSONSchemaDefinition('HillshadeLayerSpecification')}
			/>
			{children}
		</div>
	);
};

HillshadeLayerPropertiesPanel.displayName = 'HillshadeLayerPropertiesPanel';
