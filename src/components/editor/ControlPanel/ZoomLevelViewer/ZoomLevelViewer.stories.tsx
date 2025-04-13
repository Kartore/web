import type { Meta, StoryObj } from '@storybook/react';

import { ZoomLevelViewer } from '.';

const meta = {
	component: ZoomLevelViewer,
} satisfies Meta<typeof ZoomLevelViewer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
