import type { FC } from 'react';
import { useRef } from 'react';

import type { AriaSwitchProps } from 'react-aria';
import { VisuallyHidden, useSwitch } from 'react-aria';
import { useToggleState } from 'react-stately';

import { cn } from '~/utils/tailwindUtil';

export type SwitchProps = {
  className?: string;
  label: string;
} & AriaSwitchProps;

export const Switch: FC<SwitchProps> = ({ className, label, ...props }) => {
  const state = useToggleState(props);
  const ref = useRef(null);
  const { labelProps, inputProps } = useSwitch(props, state, ref);
  return (
    <div className={cn('flex flex-row items-center justify-between', className)}>
      <label
        {...labelProps}
        className={cn('text-sm font-semibold text-gray-600', labelProps.className)}
      >
        {label}
      </label>
      <label className={'cursor-pointer'}>
        <p className={'sr-only'}>{label}</p>
        <VisuallyHidden>
          <input {...inputProps} ref={ref} />
        </VisuallyHidden>
        <svg width={40} height={24} aria-hidden="true" style={{ marginRight: 4 }}>
          <rect
            x={4}
            y={4}
            width={32}
            height={16}
            rx={8}
            fill={state.isSelected ? 'orange' : 'gray'}
          />
          <circle cx={state.isSelected ? 28 : 12} cy={12} r={5} fill="white" />
        </svg>
      </label>
    </div>
  );
};

Switch.displayName = 'Switch';
