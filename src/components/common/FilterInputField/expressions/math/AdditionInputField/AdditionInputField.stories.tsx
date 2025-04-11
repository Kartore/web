import type { Meta, StoryObj } from '@storybook/react';

import { AdditionInputField } from '.';

const meta = {
	component: AdditionInputField,
} satisfies Meta<typeof AdditionInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
