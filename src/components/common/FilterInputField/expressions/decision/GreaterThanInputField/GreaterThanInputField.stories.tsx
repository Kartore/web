import type { Meta, StoryObj } from '@storybook/react';

import { GreaterThanInputField } from '.';

const meta = {
	component: GreaterThanInputField,
} satisfies Meta<typeof GreaterThanInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
