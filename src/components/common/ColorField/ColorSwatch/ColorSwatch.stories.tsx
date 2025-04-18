import type { Meta, StoryObj } from '@storybook/react';

import { ColorSwatch } from './index.ts';

const meta = {
	component: ColorSwatch,
} satisfies Meta<typeof ColorSwatch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
