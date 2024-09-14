import type { Meta, StoryObj } from '@storybook/react';

import { BackgroundLayerSample } from '~/samples/LayerSample.ts';

import { LayerPropertiesPanel } from './index.ts';

const meta = {
  component: LayerPropertiesPanel,
} satisfies Meta<typeof LayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sources: {},
    layer: BackgroundLayerSample,
  },
};
