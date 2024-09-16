import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type AsinInputFieldProps = {
  value: ['asin', number | ExpressionSpecification];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const AsinInputField: FC<AsinInputFieldProps> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

AsinInputField.displayName = 'AsinInputField';
