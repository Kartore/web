import type { Meta, StoryObj } from '@storybook/react';

import { FloorInputField } from '.';

const meta = {
  component: FloorInputField,
} satisfies Meta<typeof FloorInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
