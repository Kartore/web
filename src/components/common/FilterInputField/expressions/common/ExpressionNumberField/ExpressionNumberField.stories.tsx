import { ExpressionNumberField } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ExpressionNumberField,
} satisfies Meta<typeof ExpressionNumberField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
