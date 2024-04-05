import {
  Portal,
  SelectContent,
  SelectControl,
  SelectItem,
  SelectPositioner,
  SelectRoot,
  SelectTrigger,
  SelectValueChangeDetails,
  SelectValueText,
} from '@ark-ui/react';
import { tv } from 'tailwind-variants';
import { TernaryDarkMode, useTernaryDarkMode } from 'usehooks-ts';
import { useCallback, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const items: {
  label: string;
  value: TernaryDarkMode;
}[] = [
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'Dark',
    value: 'dark',
  },
  {
    label: 'System',
    value: 'system',
  },
];

const colorModeSelectorVariants = tv({
  slots: {
    root: 'relative w-fit',
    control: 'w-fit min-w-16',
    trigger:
      'flex w-full items-center justify-between gap-2 rounded-lg bg-gray-100 py-2 pl-4 pr-2 text-gray-800 dark:bg-gray-800 dark:text-white',
    icon: 'h-[1em] w-[1em]',
    content:
      'animate-fade-in w-full overflow-hidden rounded-lg bg-gray-100 shadow-lg dark:bg-gray-800 dark:text-white ',
    item: 'px-4 py-2 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 ',
  },
});

export const ColorModeSelector = () => {
  const { root, control, trigger, icon, content, item } = colorModeSelectorVariants();
  const containerRef = useRef<HTMLDivElement>(null);
  const { ternaryDarkMode, setTernaryDarkMode } = useTernaryDarkMode();

  const handleSelect = useCallback(
    ({
      items,
    }: SelectValueChangeDetails<{
      label: string;
      value: TernaryDarkMode;
    }>) => {
      if (items[0].value === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (items[0].value === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      setTernaryDarkMode(items[0].value);
    },
    [setTernaryDarkMode]
  );
  return (
    <SelectRoot
      ref={containerRef}
      items={items}
      multiple={false}
      onValueChange={handleSelect}
      className={root()}
      value={[ternaryDarkMode]}
    >
      <SelectControl className={control()}>
        <SelectTrigger className={trigger()}>
          <SelectValueText placeholder={'Color Theme'} />
          <ChevronDownIcon className={icon()} />
        </SelectTrigger>
      </SelectControl>
      <Portal container={containerRef}>
        <SelectPositioner>
          <SelectContent className={content()}>
            {items.map((value) => (
              <SelectItem className={item()} item={value.value} key={value.value}>
                {value.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPositioner>
      </Portal>
    </SelectRoot>
  );
};
