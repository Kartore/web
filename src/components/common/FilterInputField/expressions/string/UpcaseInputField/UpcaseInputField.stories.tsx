import type { Meta, StoryObj } from '@storybook/react';

import { UpcaseInputField } from '.';

const meta = {
  component: UpcaseInputField,
} satisfies Meta<typeof UpcaseInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
