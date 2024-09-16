import type { Meta, StoryObj } from '@storybook/react';

import { RoundInputField } from '.';

const meta = {
  component: RoundInputField,
} satisfies Meta<typeof RoundInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
