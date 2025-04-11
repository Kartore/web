import type { Meta, StoryObj } from '@storybook/react';

import { InInputField } from '.';

const meta = {
	component: InInputField,
} satisfies Meta<typeof InInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
