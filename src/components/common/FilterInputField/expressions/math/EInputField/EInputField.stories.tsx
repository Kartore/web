import type { Meta, StoryObj } from '@storybook/react';

import { EInputField } from '.';

const meta = {
  component: EInputField,
} satisfies Meta<typeof EInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
