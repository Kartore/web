import type { FC } from 'react';
import { useRef } from 'react';

import type { AriaTextFieldProps } from 'react-aria';
import { useTextField } from 'react-aria';

import { cn } from '~/utils/tailwindUtil';

export type TextFieldProps = {
	className?: string;
} & AriaTextFieldProps;

export const TextField: FC<TextFieldProps> = ({
	className,
	label,
	...props
}) => {
	const ref = useRef(null);
	const {
		labelProps,
		inputProps,
		descriptionProps,
		errorMessageProps,
		isInvalid,
		validationErrors,
	} = useTextField(props, ref);
	return (
		<div
			className={cn('flex flex-row items-center justify-between', className)}
		>
			<label
				{...labelProps}
				className={cn(
					'font-semibold text-gray-600 text-sm',
					labelProps.className,
				)}
			>
				{label}
			</label>
			<input
				{...inputProps}
				ref={ref}
				className={cn(
					'w-1/2 rounded border-none bg-gray-100 px-2 py-1 font-semibold text-sm transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-0',
					inputProps.className,
				)}
			/>
			{props.description && (
				<div
					{...descriptionProps}
					className={cn('text-xs', descriptionProps.className)}
				>
					{props.description}
				</div>
			)}
			{isInvalid && (
				<div
					{...errorMessageProps}
					className={cn('text-red text-xs', errorMessageProps.className)}
				>
					{validationErrors.join(' ')}
				</div>
			)}
		</div>
	);
};

TextField.displayName = 'TextField';
