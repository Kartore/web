import type { ComponentProps, FC } from 'react';
import { Fragment } from 'react';

import type {
	ColorSpecification,
	ExpressionSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type FormatInputFieldProps = {
	value: [
		'format',
		...(
			| string
			| ['image', ExpressionSpecification]
			| ExpressionSpecification
			| {
					'font-scale'?: number | ExpressionSpecification;
					'text-font'?: string[] | ExpressionSpecification;
					'text-color'?: ColorSpecification | ExpressionSpecification;
			  }
		)[],
	];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const FormatInputField: FC<FormatInputFieldProps> = ({
	className,
	children,
	value,
	onChange,
	...props
}) => {
	const values = value.slice(1) as (unknown | ExpressionSpecification)[];
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			<div className={'flex flex-row px-0.5 py-0.5'}>format</div>
			{values.map((arg, index) => (
				<Fragment key={`number${index}${arg}`}>
					{isExpression(arg) ? (
						<ExpressionInputField value={arg} onChange={onChange} />
					) : (
						<ExpressionInputTypeInputField value={arg} />
					)}
					{index % 2 === 0 && (
						<div className={'flex flex-row px-0.5 py-0.5'}>format option:</div>
					)}
				</Fragment>
			))}
			{children}
		</div>
	);
};
FormatInputField.displayName = 'FormatInputField';
