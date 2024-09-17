import type { Meta, StoryObj } from '@storybook/react';

import { GreaterThanOrEqualInputField } from '.';

const meta = {
  component: GreaterThanOrEqualInputField,
} satisfies Meta<typeof GreaterThanOrEqualInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
