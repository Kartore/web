import type { Meta, StoryObj } from '@storybook/react';

import { RgbaInputField } from '.';

const meta = {
  component: RgbaInputField,
} satisfies Meta<typeof RgbaInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
