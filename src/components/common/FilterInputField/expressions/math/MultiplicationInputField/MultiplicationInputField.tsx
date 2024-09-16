import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type MultiplicationInputFieldProps = {
  value: [
    '*',
    number | ExpressionSpecification,
    number | ExpressionSpecification,
    ...(number | ExpressionSpecification)[],
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const MultiplicationInputField: FC<MultiplicationInputFieldProps> = ({
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

MultiplicationInputField.displayName = 'MultiplicationInputField';
