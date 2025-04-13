import type { Meta, StoryObj } from '@storybook/react';

import { MonacoEditor } from '.';

const meta = {
	component: MonacoEditor,
} satisfies Meta<typeof MonacoEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
