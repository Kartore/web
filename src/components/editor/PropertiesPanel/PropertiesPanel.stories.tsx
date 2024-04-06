import { PropertiesPanel } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: PropertiesPanel,
} satisfies Meta<typeof PropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: {
      height: '500px',
    },
  },
};
