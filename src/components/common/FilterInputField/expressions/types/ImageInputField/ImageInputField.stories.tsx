import type { Meta, StoryObj } from '@storybook/react';

import { ImageInputField } from '.';

const meta = {
	component: ImageInputField,
} satisfies Meta<typeof ImageInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
