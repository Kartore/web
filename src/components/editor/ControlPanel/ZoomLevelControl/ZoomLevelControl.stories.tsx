import type { Meta, StoryObj } from '@storybook/react';

import { ZoomLevelControl } from '.';

const meta = {
  component: ZoomLevelControl,
} satisfies Meta<typeof ZoomLevelControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
