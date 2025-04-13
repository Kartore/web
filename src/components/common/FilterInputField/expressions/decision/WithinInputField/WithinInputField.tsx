import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type WithinInputFieldProps = {
	value: ['within', ExpressionSpecification | unknown];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const WithinInputField: FC<WithinInputFieldProps> = ({
	className,
	children,
	value,
	onChange,
	...props
}) => {
	const geometry = value[1];
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			<div className={'flex flex-row px-0.5 py-0.5'}>!</div>
			{isExpression(geometry) ? (
				<ExpressionInputField value={geometry} onChange={onChange} />
			) : (
				<div className={'flex flex-row px-0.5 py-0.5'}>
					{JSON.stringify(geometry)}
				</div>
			)}
			{children}
		</div>
	);
};

WithinInputField.displayName = 'WithinInputField';
