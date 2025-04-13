import type { FC } from 'react';
import { useRef } from 'react';

import { useColorSlider } from '@react-aria/color';
import { useColorSliderState } from '@react-stately/color';
import type { AriaColorSliderProps } from '@react-types/color';
import { useLocale } from 'react-aria';

import { cn } from '~/utils/tailwindUtil';

export type ColorChannelSliderProps = AriaColorSliderProps;

export const ColorChannelSlider: FC<ColorChannelSliderProps> = ({
	...props
}) => {
	const { locale } = useLocale();
	const state = useColorSliderState({ ...props, locale });
	const trackRef = useRef(null);
	const inputRef = useRef(null);

	// Default label to the channel name in the current locale
	const label =
		props.label || state.value.getChannelName(props.channel, locale);

	const { trackProps, thumbProps, inputProps } = useColorSlider(
		{
			...props,
			label,
			trackRef,
			inputRef,
		},
		state,
	);
	return (
		<div
			{...trackProps}
			ref={trackRef}
			className={cn(
				'h-3 w-full rounded-full border border-gray-300',
				trackProps.className,
			)}
			style={{
				...trackProps.style,
				background: `${trackProps.style?.background},
            repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 12px 12px`,
			}}
		>
			<div
				{...thumbProps}
				style={{
					...thumbProps.style,
					background: `linear-gradient(${state.getDisplayColor().toString('css')}, ${state.getDisplayColor().toString('css')}),
          repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
					border: '2px solid white',
					boxShadow:
						'0 0 0 1px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(0,0,0,0.25)',
				}}
				className={'top-[5px] box-border h-3 w-3 rounded-full'}
			>
				<input
					{...inputProps}
					ref={inputRef}
					className={cn('', inputProps.className)}
				/>
			</div>
		</div>
	);
};

ColorChannelSlider.displayName = 'ColorChannelSlider';
