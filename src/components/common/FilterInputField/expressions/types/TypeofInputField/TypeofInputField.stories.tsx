import type { Meta, StoryObj } from '@storybook/react';

import { TypeofInputField } from '.';

const meta = {
	component: TypeofInputField,
} satisfies Meta<typeof TypeofInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
