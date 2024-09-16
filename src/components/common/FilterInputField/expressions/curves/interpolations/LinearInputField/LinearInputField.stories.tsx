import type { Meta, StoryObj } from '@storybook/react';

import { LinearInputField } from '.';

const meta = {
  component: LinearInputField,
} satisfies Meta<typeof LinearInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
