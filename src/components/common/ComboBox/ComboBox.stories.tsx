import { ComboBox } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ComboBox,
} satisfies Meta<typeof ComboBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
