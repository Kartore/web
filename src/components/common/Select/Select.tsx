import type { FC } from 'react';
import { useRef } from 'react';

import { HiddenSelect, useSelect } from 'react-aria';
import type { SelectStateOptions } from 'react-stately';
import { useSelectState } from 'react-stately';

import { Button } from '~/components/common/Button';
import { Popover } from '~/components/common/Popover';
import { ListBox } from '~/components/common/Select/ListBox';
import { ArrowDropDownIcon } from '~/components/icons';
import { cn } from '~/utils/tailwindUtil.ts';

export type SelectProps = SelectStateOptions<object>;

export const Select: FC<SelectProps> = ({ ...props }) => {
  const state = useSelectState(props);

  const ref = useRef(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);

  return (
    <div className={'flex items-center justify-between'}>
      <div
        {...labelProps}
        className={cn('text-sm font-semibold text-gray-600', labelProps.className)}
      >
        {props.label}
      </div>
      <HiddenSelect
        isDisabled={props.isDisabled}
        state={state}
        triggerRef={ref}
        label={props.label}
      />
      <Button
        {...triggerProps}
        buttonRef={ref}
        className={cn(
          'flex h-7 cursor-pointer flex-row items-center gap-1 rounded pl-1.5 text-sm hover:bg-gray-100 aria-expanded:bg-gray-200'
        )}
      >
        <p {...valueProps}>
          {state.selectedItem ? state.selectedItem.rendered : 'Select an option'}
        </p>
        <ArrowDropDownIcon aria-hidden={'true'} className={'w-4'} />
      </Button>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
};

Select.displayName = 'Select';
