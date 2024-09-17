import type { Meta, StoryObj } from '@storybook/react';

import { RgbInputField } from '.';

const meta = {
  component: RgbInputField,
} satisfies Meta<typeof RgbInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
