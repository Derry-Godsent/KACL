/**
 * Verified fallback headlines used until the RSS endpoint responds.
 * Review procedure and source research: docs/official-news-sources.md.
 * Only headlines, dates and links are displayed. Never render remote HTML.
 */
export const OFFICIAL_UPDATES = [
  {
    id: 'fda-frozen-animal-products-2025',
    source: 'Food and Drugs Authority',
    title: 'Site verification for frozen animal products',
    date: '2025-09-18',
    dateLabel: 'Stakeholder sessions: 16–18 September 2025',
    summary: 'FDA met importers, distributors and cold-store operators to explain site verification requirements for frozen animal products, with a focus on food safety and traceability.',
    url: 'https://fdaghana.gov.gh/fda-engages-stakeholders-on-the-implementation-of-site-verification-for-frozen-animal-products/',
  },
  {
    id: 'vsd-food-safety-awareness-2025',
    source: 'Veterinary Services Department',
    title: 'Food safety awareness on Metro TV',
    date: '2025-07-02',
    dateLabel: 'Published: 2 July 2025',
    summary: 'Veterinary Services shared a Metro TV food-safety awareness segment associated with the 2025 World Food Safety celebration.',
    url: 'https://vsd.gov.gh/news-on-food-safety-awareness-on-metro-tv/',
  },
] as const;
