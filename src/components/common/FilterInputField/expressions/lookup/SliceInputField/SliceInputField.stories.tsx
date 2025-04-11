import type { Meta, StoryObj } from '@storybook/react';

import { SliceInputField } from '.';

const meta = {
	component: SliceInputField,
} satisfies Meta<typeof SliceInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
