import type { Meta, StoryObj } from '@storybook/react';

import { LineLayerPropertiesPanel } from './index.ts';

const meta = {
  component: LineLayerPropertiesPanel,
} satisfies Meta<typeof LineLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    layer: {
      id: 'line-layer-test',
      type: 'line',
      source: 'source-test',
      'source-layer': 'source-layer-test',
      minzoom: 0,
      maxzoom: 24,
      paint: {
        'line-color': '#ffffff',
      },
    },
    sources: {
      openmaptiles: {
        type: 'vector',
        url: 'https://tileserver.kartore.io/tiles/openstreetmap/tile.json',
      },
      natural_earth_shaded_relief: {
        maxzoom: 6,
        tileSize: 256,
        tiles: [
          'https://kartore.github.io/naturalearthtiles/tiles/natural_earth_2_shaded_relief.raster/{z}/{x}/{y}.png',
        ],
        type: 'raster',
      },
    },
  },
};
