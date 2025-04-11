import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { describe } from 'vitest';

import * as Stories from './HillshadeLayerPropertiesPanel.stories.tsx';

const { Default } = composeStories(Stories);

describe('Component: HillshadeLayerPropertiesPanel', () => {
	describe('Snapshot', () => {
		it('Default', () => {
			const { asFragment } = render(<Default />);
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
