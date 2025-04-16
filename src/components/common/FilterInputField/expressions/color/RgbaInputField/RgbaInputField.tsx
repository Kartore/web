import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';
import { ExpressionInputTypeInputField } from '~/components/common/FilterInputField/expressions/common/ExpressionInputTypeInputField';
import { isExpression } from '~/components/common/FilterInputField/expressions/utils/isExpression.ts';
import { cn } from '~/utils/tailwindUtil';

export type RgbaInputFieldProps = {
  value: [
    'rgba',
    number | ExpressionSpecification,
    number | ExpressionSpecification,
    number | ExpressionSpecification,
    number | ExpressionSpecification,
  ];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const RgbaInputField: FC<RgbaInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const r = value[1];
  const g = value[2];
  const b = value[3];
  const a = value[4];

  const onRChange = (changedR: ExpressionSpecification | number) => {
    onChange?.(['rgba', changedR, g, b, a]);
  };

  const onGChange = (changedG: ExpressionSpecification | number) => {
    onChange?.(['rgba', r, changedG, b, a]);
  };

  const onBChange = (changedB: ExpressionSpecification | number) => {
    onChange?.(['rgba', r, g, changedB, a]);
  };

  const onAChange = (changedA: ExpressionSpecification | number) => {
    onChange?.(['rgba', r, g, b, changedA]);
  };

  return (
    <div
      {...props}
      className={cn(
        'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 px-0.5 py-0.5',
        className
      )}
    >
      <div className={'flex flex-row px-0.5 py-0.5'}>rgba(</div>
      <div className={'flex flex-row px-0.5 py-0.5'}>
        {isExpression(r) ? (
          <ExpressionInputField value={r} onChange={onRChange} />
        ) : (
          /*TODO: ExpressionNumberField ができたらそれに移行 */
          <ExpressionInputTypeInputField value={r} onChange={onRChange} />
        )}
        ,
      </div>
      <div className={'flex flex-row px-0.5 py-0.5'}>
        {isExpression(g) ? (
          <ExpressionInputField value={g} onChange={onGChange} />
        ) : (
          /*TODO: ExpressionNumberField ができたらそれに移行 */
          <ExpressionInputTypeInputField value={g} onChange={onGChange} />
        )}
        ,
      </div>
      <div className={'flex flex-row px-0.5 py-0.5'}>
        {isExpression(b) ? (
          <ExpressionInputField value={b} onChange={onBChange} />
        ) : (
          /*TODO: ExpressionNumberField ができたらそれに移行 */
          <ExpressionInputTypeInputField value={b} onChange={onBChange} />
        )}
        ,
      </div>
      <div className={'flex flex-row px-0.5 py-0.5'}>
        {isExpression(a) ? (
          <ExpressionInputField value={a} onChange={onAChange} />
        ) : (
          /*TODO: ExpressionNumberField ができたらそれに移行 */
          <ExpressionInputTypeInputField value={a} onChange={onAChange} />
        )}
        )
      </div>
      {children}
    </div>
  );
};

RgbaInputField.displayName = 'RgbaInputField';
