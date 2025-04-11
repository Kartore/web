import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type HasInputFieldProps = {
	value: [
		'has',
		string | ExpressionSpecification,
		(Record<string, unknown> | ExpressionSpecification)?,
	];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const HasInputField: FC<HasInputFieldProps> = ({
	className,
	children,
	value,
	onChange,
	...props
}) => {
	const propertyKey = value[1];
	const items = value[2];
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			<div className={'flex flex-row px-0.5 py-0.5'}>has</div>
			{isExpression(propertyKey) ? (
				<ExpressionInputField value={propertyKey} onChange={onChange} />
			) : (
				<div className={'flex flex-row px-0.5 py-0.5'}>
					{propertyKey.toString()}
				</div>
			)}
			<div className={'flex flex-row px-0.5 py-0.5'}>in</div>
			{items ? (
				isExpression(items) ? (
					<ExpressionInputField value={items} onChange={onChange} />
				) : (
					<div className={'flex flex-row px-0.5 py-0.5'}>
						{JSON.stringify(items)}
					</div>
				)
			) : (
				<div className={'flex flex-row px-0.5 py-0.5'}>this features</div>
			)}
			{children}
		</div>
	);
};
HasInputField.displayName = 'HasInputField';
