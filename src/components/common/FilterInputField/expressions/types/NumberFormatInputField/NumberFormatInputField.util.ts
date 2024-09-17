import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

export const isNumberFormatExpressionSpecification = (input: ExpressionSpecification) => {
  return Array.isArray(input) && input[0] === 'number-format';
};
