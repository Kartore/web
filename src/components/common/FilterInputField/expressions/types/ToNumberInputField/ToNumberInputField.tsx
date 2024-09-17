import type { ComponentProps, FC } from 'react';
import { Fragment } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type ToNumberInputFieldProps = {
  value: ['to-number', unknown | ExpressionSpecification, ...(unknown | ExpressionSpecification)[]];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ToNumberInputField: FC<ToNumberInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const values = value.slice(1) as (unknown | ExpressionSpecification)[];
  return (
    <div
      {...props}
      className={cn('flex flex-row items-center gap-2 rounded bg-black/5 py-0.5 px-0.5', className)}
    >
      <div className={'flex flex-row py-0.5 px-0.5'}>typecast color</div>
      {values.map((arg, index) => (
        <Fragment key={'number' + index + arg}>
          {isExpression(arg) ? (
            <ExpressionInputField value={arg} onChange={onChange} />
          ) : (
            <div className={'flex flex-row py-0.5 px-0.5'}>{JSON.stringify(arg)}</div>
          )}
          {index < values.length - 1 && <div className={'flex flex-row py-0.5 px-0.5'}>OR</div>}
        </Fragment>
      ))}
      {children}
    </div>
  );
};

ToNumberInputField.displayName = 'ToNumberInputField';
