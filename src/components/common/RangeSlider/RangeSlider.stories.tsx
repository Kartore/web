import type { Meta, StoryObj } from '@storybook/react';

import { RangeSlider } from '.';

const meta = {
  component: RangeSlider,
} satisfies Meta<typeof RangeSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    minValue: 0,
    maxValue: 100,
    step: 1,
    defaultValue: [0, 100],
  },
};
