import type { Meta, StoryObj } from '@storybook/react';

import { PropertiesInputField } from '.';

const meta = {
	component: PropertiesInputField,
} satisfies Meta<typeof PropertiesInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
