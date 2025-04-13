import type { Meta, StoryObj } from '@storybook/react';

import { MatchInputField } from '.';

const meta = {
	component: MatchInputField,
} satisfies Meta<typeof MatchInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
