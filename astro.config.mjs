import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://srezaeeucr.github.io',
  base: '/groupwebsite',
  trailingSlash: 'ignore',
  build: {
    assets: '_astro',
    format: 'file',
  },
});
