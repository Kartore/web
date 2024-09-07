import { BackgroundLayerPropertiesPanel } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: BackgroundLayerPropertiesPanel,
} satisfies Meta<typeof BackgroundLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
