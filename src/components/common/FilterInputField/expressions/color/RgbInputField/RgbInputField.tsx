import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type RgbInputFieldProps = {
	value: [
		'rgb',
		number | ExpressionSpecification,
		number | ExpressionSpecification,
		number | ExpressionSpecification,
	];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const RgbInputField: FC<RgbInputFieldProps> = ({
	className,
	children,
	value,
	onChange,
	...props
}) => {
	const r = value[1];
	const g = value[2];
	const b = value[3];

	return (
		<div
			{...props}
			className={cn(
				'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			<div className={'flex flex-row px-0.5 py-0.5'}>rgb(</div>
			<div className={'flex flex-row px-0.5 py-0.5'}>
				{isExpression(r) ? (
					<ExpressionInputField value={r} onChange={onChange} />
				) : (
					<ExpressionInputTypeInputField value={r} />
				)}
				,
			</div>
			<div className={'flex flex-row px-0.5 py-0.5'}>
				{isExpression(g) ? (
					<ExpressionInputField value={g} onChange={onChange} />
				) : (
					<ExpressionInputTypeInputField value={g} />
				)}
				,
			</div>
			<div className={'flex flex-row px-0.5 py-0.5'}>
				{isExpression(b) ? (
					<ExpressionInputField value={b} onChange={onChange} />
				) : (
					<ExpressionInputTypeInputField value={b} />
				)}
				)
			</div>
			{children}
		</div>
	);
};
RgbInputField.displayName = 'RgbInputField';
