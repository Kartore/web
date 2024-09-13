import type { Meta, StoryObj } from '@storybook/react';

import { RawDataProperties } from '.';

const meta = {
  component: RawDataProperties,
} satisfies Meta<typeof RawDataProperties>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    layer: {
      id: 'circle-layer-test',
      type: 'circle',
      source: 'source-test',
      'source-layer': 'source-layer-test',
      minzoom: 0,
      maxzoom: 24,
      paint: {
        'circle-color': '#ffffff',
      },
    },
  },
};
