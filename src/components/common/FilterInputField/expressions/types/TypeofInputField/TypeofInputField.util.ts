import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

export const isTypeofExpressionSpecification = (
	input: ExpressionSpecification,
) => {
	// @ts-expect-error typeof is a valid expression
	return Array.isArray(input) && input[0] === 'typeof';
};
