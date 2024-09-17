import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type AtInputFieldProps = {
  value: ['at', number | ExpressionSpecification, ExpressionSpecification];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const AtInputField: FC<AtInputFieldProps> = ({
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
      <ExpressionInputField value={items} onChange={onChange} />
      <div className={'flex flex-row py-0.5 px-0.5'}>at</div>
      {isExpression(at) ? (
        <ExpressionInputField value={at} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={at} />
      )}
      {children}
    </div>
  );
};

AtInputField.displayName = 'AtInputField';
