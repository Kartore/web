import type { FC } from 'react';
import { useRef } from 'react';

import { HiddenSelect, useSelect } from 'react-aria';
import type { SelectStateOptions } from 'react-stately';
import { useSelectState } from 'react-stately';

import { Button } from '~/components/common/Button';
import { Popover } from '~/components/common/Popover';
import { ListBox } from '~/components/common/Select/ListBox';

export type SelectProps = SelectStateOptions<object>;

export const Select: FC<SelectProps> = ({ ...props }) => {
  const state = useSelectState(props);

  const ref = useRef(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);

  return (
    <div className={'flex items-center justify-between'}>
      <div {...labelProps}>{props.label}</div>
      <HiddenSelect
        isDisabled={props.isDisabled}
        state={state}
        triggerRef={ref}
        label={props.label}
      />
      <Button {...triggerProps} buttonRef={ref} style={{ height: 30, fontSize: 14 }}>
        <span {...valueProps}>
          {state.selectedItem ? state.selectedItem.rendered : 'Select an option'}
        </span>
        <span aria-hidden="true" style={{ paddingLeft: 5 }}>
          ▼
        </span>
      </Button>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
};
