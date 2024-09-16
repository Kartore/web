import type { ComponentProps, FC } from 'react';

import type {
  ExpressionSpecification,
  InterpolationSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type ExponentialInputFieldProps = {
  value: ['exponential', number | ExpressionSpecification];
  onChange?: (value: InterpolationSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ExponentialInputField: FC<ExponentialInputFieldProps> = ({
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

ExponentialInputField.displayName = 'ExponentialInputField';
