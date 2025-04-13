import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type ImageInputFieldProps = {
	value: ['image', unknown | ExpressionSpecification];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ImageInputField: FC<ImageInputFieldProps> = ({
	className,
	children,
	value,
	onChange,
	...props
}) => {
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			<div className={'flex flex-row px-0.5 py-0.5'}>get Image</div>
			{isExpression(value[1]) ? (
				<ExpressionInputField value={value[1]} onChange={onChange} />
			) : (
				<div className={'flex flex-row px-0.5 py-0.5'}>
					{JSON.stringify(value[1])}
				</div>
			)}
			{children}
		</div>
	);
};

ImageInputField.displayName = 'ImageInputField';
