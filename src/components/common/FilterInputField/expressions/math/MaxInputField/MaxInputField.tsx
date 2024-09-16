import type { ComponentProps, FC } from 'react';
import { Fragment } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type MaxInputFieldProps = {
  value: ['max', number | ExpressionSpecification, ...(number | ExpressionSpecification)[]];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const MaxInputField: FC<MaxInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const numbers = value.slice(1) as (number | ExpressionSpecification)[];
  return (
    <div
      {...props}
      className={cn(
        'flex flex-row flex-wrap items-center rounded bg-black/5 py-0.5 px-0.5',
        className
      )}
    >
      <div className={'flex flex-row py-0.5 px-0.5'}>max(</div>
      {numbers.map((num, index) => {
        return (
          <Fragment key={index}>
            <div className={'flex flex-row py-0.5 px-0.5'}>
              {isExpression(num) ? (
                <ExpressionInputField value={num} onChange={onChange} />
              ) : (
                <ExpressionInputTypeInputField value={num} />
              )}
            </div>
            {index < numbers.length - 1 && (
              <div key={index} className={'flex flex-row py-0.5 px-0.5'}>
                ,
              </div>
            )}
          </Fragment>
        );
      })}
      <div className={'flex flex-row py-0.5 px-0.5'}>)</div>
      {children}
    </div>
  );
};

MaxInputField.displayName = 'MaxInputField';
