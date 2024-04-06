import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

type LayerPanelProps = ComponentPropsWithoutRef<'div'>;

export const LayerPanel: FC<LayerPanelProps> = ({ className, ...props }) => {
  return (
    <div
      className={twMerge(
        'flex h-full w-auto flex-col bg-gray-200 px-4 text-black dark:bg-gray-700 dark:text-white',
        className
      )}
      {...props}
    >
      LayerPanel
    </div>
  );
};
