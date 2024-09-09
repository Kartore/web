import type { Decorator, Preview } from '@storybook/react';
import '~/main.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const customDecorator: Decorator = (Story) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <Story />
    </QueryClientProvider>
  );
};

const preview: Preview = {
  decorators: [customDecorator],
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
};

export default preview;
