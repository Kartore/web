import type { ComponentProps, FC } from 'react';

import type { ExpressionInputType } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionTextField } from '~/components/common/FilterInputField/expressions/common/ExpressionTextField';
import { cn } from '~/utils/tailwindUtil.ts';

export type ExpressionInputTypeInputFieldProps = {
  value: ExpressionInputType | unknown;
  onChange?: (value: ExpressionInputType) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ExpressionInputTypeInputField: FC<ExpressionInputTypeInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  switch (typeof value) {
    case 'number':
      return (
        <div {...props} className={cn('flex flex-row px-0.5 py-0.5', className)}>
          number {value}
        </div>
      );
    case 'string':
      return (
        <ExpressionTextField
          className={cn('flex flex-row px-0.5 py-0.5', className)}
          value={value}
          onChange={onChange}
        />
      );
    case 'boolean':
      return (
        <div {...props} className={cn('flex flex-row px-0.5 py-0.5', className)}>
          boolean {value.toString()}
        </div>
      );
    default:
      return (
        <div {...props} className={cn('flex flex-row px-0.5 py-0.5', className)}>
          {JSON.stringify(value)}
        </div>
      );
  }
};

ExpressionInputTypeInputField.displayName = 'ExpressionInputTypeInputField';
