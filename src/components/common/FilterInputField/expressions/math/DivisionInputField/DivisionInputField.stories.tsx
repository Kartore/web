import type { Meta, StoryObj } from '@storybook/react';

import { DivisionInputField } from '.';

const meta = {
  component: DivisionInputField,
} satisfies Meta<typeof DivisionInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
