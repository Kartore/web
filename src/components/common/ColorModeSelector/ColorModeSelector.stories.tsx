import { ColorModeSelector } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor } from '@storybook/test';

const meta = {
  component: ColorModeSelector,
} satisfies Meta<typeof ColorModeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Light: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: 'Color Mode Setting',
    });
    await userEvent.click(button);
    const light = canvas.getByRole('option', {
      name: 'Light',
    });
    await userEvent.click(light);
    await expect(button.textContent).toBe('Light');
  },
};

export const Dark: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: 'Color Mode Setting',
    });
    await waitFor(() => expect(button).toBeInTheDocument());
    await userEvent.click(button);
    const dark = canvas.getByRole('option', {
      name: 'Dark',
    });
    await userEvent.click(dark);
    await expect(button.textContent).toBe('Dark');
  },
};

export const System: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: 'Color Mode Setting',
    });
    await userEvent.click(button);
    const system = canvas.getByRole('option', {
      name: 'System',
    });
    await userEvent.click(system);
    await expect(button.textContent).toBe('System');
  },
};
