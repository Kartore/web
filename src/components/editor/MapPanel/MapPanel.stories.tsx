import { MapPanel } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { osmLiberty } from '~/samples/osm-liberty.ts';

const meta = {
  component: MapPanel,
} satisfies Meta<typeof MapPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: {
      height: '500px',
    },
    mapStyle: osmLiberty,
  },
};
