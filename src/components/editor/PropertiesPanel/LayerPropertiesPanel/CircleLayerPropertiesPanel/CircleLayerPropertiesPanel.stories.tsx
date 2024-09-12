import type { Meta, StoryObj } from '@storybook/react';

import { CircleLayerPropertiesPanel } from './index.ts';

const meta = {
  component: CircleLayerPropertiesPanel,
} satisfies Meta<typeof CircleLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
