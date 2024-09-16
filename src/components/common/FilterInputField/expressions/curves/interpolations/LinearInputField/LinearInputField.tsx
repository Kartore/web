import type { ComponentProps, FC } from 'react';

import type { InterpolationSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type LinearInputFieldProps = {
  value: ['linear'];
  onChange?: (value: InterpolationSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const LinearInputField: FC<LinearInputFieldProps> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

LinearInputField.displayName = 'LinearInputField';
