import type { Meta, StoryObj } from '@storybook/react';

import { BackgroundLayerSample } from '~/samples/LayerSample.ts';

import { PropertiesPanel } from '.';

const meta = {
  component: PropertiesPanel,
} satisfies Meta<typeof PropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    layer: BackgroundLayerSample,
  },
};
