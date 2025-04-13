import type { Meta, StoryObj } from '@storybook/react';

import { ToColorInputField } from '.';

const meta = {
	component: ToColorInputField,
} satisfies Meta<typeof ToColorInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
