import { MapPanel } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: MapPanel,
} satisfies Meta<typeof MapPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: {
      height: '500px',
    },
  },
};
