import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type NumberFormatInputFieldProps = {
	value: [
		'number-format',
		number | ExpressionSpecification,
		{
			locale?: string | ExpressionSpecification;
			currency?: string | ExpressionSpecification;
			'min-fraction-digits'?: number | ExpressionSpecification;
			'max-fraction-digits'?: number | ExpressionSpecification;
		},
	];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const NumberFormatInputField: FC<NumberFormatInputFieldProps> = ({
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
			<div className={'flex flex-row px-0.5 py-0.5'}>number format</div>
			{isExpression(value[1]) ? (
				<ExpressionInputField value={value[1]} onChange={onChange} />
			) : (
				<ExpressionInputTypeInputField value={value[1]} />
			)}
			<div className={'flex flex-row px-0.5 py-0.5'}>
				option: {JSON.stringify(value[2])}
			</div>
			{children}
		</div>
	);
};

NumberFormatInputField.displayName = 'NumberFormatInputField';
