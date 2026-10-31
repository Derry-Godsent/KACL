import { XMLParser, XMLValidator } from 'fast-xml-parser';

export const sources = [
  { id: 'fda', name: 'Food and Drugs Authority', url: 'https://fdaghana.gov.gh/feed/', host: 'fdaghana.gov.gh' },
  { id: 'vsd', name: 'Veterinary Services Department', url: 'https://vsd.gov.gh/feed/', host: 'vsd.gov.gh' },
];
const TTL = 60 * 60 * 1000;
const MAX_BYTES = 2 * 1024 * 1024;
const cache = new Map();
const pending = new Map();
const parser = new XMLParser({ ignoreAttributes: true, processEntities: true, htmlEntities: true });
const text = value => typeof value === 'string' ? value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
// Relevance is checked on the headline and categories, not long article bodies.
const relevant = /\b(food(?:\s|-)+(?:safety|hygiene|service|poisoning|borne)|foodborne|meat|beef|pork|poultry|livestock|cattle|ruminants?|slaughter(?:house|ing)?|abattoirs?|cold(?:\s|-)+(?:chain|stor(?:e|age))|frozen(?:\s|-)+(?:animal|food)|animal(?:\s|-)+(?:health|products?|disease)|veterinary|zoonot\w*|anthrax|rabies|avian(?:\s|-)+influenza)\b/i;

export function parseFeed(xml, source, now = Date.now()) {
  if (/<!DOCTYPE|<!ENTITY/i.test(xml) || XMLValidator.validate(xml) !== true) throw new Error('Invalid feed');
  const channel = parser.parse(xml)?.rss?.channel;
  if (!channel) throw new Error('Expected RSS channel');
  const raw = channel.item ? (Array.isArray(channel.item) ? channel.item : [channel.item]) : [];
  const seen = new Set();
  return raw.flatMap(item => {
    const title = text(item.title);
    const categories = (Array.isArray(item.category) ? item.category : [item.category]).map(text).join(' ');
    const date = Date.parse(item.pubDate);
    let url;
    try { url = new URL(text(item.link)); } catch { return []; }
    if (!title || title.length > 300 || !relevant.test(`${title} ${categories}`) ||
      !Number.isFinite(date) || date > now || url.protocol !== 'https:' ||
      url.hostname !== source.host || url.port || url.username || url.password || seen.has(url.href)) return [];
    seen.add(url.href);
    return [{ id: url.href, source: source.name, title, date: new Date(date).toISOString(), url: url.href }];
  }).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
}

async function fetchSource(source) {
  const previous = cache.get(source.id);
  if (previous && Date.now() - previous.checkedAt < TTL) return { ...previous, status: 'ok' };
  if (pending.has(source.id)) return pending.get(source.id);
  const task = (async () => {
    try {
      const response = await fetch(source.url, {
        signal: AbortSignal.timeout(7000), redirect: 'error',
        headers: { Accept: 'application/rss+xml, application/xml, text/xml', 'User-Agent': 'KACL-NewsLinks/1.0' },
      });
      if (!response.ok || Number(response.headers.get('content-length')) > MAX_BYTES) throw new Error('Feed unavailable');
      const reader = response.body.getReader();
      const chunks = [];
      let size = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_BYTES) { await reader.cancel(); throw new Error('Feed too large'); }
        chunks.push(Buffer.from(value));
      }
      const record = { items: parseFeed(Buffer.concat(chunks).toString('utf8'), source), checkedAt: Date.now() };
      cache.set(source.id, record);
      return { ...record, status: 'ok' };
    } catch {
      return { items: previous?.items ?? [], checkedAt: previous?.checkedAt ?? null, status: previous ? 'stale' : 'unavailable' };
    } finally { pending.delete(source.id); }
  })();
  pending.set(source.id, task);
  return task;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.statusCode = 405;
    return res.end();
  }
  const results = await Promise.all(sources.map(async source => ({ id: source.id, ...await fetchSource(source) })));
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', results.every(result => result.status === 'ok')
    ? 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400' : 'public, max-age=30, s-maxage=60');
  res.end(JSON.stringify({ sources: results }));
}
