import type { Meta, StoryObj } from '@storybook/react';

import { WithinInputField } from '.';

const meta = {
  component: WithinInputField,
} satisfies Meta<typeof WithinInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
