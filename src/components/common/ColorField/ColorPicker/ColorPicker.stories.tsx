import { ColorPicker } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ColorPicker,
} satisfies Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
