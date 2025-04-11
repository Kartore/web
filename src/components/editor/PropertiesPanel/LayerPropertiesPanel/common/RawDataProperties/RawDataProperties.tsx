import type { ComponentProps, FC } from 'react';

import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';

import { MonacoEditor } from '~/components/common/MonacoEditor';
import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil';

export type RawDataPropertiesProps = {
	layer: LayerSpecification;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	schema?: any;
	onChange?: onChangeType;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const RawDataProperties: FC<RawDataPropertiesProps> = ({
	layer,
	className,
	schema,
	children,
	onChange,
	...props
}) => {
	return (
		<div {...props} className={cn('flex flex-col gap-2 px-4', className)}>
			<h3 className={'font-montserrat font-semibold text-sm'}>
				Raw Data Editor (Advanced)
			</h3>

			<MonacoEditor
				className={cn('min-h-40', className)}
				value={JSON.stringify(layer, undefined, 2)}
				onChange={(value) => {
					if (onChange && value)
						onChange(layer, 'all', undefined, JSON.parse(value));
				}}
				onMount={(_, monaco) => {
					monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
						validate: true,
						schemas: [
							{
								fileMatch: ['*'],
								uri: 'kartore://schema.json',
								schema: schema,
							},
						],
					});
				}}
			/>
			{children}
		</div>
	);
};

RawDataProperties.displayName = 'RawDataProperties';
