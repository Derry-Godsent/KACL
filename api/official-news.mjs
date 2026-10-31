import { XMLParser, XMLValidator } from 'fast-xml-parser';

export const sources = [
  { id: 'fda', name: 'Food and Drugs Authority', url: 'https://fdaghana.gov.gh/feed/', host: 'fdaghana.gov.gh' },
  { id: 'vsd', name: 'Veterinary Services Department', url: 'https://vsd.gov.gh/feed/', host: 'vsd.gov.gh' },
];
const TTL = 60 * 60 * 1000;
const STALE_TTL = 7 * 24 * 60 * 60 * 1000;
const MAX_BYTES = 2 * 1024 * 1024;
const cache = new Map();
const pending = new Map();
const parser = new XMLParser({
  ignoreAttributes: true,
  processEntities: false,
  htmlEntities: false,
  parseTagValue: false,
  parseAttributeValue: false,
  trimValues: true,
  ignoreDeclaration: true,
  ignorePiTags: true,
});
// DTDs/custom entities are rejected above. Decode only the five predefined XML
// entities and numeric character references; never expand document-defined entities.
const decodeSafeEntities = value => value.replace(/&(amp|lt|gt|quot|apos|#(?:x[0-9a-f]+|[0-9]+));/gi, (match, entity) => {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
  const key = entity.toLowerCase();
  if (key in named) return named[key];
  const code = key[1] === 'x' ? parseInt(key.slice(2), 16) : parseInt(key.slice(1), 10);
  if (!Number.isFinite(code) || code < 32 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) return match;
  try { return String.fromCodePoint(code); } catch { return match; }
});
const text = value => typeof value === 'string' ? decodeSafeEntities(value.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim() : '';
// Relevance is checked on the headline and categories, not long article bodies.
const relevant = /\b(food(?:\s|-)+(?:safety|hygiene|service|poisoning|borne)|foodborne|meat|beef|pork|poultry|livestock|cattle|ruminants?|slaughter(?:house|ing)?|abattoirs?|cold(?:\s|-)+(?:chain|stor(?:e|age))|frozen(?:\s|-)+(?:animal|food)|animal(?:\s|-)+(?:health|products?|disease)|veterinary|zoonot\w*|anthrax|rabies|avian(?:\s|-)+influenza)\b/i;

export function parseFeed(xml, source, now = Date.now()) {
  if (/<!DOCTYPE|<!ENTITY/i.test(xml) || XMLValidator.validate(xml) !== true) throw new Error('Invalid feed');
  const channel = parser.parse(xml)?.rss?.channel;
  if (!channel) throw new Error('Expected RSS channel');
  const raw = (channel.item ? (Array.isArray(channel.item) ? channel.item : [channel.item]) : []).slice(0, 100);
  const seen = new Set();
  return raw.flatMap(item => {
    const title = text(item.title);
    const categories = (Array.isArray(item.category) ? item.category : [item.category]).map(text).join(' ').slice(0, 1000);
    const date = Date.parse(item.pubDate);
    let url;
    try { url = new URL(text(item.link)); } catch { return []; }
    if (!title || title.length > 300 || !relevant.test(`${title} ${categories}`) ||
      !Number.isFinite(date) || date > now || url.protocol !== 'https:' ||
      url.hostname !== source.host || url.port || url.username || url.password || url.href.length > 2048 || seen.has(url.href)) return [];
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
      const stale = previous && Date.now() - previous.checkedAt <= STALE_TTL ? previous : null;
      return { items: stale?.items ?? [], checkedAt: stale?.checkedAt ?? null, status: stale ? 'stale' : 'unavailable' };
    } finally { pending.delete(source.id); }
  })();
  pending.set(source.id, task);
  return task;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.statusCode = 405;
    res.setHeader('Cache-Control', 'no-store');
    return res.end();
  }
  const results = await Promise.all(sources.map(async source => ({ id: source.id, ...await fetchSource(source) })));
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', results.every(result => result.status === 'ok')
    ? 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400' : 'public, max-age=30, s-maxage=60');
  res.end(JSON.stringify({ sources: results }));
}
