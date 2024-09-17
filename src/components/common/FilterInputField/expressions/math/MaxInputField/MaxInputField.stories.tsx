import type { Meta, StoryObj } from '@storybook/react';

import { MaxInputField } from '.';

const meta = {
  component: MaxInputField,
} satisfies Meta<typeof MaxInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
