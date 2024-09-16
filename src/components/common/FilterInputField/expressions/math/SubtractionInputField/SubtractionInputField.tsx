import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type SubtractionInputFieldProps = {
  value: ['-', number | ExpressionSpecification, (number | ExpressionSpecification)?];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const SubtractionInputField: FC<SubtractionInputFieldProps> = ({
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

SubtractionInputField.displayName = 'SubtractionInputField';
