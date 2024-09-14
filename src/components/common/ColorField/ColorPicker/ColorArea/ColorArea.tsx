import type { FC } from 'react';
import { useRef } from 'react';

import { useColorArea } from '@react-aria/color';
import type { ColorAreaProps as ColorAreaStateProps } from '@react-stately/color';
import { useColorAreaState } from '@react-stately/color';

import { cn } from '~/utils/tailwindUtil.ts';

export type ColorAreaProps = {
  className?: string;
} & ColorAreaStateProps;

export const ColorArea: FC<ColorAreaProps> = ({ className, ...props }) => {
  const inputXRef = useRef(null);
  const inputYRef = useRef(null);
  const containerRef = useRef(null);

  const state = useColorAreaState(props);

  const { colorAreaProps, xInputProps, yInputProps, thumbProps } = useColorArea(
    { ...props, inputXRef, inputYRef, containerRef },
    state
  );

  return (
    <div ref={containerRef} {...colorAreaProps} className={cn('aspect-square w-full', className)}>
      <div
        {...thumbProps}
        style={{
          ...thumbProps.style,
          background: state.getDisplayColor().toString('css'),
          border: `2px solid white`,
          borderRadius: '50%',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(0,0,0,0.25)',
          boxSizing: 'border-box',
        }}
        className={'h-3 w-3'}
      >
        <input ref={inputXRef} {...xInputProps} />
        <input ref={inputYRef} {...yInputProps} />
      </div>
    </div>
  );
};

ColorArea.displayName = 'ColorArea';
