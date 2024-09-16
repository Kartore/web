import type { Meta, StoryObj } from '@storybook/react';

import { LessThanInputField } from '.';

const meta = {
  component: LessThanInputField,
} satisfies Meta<typeof LessThanInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
