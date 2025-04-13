import type { Meta, StoryObj } from '@storybook/react';

import { HasInputField } from '.';

const meta = {
	component: HasInputField,
} satisfies Meta<typeof HasInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
