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

export type MatchInputFieldProps = {
	value: [
		'match',
		ExpressionInputType | ExpressionSpecification,
		ExpressionInputType | ExpressionInputType[],
		ExpressionInputType | ExpressionSpecification,
		...(
			| ExpressionInputType
			| ExpressionInputType[]
			| ExpressionSpecification
		)[],
		// repeated as above
		ExpressionInputType | ExpressionSpecification,
	];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const MatchInputField: FC<MatchInputFieldProps> = ({
	className,
	children,
	value,
	onChange,
	...props
}) => {
	const expressions = value.slice(1, -1) as (
		| ExpressionInputType
		| ExpressionInputType[]
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
			<div className={'flex flex-row px-0.5 py-0.5'}>switch</div>
			{expressions.map((expression, index) => {
				const isCondition = index % 2 === 0;
				return (
					<Fragment
						key={`match${isCondition ? 'case' : 'value'}${index}${expression}`}
					>
						{isCondition && (
							<div className={'flex flex-row px-0.5 py-0.5'}>CASE</div>
						)}
						{isExpression(expression) ? (
							<ExpressionInputField value={expression} onChange={onChange} />
						) : Array.isArray(expression) ? (
							expression.map((ex, index) => {
								return (
									<Fragment
										key={`match${isCondition ? 'case' : 'value'}${index}${expression}${ex.toString()}${index}`}
									>
										<ExpressionInputTypeInputField value={ex} />
										{index < expression.length - 1 && (
											<div className={'flex flex-row px-0.5 py-0.5'}>OR</div>
										)}
									</Fragment>
								);
							})
						) : (
							<ExpressionInputTypeInputField value={expression} />
						)}
						{isCondition && (
							<div className={'flex flex-row px-0.5 py-0.5'}>:</div>
						)}
					</Fragment>
				);
			})}
			<div className={'flex flex-row px-0.5 py-0.5'}>DEFAULT</div>
			{isExpression(fallback) ? (
				<ExpressionInputField value={fallback} onChange={onChange} />
			) : (
				<ExpressionInputTypeInputField value={fallback} />
			)}
			{children}
		</div>
	);
};

MatchInputField.displayName = 'MatchInputField';
