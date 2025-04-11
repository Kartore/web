import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type DistanceInputFieldProps = {
	value:
		| ['distance', unknown]
		| ['distance', Record<string, unknown> | ExpressionSpecification];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const DistanceInputField: FC<DistanceInputFieldProps> = ({
	className,
	children,
	value,
	onChange,
	...props
}) => {
	const object = value[1];
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			<div className={'flex flex-row px-0.5 py-0.5'}>distance to </div>
			{isExpression(object) ? (
				<ExpressionInputField value={object} onChange={onChange} />
			) : (
				<div className={'flex flex-row px-0.5 py-0.5'}>
					{JSON.stringify(object)}
				</div>
			)}
			{children}
		</div>
	);
};
DistanceInputField.displayName = 'DistanceInputField';
