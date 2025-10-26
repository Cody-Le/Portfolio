// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://cody-le.github.io/Portfolio',
  base: '/Portfolio',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});