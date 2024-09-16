import type { Meta, StoryObj } from '@storybook/react';

import { AsinInputField } from '.';

const meta = {
  component: AsinInputField,
} satisfies Meta<typeof AsinInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
