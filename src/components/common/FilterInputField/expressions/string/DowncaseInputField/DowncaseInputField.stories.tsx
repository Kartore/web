import type { Meta, StoryObj } from '@storybook/react';

import { DowncaseInputField } from '.';

const meta = {
	component: DowncaseInputField,
} satisfies Meta<typeof DowncaseInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
