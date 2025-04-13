import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { describe } from 'vitest';

import * as Stories from './ToColorInputField.stories';

const { Default } = composeStories(Stories);

describe('Component: ToColorInputField', () => {
	describe('Snapshot', () => {
		it('Default', () => {
			const { asFragment } = render(<Default />);
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
