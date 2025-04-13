import type { Meta, StoryObj } from '@storybook/react';

import { HeatmapDensityInputField } from '.';

const meta = {
	component: HeatmapDensityInputField,
} satisfies Meta<typeof HeatmapDensityInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
