import type { Meta, StoryObj } from '@storybook/react';

import { AbsInputField } from '.';

const meta = {
  component: AbsInputField,
} satisfies Meta<typeof AbsInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
