import type { Meta, StoryObj } from '@storybook/react';

import { AtanInputField } from '.';

const meta = {
  component: AtanInputField,
} satisfies Meta<typeof AtanInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
