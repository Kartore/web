import type { Meta, StoryObj } from '@storybook/react';

import { LetInputField } from '.';

const meta = {
  component: LetInputField,
} satisfies Meta<typeof LetInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
