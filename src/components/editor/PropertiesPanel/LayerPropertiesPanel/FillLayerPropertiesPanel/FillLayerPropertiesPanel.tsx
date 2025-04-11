import type { ComponentProps, FC } from 'react';

import type {
	FillLayerSpecification,
	SourceSpecification,
	SpriteSpecification,
} from '@maplibre/maplibre-gl-style-spec';
import { parseColor } from '@react-stately/color';
import { Item } from 'react-stately';

import { BoxRadioGroup } from '~/components/common/BoxRadioGroup';
import { ColorField } from '~/components/common/ColorField';
import { ComboBox } from '~/components/common/ComboBox';
import { NumberArrayField } from '~/components/common/NumberArrayField';
import { NumberField } from '~/components/common/NumberField';
import { Switch } from '~/components/common/Switch';
import { TextField } from '~/components/common/TextField';
import { FilterProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/FilterProperties';
import { GeneralProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/GeneralProperties';
import { RawDataProperties } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties';
import { getStyleJSONSchemaDefinition } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties/schema/StyleJSONSchemaBase.ts';
import { useSpriteIds } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/hooks/useSpriteIds/useSpriteIds.ts';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type FillLayerPropertiesPanelProps = Omit<
	ComponentProps<'div'>,
	'onChange'
> & {
	layer: FillLayerSpecification;
	sprite?: SpriteSpecification;
	sources: { [key: string]: SourceSpecification };
	onChange?: onChangeType;
};

export const FillLayerPropertiesPanel: FC<FillLayerPropertiesPanelProps> = ({
	layer,
	sources,
	sprite,
	onChange,
	children,
	className,
	...props
}) => {
	const spriteIds = useSpriteIds(sprite);
	return (
		<div {...props} className={cn('flex flex-col gap-6', className)}>
			<GeneralProperties layer={layer} sources={sources} onChange={onChange} />
			<FilterProperties layer={layer} onChange={onChange} />
			<div className={'flex flex-col gap-2 px-4'}>
				<h3 className={'font-montserrat font-semibold text-sm'}>Paint</h3>
				{typeof layer.paint?.['fill-opacity'] === 'number' ||
				layer.paint?.['fill-opacity'] === undefined ? (
					<NumberField
						label={'Opacity'}
						onChange={(value) => {
							onChange?.(
								layer,
								'paint',
								'fill-opacity',
								value === 1 ? undefined : value,
							);
						}}
						value={
							layer.paint?.['fill-opacity'] !== undefined
								? layer.paint['fill-opacity']
								: 1
						}
						minValue={0}
						maxValue={1}
						formatOptions={{
							style: 'percent',
							maximumFractionDigits: 2,
						}}
					/>
				) : (
					<TextField
						label={'Opacity'}
						value={
							layer.paint?.['fill-opacity']
								? String(layer.paint?.['fill-opacity'])
								: '1'
						}
					/>
				)}
				{typeof layer.paint?.['fill-color'] === 'string' ||
				layer.paint?.['fill-color'] === undefined ? (
					<ColorField
						label={'Fill Color'}
						value={parseColor(
							layer.paint?.['fill-color'] ?? 'rgba(255, 255, 255, 1)',
						)}
						onChange={(color) => {
							onChange?.(layer, 'paint', 'fill-color', color?.toString('rgba'));
						}}
					/>
				) : (
					<TextField
						label={'Fill Color'}
						value={
							layer.paint?.['fill-color']
								? String(layer.paint?.['fill-color'])
								: '1'
						}
					/>
				)}
				{typeof layer.paint?.['fill-antialias'] === 'boolean' ||
				layer.paint?.['fill-antialias'] === undefined ? (
					<Switch
						label={'Antialias'}
						isSelected={layer.paint?.['fill-antialias'] ?? false}
						onChange={(isSelected) => {
							onChange?.(
								layer,
								'paint',
								'fill-antialias',
								isSelected ? true : undefined,
							);
						}}
					/>
				) : (
					<TextField
						label={'Antialias'}
						value={
							layer.paint?.['fill-antialias']
								? String(layer.paint?.['fill-antialias'])
								: 'false'
						}
					/>
				)}
				{typeof layer.paint?.['fill-outline-color'] === 'string' ||
				layer.paint?.['fill-outline-color'] === undefined ? (
					<ColorField
						label={'Outline Color'}
						value={parseColor(
							layer.paint?.['fill-outline-color'] ?? 'rgba(255, 255, 255, 1)',
						)}
						onChange={(color) => {
							onChange?.(
								layer,
								'paint',
								'fill-outline-color',
								color?.toString('rgba'),
							);
						}}
					/>
				) : (
					<TextField
						label={'Outline Color'}
						value={
							layer.paint?.['fill-outline-color']
								? String(layer.paint?.['fill-outline-color'])
								: '1'
						}
					/>
				)}{' '}
				{typeof layer.paint?.['fill-pattern'] === 'string' ||
				layer.paint?.['fill-pattern'] === undefined ? (
					<ComboBox
						label={'Pattern'}
						allowsCustomValue
						inputValue={layer.paint?.['fill-pattern']}
						selectedKey={layer.paint?.['fill-pattern']}
						onInputChange={(value) => {
							if (value === layer.paint?.['fill-pattern']) return;
							if (!value) {
								onChange?.(layer, 'paint', 'fill-pattern', undefined);
							} else {
								onChange?.(layer, 'paint', 'fill-pattern', value);
							}
						}}
						onSelectionChange={(value) => {
							if (!value || value === layer.paint?.['fill-pattern']) return;
							onChange?.(layer, 'paint', 'fill-pattern', value as string);
						}}
					>
						{spriteIds?.map((spriteId) => {
							return (
								<Item key={spriteId} textValue={spriteId}>
									{spriteId}
								</Item>
							);
						})}
					</ComboBox>
				) : (
					<TextField
						label={'Pattern'}
						value={
							layer.paint?.['fill-pattern']
								? String(layer.paint?.['fill-pattern'])
								: '1'
						}
					/>
				)}
				{(typeof layer.paint?.['fill-translate'] === 'object' &&
					Array.isArray(layer.paint['fill-translate']) &&
					typeof layer.paint['fill-translate'][0] === 'number' &&
					typeof layer.paint['fill-translate'][1] === 'number') ||
				!layer.paint?.['fill-translate'] ? (
					<NumberArrayField
						label={'Translate'}
						arrayLabels={['X', 'Y']}
						values={
							Array.isArray(layer.paint?.['fill-translate']) &&
							typeof layer.paint['fill-translate'][0] === 'number' &&
							typeof layer.paint['fill-translate'][1] === 'number'
								? layer.paint['fill-translate']
								: [0, 0]
						}
						onChange={(values) => {
							onChange?.(layer, 'paint', 'fill-translate', values);
						}}
					/>
				) : (
					<TextField
						label={'Translate'}
						value={
							layer.paint?.['fill-translate']
								? String(layer.paint?.['fill-translate'])
								: '[0,0]'
						}
					/>
				)}
				{typeof layer.paint?.['fill-translate-anchor'] === 'string' ||
				!layer.paint?.['fill-translate-anchor'] ? (
					<BoxRadioGroup
						label={'Translate Anchor'}
						items={[
							{
								value: 'map',
								label: 'Map',
							},
							{
								value: 'viewport',
								label: 'Viewport',
							},
						]}
						value={(layer.paint?.['fill-translate-anchor'] as string) ?? 'map'}
						onChange={(value) => {
							onChange?.(
								layer,
								'paint',
								'fill-translate-anchor',
								value === 'map' ? undefined : 'viewport',
							);
						}}
					/>
				) : (
					<TextField
						label={'Translate Anchor'}
						value={
							layer.paint?.['fill-translate-anchor']
								? String(layer.paint?.['fill-translate-anchor'])
								: '1'
						}
					/>
				)}
			</div>
			<RawDataProperties
				layer={layer}
				onChange={onChange}
				schema={getStyleJSONSchemaDefinition('FillLayerSpecification')}
			/>
			{children}
		</div>
	);
};

FillLayerPropertiesPanel.displayName = 'FillLayerPropertiesPanel';
