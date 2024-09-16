import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type DistanceInputFieldProps = {
  value: ['distance', unknown] | ['distance', Record<string, unknown> | ExpressionSpecification];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const DistanceInputField: FC<DistanceInputFieldProps> = ({
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

DistanceInputField.displayName = 'DistanceInputField';
