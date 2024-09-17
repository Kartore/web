import type { Meta, StoryObj } from '@storybook/react';

import { IdInputField } from '.';

const meta = {
  component: IdInputField,
} satisfies Meta<typeof IdInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
