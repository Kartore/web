import type { Meta, StoryObj } from '@storybook/react';

import { NumberFormatInputField } from '.';

const meta = {
  component: NumberFormatInputField,
} satisfies Meta<typeof NumberFormatInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
