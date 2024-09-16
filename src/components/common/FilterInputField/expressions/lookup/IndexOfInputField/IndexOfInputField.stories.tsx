import type { Meta, StoryObj } from '@storybook/react';

import { IndexOfInputField } from '.';

const meta = {
  component: IndexOfInputField,
} satisfies Meta<typeof IndexOfInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
