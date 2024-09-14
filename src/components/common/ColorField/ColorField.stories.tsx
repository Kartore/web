import type { Meta, StoryObj } from '@storybook/react';

import { ColorField } from './index.ts';

const meta = {
  component: ColorField,
} satisfies Meta<typeof ColorField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
