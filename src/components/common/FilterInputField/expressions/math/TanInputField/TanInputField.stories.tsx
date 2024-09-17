import type { Meta, StoryObj } from '@storybook/react';

import { TanInputField } from '.';

const meta = {
  component: TanInputField,
} satisfies Meta<typeof TanInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
