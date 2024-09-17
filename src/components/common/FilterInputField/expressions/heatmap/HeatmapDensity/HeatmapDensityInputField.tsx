import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type HeatmapDensityInputFieldProps = {
  value: ['heatmap-density'];
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const HeatmapDensityInputField: FC<HeatmapDensityInputFieldProps> = ({
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
      "heatmap-density" from heatmap layer
      {children}
    </div>
  );
};

HeatmapDensityInputField.displayName = 'HeatmapDensityInputField';
