import { Switch } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
