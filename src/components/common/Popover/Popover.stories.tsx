import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { useOverlayTriggerState } from 'react-stately';
import { Popover } from '.';

const meta = {
	component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	// @ts-expect-error render側でchildrenのみを受け取るため
	args: {
		children: 'test',
	},
	render: ({ children }) => {
		const ref = useRef(null);
		const state = useOverlayTriggerState({
			defaultOpen: true,
		});
		return (
			<>
				<button ref={ref} type={'button'}>
					Trigger
				</button>
				<Popover triggerRef={ref} state={state}>
					{children}
				</Popover>
			</>
		);
	},
};
