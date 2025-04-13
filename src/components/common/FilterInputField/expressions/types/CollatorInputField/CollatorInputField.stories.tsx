import type { Meta, StoryObj } from '@storybook/react';

import { CollatorInputField } from '.';

const meta = {
	component: CollatorInputField,
} satisfies Meta<typeof CollatorInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
