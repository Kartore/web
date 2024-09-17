import type { ComponentProps, FC } from 'react';
import { Fragment } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type AnyInputFieldProps = {
  value: ['any', ...(boolean | ExpressionSpecification)[]];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const AnyInputField: FC<AnyInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const expressions = value.slice(1) as (boolean | ExpressionSpecification)[];
  return (
    <div
      {...props}
      className={cn('flex flex-row items-center gap-2 rounded bg-black/5 py-0.5 px-0.5', className)}
    >
      {expressions.map((expression, index) => (
        <Fragment key={'any' + index + expression}>
          {isExpression(expression) ? (
            <ExpressionInputField value={expression} onChange={onChange} />
          ) : (
            <ExpressionInputTypeInputField value={expression} />
          )}
          {index < expressions.length - 1 && (
            <div className={'flex flex-row py-0.5 px-0.5'}>OR</div>
          )}
        </Fragment>
      ))}
      {children}
    </div>
  );
};

AnyInputField.displayName = 'AnyInputField';
