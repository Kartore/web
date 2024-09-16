import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

export const isPropertiesExpressionSpecification = (input: ExpressionSpecification) => {
  return Array.isArray(input) && input[0] === 'properties';
};
