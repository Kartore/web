import type { Meta, StoryObj } from '@storybook/react';

import { BackgroundLayerPropertiesPanel } from './index.ts';

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
	},
};
