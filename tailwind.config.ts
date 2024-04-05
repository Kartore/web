import { withTV } from 'tailwind-variants/transformer';
import plugin from 'tailwindcss/plugin';
import { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default withTV({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
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
