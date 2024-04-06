import { describe } from 'vitest';
import { render, renderHook } from '@testing-library/react';
import { composeStories } from '@storybook/react';

import * as Stories from './ThemeInjector.stories';
import { useThemeInjector } from '~/components/utils/ThemeInjector/ThemeInjector.hook.tsx';

import * as modules from 'usehooks-ts';
import { vi } from 'vitest';

const { NothingRenderCheck } = composeStories(Stories);

describe('Component: ThemeInjector', () => {
  describe('Snapshot', () => {
    it('NothingRenderCheck', () => {
      const { asFragment } = render(<NothingRenderCheck />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('Play', () => {
    it('NothingRenderCheck', async () => {
      const { container } = render(<NothingRenderCheck />);
      await NothingRenderCheck.play!({ canvasElement: container });
    });
  });
});

vi.mock('usehooks-ts', () => {
  const originalModule = vi.importActual('usehooks-ts');
  return {
    ...originalModule,
    useTernaryDarkMode: vi.fn().mockReturnValue({
      isDarkMode: false,
      setTernaryDarkMode: vi.fn(),
      ternaryDarkMode: 'system',
      toggleTernaryDarkMode: vi.fn(),
    }),
  };
});

describe('Hook: useThemeInjector', () => {
  it('Inject Dark', async () => {
    vi.spyOn(modules, 'useTernaryDarkMode').mockReturnValue({
      isDarkMode: true,
      setTernaryDarkMode: vi.fn(),
      ternaryDarkMode: 'dark',
      toggleTernaryDarkMode: vi.fn(),
    });
    renderHook(() => useThemeInjector());

    expect(document.documentElement.classList.contains('dark')).toBeTruthy();
  });
  it('Inject Light', async () => {
    vi.spyOn(modules, 'useTernaryDarkMode').mockReturnValue({
      isDarkMode: false,
      setTernaryDarkMode: vi.fn(),
      ternaryDarkMode: 'light',
      toggleTernaryDarkMode: vi.fn(),
    });
    renderHook(() => useThemeInjector());

    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
  });
});
