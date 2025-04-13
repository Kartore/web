import type { Meta, StoryObj } from '@storybook/react';

import { LineProgressInputField } from '.';

const meta = {
	component: LineProgressInputField,
} satisfies Meta<typeof LineProgressInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
