import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { describe } from 'vitest';

import * as Stories from './HeatmapLayerPropertiesPanel.stories.tsx';

const { Default } = composeStories(Stories);

describe('Component: HeatmapLayerPropertiesPanel', () => {
  describe('Snapshot', () => {
    it('Default', () => {
      const { asFragment } = render(<Default />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
