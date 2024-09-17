import type { Meta, StoryObj } from '@storybook/react';

import { LiteralInputField } from '.';

const meta = {
  component: LiteralInputField,
} satisfies Meta<typeof LiteralInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
