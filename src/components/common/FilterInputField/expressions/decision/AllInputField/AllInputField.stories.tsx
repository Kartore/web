import type { Meta, StoryObj } from '@storybook/react';

import { AllInputField } from '.';

const meta = {
  component: AllInputField,
} satisfies Meta<typeof AllInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
