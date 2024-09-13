import type { Meta, StoryObj } from '@storybook/react';

import { SymbolLayerPropertiesPanel } from './index.ts';

const meta = {
  component: SymbolLayerPropertiesPanel,
} satisfies Meta<typeof SymbolLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    layer: {
      id: 'symbol-layer-test',
      type: 'symbol',
      source: 'source-test',
      'source-layer': 'source-layer-test',
      minzoom: 0,
      maxzoom: 24,
      layout: {
        'text-field': 'test',
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
