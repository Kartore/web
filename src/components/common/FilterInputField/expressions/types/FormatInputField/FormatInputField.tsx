import type { ComponentProps, FC } from 'react';

import type { ColorSpecification, ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type FormatInputFieldProps = {
  value: [
    'format',
    ...(
      | string
      | ['image', ExpressionSpecification]
      | ExpressionSpecification
      | {
          'font-scale'?: number | ExpressionSpecification;
          'text-font'?: string[] | ExpressionSpecification;
          'text-color'?: ColorSpecification | ExpressionSpecification;
        }
    )[],
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const FormatInputField: FC<FormatInputFieldProps> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

FormatInputField.displayName = 'FormatInputField';
