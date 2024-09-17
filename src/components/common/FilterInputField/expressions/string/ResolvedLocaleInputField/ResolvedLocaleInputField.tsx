import type { ComponentProps, FC } from 'react';

import type {
  CollatorExpressionSpecification,
  ExpressionSpecification,
} from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type ResolvedLocaleInputFieldProps = {
  value: ['resolved-locale', CollatorExpressionSpecification];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ResolvedLocaleInputField: FC<ResolvedLocaleInputFieldProps> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const collator = value[1];
  return (
    <div
      {...props}
      className={cn(
        'flex flex-row flex-wrap items-center gap-2 rounded bg-black/5 py-0.5 px-0.5',
        className
      )}
    >
      <div className={'flex flex-row py-0.5 px-0.5'}>Resolve Locale</div>
      <div className={'flex flex-row py-0.5 px-0.5'}>{JSON.stringify(collator)}</div>
      {children}
    </div>
  );
};

ResolvedLocaleInputField.displayName = 'ResolvedLocaleInputField';
