import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

export const isEExpressionSpecification = (input: ExpressionSpecification) => {
	// @ts-expect-error e is a valid expression
	return Array.isArray(input) && input[0] === 'e';
};
