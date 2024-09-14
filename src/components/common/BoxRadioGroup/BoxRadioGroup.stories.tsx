import type { Meta, StoryObj } from '@storybook/react';

import { BoxRadioGroup } from '.';

const meta = {
  component: BoxRadioGroup,
} satisfies Meta<typeof BoxRadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Numbers',
    items: [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
      { value: '3', label: 'Three' },
    ],
  },
};
