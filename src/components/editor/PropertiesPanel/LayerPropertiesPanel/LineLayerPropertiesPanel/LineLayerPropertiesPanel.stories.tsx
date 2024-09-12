import type { Meta, StoryObj } from '@storybook/react';

import { LineLayerPropertiesPanel } from './index.ts';

const meta = {
  component: LineLayerPropertiesPanel,
} satisfies Meta<typeof LineLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
