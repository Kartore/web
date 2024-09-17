import type { ComponentProps, FC } from 'react';

import type {
  ExpressionInputType,
  ExpressionSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type ArrayInputFieldProps = {
  value:
    | ['array', unknown | ExpressionSpecification]
    | ['array', ExpressionInputType | ExpressionSpecification, unknown | ExpressionSpecification]
    | [
        'array',
        ExpressionInputType | ExpressionSpecification,
        number | ExpressionSpecification,
        unknown | ExpressionSpecification,
      ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ArrayInputField: FC<ArrayInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn('flex flex-row items-center gap-2 rounded bg-black/5 py-0.5 px-0.5', className)}
    >
      <div className={'flex flex-row py-0.5 px-0.5'}>typecheck Array</div>
      {isExpression(value[1]) ? (
        <ExpressionInputField value={value[1]} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={value[1]} />
      )}
      {children}
    </div>
  );
};

ArrayInputField.displayName = 'ArrayInputField';
