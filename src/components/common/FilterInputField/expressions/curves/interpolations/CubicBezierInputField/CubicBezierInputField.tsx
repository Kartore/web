import type { ComponentProps, FC } from 'react';

import type {
  ExpressionSpecification,
  InterpolationSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type CubicBezierInputFieldProps = {
  value: [
    'cubic-bezier',
    number | ExpressionSpecification,
    number | ExpressionSpecification,
    number | ExpressionSpecification,
    number | ExpressionSpecification,
  ];
  onChange?: (value: InterpolationSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const CubicBezierInputField: FC<CubicBezierInputFieldProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

CubicBezierInputField.displayName = 'CubicBezierInputField';
