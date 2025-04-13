import type { Meta, StoryObj } from '@storybook/react';

import { EqualInputField } from '.';

const meta = {
	component: EqualInputField,
} satisfies Meta<typeof EqualInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
