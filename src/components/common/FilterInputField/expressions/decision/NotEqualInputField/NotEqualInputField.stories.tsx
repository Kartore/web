import type { Meta, StoryObj } from '@storybook/react';

import { NotEqualInputField } from '.';

const meta = {
  component: NotEqualInputField,
} satisfies Meta<typeof NotEqualInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
