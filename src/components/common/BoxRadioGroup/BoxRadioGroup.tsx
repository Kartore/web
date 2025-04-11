import type { FC } from 'react';

import type { AriaRadioGroupProps } from 'react-aria';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { BoxRadio } from '~/components/common/BoxRadioGroup/BoxRadio';
import { cn } from '~/utils/tailwindUtil';

export type BoxRadioGroupProps = {
	className?: string;
	items: { value: string; label: string }[];
} & AriaRadioGroupProps;

export const BoxRadioGroup: FC<BoxRadioGroupProps> = ({
	className,
	label,
	items,
	...props
}) => {
	const state = useRadioGroupState({ label, ...props });
	const { radioGroupProps, labelProps } = useRadioGroup(
		{ label, ...props },
		state,
	);
	return (
		<div
			{...radioGroupProps}
			className={cn('flex items-center justify-between text-sm', className)}
		>
			<span
				{...labelProps}
				className={cn('font-semibold text-gray-600', labelProps.className)}
			>
				{label}
			</span>
			<div className={'flex w-1/2 flex-row items-center justify-end gap-1'}>
				{items.map((item) => {
					return (
						<BoxRadio state={state} value={item.value} key={item.value}>
							{item.label}
						</BoxRadio>
					);
				})}
			</div>
		</div>
	);
};

BoxRadioGroup.displayName = 'BoxRadioGroup';
