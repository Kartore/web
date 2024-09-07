import { HillshadeLayerPropertiesPanel } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: HillshadeLayerPropertiesPanel,
} satisfies Meta<typeof HillshadeLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
