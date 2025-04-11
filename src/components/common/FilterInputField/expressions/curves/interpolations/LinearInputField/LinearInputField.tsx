import type { ComponentProps, FC } from 'react';

import type { InterpolationSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type LinearInputFieldProps = {
	value: ['linear'];
	onChange?: (value: InterpolationSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const LinearInputField: FC<LinearInputFieldProps> = ({
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
			linear
		</div>
	);
};

LinearInputField.displayName = 'LinearInputField';
