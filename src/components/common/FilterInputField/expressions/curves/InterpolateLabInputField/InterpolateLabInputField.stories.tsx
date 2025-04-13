import type { Meta, StoryObj } from '@storybook/react';

import { InterpolateLabInputField } from '.';

const meta = {
	component: InterpolateLabInputField,
} satisfies Meta<typeof InterpolateLabInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
