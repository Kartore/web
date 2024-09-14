import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { NumberArrayField } from '.';

const meta = {
  component: NumberArrayField,
} satisfies Meta<typeof NumberArrayField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Numbers',
    arrayLabels: ['X', 'Y'],
    values: [0, 0],
    onChange: fn(),
  },
};
