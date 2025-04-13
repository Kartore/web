import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type LiteralInputFieldProps = {
	value: ['literal', unknown];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const LiteralInputField: FC<LiteralInputFieldProps> = ({
	className,
	children,
	value,
	onChange,
	...props
}) => {
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			<div className={'flex flex-row px-0.5 py-0.5'}>JSON parse</div>
			<div className={'flex flex-row px-0.5 py-0.5'}>
				{JSON.stringify(value[1])}
			</div>
			{children}
		</div>
	);
};

LiteralInputField.displayName = 'LiteralInputField';
