import type { ComponentProps, FC } from 'react';
import { Fragment } from 'react';

import type {
	ExpressionInputType,
	ExpressionSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type CaseInputFieldProps = {
	value: [
		'case',
		boolean | ExpressionSpecification,
		ExpressionInputType | ExpressionSpecification,
		...(boolean | ExpressionInputType | ExpressionSpecification)[],
		ExpressionInputType | ExpressionSpecification,
	];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const CaseInputField: FC<CaseInputFieldProps> = ({
	className,
	children,
	value,
	onChange,
	...props
}) => {
	const expressions = value.slice(1, -1) as (
		| boolean
		| ExpressionInputType
		| ExpressionSpecification
	)[];
	const fallback = value.slice(-1)[0] as
		| ExpressionInputType
		| ExpressionSpecification;
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			<div className={'flex flex-row px-0.5 py-0.5'}>CASE</div>
			{expressions.map((expression, index) => {
				const isCondition = index % 2 === 0;
				return (
					<Fragment
						key={`case${isCondition ? 'condition' : 'value'}${index}${expression}`}
					>
						{isExpression(expression) ? (
							<ExpressionInputField value={expression} onChange={onChange} />
						) : (
							<ExpressionInputTypeInputField value={expression} />
						)}
						{isCondition && (
							<div className={'flex flex-row px-0.5 py-0.5'}>WHEN</div>
						)}
					</Fragment>
				);
			})}
			<div className={'flex flex-row px-0.5 py-0.5'}>ELSE</div>
			{isExpression(fallback) ? (
				<ExpressionInputField value={fallback} onChange={onChange} />
			) : (
				<ExpressionInputTypeInputField value={fallback} />
			)}
			{children}
		</div>
	);
};

CaseInputField.displayName = 'CaseInputField';
