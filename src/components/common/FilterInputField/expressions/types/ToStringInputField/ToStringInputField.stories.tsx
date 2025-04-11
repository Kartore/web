import type { Meta, StoryObj } from '@storybook/react';

import { ToStringInputField } from '.';

const meta = {
	component: ToStringInputField,
} satisfies Meta<typeof ToStringInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
