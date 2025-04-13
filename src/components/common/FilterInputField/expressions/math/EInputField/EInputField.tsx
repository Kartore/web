import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type EInputFieldProps = {
	value: ['e'];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const EInputField: FC<EInputFieldProps> = ({
	className,
	value,
	onChange,
	children,
	...props
}) => {
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row flex-wrap items-center rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			e
		</div>
	);
};

EInputField.displayName = 'EInputField';
