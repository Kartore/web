import type { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, within } from '@storybook/test';
import type { LayerSpecification } from 'maplibre-gl';

import { osmLiberty } from '~/samples/osm-liberty.ts';

import { LayerPanel } from '.';

const meta = {
  component: LayerPanel,
} satisfies Meta<typeof LayerPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    layers: osmLiberty.layers,
    onChangeLayerOrder: fn(),
    style: {
      height: '500px',
    },
  },
};

export const ChangeLayerOrder: Story = {
  ...Default,
  args: {
    ...Default.args,
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: { 'background-color': 'rgb(239,239,239)' },
      },
      {
        id: 'natural_earth',
        type: 'raster',
        source: 'natural_earth_shaded_relief',
        maxzoom: 6,
        paint: {
          'raster-opacity': {
            base: 1.5,
            stops: [
              [0, 0.6],
              [6, 0.1],
            ],
          },
        },
      },
      {
        id: 'park',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'park',
        paint: {
          'fill-color': '#d8e8c8',
          'fill-opacity': 0.7,
          'fill-outline-color': 'rgba(95, 208, 100, 1)',
        },
      },
      {
        id: 'park_outline',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'park',
        paint: {
          'line-dasharray': [1, 1.5],
          'line-color': 'rgba(228, 241, 215, 1)',
        },
      },
      {
        id: 'landuse_residential',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'landuse',
        maxzoom: 8,
        filter: ['==', 'class', 'residential'],
        paint: {
          'fill-color': {
            base: 1,
            stops: [
              [9, 'hsla(0, 3%, 85%, 0.84)'],
              [12, 'hsla(35, 57%, 88%, 0.49)'],
            ],
          },
        },
      },
    ] as LayerSpecification[],
    onChangeLayerOrder: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const backgroundLayer = canvas.getByRole('button', { name: 'background' });
    backgroundLayer.focus();
    await new Promise((resolve) => setTimeout(resolve, 1));
    await fireEvent.keyDown(backgroundLayer, { code: 'Space' });
    await new Promise((resolve) => setTimeout(resolve, 1));
    await fireEvent.keyDown(canvasElement, { code: 'ArrowDown' });
    await new Promise((resolve) => setTimeout(resolve, 1));
    await fireEvent.keyDown(canvasElement, { code: 'ArrowDown' });
    await new Promise((resolve) => setTimeout(resolve, 1));
    await fireEvent.keyDown(canvasElement, { code: 'ArrowDown' });
    await new Promise((resolve) => setTimeout(resolve, 1));
    await fireEvent.keyDown(backgroundLayer, { code: 'Space' });
    await new Promise((resolve) => setTimeout(resolve, 1));
    await expect(args.onChangeLayerOrder).toHaveBeenCalledWith([
      {
        id: 'natural_earth',
        type: 'raster',
        source: 'natural_earth_shaded_relief',
        maxzoom: 6,
        paint: {
          'raster-opacity': {
            base: 1.5,
            stops: [
              [0, 0.6],
              [6, 0.1],
            ],
          },
        },
      },
      {
        id: 'park',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'park',
        paint: {
          'fill-color': '#d8e8c8',
          'fill-opacity': 0.7,
          'fill-outline-color': 'rgba(95, 208, 100, 1)',
        },
      },
      {
        id: 'background',
        type: 'background',
        paint: { 'background-color': 'rgb(239,239,239)' },
      },
      {
        id: 'park_outline',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'park',
        paint: {
          'line-dasharray': [1, 1.5],
          'line-color': 'rgba(228, 241, 215, 1)',
        },
      },
      {
        id: 'landuse_residential',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'landuse',
        maxzoom: 8,
        filter: ['==', 'class', 'residential'],
        paint: {
          'fill-color': {
            base: 1,
            stops: [
              [9, 'hsla(0, 3%, 85%, 0.84)'],
              [12, 'hsla(35, 57%, 88%, 0.49)'],
            ],
          },
        },
      },
    ]);
    expect(args.onChangeLayerOrder).toHaveBeenCalledTimes(1);
  },
};
