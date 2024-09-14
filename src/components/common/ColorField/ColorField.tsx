import type { FC } from 'react';
import { useRef } from 'react';

import type { AriaColorFieldProps } from '@react-aria/color';
import { useColorField } from '@react-aria/color';
import { useColorFieldState } from '@react-stately/color';

import { cn } from '~/utils/tailwindUtil';

export type ColorFieldProps = {
  className?: string;
} & AriaColorFieldProps;

export const ColorField: FC<ColorFieldProps> = ({ className, label, ...props }) => {
  const state = useColorFieldState(props);
  const ref = useRef(null);
  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useColorField(props, state, ref);
  return (
    <div className={cn('flex flex-row items-center justify-between', className)}>
      <label
        {...labelProps}
        className={cn('text-sm font-semibold text-gray-600', labelProps.className)}
      >
        {label}
      </label>
      <div
        className={
          'rounded border-none bg-gray-100 py-1 px-2 text-sm font-semibold transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-0'
        }
      >
        <input {...inputProps} ref={ref} className={cn('', inputProps.className)} />
      </div>
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

ColorField.displayName = 'ColorField';
