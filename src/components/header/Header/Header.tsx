import { FC } from 'react';
import { ColorModeSelector } from '~/components/common/ColorModeSelector';

export const Header: FC = () => {
  return (
    <header className={'flex h-12 w-full items-center justify-between bg-gray-700 px-4 text-white'}>
      <h1>Kartore</h1>
      <ColorModeSelector />
    </header>
  );
};
