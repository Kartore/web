import { useTernaryDarkMode } from 'usehooks-ts';
import { useEffect } from 'react';

export const useThemeInjector = () => {
  const { isDarkMode } = useTernaryDarkMode();
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
};
