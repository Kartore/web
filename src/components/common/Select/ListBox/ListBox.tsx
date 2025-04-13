import type { FC, RefObject } from 'react';
import { useRef } from 'react';

import type { AriaListBoxOptions } from 'react-aria';
import { useListBox } from 'react-aria';
import type { ListState } from 'react-stately';

import { Option } from '~/components/common/Select/ListBox/Option';
import { cn } from '~/utils/tailwindUtil.ts';

export type ListBoxProps = AriaListBoxOptions<unknown> & {
	state: ListState<unknown>;
	listBoxRef?: RefObject<HTMLUListElement | null>;
};

export const ListBox: FC<ListBoxProps> = ({ ...props }) => {
	const ref = useRef(null);
	const { listBoxRef = ref, state } = props;
	const { listBoxProps } = useListBox(props, state, listBoxRef);

	return (
		<ul
			{...listBoxProps}
			ref={listBoxRef}
			className={cn(
				'm-0 max-h-40 min-w-32 list-none overflow-auto rounded border border-gray-500 bg-white p-0',
			)}
		>
			{[...state.collection].map((item) => (
				<Option key={item.key} item={item} state={state} />
			))}
		</ul>
	);
};

ListBox.displayName = 'ListBox';
