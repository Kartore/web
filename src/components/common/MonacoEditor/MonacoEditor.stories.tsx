import { MonacoEditor } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: MonacoEditor,
} satisfies Meta<typeof MonacoEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
