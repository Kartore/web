import type { Preview } from '@storybook/react';
import '../src/index.css';
import { withThemeByClassName } from '@storybook/addon-themes';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        small: { name: 'Small', styles: { width: '640px', height: '800px' } },
        large: { name: 'Large', styles: { width: '1024px', height: '1000px' } },
      },
    },
    backgrounds: {
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#1E293B' },
      ],
    },
    chromatic: {
      modes: {
        mobile: {
          viewport: 'small',
        },
        desktop: {
          viewport: 'large',
        },
        light: {
          backgrounds: { value: '#fff' },
          theme: 'light',
        },
        dark: {
          backgrounds: { value: '#1E293B' },
          theme: 'dark',
        },
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'dark',
      parentSelector: 'html',
    }),
  ],
};

export default preview;
