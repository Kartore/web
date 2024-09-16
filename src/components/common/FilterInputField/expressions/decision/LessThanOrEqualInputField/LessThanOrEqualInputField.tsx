import type { ComponentProps, FC } from 'react';

import type {
  CollatorExpressionSpecification,
  ExpressionInputType,
  ExpressionSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type LessThanOrEqualInputFieldProps = {
  value: [
    '<=',
    ExpressionInputType | ExpressionSpecification,
    ExpressionInputType | ExpressionSpecification,
    CollatorExpressionSpecification?,
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const LessThanOrEqualInputField: FC<LessThanOrEqualInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const left = value[1];
  const right = value[2];
  const collator = value[3];
  return (
    <div
      {...props}
      className={cn('flex flex-row items-center gap-2 rounded bg-black/5 py-0.5 px-0.5', className)}
    >
      {isExpression(left) ? (
        <ExpressionInputField value={left} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={left} />
      )}
      <div className={'flex flex-row py-0.5 px-0.5'}>&lt;=</div>
      {isExpression(right) ? (
        <ExpressionInputField value={right} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={right} />
      )}
      {collator && <div>{JSON.stringify(collator)}</div>}
      {children}
    </div>
  );
};

LessThanOrEqualInputField.displayName = 'LessThanOrEqualInputField';
