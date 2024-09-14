import type { FC } from 'react';

import { NumberArrayInnerField } from '~/components/common/NumberArrayField/NumberArrayInnerField';
import { cn } from '~/utils/tailwindUtil';

export type NumberArrayFieldProps = {
  className?: string;
  label: string;
  arrayLabels: [string, string];
  values: [number, number];
  onChange: (values: [number, number]) => void;
};

export const NumberArrayField: FC<NumberArrayFieldProps> = ({
  className,
  label,
  arrayLabels,
  values,
  onChange,
}) => {
  return (
    <div className={cn('flex flex-row items-center justify-between', className)}>
      <label className={cn('text-sm font-semibold text-gray-600')}>{label}</label>
      <div className={'flex w-1/2 flex-row gap-1'}>
        <NumberArrayInnerField
          label={arrayLabels[0]}
          value={values[0]}
          onChange={(value) => onChange([value, values[1]])}
        />
        <NumberArrayInnerField
          label={arrayLabels[1]}
          value={values[1]}
          onChange={(value) => onChange([values[0], value])}
        />
      </div>
    </div>
  );
};

NumberArrayField.displayName = 'NumberArrayField';
