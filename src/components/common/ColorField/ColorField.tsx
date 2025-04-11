import type { FC } from 'react';
import { useRef } from 'react';

import type { AriaColorFieldProps } from '@react-aria/color';
import { useColorChannelField, useColorField } from '@react-aria/color';
import {
	parseColor,
	useColorChannelFieldState,
	useColorFieldState,
} from '@react-stately/color';
import { useLocale } from 'react-aria';

import { ColorPicker } from '~/components/common/ColorField/ColorPicker';
import { cn } from '~/utils/tailwindUtil.ts';

export type ColorFieldProps = {
	className?: string;
} & AriaColorFieldProps;

export const ColorField: FC<ColorFieldProps> = ({
	className,
	label,
	...props
}) => {
	const state = useColorFieldState({ label, ...props });
	const ref = useRef(null);
	const alphaInputRef = useRef(null);
	const {
		labelProps,
		inputProps,
		descriptionProps,
		errorMessageProps,
		isInvalid,
		validationErrors,
	} = useColorField({ label, ...props, isWheelDisabled: true }, state, ref);
	const { locale } = useLocale();

	const alphaState = useColorChannelFieldState({
		...props,
		channel: 'alpha',
		label: 'Alpha',
		locale,
	});
	const { inputProps: alphaInputProps } = useColorChannelField(
		{ ...props, channel: 'alpha', label: 'Alpha' },
		alphaState,
		alphaInputRef,
	);

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
			<div
				className={
					'flex w-1/2 flex-row items-center gap-2 rounded border-none bg-gray-100 px-2 py-1 font-semibold text-sm transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-0'
				}
			>
				<ColorPicker
					value={
						typeof props.value === 'string'
							? parseColor(props.value)
							: props.value
					}
					onChange={props.onChange}
				/>
				<input
					{...inputProps}
					ref={ref}
					className={cn(
						'min-w-10 flex-2 border-none focus-visible:outline-0',
						inputProps.className,
					)}
				/>
				<input
					{...alphaInputProps}
					ref={alphaInputRef}
					className={cn(
						'min-w-8 flex-1 border-none focus-visible:outline-0',
						inputProps.className,
					)}
				/>
			</div>
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

ColorField.displayName = 'ColorField';
