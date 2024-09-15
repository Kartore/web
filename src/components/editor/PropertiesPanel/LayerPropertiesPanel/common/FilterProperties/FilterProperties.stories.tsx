import { FilterProperties } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: FilterProperties,
} satisfies Meta<typeof FilterProperties>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
