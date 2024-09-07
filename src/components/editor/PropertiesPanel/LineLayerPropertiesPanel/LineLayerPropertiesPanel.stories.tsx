import { LineLayerPropertiesPanel } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: LineLayerPropertiesPanel,
} satisfies Meta<typeof LineLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
