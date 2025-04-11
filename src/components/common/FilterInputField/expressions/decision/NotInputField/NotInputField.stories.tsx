import type { Meta, StoryObj } from '@storybook/react';

import { NotInputField } from '.';

const meta = {
	component: NotInputField,
} satisfies Meta<typeof NotInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
