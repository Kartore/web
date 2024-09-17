import type { Meta, StoryObj } from '@storybook/react';

import { ZoomInputField } from '.';

const meta = {
  component: ZoomInputField,
} satisfies Meta<typeof ZoomInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
