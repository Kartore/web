import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type CosInputFieldProps = {
  value: ['cos', number | ExpressionSpecification];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const CosInputField: FC<CosInputFieldProps> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

CosInputField.displayName = 'CosInputField';
