/// <reference types="vitest" />
import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const ReactCompilerConfig = {};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
  ],
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
    setupFiles: '.vitest/setup.ts',
    alias: [
      {
        find: /^monaco-editor$/,
        replacement: __dirname + '/node_modules/monaco-editor/esm/vs/editor/editor.api',
      },
    ],
    coverage: {
      provider: 'v8',
      reportOnFailure: true,
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/utils/**/*.{ts,tsx}',
        'src/hooks/**/*.{ts,tsx}',
        'src/pages/**/*.{ts,tsx}',
        'src/store/**/*.{ts,tsx}',
      ],
      exclude: ['src/**/__mocks__/**', 'src/**/@types/**', 'src/**/sample/**', 'src/**/store/**'],
      all: true,
      reporter: ['json'],
    },
  },
});
