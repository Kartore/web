import type { ComponentProps, FC } from 'react';

import type {
  ColorSpecification,
  ExpressionSpecification,
  InterpolationSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type InterpolateLabInputFieldProps = {
  value: [
    'interpolate-lab',
    InterpolationSpecification,
    number | ExpressionSpecification,
    ...(number | ColorSpecification)[],
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const InterpolateLabInputField: FC<InterpolateLabInputFieldProps> = ({
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

InterpolateLabInputField.displayName = 'InterpolateLabInputField';
