import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type ObjectInputFieldProps = {
  value: ['object', unknown | ExpressionSpecification, ...(unknown | ExpressionSpecification)[]];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ObjectInputField: FC<ObjectInputFieldProps> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

ObjectInputField.displayName = 'ObjectInputField';
