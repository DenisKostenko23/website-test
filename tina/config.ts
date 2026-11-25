import { defineConfig } from 'tinacms';
import { HomeCollection } from './collections/home';
import { SiteCollection } from './collections/site';

const branch = process.env.GITHUB_BRANCH || process.env.HEAD || 'main';

export default defineConfig({
  branch,
  // From tina.io → your project. Not needed for local editing.
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'uploads', publicFolder: 'public' } },

  schema: { collections: [HomeCollection, SiteCollection] },
});
