import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type FeatureStateInputFieldProps = {
  value: ['feature-state', string];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const FeatureStateInputField: FC<FeatureStateInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const stateName = value[1];
  return (
    <div
      {...props}
      className={cn('flex flex-row items-center gap-2 rounded bg-black/5 py-0.5 px-0.5', className)}
    >
      "{stateName}" from feature-state
      {children}
    </div>
  );
};

FeatureStateInputField.displayName = 'FeatureStateInputField';
