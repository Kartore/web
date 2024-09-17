import type { Meta, StoryObj } from '@storybook/react';

import { EyeDropperButton } from '.';

const meta = {
  component: EyeDropperButton,
} satisfies Meta<typeof EyeDropperButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
