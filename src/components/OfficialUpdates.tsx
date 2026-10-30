import React, { useEffect, useState } from 'react';
import { OFFICIAL_UPDATES } from '../data/officialUpdates';

const publishers = [
  {
    id: 'fda',
    name: 'Food and Drugs Authority',
    abbreviation: 'FDA',
    description: 'Food safety and regulatory updates',
    domain: 'fdaghana.gov.gh',
  },
  {
    id: 'vsd',
    name: 'Veterinary Services Department',
    abbreviation: 'VSD',
    description: 'Animal health and veterinary public health updates',
    domain: 'vsd.gov.gh',
  },
] as const;

type Update = { id: string; source: string; title: string; date: string; dateLabel?: string; url: string };
const formatDate = (date: string) => new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
}).format(new Date(date));

export const OfficialUpdates: React.FC = () => {
  const [items, setItems] = useState<Update[]>([...OFFICIAL_UPDATES]);
  useEffect(() => {
    const controller = new AbortController();
    const refresh = async () => {
      try {
        const response = await fetch('/api/official-news', { signal: controller.signal });
        if (!response.ok) return;
        const payload = await response.json();
        if (!Array.isArray(payload.sources)) return;
        for (const publisher of publishers) {
          const result = payload.sources.find((source: { id: string }) => source.id === publisher.id);
          if (!result || !['ok', 'stale'].includes(result.status) || !Array.isArray(result.items)) continue;
          const updates: Update[] = result.items.filter((item: Update) => {
            try {
              const url = new URL(item.url);
              return typeof item.title === 'string' && item.title.length > 0 && item.title.length <= 300 &&
                typeof item.id === 'string' && item.source === publisher.name &&
                Number.isFinite(Date.parse(item.date)) && url.protocol === 'https:' &&
                url.hostname === publisher.domain && !url.username && !url.password;
            } catch { return false; }
          }).slice(0, 6);
          if (controller.signal.aborted) return;
          setItems(previous => [...previous.filter(item => item.source !== publisher.name), ...updates]);
        }
      } catch { /* Retain available headlines if the source cannot be reached. */ }
    };
    void refresh();
    const timer = window.setInterval(refresh, 60 * 60 * 1000);
    return () => { controller.abort(); window.clearInterval(timer); };
  }, []);
  return (
  <div className="official-publishers" id="official-updates">
    {publishers.map(publisher => (
      <section className={`official-publisher publisher-${publisher.id}`} key={publisher.id} aria-labelledby={`publisher-${publisher.id}-heading`}>
        <header className="official-publisher-heading">
          <span className="official-publisher-badge" aria-hidden="true">{publisher.abbreviation}</span>
          <div>
            <h2 id={`publisher-${publisher.id}-heading`}>{publisher.name}</h2>
            <p>{publisher.description}</p>
            <span className="official-publisher-domain">{publisher.domain}</span>
          </div>
        </header>
        <div className="official-updates-grid">
          {!items.some(item => item.source === publisher.name) && (
            <p>No relevant headlines are available in this feed at present.</p>
          )}
          {items.filter(update => update.source === publisher.name).map(update => (
            <article className="official-update-card" key={update.id}>
              <span className="official-update-source">{update.source}</span>
              <time dateTime={update.date}>{update.dateLabel || formatDate(update.date)}</time>
              <h3>{update.title}</h3>
              <a href={update.url} target="_blank" rel="noopener noreferrer">
                Read on {publisher.abbreviation} website
                <span className="sr-only">: {update.title} (opens in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
      </section>
    ))}
  </div>
  );
};
