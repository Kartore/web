import type { Meta, StoryObj } from '@storybook/react';

import { MultiplicationInputField } from '.';

const meta = {
  component: MultiplicationInputField,
} satisfies Meta<typeof MultiplicationInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
