import type { Meta, StoryObj } from '@storybook/react';

import { InterpolateInputField } from '.';

const meta = {
	component: InterpolateInputField,
} satisfies Meta<typeof InterpolateInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
