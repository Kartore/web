import type { Meta, StoryObj } from '@storybook/react';

import { ToRgbaInputField } from '.';

const meta = {
	component: ToRgbaInputField,
} satisfies Meta<typeof ToRgbaInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
