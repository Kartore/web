import type { Meta, StoryObj } from '@storybook/react';

import { RemainderInputField } from '.';

const meta = {
	component: RemainderInputField,
} satisfies Meta<typeof RemainderInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
