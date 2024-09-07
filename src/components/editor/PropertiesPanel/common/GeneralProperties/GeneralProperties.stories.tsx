import { GeneralProperties } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: GeneralProperties,
} satisfies Meta<typeof GeneralProperties>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
