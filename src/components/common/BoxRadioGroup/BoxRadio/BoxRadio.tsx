import type { FC, ReactNode } from 'react';
import { useRef } from 'react';

import type { AriaRadioProps } from 'react-aria';
import { useRadio } from 'react-aria';
import type { RadioGroupState } from 'react-stately';

import { cn } from '~/utils/tailwindUtil';

export type BoxRadioProps = {
	children: ReactNode;
	className?: string;
	state: RadioGroupState;
} & AriaRadioProps;

export const BoxRadio: FC<BoxRadioProps> = ({
	className,
	children,
	state,
	...props
}) => {
	const ref = useRef(null);
	const { inputProps, isSelected } = useRadio(props, state, ref);

	return (
		<label
			aria-checked={isSelected}
			className={cn(
				'block cursor-pointer rounded border-none bg-gray-100 px-2 py-1 font-semibold text-sm transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-0 aria-checked:bg-gray-300',
				className,
			)}
		>
			<input className={'sr-only'} {...inputProps} ref={ref} />
			{children}
		</label>
	);
};

BoxRadio.displayName = 'BoxRadio';
