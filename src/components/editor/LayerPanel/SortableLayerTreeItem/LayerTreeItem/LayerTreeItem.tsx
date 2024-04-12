import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { tv, VariantProps } from 'tailwind-variants';

const layerTreeItemVariants = tv({
  slots: {
    box: 'relative box-border flex cursor-default items-center px-2 py-2 hover:outline hover:outline-blue-400',
    text: '',
  },
  variants: {
    clone: {
      true: {
        box: 'pointer-events-none inline-block',
      },
      false: '',
    },
    indicator: {
      true: {
        box: 'opacity-60',
        text: '',
      },
      false: '',
    },
    disableInteraction: {
      true: {
        box: 'pointer-events-none',
      },
      false: '',
    },
  },
});

export type LayerTreeItemVaritantProps = VariantProps<typeof layerTreeItemVariants>;

export type LayerTreeItemProps = {
  id: UniqueIdentifier;
  disableInteraction?: boolean;
} & Omit<ComponentPropsWithoutRef<'div'>, 'id'> &
  LayerTreeItemVaritantProps;

export const LayerTreeItem = forwardRef<HTMLDivElement, LayerTreeItemProps>(
  ({ id, indicator, disableInteraction, clone, className, ...props }, ref) => {
    const { box, text } = layerTreeItemVariants({ indicator, clone, disableInteraction });

    return (
      <div {...props} ref={ref} className={box({ className })}>
        <p className={text()}>{id}</p>
      </div>
    );
  }
);
