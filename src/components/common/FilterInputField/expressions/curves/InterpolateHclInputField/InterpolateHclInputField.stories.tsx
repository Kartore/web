import type { Meta, StoryObj } from '@storybook/react';

import { InterpolateHclInputField } from '.';

const meta = {
	component: InterpolateHclInputField,
} satisfies Meta<typeof InterpolateHclInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
