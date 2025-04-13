import type { Meta, StoryObj } from '@storybook/react';

import { CubicBezierInputField } from '.';

const meta = {
	component: CubicBezierInputField,
} satisfies Meta<typeof CubicBezierInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
