import type { ComponentProps, FC, MutableRefObject } from 'react';
import { useRef } from 'react';

import type { AriaButtonOptions } from 'react-aria';
import { useButton } from 'react-aria';

import { cn } from '~/utils/tailwindUtil.ts';

export type ButtonProps = AriaButtonOptions<'button'> &
	ComponentProps<'button'> & {
		buttonRef?: MutableRefObject<HTMLButtonElement | null>;
	};

export const Button: FC<ButtonProps> = (props) => {
	const ref = useRef<HTMLButtonElement | null>(null);
	const { buttonRef = ref, className, ...otherProps } = props;
	const { buttonProps } = useButton(otherProps, buttonRef);
	return (
		<button
			{...buttonProps}
			ref={buttonRef}
			className={cn(
				'cursor-pointer transition-colors hover:bg-gray-100 active:bg-gray-300',
				className,
			)}
		>
			{props.children}
		</button>
	);
};

Button.displayName = 'Button';
