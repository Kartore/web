import type { Meta, StoryObj } from '@storybook/react';

import { LessThanOrEqualInputField } from '.';

const meta = {
	component: LessThanOrEqualInputField,
} satisfies Meta<typeof LessThanOrEqualInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
