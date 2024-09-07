import { FillExtrusionLayerPropertiesPanel } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: FillExtrusionLayerPropertiesPanel,
} satisfies Meta<typeof FillExtrusionLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
