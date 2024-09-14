import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type RawDataPropertiesProps = {
  layer: LayerSpecification;
} & ComponentPropsWithoutRef<'div'>;

export const RawDataProperties = forwardRef<HTMLDivElement, RawDataPropertiesProps>(
  ({ layer, className, children, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn('flex flex-col gap-2 px-4', className)}>
        <h3 className={'font-montserrat text-sm font-semibold'}>Raw Data Editor (Advanced)</h3>
        <textarea
          className={'min-h-40 rounded text-sm'}
          value={JSON.stringify(layer, undefined, 2)}
          readOnly={true}
        />
        {children}
      </div>
    );
  }
);
