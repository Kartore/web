import type { Meta, StoryObj } from '@storybook/react';

import { NumberArrayInnerField } from '.';

const meta = {
  component: NumberArrayInnerField,
} satisfies Meta<typeof NumberArrayInnerField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'X',
    value: 0,
  },
};
