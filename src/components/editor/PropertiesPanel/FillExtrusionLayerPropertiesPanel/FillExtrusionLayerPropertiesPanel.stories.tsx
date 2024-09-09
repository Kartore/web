import type { Meta, StoryObj } from '@storybook/react';

import { FillExtrusionLayerPropertiesPanel } from '.';

const meta = {
  component: FillExtrusionLayerPropertiesPanel,
} satisfies Meta<typeof FillExtrusionLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
