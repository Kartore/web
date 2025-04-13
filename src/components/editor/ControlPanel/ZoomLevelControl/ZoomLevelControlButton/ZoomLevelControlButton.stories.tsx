import type { Meta, StoryObj } from '@storybook/react';

import { ZoomLevelControlButton } from '.';

const meta = {
	component: ZoomLevelControlButton,
} satisfies Meta<typeof ZoomLevelControlButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
