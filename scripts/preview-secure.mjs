import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve('dist');
const port = Number(process.env.PORT || 4173);
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const globalHeaders = config.headers.find(rule => rule.source === '/(.*)')?.headers ?? [];
const apiHeaders = config.headers.find(rule => rule.source === '/api/(.*)')?.headers ?? [];
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2', '.pdf': 'application/pdf',
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const headers = pathname.startsWith('/api/') ? [...globalHeaders, ...apiHeaders] : globalHeaders;
    for (const header of headers) res.setHeader(header.key, header.value);
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = 405; res.setHeader('Allow', 'GET, HEAD'); return res.end();
    }
    let file = normalize(join(root, pathname));
    if (!file.startsWith(root + sep) && file !== root) { res.statusCode = 403; return res.end(); }
    try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); }
    catch { if (!extname(pathname)) file = join(root, 'index.html'); }
    const body = await readFile(file);
    res.statusCode = 200;
    res.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream');
    res.setHeader('Cache-Control', extname(file) === '.html' ? 'no-cache' : 'public, max-age=3600');
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch {
    res.statusCode = 404; res.end('Not found');
  }
}).listen(port, '0.0.0.0', () => console.log(`Secure static preview on http://0.0.0.0:${port}`));
