import { ExpressionTextField } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ExpressionTextField,
} satisfies Meta<typeof ExpressionTextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
