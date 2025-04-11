import type { FC } from 'react';
import { useRef } from 'react';

import type { AriaNumberFieldProps } from 'react-aria';
import { useLocale, useNumberField } from 'react-aria';
import { useNumberFieldState } from 'react-stately';

import { Button } from '~/components/common/Button';
import { cn } from '~/utils/tailwindUtil';

export type NumberFieldProps = {
	className?: string;
	showButton?: boolean;
} & AriaNumberFieldProps;

export const NumberField: FC<NumberFieldProps> = ({
	className,
	showButton,
	label,
	...props
}) => {
	const { locale } = useLocale();
	const state = useNumberFieldState({ ...props, label, locale });
	const ref = useRef(null);
	const {
		labelProps,
		inputProps,
		groupProps,
		decrementButtonProps,
		incrementButtonProps,
		descriptionProps,
		errorMessageProps,
		isInvalid,
		validationErrors,
	} = useNumberField({ ...props, label }, state, ref);

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
			<div {...groupProps} className={'w-1/2'}>
				<input
					{...inputProps}
					ref={ref}
					className={cn(
						'w-full rounded border-none bg-gray-100 px-2 py-1 font-semibold text-sm transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-0',
						inputProps.className,
					)}
				/>
				{showButton ? (
					<>
						<Button {...decrementButtonProps}>-</Button>
						<Button {...incrementButtonProps}>+</Button>
					</>
				) : null}
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

NumberField.displayName = 'NumberField';
