import type { Meta, StoryObj } from '@storybook/react';

import { AnyInputField } from '.';

const meta = {
	component: AnyInputField,
} satisfies Meta<typeof AnyInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
