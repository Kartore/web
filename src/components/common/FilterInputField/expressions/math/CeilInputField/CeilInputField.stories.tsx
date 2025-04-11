import type { Meta, StoryObj } from '@storybook/react';

import { CeilInputField } from '.';

const meta = {
	component: CeilInputField,
} satisfies Meta<typeof CeilInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
