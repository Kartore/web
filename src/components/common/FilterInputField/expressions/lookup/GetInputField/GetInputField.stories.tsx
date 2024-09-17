import type { Meta, StoryObj } from '@storybook/react';

import { GetInputField } from '.';

const meta = {
  component: GetInputField,
} satisfies Meta<typeof GetInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
