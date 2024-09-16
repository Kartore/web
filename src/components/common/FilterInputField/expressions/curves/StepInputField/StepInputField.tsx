import type { ComponentProps, FC } from 'react';

import type {
  ExpressionInputType,
  ExpressionSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type StepInputFieldProps = {
  value: [
    'step',
    number | ExpressionSpecification,
    ExpressionInputType | ExpressionSpecification,
    ...(number | ExpressionInputType | ExpressionSpecification)[],
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const StepInputField: FC<StepInputFieldProps> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

StepInputField.displayName = 'StepInputField';
