import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type SliceInputFieldProps = {
  value: [
    'slice',
    string | ExpressionSpecification,
    number | ExpressionSpecification,
    (number | ExpressionSpecification)?,
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const SliceInputField: FC<SliceInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const items = value[1];
  const from = value[2];
  const to = value[3];
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
        <div className={'flex flex-row py-0.5 px-0.5'}>{items.toString()}</div>
      )}
      <div className={'flex flex-row py-0.5 px-0.5'}>slice from</div>
      {isExpression(from) ? (
        <ExpressionInputField value={from} onChange={onChange} />
      ) : (
        <div className={'flex flex-row py-0.5 px-0.5'}>{from.toString()}</div>
      )}
      {to ? (
        <>
          <div className={'flex flex-row py-0.5 px-0.5'}>to</div>
          {isExpression(to) ? (
            <ExpressionInputField value={to} onChange={onChange} />
          ) : (
            <div className={'flex flex-row py-0.5 px-0.5'}>{to.toString()}</div>
          )}
        </>
      ) : null}
      {children}
    </div>
  );
};
SliceInputField.displayName = 'SliceInputField';
