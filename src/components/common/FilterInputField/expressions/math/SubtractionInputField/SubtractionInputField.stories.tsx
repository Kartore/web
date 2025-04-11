import type { Meta, StoryObj } from '@storybook/react';

import { SubtractionInputField } from '.';

const meta = {
	component: SubtractionInputField,
} satisfies Meta<typeof SubtractionInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
