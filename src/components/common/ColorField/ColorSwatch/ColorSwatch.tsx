import type { ComponentProps, FC } from 'react';

import { cn } from '~/utils/tailwindUtil';

export type ColorSwatchProps = {} & ComponentProps<'div'>;

export const ColorSwatch: FC<ColorSwatchProps> = ({ className, children, ...props }) => {

  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

ColorSwatch.displayName = 'ColorSwatch';