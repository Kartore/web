import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type PowerInputFieldProps = {
  value: ['^', number | ExpressionSpecification, number | ExpressionSpecification];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const PowerInputField: FC<PowerInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const number1 = value[1] as number | ExpressionSpecification;
  const number2 = value[2] as number | ExpressionSpecification;
  return (
    <div
      {...props}
      className={cn(
        'flex flex-row flex-wrap items-center rounded bg-black/5 py-0.5 px-0.5',
        className
      )}
    >
      <div className={'flex flex-row py-0.5 px-0.5'}>
        {isExpression(number1) ? (
          <ExpressionInputField value={number1} onChange={onChange} />
        ) : (
          <ExpressionInputTypeInputField value={number1} />
        )}
      </div>
      <div className={'flex flex-row py-0.5 px-0.5'}>^</div>
      <div className={'flex flex-row py-0.5 px-0.5'}>
        {isExpression(number2) ? (
          <ExpressionInputField value={number2} onChange={onChange} />
        ) : (
          <ExpressionInputTypeInputField value={number2} />
        )}
      </div>
      {children}
    </div>
  );
};

PowerInputField.displayName = 'PowerInputField';
