import type { FC } from 'react';
import { useRef } from 'react';

import type { AriaTextFieldProps } from 'react-aria';
import { useTextField } from 'react-aria';

import { cn } from '~/utils/tailwindUtil';

export type TextFieldProps = {
  className?: string;
} & AriaTextFieldProps;

export const TextField: FC<TextFieldProps> = ({ className, label, ...props }) => {
  const ref = useRef(null);
  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useTextField(props, ref);
  return (
    <div className={cn('flex flex-row items-center justify-between', className)}>
      <label
        {...labelProps}
        className={cn('text-sm font-semibold text-gray-600', labelProps.className)}
      >
        {label}
      </label>
      <input
        {...inputProps}
        ref={ref}
        className={cn(
          'rounded border-none bg-gray-100 py-1 px-2 text-sm font-semibold transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-0',
          inputProps.className
        )}
      />
      {props.description && (
        <div {...descriptionProps} className={cn('text-xs', descriptionProps.className)}>
          {props.description}
        </div>
      )}
      {isInvalid && (
        <div {...errorMessageProps} className={cn('text-red text-xs', errorMessageProps.className)}>
          {validationErrors.join(' ')}
        </div>
      )}
    </div>
  );
};

TextField.displayName = 'TextField';
