import type { Meta, StoryObj } from '@storybook/react';

import { RasterLayerPropertiesPanel } from './index.ts';

const meta = {
  component: RasterLayerPropertiesPanel,
} satisfies Meta<typeof RasterLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
