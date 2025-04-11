import type { Meta, StoryObj } from '@storybook/react';

import { GeometryTypeInputField } from '.';

const meta = {
	component: GeometryTypeInputField,
} satisfies Meta<typeof GeometryTypeInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
