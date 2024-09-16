import type { Meta, StoryObj } from '@storybook/react';

import { AccumulatedInputField } from '.';

const meta = {
  component: AccumulatedInputField,
} satisfies Meta<typeof AccumulatedInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
