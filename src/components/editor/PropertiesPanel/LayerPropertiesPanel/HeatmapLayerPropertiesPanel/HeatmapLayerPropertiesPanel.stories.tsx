import type { Meta, StoryObj } from '@storybook/react';

import { HeatmapLayerPropertiesPanel } from './index.ts';

const meta = {
  component: HeatmapLayerPropertiesPanel,
} satisfies Meta<typeof HeatmapLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
