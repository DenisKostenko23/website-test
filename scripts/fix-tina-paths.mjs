// TinaCMS CLI breaks when the project folder path contains a space
// (e.g. "Law firm"): its GraphQL loader reads the absolute glob as a query.
// Passing a path relative to the project avoids it. Runs after `npm install`.
import { readFileSync, writeFileSync } from 'node:fs';

const file = 'node_modules/@tinacms/cli/dist/index.js';
const from = 'result = await loadDocuments(globPath, {';
const to = 'result = await loadDocuments(path6.relative(process.cwd(), globPath), {';
const src = readFileSync(file, 'utf8');
if (src.includes(from)) {
  writeFileSync(file, src.replace(from, to));
  console.log('fix-tina-paths: patched @tinacms/cli');
}
