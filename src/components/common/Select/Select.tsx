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

export type SelectProps = {
  className?: string;
  triggerClassName?: string;
} & SelectStateOptions<object>;

export const Select: FC<SelectProps> = ({ className, triggerClassName, ...props }) => {
  const state = useSelectState(props);

  const ref = useRef(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);

  return (
    <div className={cn('flex items-center justify-between text-sm', className)}>
      <div {...labelProps} className={cn('font-semibold text-gray-600', labelProps.className)}>
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
          'flex w-1/2 flex-row items-center justify-between rounded border-none bg-gray-100 py-1 px-2 text-sm font-semibold transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-0 aria-expanded:bg-gray-200',
          triggerClassName
        )}
      >
        <p {...valueProps} className={'flex-1 overflow-hidden text-ellipsis text-start'}>
          {state.selectedItem ? state.selectedItem.rendered : ''}
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
