import type { Meta, StoryObj } from '@storybook/react';

import { DistanceInputField } from '.';

const meta = {
	component: DistanceInputField,
} satisfies Meta<typeof DistanceInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
