import type { ComponentProps, FC } from 'react';

import type {
  CollatorExpressionSpecification,
  ExpressionSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type CollatorInputFieldProps = {
  value: CollatorExpressionSpecification;
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const CollatorInputField: FC<CollatorInputFieldProps> = ({
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

CollatorInputField.displayName = 'CollatorInputField';
