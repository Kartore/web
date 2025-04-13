import type { Meta, StoryObj } from '@storybook/react';

import { ArrayInputField } from '.';

const meta = {
	component: ArrayInputField,
} satisfies Meta<typeof ArrayInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
