import type { Meta, StoryObj } from '@storybook/react';

import { ExponentialInputField } from '.';

const meta = {
  component: ExponentialInputField,
} satisfies Meta<typeof ExponentialInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
