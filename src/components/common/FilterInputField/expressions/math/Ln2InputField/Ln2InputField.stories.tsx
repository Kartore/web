import type { Meta, StoryObj } from '@storybook/react';

import { Ln2InputField } from '.';

const meta = {
  component: Ln2InputField,
} satisfies Meta<typeof Ln2InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
