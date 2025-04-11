import type { Meta, StoryObj } from '@storybook/react';

import { StepInputField } from '.';

const meta = {
	component: StepInputField,
} satisfies Meta<typeof StepInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
