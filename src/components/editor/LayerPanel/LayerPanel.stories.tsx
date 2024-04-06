import { LayerPanel } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: LayerPanel,
} satisfies Meta<typeof LayerPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: {
      height: '500px',
    },
  },
};
