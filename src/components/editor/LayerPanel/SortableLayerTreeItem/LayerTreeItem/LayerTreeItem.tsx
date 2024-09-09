import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import type { UniqueIdentifier } from '@dnd-kit/core';

import { cn } from '~/utils/tailwindUtil';

export type LayerTreeItemProps = {
  id: UniqueIdentifier;
  indicator?: boolean;
  clone?: boolean;
  disableInteraction?: boolean;
} & Omit<ComponentPropsWithoutRef<'div'>, 'id'>;

export const LayerTreeItem = forwardRef<HTMLDivElement, LayerTreeItemProps>(
  ({ id, indicator, disableInteraction, clone, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          'flex items-center p-2',
          indicator && 'opacity-60',
          clone && 'inline-block',
          disableInteraction || clone ? 'pointer-events-none' : 'pointer-events-auto',
          className
        )}
      >
        <p>{id}</p>
      </div>
    );
  }
);
