import type { FC } from 'react';
import { useRef } from 'react';

import { useOption } from 'react-aria';
import type { ListState, Node } from 'react-stately';

export type OptionProps = { item: Node<unknown>; state: ListState<unknown> };

export const Option: FC<OptionProps> = ({ item, state }) => {
  const ref = useRef(null);
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      style={{
        background: isFocused ? 'gray' : 'transparent',
        color: isDisabled ? 'gray' : isFocused ? 'white' : 'black',
        padding: '2px 5px',
        outline: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
      }}
    >
      {item.rendered}
      {isSelected ? <span>✓</span> : null}
    </li>
  );
};
