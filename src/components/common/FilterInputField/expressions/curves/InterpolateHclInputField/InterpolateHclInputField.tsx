import type { ComponentProps, FC } from 'react';

import type {
  ColorSpecification,
  ExpressionSpecification,
  InterpolationSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type InterpolateHclInputFieldProps = {
  value: [
    'interpolate-hcl',
    InterpolationSpecification,
    number | ExpressionSpecification,
    ...(number | ColorSpecification)[],
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const InterpolateHclInputField: FC<InterpolateHclInputFieldProps> = ({
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

InterpolateHclInputField.displayName = 'InterpolateHclInputField';
