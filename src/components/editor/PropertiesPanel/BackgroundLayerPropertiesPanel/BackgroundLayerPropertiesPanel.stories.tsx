import type { Meta, StoryObj } from '@storybook/react';

import { BackgroundLayerPropertiesPanel } from '.';

const meta = {
  component: BackgroundLayerPropertiesPanel,
} satisfies Meta<typeof BackgroundLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    layer: {
      id: 'background',
      type: 'background',
      paint: { 'background-color': 'rgb(239,239,239)' },
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
