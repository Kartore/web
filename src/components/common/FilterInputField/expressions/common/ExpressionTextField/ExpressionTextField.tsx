import type { FC } from 'react';
import { useRef } from 'react';

import { type AriaTextFieldProps, useTextField } from 'react-aria';

import { cn } from '~/utils/tailwindUtil';

export type ExpressionTextFieldProps = {
  className?: string;
} & AriaTextFieldProps;

export const ExpressionTextField: FC<ExpressionTextFieldProps> = ({
  className,
  label,
  ...props
}) => {
  const ref = useRef(null);
  const { labelProps, inputProps } = useTextField(props, ref);
  return (
    <div className={cn('flex flex-row items-center justify-between', className)}>
      <label
        {...labelProps}
        className={cn('sr-only text-sm font-semibold text-gray-600', labelProps.className)}
      >
        {label}
      </label>
      <input
        {...inputProps}
        ref={ref}
        className={cn(
          'w-full rounded border-none bg-black/5 px-2 py-1 text-sm font-semibold transition-colors hover:bg-black/10 focus-visible:bg-black/10 focus-visible:outline-0',
          inputProps.className
        )}
        onClick={(e) => {
          console.log('test2');
          e.stopPropagation();
        }}
      />
    </div>
  );
};

ExpressionTextField.displayName = 'ExpressionTextField';
