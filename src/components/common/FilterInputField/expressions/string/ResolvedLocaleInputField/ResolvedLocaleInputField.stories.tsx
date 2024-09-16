import type { Meta, StoryObj } from '@storybook/react';

import { ResolvedLocaleInputField } from '.';

const meta = {
  component: ResolvedLocaleInputField,
} satisfies Meta<typeof ResolvedLocaleInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
