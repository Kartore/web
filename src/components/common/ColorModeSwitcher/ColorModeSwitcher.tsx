import { SunIcon, MoonIcon } from '@heroicons/react/16/solid';
import { IconButton, IconButtonProps, useColorMode } from '@chakra-ui/react';
import { forwardRef } from 'react';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label' | 'icon'>;

export const ColorModeSwitcher = forwardRef<'button', ColorModeSwitcherProps>(
  function ColorModeSwitcher(props, ref) {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
      <IconButton
        ref={ref}
        size={'sm'}
        variant={'ghost'}
        aria-label={colorMode === 'light' ? 'Toggle to Dark' : 'Toggle to Light'}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        padding={1}
        {...props}
      />
    );
  }
);

ColorModeSwitcher.displayName = 'ColorModeSwitcher';
