import type { ComponentProps, FC } from 'react';

import type {
  ExpressionInputType,
  ExpressionSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type ArrayInputFieldProps = {
  value:
    | ['array', unknown | ExpressionSpecification]
    | ['array', ExpressionInputType | ExpressionSpecification, unknown | ExpressionSpecification]
    | [
        'array',
        ExpressionInputType | ExpressionSpecification,
        number | ExpressionSpecification,
        unknown | ExpressionSpecification,
      ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ArrayInputField: FC<ArrayInputFieldProps> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

ArrayInputField.displayName = 'ArrayInputField';
