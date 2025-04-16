import type { FC, ReactNode } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil.ts';

export type GetInputFieldProps = {
  value: [
    'get',
    string | ExpressionSpecification,
    (Record<string, unknown> | ExpressionSpecification)?,
  ];
  onChange?: (value: ExpressionSpecification) => void;
  className?: string;
  children: ReactNode;
};

export const GetInputField: FC<GetInputFieldProps> = ({ className, children, value, onChange }) => {
  const propertyKey = value[1];
  const items = value[2];

  return (
    <div
      className={cn(
        'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
        className
      )}
    >
      <div className={'flex flex-row px-0.5 py-0.5'}>get</div>
      {isExpression(propertyKey) ? (
        <ExpressionInputField value={propertyKey} onChange={onChange} />
      ) : (
        <ExpressionInputTypeInputField value={propertyKey} />
      )}
      <div className={'flex flex-row px-0.5 py-0.5'}>from</div>
      {items ? (
        isExpression(items) ? (
          <ExpressionInputField value={items} onChange={onChange} />
        ) : (
          <div className={'flex flex-row px-0.5 py-0.5'}>{JSON.stringify(items)}</div>
        )
      ) : (
        <div className={'flex flex-row px-0.5 py-0.5'}>this features</div>
      )}
      {children}
    </div>
  );
};

GetInputField.displayName = 'GetInputField';
