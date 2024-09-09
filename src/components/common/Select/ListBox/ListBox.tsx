import type { FC, RefObject } from 'react';
import { useRef } from 'react';

import type { AriaListBoxOptions } from 'react-aria';
import { useListBox } from 'react-aria';
import type { ListState } from 'react-stately';

import { Option } from '~/components/common/Select/ListBox/Option';

export type ListBoxProps = AriaListBoxOptions<unknown> & {
  state: ListState<unknown>;
  listBoxRef?: RefObject<HTMLUListElement>;
};

export const ListBox: FC<ListBoxProps> = ({ ...props }) => {
  const ref = useRef(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
        maxHeight: 150,
        overflow: 'auto',
        minWidth: 100,
        background: 'lightgray',
      }}
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
};
