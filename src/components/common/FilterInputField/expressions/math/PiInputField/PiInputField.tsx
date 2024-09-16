import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type PiInputFieldProps = {
  value: ['pi'];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const PiInputField: FC<PiInputFieldProps> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

PiInputField.displayName = 'PiInputField';
