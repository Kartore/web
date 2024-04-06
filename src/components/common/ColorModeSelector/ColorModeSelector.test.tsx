import { describe } from 'vitest';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';

import * as Stories from './ColorModeSelector.stories';

const { Default, Dark, Light, System } = composeStories(Stories);

describe('Component: ColorModeSelector', () => {
  describe('Snapshot', () => {
    it('Default', () => {
      const { asFragment } = render(<Default />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('Interaction', () => {
    it('Light', async () => {
      const { container } = render(<Light />);
      await Light.play!({ canvasElement: container, args: Light.args });
    });
    it('Dark', async () => {
      const { container } = render(<Dark />);
      await Dark.play!({ canvasElement: container, args: Dark.args });
    });
    it('System', async () => {
      const { container } = render(<System />);
      await System.play!({ canvasElement: container, args: System.args });
    });
  });
});
