import { composeStories } from '@storybook/react';

import * as Stories from './Button.stories';
import { render } from '@testing-library/react';

const { Default, Loading, Disabled, Click } = composeStories(Stories);

describe('Component: Button', () => {
  describe('Snapshot', () => {
    it('Default', () => {
      const { asFragment } = render(<Default />);
      expect(asFragment()).toMatchSnapshot();
    });
    it('Loading', () => {
      const { asFragment } = render(<Loading />);
      expect(asFragment()).toMatchSnapshot();
    });
    it('Disabled', () => {
      const { asFragment } = render(<Disabled />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('Interaction', () => {
    it('Click', async () => {
      const { container } = render(<Click />);
      await Click.play!({ canvasElement: container, args: Click.args });
    });
  });
});
