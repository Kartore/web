import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type LengthInputFieldProps = {
  value: ['length', string | ExpressionSpecification];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const LengthInputField: FC<LengthInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const items = value[1];
  return (
    <div
      {...props}
      className={cn(
        'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 py-0.5 px-0.5',
        className
      )}
    >
      <div className={'flex flex-row py-0.5 px-0.5'}>get</div>
      {isExpression(items) ? (
        <ExpressionInputField value={items} onChange={onChange} />
      ) : (
        <div className={'flex flex-row py-0.5 px-0.5'}>{items.toString()}</div>
      )}
      <div className={'flex flex-row py-0.5 px-0.5'}>length</div>

      {children}
    </div>
  );
};

LengthInputField.displayName = 'LengthInputField';
