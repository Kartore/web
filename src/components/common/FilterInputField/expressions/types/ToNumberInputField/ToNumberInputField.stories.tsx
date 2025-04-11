import type { Meta, StoryObj } from '@storybook/react';

import { ToNumberInputField } from '.';

const meta = {
	component: ToNumberInputField,
} satisfies Meta<typeof ToNumberInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
