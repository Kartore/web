import type { Meta, StoryObj } from '@storybook/react';

import { ComboBox } from '.';

const meta = {
  component: ComboBox,
} satisfies Meta<typeof ComboBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
