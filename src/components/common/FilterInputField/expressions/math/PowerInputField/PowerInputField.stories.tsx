import type { Meta, StoryObj } from '@storybook/react';

import { PowerInputField } from '.';

const meta = {
  component: PowerInputField,
} satisfies Meta<typeof PowerInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
