import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from '.';

const meta = {
	component: TextField,
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
