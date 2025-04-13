import type { FC } from 'react';

import type { AriaColorSwatchProps } from '@react-aria/color';
import { useColorSwatch } from '@react-aria/color';

import { cn } from '~/utils/tailwindUtil.ts';

export type ColorSwatchProps = {
	className?: string;
} & AriaColorSwatchProps;

export const ColorSwatch: FC<ColorSwatchProps> = ({ className, ...props }) => {
	const { colorSwatchProps, color } = useColorSwatch(props);
	return (
		<div
			{...colorSwatchProps}
			className={cn('', className)}
			style={{
				...colorSwatchProps.style,
				background: `linear-gradient(${color}, ${color}),
          repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
			}}
		/>
	);
};

ColorSwatch.displayName = 'ColorSwatch';
