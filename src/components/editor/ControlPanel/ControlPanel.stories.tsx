import type { Meta, StoryObj } from '@storybook/react';

import { ControlPanel } from '.';

const meta = {
	component: ControlPanel,
} satisfies Meta<typeof ControlPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
