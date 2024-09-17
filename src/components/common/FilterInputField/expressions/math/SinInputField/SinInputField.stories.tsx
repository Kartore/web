import type { Meta, StoryObj } from '@storybook/react';

import { SinInputField } from '.';

const meta = {
  component: SinInputField,
} satisfies Meta<typeof SinInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
