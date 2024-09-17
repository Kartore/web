import type { Meta, StoryObj } from '@storybook/react';

import { CoalesceInputField } from '.';

const meta = {
  component: CoalesceInputField,
} satisfies Meta<typeof CoalesceInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
