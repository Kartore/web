import { ColorField } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ColorField,
} satisfies Meta<typeof ColorField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
