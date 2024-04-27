import { Slider } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Slider,
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [20],
  },
};

export const Range: Story = {
  args: {
    defaultValue: [20, 80],
  },
};

export const HasMarker: Story = {
  args: {
    defaultValue: [20],
    marks: [{ value: 20, label: 'test' }, { value: 40 }, { value: 60 }, { value: 80 }],
  },
};

export const HasLabel: Story = {
  args: {
    children: 'Visible Zoom Level',
    defaultValue: [20],
    min: 0,
    max: 24,
  },
};
