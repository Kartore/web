import type { FC } from 'react';
import { useRef } from 'react';

import { useColorChannelField } from '@react-aria/color';
import { useColorChannelFieldState } from '@react-stately/color';
import type { ColorChannelFieldProps as AriaColorChannelFieldProps } from '@react-stately/color';
import { useLocale } from 'react-aria';

import { cn } from '~/utils/tailwindUtil';

export type ColorChannelFieldProps = {
	className?: string;
} & AriaColorChannelFieldProps;

export const ColorChannelField: FC<ColorChannelFieldProps> = ({
	className,
	label,
	...props
}) => {
	const { locale } = useLocale();
	const ref = useRef(null);
	const alphaState = useColorChannelFieldState({
		...props,
		label,
		locale,
	});
	const { inputProps, labelProps } = useColorChannelField(
		{ ...props, label },
		alphaState,
		ref,
	);

	return (
		<div className={cn('text-xs', className)}>
			<label
				{...labelProps}
				className={cn(
					'sr-only font-semibold text-gray-600',
					labelProps.className,
				)}
			>
				{label}
			</label>
			<input
				{...inputProps}
				ref={ref}
				className={cn(
					inputProps.className,
					'h-full w-full border-none bg-gray-100 px-2 py-1 font-semibold transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-0',
				)}
			/>
		</div>
	);
};

ColorChannelField.displayName = 'ColorChannelField';
