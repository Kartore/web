import type { Meta, StoryObj } from '@storybook/react';

import { LnInputField } from '.';

const meta = {
  component: LnInputField,
} satisfies Meta<typeof LnInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
