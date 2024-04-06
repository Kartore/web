import { ThemeInjector } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';

const meta = {
  component: ThemeInjector,
} satisfies Meta<typeof ThemeInjector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NothingRenderCheck: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    await expect(canvasElement.children.length).toBe(0);
  },
};
