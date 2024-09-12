import type { Meta, StoryObj } from '@storybook/react';

import { GeneralProperties } from './index.ts';

const meta = {
  component: GeneralProperties,
} satisfies Meta<typeof GeneralProperties>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    layer: {
      id: 'landcover_wood',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landcover',
      filter: ['all', ['==', 'class', 'wood']],
      paint: {
        'fill-antialias': false,
        'fill-color': 'hsla(98, 61%, 72%, 0.7)',
        'fill-opacity': 0.4,
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
