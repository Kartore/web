import { ColorSwatch } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ColorSwatch,
} satisfies Meta<typeof ColorSwatch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
