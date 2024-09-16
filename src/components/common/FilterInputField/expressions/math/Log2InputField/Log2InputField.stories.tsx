import type { Meta, StoryObj } from '@storybook/react';

import { Log2InputField } from '.';

const meta = {
  component: Log2InputField,
} satisfies Meta<typeof Log2InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
