import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

export const isBooleanExpressionSpecification = (
	input: ExpressionSpecification,
) => {
	return Array.isArray(input) && input[0] === 'boolean';
};
