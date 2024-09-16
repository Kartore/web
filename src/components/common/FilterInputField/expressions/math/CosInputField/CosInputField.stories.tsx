import type { Meta, StoryObj } from '@storybook/react';

import { CosInputField } from '.';

const meta = {
  component: CosInputField,
} satisfies Meta<typeof CosInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
