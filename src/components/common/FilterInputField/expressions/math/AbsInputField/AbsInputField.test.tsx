import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { describe } from 'vitest';

import * as Stories from './AbsInputField.stories';

const { Default } = composeStories(Stories);

describe('Component: AbsInputField', () => {
	describe('Snapshot', () => {
		it('Default', () => {
			const { asFragment } = render(<Default />);
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
