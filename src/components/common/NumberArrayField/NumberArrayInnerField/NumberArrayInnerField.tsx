import type { FC } from 'react';
import { useRef } from 'react';

import {
	type AriaNumberFieldProps,
	useLocale,
	useNumberField,
} from 'react-aria';
import { useNumberFieldState } from 'react-stately';

import { cn } from '~/utils/tailwindUtil';

export type NumberArrayInnerFieldProps = {
	className?: string;
} & AriaNumberFieldProps;

export const NumberArrayInnerField: FC<NumberArrayInnerFieldProps> = ({
	className,
	label,
	...props
}) => {
	const { locale } = useLocale();
	const state = useNumberFieldState({ ...props, label, locale });
	const ref = useRef(null);
	const { labelProps, inputProps, groupProps } = useNumberField(
		{ ...props, label },
		state,
		ref,
	);

	return (
		<div
			className={cn(
				'flex flex-row items-center justify-between gap-2 rounded bg-gray-100 px-2 py-0.5',
				className,
			)}
		>
			<label
				{...labelProps}
				className={cn(
					'font-semibold text-gray-500 text-sm',
					labelProps.className,
				)}
			>
				{label}
			</label>
			<div {...groupProps} className={'w-full'}>
				<input
					{...inputProps}
					ref={ref}
					className={cn(
						'w-full rounded border-none px-1 py-0.5 font-semibold text-sm transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-0',
						inputProps.className,
					)}
				/>
			</div>
		</div>
	);
};

NumberArrayInnerField.displayName = 'NumberArrayInnerField';
