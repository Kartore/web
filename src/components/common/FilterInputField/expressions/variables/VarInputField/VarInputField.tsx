import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type VarInputFieldProps = {
	value: ['var', string];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const VarInputField: FC<VarInputFieldProps> = ({
	className,
	children,
	value,
	onChange,
	...props
}) => {
	const variableName = value[1];
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			<div className={'flex flex-row px-0.5 py-0.5'}>get</div>
			<div className={'flex flex-row px-0.5 py-0.5'}>"{variableName}"</div>
			<div className={'flex flex-row px-0.5 py-0.5'}>from variables</div>
			{children}
		</div>
	);
};

VarInputField.displayName = 'VarInputField';
