import type { Meta, StoryObj } from '@storybook/react';

import { LengthInputField } from '.';

const meta = {
	component: LengthInputField,
} satisfies Meta<typeof LengthInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
