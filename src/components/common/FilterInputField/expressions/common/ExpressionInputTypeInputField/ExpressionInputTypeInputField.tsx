import type { ComponentProps, FC } from 'react';

import type { ExpressionInputType } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil.ts';

export type ExpressionInputTypeInputFieldProps = {
	value: ExpressionInputType | unknown;
	onChange?: (value: ExpressionInputType) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ExpressionInputTypeInputField: FC<
	ExpressionInputTypeInputFieldProps
> = ({ className, children, value, onChange, ...props }) => {
	return (
		<div {...props} className={cn('flex flex-row px-0.5 py-0.5', className)}>
			{typeof value === 'string'
				? `"${value}"`
				: typeof value === 'number'
					? value
					: typeof value === 'boolean'
						? value.toString()
						: JSON.stringify(value)}
			{children}
		</div>
	);
};

ExpressionInputTypeInputField.displayName = 'ExpressionInputTypeInputField';
