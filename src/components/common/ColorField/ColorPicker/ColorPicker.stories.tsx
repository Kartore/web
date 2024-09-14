import type { Meta, StoryObj } from '@storybook/react';

import { ColorPicker } from './index.ts';

const meta = {
  component: ColorPicker,
} satisfies Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
