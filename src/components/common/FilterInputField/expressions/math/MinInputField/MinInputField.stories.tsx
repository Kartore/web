import type { Meta, StoryObj } from '@storybook/react';

import { MinInputField } from '.';

const meta = {
	component: MinInputField,
} satisfies Meta<typeof MinInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
