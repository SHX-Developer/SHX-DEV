import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const serverDirectory = resolve('dist/server');
const serverEntry = resolve(serverDirectory, 'index.js');

await mkdir(serverDirectory, { recursive: true });
await writeFile(
  serverEntry,
  `const fallbackToIndex = (request) => {
  const url = new URL(request.url);
  url.pathname = '/index.html';
  return new Request(url, request);
};

export default {
  async fetch(request, env) {
    if (!env?.ASSETS?.fetch) {
      return new Response('Static asset binding is unavailable.', { status: 503 });
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || request.method !== 'GET') {
      return response;
    }

    const acceptsHtml = request.headers.get('accept')?.includes('text/html');
    return acceptsHtml ? env.ASSETS.fetch(fallbackToIndex(request)) : response;
  },
};
`,
  'utf8',
);
