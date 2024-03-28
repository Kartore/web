import { Spinner } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
