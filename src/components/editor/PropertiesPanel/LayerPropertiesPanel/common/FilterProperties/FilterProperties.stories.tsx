import type { Meta, StoryObj } from '@storybook/react';

import { FilterProperties } from '.';

const meta = {
	component: FilterProperties,
} satisfies Meta<typeof FilterProperties>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		layer: {
			id: 'landuse_residential',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'landuse',
			maxzoom: 8,
			filter: ['==', 'class', 'residential'],
			paint: {
				'fill-color': 'hsla(0, 3%, 85%, 0.84)',
			},
		},
	},
};
