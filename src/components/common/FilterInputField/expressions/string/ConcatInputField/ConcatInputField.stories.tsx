import type { Meta, StoryObj } from '@storybook/react';

import { ConcatInputField } from '.';

const meta = {
	component: ConcatInputField,
} satisfies Meta<typeof ConcatInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
