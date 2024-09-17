import type { Meta, StoryObj } from '@storybook/react';

import { NumberInputField } from '.';

const meta = {
  component: NumberInputField,
} satisfies Meta<typeof NumberInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
