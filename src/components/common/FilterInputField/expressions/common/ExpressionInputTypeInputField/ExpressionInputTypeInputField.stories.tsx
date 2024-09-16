import type { Meta, StoryObj } from '@storybook/react';

import { ExpressionInputTypeInputField } from '.';

const meta = {
  component: ExpressionInputTypeInputField,
} satisfies Meta<typeof ExpressionInputTypeInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
