import type { ComponentProps, FC } from 'react';

import type {
  ColorSpecification,
  ExpressionSpecification,
  InterpolationSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { InterpolationsInputField } from '~/components/common/FilterInputField/expressions/curves/interpolations/InterpolationsInputField.tsx';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type InterpolateLabInputFieldProps = {
  value: [
    'interpolate-lab',
    InterpolationSpecification,
    number | ExpressionSpecification,
    ...(number | ColorSpecification)[],
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const InterpolateLabInputField: FC<InterpolateLabInputFieldProps> = ({
  value,
  onChange,
  className,
  children,
  ...props
}) => {
  const interpolation = value[1];
  const condition = value[2];
  const steps = value.slice(3) as (number | ColorSpecification)[];
  return (
    <div
      {...props}
      className={cn(
        'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 py-0.5 px-0.5',
        className
      )}
    >
      <div className={'flex flex-row py-0.5 px-0.5'}>interpolate (CIELAB) </div>
      <InterpolationsInputField value={interpolation} onChange={onChange} />
      {isExpression(condition) ? (
        <ExpressionInputField value={condition} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={condition} />
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

InterpolateLabInputField.displayName = 'InterpolateLabInputField';
