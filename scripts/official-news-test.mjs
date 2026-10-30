import assert from 'node:assert/strict';
import handler, { parseFeed, sources } from '../api/official-news.mjs';
const entry = (title, link = 'https://fdaghana.gov.gh/food-safety/', date = 'Wed, 02 Jul 2025 14:12:21 GMT') => `<item><title><![CDATA[${title}]]></title><link>${link}</link><pubDate>${date}</pubDate><description><![CDATA[<script>not rendered</script>]]></description></item>`;
const feed = entries => `<rss version="2.0"><channel><title>Official source</title>${entries}</channel></rss>`;
const xml = feed(entry('Food safety update') + entry('Cosmetics enforcement', 'https://fdaghana.gov.gh/cosmetics/') + entry('Veterinary inspection', 'https://evil.example/unsafe') + entry('Meat safety', 'javascript:alert(1)') + entry('Future meat alert', 'https://fdaghana.gov.gh/future/', 'Wed, 02 Jul 2099 14:12:21 GMT') + entry('Food safety update'));
const result = parseFeed(xml, sources[0]);
assert.equal(result.length, 1);
assert.equal(result[0].title, 'Food safety update');
assert.equal(result[0].description, undefined);
assert.deepEqual(parseFeed(feed(entry('Cosmetic spray')), sources[0]), []);
assert.throws(() => parseFeed('<html>error</html>', sources[0]));
assert.throws(() => parseFeed('<!DOCTYPE rss [<!ENTITY x "bad">]><rss/>', sources[0]));
const originalFetch = globalThis.fetch;
let calls = 0;
globalThis.fetch = async url => {
  calls++;
  const source = sources.find(source => source.url === url);
  assert.ok(source);
  return new Response(feed(entry('Food safety awareness', `https://${source.host}/food-safety/`)), { headers: { 'Content-Type': 'application/rss+xml' } });
};
const run = async (method = 'GET') => {
  const headers = {};
  let body;
  const response = { statusCode: 200, setHeader: (key, value) => { headers[key] = value; }, end: value => { body = value; } };
  await handler({ method }, response);
  return { response, headers, body };
};
try {
  const first = await run();
  const json = JSON.parse(first.body);
  assert.equal(json.sources.length, 2);
  assert.ok(json.sources.every(source => source.status === 'ok' && source.items.length === 1));
  assert.ok(first.headers['Cache-Control'].includes('s-maxage=3600'));
  await run();
  assert.equal(calls, 2, 'cached sources must not be fetched again');
  assert.equal((await run('POST')).response.statusCode, 405);
  const actualNow = Date.now;
  Date.now = () => actualNow() + 3600001;
  globalThis.fetch = async () => { throw new Error('source offline'); };
  try {
    const offline = JSON.parse((await run()).body);
    assert.ok(offline.sources.every(source => source.status === 'stale' && source.items.length === 1));
  } finally { Date.now = actualNow; }
} finally { globalThis.fetch = originalFetch; }
console.log('Official feed checks passed: relevance, URL safety, dates, XML rejection, caching, source isolation and stale fallback.');
