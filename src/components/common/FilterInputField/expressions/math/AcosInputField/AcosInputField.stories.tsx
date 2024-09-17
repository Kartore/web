import type { Meta, StoryObj } from '@storybook/react';

import { AcosInputField } from '.';

const meta = {
  component: AcosInputField,
} satisfies Meta<typeof AcosInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
