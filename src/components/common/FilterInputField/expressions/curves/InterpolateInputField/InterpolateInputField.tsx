import type { ComponentProps, FC } from 'react';

import type {
  ColorSpecification,
  ExpressionSpecification,
  InterpolationSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type InterpolateInputFieldProps = {
  value: [
    'interpolate',
    InterpolationSpecification,
    number | ExpressionSpecification,
    ...(number | number[] | ColorSpecification | ExpressionSpecification)[],
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const InterpolateInputField: FC<InterpolateInputFieldProps> = ({
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

InterpolateInputField.displayName = 'InterpolateInputField';
