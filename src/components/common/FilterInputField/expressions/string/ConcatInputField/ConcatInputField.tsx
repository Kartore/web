import type { ComponentProps, FC } from 'react';

import type {
  ExpressionInputType,
  ExpressionSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type ConcatInputFieldProps = {
  value: ['concat', ...(ExpressionInputType | ExpressionSpecification)[]];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ConcatInputField: FC<ConcatInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const texts = value.slice(1);
  return (
    <div
      {...props}
      className={cn(
        'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 py-0.5 px-0.5',
        className
      )}
    >
      <div className={'flex flex-row py-0.5 px-0.5'}>concat</div>
      {texts.map((text, index) => {
        return (
          <div key={index} className={'flex flex-row py-0.5 px-0.5'}>
            {isExpression(text) ? (
              <ExpressionInputField value={text} onChange={onChange} />
            ) : (
              <ExpressionInputTypeInputField value={text} />
            )}
          </div>
        );
      })}
      {children}
    </div>
  );
};

ConcatInputField.displayName = 'ConcatInputField';
