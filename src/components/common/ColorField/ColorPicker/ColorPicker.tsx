import type { ComponentProps, FC } from 'react';

import { cn } from '~/utils/tailwindUtil';

export type ColorPickerProps = {} & ComponentProps<'div'>;

export const ColorPicker: FC<ColorPickerProps> = ({ className, children, ...props }) => {

  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

ColorPicker.displayName = 'ColorPicker';