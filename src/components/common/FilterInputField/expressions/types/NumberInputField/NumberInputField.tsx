import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type NumberInputFieldProps = {
  value: ['number', unknown | ExpressionSpecification, ...(unknown | ExpressionSpecification)[]];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const NumberInputField: FC<NumberInputFieldProps> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

NumberInputField.displayName = 'NumberInputField';
