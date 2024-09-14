import type { ComponentProps, FC } from 'react';

import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';

import { cn } from '~/utils/tailwindUtil';

export type RawDataPropertiesProps = {
  layer: LayerSpecification;
} & ComponentProps<'div'>;

export const RawDataProperties: FC<RawDataPropertiesProps> = ({
  layer,
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={cn('flex flex-col gap-2 px-4', className)}>
      <h3 className={'font-montserrat text-sm font-semibold'}>Raw Data Editor (Advanced)</h3>
      <textarea
        className={'min-h-40 rounded text-sm'}
        value={JSON.stringify(layer, undefined, 2)}
        readOnly={true}
      />
      {children}
    </div>
  );
};

RawDataProperties.displayName = 'RawDataProperties';
