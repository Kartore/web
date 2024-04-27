import { describe } from 'vitest';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';

import * as Stories from './Slider.stories.tsx';

const { Default, Range, HasMarker } = composeStories(Stories);

describe('Component: Slider', () => {
  describe('Snapshot', () => {
    it('Default', () => {
      const { asFragment } = render(<Default />);
      expect(asFragment()).toMatchSnapshot();
    });
    it('Range', () => {
      const { asFragment } = render(<Range />);
      expect(asFragment()).toMatchSnapshot();
    });
    it('HasMarker', () => {
      const { asFragment } = render(<HasMarker />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
