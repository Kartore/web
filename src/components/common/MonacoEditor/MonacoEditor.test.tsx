import { describe } from 'vitest';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';

import * as Stories from './MonacoEditor.stories';

const { Default } = composeStories(Stories);

describe('Component: MonacoEditor', () => {
  describe('Snapshot', () => {
    it('Default', () => {
      const { asFragment } = render(<Default />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
