import type { FC } from 'react';
import { useRef } from 'react';

import { useComboBox, useFilter } from 'react-aria';
import type { ComboBoxStateOptions } from 'react-stately';
import { useComboBoxState } from 'react-stately';

import { Popover } from '~/components/common/Popover';
import { ListBox } from '~/components/common/Select/ListBox';
import { ArrowDropDownIcon } from '~/components/icons';
import { cn } from '~/utils/tailwindUtil';

export type ComboBoxProps = {
	className?: string;
} & ComboBoxStateOptions<object>;

export const ComboBox: FC<ComboBoxProps> = ({ className, ...props }) => {
	const { contains } = useFilter({ sensitivity: 'base' });
	const state = useComboBoxState({
		...props,
		defaultFilter: contains,
	});

	// Setup refs and get props for child elements.
	const buttonRef = useRef(null);
	const inputRef = useRef(null);
	const listBoxRef = useRef(null);
	const popoverRef = useRef(null);

	const { buttonProps, inputProps, listBoxProps, labelProps } = useComboBox(
		{
			...props,
			inputRef,
			buttonRef,
			listBoxRef,
			popoverRef,
		},
		state,
	);

	return (
		<div className={cn('flex items-center justify-between text-sm', className)}>
			<div
				{...labelProps}
				className={cn('font-semibold text-gray-600', labelProps.className)}
			>
				{props.label}
			</div>
			<div
				aria-expanded={state.isOpen}
				className={
					'flex w-1/2 cursor-pointer flex-row rounded border-none bg-gray-100 px-2 py-1 font-semibold text-sm transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-0 aria-expanded:bg-gray-200'
				}
				onClick={() => state.open()}
			>
				<input
					{...inputProps}
					onClick={() => state.open()}
					ref={inputRef}
					className={'w-full flex-1 border-none focus-visible:outline-0'}
				/>
				<button {...buttonProps} ref={buttonRef} className={'cursor-pointer'}>
					<ArrowDropDownIcon aria-hidden={'true'} className={'w-4'} />
				</button>
				{state.isOpen && (
					<Popover
						state={state}
						triggerRef={inputRef}
						popoverRef={popoverRef}
						placement="bottom start"
					>
						<ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
					</Popover>
				)}
			</div>
		</div>
	);
};

ComboBox.displayName = 'ComboBox';
