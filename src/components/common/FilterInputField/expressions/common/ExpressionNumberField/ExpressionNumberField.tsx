import type { FC } from 'react';
import { useRef } from 'react';

import { type AriaNumberFieldProps, useLocale, useNumberField } from 'react-aria';
import { useNumberFieldState } from 'react-stately';

import { cn } from '~/utils/tailwindUtil';

export type ExpressionNumberFieldProps = {
  className?: string;
} & AriaNumberFieldProps;

export const ExpressionNumberField: FC<ExpressionNumberFieldProps> = ({
  className,
  label,
  ...props
}) => {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, label, locale });
  const ref = useRef(null);
  const { labelProps, inputProps, groupProps } = useNumberField({ ...props, label }, state, ref);

  return (
    <div className={cn('flex flex-row items-center justify-between', className)}>
      <label
        {...labelProps}
        className={cn('sr-only text-sm font-semibold text-gray-600', labelProps.className)}
      >
        {label}
      </label>
      <div {...groupProps} className={'w-full'}>
        <input
          {...inputProps}
          ref={ref}
          className={cn(
            'w-full rounded border-none bg-gray-100 py-1 px-2 text-sm font-semibold transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-0',
            inputProps.className
          )}
        />
      </div>
    </div>
  );
};
ExpressionNumberField.displayName = 'ExpressionNumberField';
