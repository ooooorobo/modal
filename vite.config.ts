/// <reference types="vitest" />
import {defineConfig} from 'vite';
import {patchCssModules} from "vite-css-modules";

export default defineConfig({
  plugins: [
    patchCssModules()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test.setup.ts'
  },
});
