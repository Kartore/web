import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type IsSupportedScriptInputFieldProps = {
	value: ['is-supported-script', string | ExpressionSpecification];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const IsSupportedScriptInputField: FC<
	IsSupportedScriptInputFieldProps
> = ({ className, children, value, onChange, ...props }) => {
	const scriptText = value[1];
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			<div className={'flex flex-row px-0.5 py-0.5'}>isSupportedScript?</div>
			{isExpression(scriptText) ? (
				<ExpressionInputField value={scriptText} onChange={onChange} />
			) : (
				<ExpressionInputTypeInputField value={scriptText} />
			)}
			{children}
		</div>
	);
};

IsSupportedScriptInputField.displayName = 'IsSupportedScriptInputField';
