import type { Meta, StoryObj } from '@storybook/react';

import { AtInputField } from '.';

const meta = {
  component: AtInputField,
} satisfies Meta<typeof AtInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
