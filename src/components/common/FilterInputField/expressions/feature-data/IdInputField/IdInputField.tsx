import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type IdInputFieldProps = {
	value: ['id'];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const IdInputField: FC<IdInputFieldProps> = ({
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
			"id" from features
			{children}
		</div>
	);
};
IdInputField.displayName = 'IdInputField';
