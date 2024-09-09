import type { Meta, StoryObj } from '@storybook/react';

import { HillshadeLayerPropertiesPanel } from '.';

const meta = {
  component: HillshadeLayerPropertiesPanel,
} satisfies Meta<typeof HillshadeLayerPropertiesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
