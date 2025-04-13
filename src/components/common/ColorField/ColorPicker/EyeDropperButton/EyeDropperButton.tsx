import type { FC } from 'react';
import { useEffect, useState } from 'react';

import type { Color } from '@react-stately/color';
import { parseColor } from '@react-stately/color';

import type { ButtonProps } from '~/components/common/Button';
import { Button } from '~/components/common/Button';
import { ColorizeIcon } from '~/components/icons';
import { cn } from '~/utils/tailwindUtil.ts';

export type EyeDropperButtonProps = {
	onChange?: (color: Color) => void;
} & Omit<ButtonProps, 'onChange' | 'children'>;

export const EyeDropperButton: FC<EyeDropperButtonProps> = ({
	className,
	onChange,
	...props
}) => {
	const [isEyeDropperSupported, setIsEyeDropperSupported] = useState(false);

	const handleClick = () => {
		if (!window || !window.EyeDropper) {
			return;
		}
		const eyeDropper = new window.EyeDropper();
		eyeDropper
			.open()
			.then(({ sRGBHex }) => {
				if (!sRGBHex) {
					setIsEyeDropperSupported(false);
					throw new Error(`Invalid eyeDropper Format: ${sRGBHex}`);
				}
				const parsedColor = parseColor(sRGBHex);
				onChange?.(parsedColor);
			})
			.catch((e) => {
				console.error(e);
			});
	};
	useEffect(() => {
		if (!window || !window.EyeDropper) {
			return;
		}
		setIsEyeDropperSupported(true);
	}, []);

	if (!isEyeDropperSupported) {
		return null;
	}
	return (
		<Button {...props} className={cn('', className)} onClick={handleClick}>
			<ColorizeIcon className={'h-full w-full'} />
		</Button>
	);
};

EyeDropperButton.displayName = 'EyeDropperButton';
