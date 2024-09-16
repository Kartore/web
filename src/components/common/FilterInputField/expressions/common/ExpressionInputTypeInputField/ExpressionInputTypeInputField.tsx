import type { ComponentProps, FC } from 'react';

import type { ExpressionInputType } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil.ts';

export type ExpressionInputTypeInputFieldProps = {
  value: ExpressionInputType;
  onChange?: (value: ExpressionInputType) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ExpressionInputTypeInputField: FC<ExpressionInputTypeInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  return (
    <div {...props} className={cn('flex flex-row py-0.5 px-0.5', className)}>
      {typeof value === 'string'
        ? '"' + value + '"'
        : typeof value === 'number'
          ? value
          : value.toString()}
      {children}
    </div>
  );
};

ExpressionInputTypeInputField.displayName = 'ExpressionInputTypeInputField';
