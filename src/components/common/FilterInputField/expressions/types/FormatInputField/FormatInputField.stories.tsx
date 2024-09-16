import type { Meta, StoryObj } from '@storybook/react';

import { FormatInputField } from '.';

const meta = {
  component: FormatInputField,
} satisfies Meta<typeof FormatInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
