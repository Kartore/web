import type { Meta, StoryObj } from '@storybook/react';

import { StringInputField } from '.';

const meta = {
  component: StringInputField,
} satisfies Meta<typeof StringInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
