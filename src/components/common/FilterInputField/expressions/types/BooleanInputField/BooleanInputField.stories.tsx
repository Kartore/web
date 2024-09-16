import type { Meta, StoryObj } from '@storybook/react';

import { BooleanInputField } from '.';

const meta = {
  component: BooleanInputField,
} satisfies Meta<typeof BooleanInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
