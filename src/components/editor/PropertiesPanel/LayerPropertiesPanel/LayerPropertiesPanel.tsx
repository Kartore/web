import type { ComponentProps, FC } from 'react';

import type {
	LayerSpecification,
	SourceSpecification,
	SpriteSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { BackgroundLayerPropertiesPanel } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/BackgroundLayerPropertiesPanel';
import { CircleLayerPropertiesPanel } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/CircleLayerPropertiesPanel';
import { FillExtrusionLayerPropertiesPanel } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/FillExtrusionLayerPropertiesPanel';
import { FillLayerPropertiesPanel } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/FillLayerPropertiesPanel';
import { HeatmapLayerPropertiesPanel } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/HeatmapLayerPropertiesPanel';
import { HillshadeLayerPropertiesPanel } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/HillshadeLayerPropertiesPanel';
import { LineLayerPropertiesPanel } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/LineLayerPropertiesPanel';
import { RasterLayerPropertiesPanel } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/RasterLayerPropertiesPanel';
import { SymbolLayerPropertiesPanel } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/SymbolLayerPropertiesPanel';
import {
	isBackgroundLayer,
	isCircleLayer,
	isFillExtrusionLayer,
	isFillLayer,
	isHeatmapLayer,
	isHillshadeLayer,
	isLineLayer,
	isRasterLayer,
	isSymbolLayer,
} from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';

type PropertiesPanelProps = Omit<ComponentProps<'div'>, 'onChange'> & {
	layer: LayerSpecification;
	sprite?: SpriteSpecification;
	sources: {
		[key: string]: SourceSpecification;
	};
	onChange?: onChangeType;
};

export const LayerPropertiesPanel: FC<PropertiesPanelProps> = ({
	layer,
	sprite,
	sources,
	onChange,
	...props
}) => {
	if (isBackgroundLayer(layer)) {
		return (
			<BackgroundLayerPropertiesPanel
				layer={layer}
				sprite={sprite}
				onChange={onChange}
				{...props}
			/>
		);
	}
	if (isCircleLayer(layer)) {
		return (
			<CircleLayerPropertiesPanel
				layer={layer}
				sources={sources}
				onChange={onChange}
				{...props}
			/>
		);
	}
	if (isFillExtrusionLayer(layer)) {
		return (
			<FillExtrusionLayerPropertiesPanel
				layer={layer}
				sources={sources}
				onChange={onChange}
				{...props}
			/>
		);
	}
	if (isFillLayer(layer)) {
		return (
			<FillLayerPropertiesPanel
				layer={layer}
				sources={sources}
				sprite={sprite}
				onChange={onChange}
				{...props}
			/>
		);
	}
	if (isHeatmapLayer(layer)) {
		return (
			<HeatmapLayerPropertiesPanel
				layer={layer}
				sources={sources}
				onChange={onChange}
				{...props}
			/>
		);
	}
	if (isHillshadeLayer(layer)) {
		return (
			<HillshadeLayerPropertiesPanel
				layer={layer}
				sources={sources}
				onChange={onChange}
				{...props}
			/>
		);
	}
	if (isLineLayer(layer)) {
		return (
			<LineLayerPropertiesPanel
				layer={layer}
				sources={sources}
				onChange={onChange}
				{...props}
			/>
		);
	}
	if (isRasterLayer(layer)) {
		return (
			<RasterLayerPropertiesPanel
				layer={layer}
				sources={sources}
				onChange={onChange}
				{...props}
			/>
		);
	}
	if (isSymbolLayer(layer)) {
		return (
			<SymbolLayerPropertiesPanel
				layer={layer}
				sources={sources}
				onChange={onChange}
				{...props}
			/>
		);
	}
	throw new Error('Unknown layer type');
};

LayerPropertiesPanel.displayName = 'LayerPropertiesPanel';
