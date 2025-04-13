import type { FC } from 'react';
import { useRef } from 'react';

import { useOption } from 'react-aria';
import type { ListState, Node } from 'react-stately';

import { CheckIcon } from '~/components/icons';
import { cn } from '~/utils/tailwindUtil.ts';

export type OptionProps = { item: Node<unknown>; state: ListState<unknown> };

export const Option: FC<OptionProps> = ({ item, state }) => {
	const ref = useRef(null);
	const { optionProps, isSelected } = useOption({ key: item.key }, state, ref);

	return (
		<li
			{...optionProps}
			ref={ref}
			className={cn(
				'flex cursor-pointer items-center gap-2 bg-transparent py-1 pr-3 pl-1 outline-0 hover:bg-gray-100 aria-selected:bg-gray-200',
				optionProps.className,
			)}
		>
			{isSelected ? <CheckIcon className={'w-4'} /> : <div className={'w-4'} />}
			{item.rendered}
		</li>
	);
};
