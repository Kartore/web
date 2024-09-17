import type { Meta, StoryObj } from '@storybook/react';

import { PiInputField } from '.';

const meta = {
  component: PiInputField,
} satisfies Meta<typeof PiInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
