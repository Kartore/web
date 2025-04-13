import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { describe } from 'vitest';

import * as Stories from './CosInputField.stories';

const { Default } = composeStories(Stories);

describe('Component: CosInputField', () => {
	describe('Snapshot', () => {
		it('Default', () => {
			const { asFragment } = render(<Default />);
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
