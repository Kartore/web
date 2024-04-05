/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~/': path.join(__dirname, './src/'),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    clearMocks: true,
    testTimeout: 50000,
    coverage: {
      provider: 'v8',
      reportOnFailure: true,
      include: ['src/components/**/*.{ts,tsx}', "src/utils/**/*.{ts,tsx}", "src/hooks/**/*.{ts,tsx}", "src/pages/**/*.{ts,tsx}", "src/store/**/*.{ts,tsx}"],
      exclude: ['src/**/__mocks__/**', 'src/**/@types/**', 'src/**/sample/**', 'src/**/store/**'],
      all: true,
      reporter: ['json'],
    },
  },
});
