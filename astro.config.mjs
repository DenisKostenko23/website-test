// @ts-check
import { defineConfig } from 'astro/config';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';

// Pages prerender to static HTML. The one on-demand route (/tina-island,
// used by the visual editor) runs on Netlify Functions in production and
// on a Node server locally.
async function getAdapter() {
  if (process.env.NETLIFY) return (await import('@astrojs/netlify')).default();
  return (await import('@astrojs/node')).default({ mode: 'standalone' });
}

export default defineConfig({
  site: process.env.URL || 'http://localhost:4321',
  output: 'static',
  adapter: await getAdapter(),
  integrations: [tina()],
  build: { inlineStylesheets: 'always' },
  vite: {
    plugins: [tinaAdminDevRedirect()],
    ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge'] },
  },
});
