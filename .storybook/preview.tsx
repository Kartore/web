import type { Decorator, Preview } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import { DecoratorHelpers } from '@storybook/addon-themes';
const { pluckThemeFromContext, initializeThemeState } = DecoratorHelpers;

export const customDecorator = ({
  themes,
  defaultTheme,
}: {
  themes: {
    [key: string]: string;
  };
  defaultTheme: string;
}): Decorator => {
  initializeThemeState(Object.keys(themes), defaultTheme);

  return (Story, context) => {
    const selectedTheme = pluckThemeFromContext(context);
    return (
      <ChakraProvider
        colorModeManager={{
          type: 'localStorage',
          get() {
            return selectedTheme === 'dark' ? 'dark' : 'light';
          },
          set() {},
        }}
      >
        <Story />
      </ChakraProvider>
    );
  };
};

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
    customDecorator({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
