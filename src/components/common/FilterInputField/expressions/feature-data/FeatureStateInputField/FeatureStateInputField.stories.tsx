import type { Meta, StoryObj } from '@storybook/react';

import { FeatureStateInputField } from '.';

const meta = {
	component: FeatureStateInputField,
} satisfies Meta<typeof FeatureStateInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
