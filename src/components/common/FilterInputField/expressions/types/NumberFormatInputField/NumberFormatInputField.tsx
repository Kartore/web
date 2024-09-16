import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type NumberFormatInputFieldProps = {
  value: [
    'number-format',
    number | ExpressionSpecification,
    {
      locale?: string | ExpressionSpecification;
      currency?: string | ExpressionSpecification;
      'min-fraction-digits'?: number | ExpressionSpecification;
      'max-fraction-digits'?: number | ExpressionSpecification;
    },
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const NumberFormatInputField: FC<NumberFormatInputFieldProps> = ({
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

NumberFormatInputField.displayName = 'NumberFormatInputField';
