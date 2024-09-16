import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type LiteralInputFieldProps = {
  value: ['literal', unknown];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const LiteralInputField: FC<LiteralInputFieldProps> = ({
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

LiteralInputField.displayName = 'LiteralInputField';
