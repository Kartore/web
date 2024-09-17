import type { ComponentProps, FC } from 'react';

import type {
  ExpressionSpecification,
  InterpolationSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type CubicBezierInputFieldProps = {
  value: [
    'cubic-bezier',
    number | ExpressionSpecification,
    number | ExpressionSpecification,
    number | ExpressionSpecification,
    number | ExpressionSpecification,
  ];
  onChange?: (value: InterpolationSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const CubicBezierInputField: FC<CubicBezierInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const num1 = value[1];
  const num2 = value[2];
  const num3 = value[3];
  const num4 = value[4];
  return (
    <div
      {...props}
      className={cn(
        'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 py-0.5 px-0.5',
        className
      )}
    >
      <div className={'flex flex-row py-0.5 px-0.5'}>cubic-bezier(</div>
      {isExpression(num1) ? (
        <ExpressionInputField value={num1} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={num1} />
      )}
      <div className={'flex flex-row py-0.5 px-0.5'}>,</div>
      {isExpression(num2) ? (
        <ExpressionInputField value={num2} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={num2} />
      )}
      <div className={'flex flex-row py-0.5 px-0.5'}>,</div>
      {isExpression(num3) ? (
        <ExpressionInputField value={num3} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={num3} />
      )}
      <div className={'flex flex-row py-0.5 px-0.5'}>,</div>
      {isExpression(num4) ? (
        <ExpressionInputField value={num4} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={num4} />
      )}
      <div className={'flex flex-row py-0.5 px-0.5'}>)</div>
      {children}
    </div>
  );
};

CubicBezierInputField.displayName = 'CubicBezierInputField';
