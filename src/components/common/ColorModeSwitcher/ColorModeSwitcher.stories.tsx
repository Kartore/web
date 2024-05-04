import { ColorModeSwitcher } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ColorModeSwitcher,
} satisfies Meta<typeof ColorModeSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
