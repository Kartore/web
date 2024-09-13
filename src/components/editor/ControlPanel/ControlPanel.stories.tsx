import { ControlPanel } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ControlPanel,
} satisfies Meta<typeof ControlPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
