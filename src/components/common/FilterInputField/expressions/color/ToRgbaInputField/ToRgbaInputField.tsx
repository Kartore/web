import type { ComponentProps, FC } from 'react';

import type { ColorSpecification, ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type ToRgbaInputFieldProps = {
  value: ['to-rgba', ColorSpecification | ExpressionSpecification];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ToRgbaInputField: FC<ToRgbaInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const color = value[1];
  return (
    <div
      {...props}
      className={cn(
        'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 py-0.5 px-0.5',
        className
      )}
    >
      <div className={'flex flex-row py-0.5 px-0.5'}>toRGBA Array</div>
      <div className={'flex flex-row py-0.5 px-0.5'}>
        {isExpression(color) ? (
          <ExpressionInputField value={color} onChange={onChange} />
        ) : (
          <ExpressionInputTypeInputField value={color} />
        )}
      </div>
      {children}
    </div>
  );
};

ToRgbaInputField.displayName = 'ToRgbaInputField';
