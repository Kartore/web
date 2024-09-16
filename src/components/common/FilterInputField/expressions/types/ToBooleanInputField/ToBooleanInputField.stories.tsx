import type { Meta, StoryObj } from '@storybook/react';

import { ToBooleanInputField } from '.';

const meta = {
  component: ToBooleanInputField,
} satisfies Meta<typeof ToBooleanInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
