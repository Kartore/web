import type { Meta, StoryObj } from '@storybook/react';

import { CaseInputField } from '.';

const meta = {
	component: CaseInputField,
} satisfies Meta<typeof CaseInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
