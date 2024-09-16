import type { ComponentProps, FC } from 'react';

import type {
  ExpressionInputType,
  ExpressionSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type InInputFieldProps = {
  value: [
    'in',
    ExpressionInputType | ExpressionSpecification,
    ExpressionInputType | ExpressionSpecification,
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const InInputField: FC<InInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const at = value[1];
  const items = value[2];
  return (
    <div
      {...props}
      className={cn(
        'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 py-0.5 px-0.5',
        className
      )}
    >
      {isExpression(items) ? (
        <ExpressionInputField value={items} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={items} />
      )}
      <div className={'flex flex-row py-0.5 px-0.5'}>in</div>
      {isExpression(at) ? (
        <ExpressionInputField value={at} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={at} />
      )}
      {children}
    </div>
  );
};

InInputField.displayName = 'InInputField';
