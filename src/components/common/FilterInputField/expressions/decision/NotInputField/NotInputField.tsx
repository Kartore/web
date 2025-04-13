import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type NotInputFieldProps = {
	value: ['!', boolean | ExpressionSpecification];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const NotInputField: FC<NotInputFieldProps> = ({
	className,
	children,
	value,
	onChange,
	...props
}) => {
	const condition = value[1];
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			<div className={'flex flex-row px-0.5 py-0.5'}>!</div>
			{isExpression(condition) ? (
				<ExpressionInputField value={condition} onChange={onChange} />
			) : (
				<ExpressionInputTypeInputField value={condition} />
			)}
			{children}
		</div>
	);
};

NotInputField.displayName = 'NotInputField';
