import type { ComponentProps, FC } from 'react';

import type {
  ExpressionInputType,
  ExpressionSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type LetInputFieldProps = {
  value: [
    'let',
    string,
    ExpressionInputType | ExpressionSpecification,
    ...(string | ExpressionInputType | ExpressionSpecification)[],
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const LetInputField: FC<LetInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const variableName = value[1];
  const variableValue = value[2];
  const expressions = value.slice(3);
  return (
    <div
      {...props}
      className={cn('flex flex-row items-center gap-2 rounded bg-black/5 py-0.5 px-0.5', className)}
    >
      <div className={'flex flex-row py-0.5 px-0.5'}>{variableName}</div>
      <div className={'flex flex-row py-0.5 px-0.5'}>=</div>
      {isExpression(variableValue) ? (
        <ExpressionInputField value={variableValue} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={variableValue} />
      )}
      {expressions.map((expression, index) => {
        return (
          <div key={index} className={'flex flex-row py-0.5 px-0.5'}>
            {isExpression(expression) ? (
              <ExpressionInputField value={expression} onChange={onChange} />
            ) : (
              <ExpressionInputTypeInputField value={expression} />
            )}
          </div>
        );
      })}
      {children}
    </div>
  );
};

LetInputField.displayName = 'LetInputField';
