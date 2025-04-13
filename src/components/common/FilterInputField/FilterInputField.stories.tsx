import type { Meta, StoryObj } from '@storybook/react';

import { FilterInputField } from '.';

const meta = {
	component: FilterInputField,
} satisfies Meta<typeof FilterInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
