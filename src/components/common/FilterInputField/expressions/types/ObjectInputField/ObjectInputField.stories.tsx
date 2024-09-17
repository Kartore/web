import type { Meta, StoryObj } from '@storybook/react';

import { ObjectInputField } from '.';

const meta = {
  component: ObjectInputField,
} satisfies Meta<typeof ObjectInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
