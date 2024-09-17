import type { Meta, StoryObj } from '@storybook/react';

import { SqrtInputField } from '.';

const meta = {
  component: SqrtInputField,
} satisfies Meta<typeof SqrtInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
