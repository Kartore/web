import type { ComponentProps, FC } from 'react';

import type {
  ColorSpecification,
  ExpressionInputType,
  ExpressionSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type StepInputFieldProps = {
  value: [
    'step',
    number | ExpressionSpecification,
    ExpressionInputType | ExpressionSpecification,
    ...(number | ExpressionInputType | ExpressionSpecification)[],
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const StepInputField: FC<StepInputFieldProps> = ({
  value,
  onChange,
  className,
  children,
  ...props
}) => {
  const condition = value[1];
  const base = value[2];
  const steps = value.slice(3) as (number | ColorSpecification)[];
  return (
    <div
      {...props}
      className={cn(
        'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 py-0.5 px-0.5',
        className
      )}
    >
      <div className={'flex flex-row py-0.5 px-0.5'}>steps </div>
      {isExpression(condition) ? (
        <ExpressionInputField value={condition} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={condition} />
      )}
      <div className={'flex flex-row py-0.5 px-0.5'}>base </div>
      {isExpression(base) ? (
        <ExpressionInputField value={base} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={base} />
      )}
      {steps.map((step, index) => {
        return (
          <div key={index} className={'flex flex-row py-0.5 px-0.5'}>
            <div className={'flex flex-row py-0.5 px-0.5'}>at </div>
            {isExpression(step) ? (
              <ExpressionInputField value={step} onChange={onChange} />
            ) : (
              <ExpressionInputTypeInputField value={step} />
            )}
          </div>
        );
      })}
      {children}
    </div>
  );
};

StepInputField.displayName = 'StepInputField';
