import type { Meta, StoryObj } from '@storybook/react';

import { SymbolLayerPropertiesPanel } from '.';

const meta = {
  component: SymbolLayerPropertiesPanel,
} satisfies Meta<typeof SymbolLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
