import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type Ln2InputFieldProps = {
	value: ['ln2'];
	onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const Ln2InputField: FC<Ln2InputFieldProps> = ({
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
				'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
				className,
			)}
		>
			<div className={'flex flex-row px-0.5 py-0.5'}>ln(2)</div>
			{children}
		</div>
	);
};

Ln2InputField.displayName = 'Ln2InputField';
