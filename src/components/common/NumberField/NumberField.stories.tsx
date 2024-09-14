import { NumberField } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: NumberField,
} satisfies Meta<typeof NumberField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
