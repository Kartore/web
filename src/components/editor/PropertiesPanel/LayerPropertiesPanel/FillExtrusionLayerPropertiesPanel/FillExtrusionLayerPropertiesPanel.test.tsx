import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { describe } from 'vitest';

import * as Stories from './FillExtrusionLayerPropertiesPanel.stories.tsx';

const { Default } = composeStories(Stories);

describe('Component: FillExtrusionLayerPropertiesPanel', () => {
	describe('Snapshot', () => {
		it('Default', () => {
			const { asFragment } = render(<Default />);
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
