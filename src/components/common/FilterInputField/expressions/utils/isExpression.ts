import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';
import { isExpression as isExpressionNative } from '@maplibre/maplibre-gl-style-spec';

export const isExpression = (input: any): input is ExpressionSpecification => {
  return isExpressionNative(input);
};
