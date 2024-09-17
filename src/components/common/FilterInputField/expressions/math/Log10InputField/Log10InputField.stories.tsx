import type { Meta, StoryObj } from '@storybook/react';

import { Log10InputField } from '.';

const meta = {
  component: Log10InputField,
} satisfies Meta<typeof Log10InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
