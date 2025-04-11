import type { Meta, StoryObj } from '@storybook/react';

import { VarInputField } from '.';

const meta = {
	component: VarInputField,
} satisfies Meta<typeof VarInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
