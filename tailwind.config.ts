import { withTV } from 'tailwind-variants/transformer';
import plugin from 'tailwindcss/plugin';
import { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default withTV({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in .25s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animation-duration': (value) => ({
            animationDuration: value,
          }),
        },
        { values: theme('animationDuration') }
      );

      matchUtilities(
        { 'animation-delay': (value) => ({ animationDelay: value }) },
        { values: theme('animationDelay') }
      );

      matchUtilities(
        { 'animation-timing': (value) => ({ animationTimingFunction: value }) },
        { values: theme('animationTimingFunction') }
      );
    }),
  ],
}) satisfies Config;
