import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});