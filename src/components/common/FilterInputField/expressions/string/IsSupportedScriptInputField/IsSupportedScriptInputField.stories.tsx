import type { Meta, StoryObj } from '@storybook/react';

import { IsSupportedScriptInputField } from '.';

const meta = {
	component: IsSupportedScriptInputField,
} satisfies Meta<typeof IsSupportedScriptInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
