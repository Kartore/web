import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { describe } from 'vitest';

import * as Stories from './InInputField.stories';

const { Default } = composeStories(Stories);

describe('Component: InInputField', () => {
	describe('Snapshot', () => {
		it('Default', () => {
			const { asFragment } = render(<Default />);
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
