# Official news links: research and editorial policy

Reviewed 30 October 2026. This is implementation research, not legal advice or permission from publishers.

## Findings

- FDA newsroom: https://fdaghana.gov.gh/newsroom/news/
- FDA RSS: https://fdaghana.gov.gh/feed/ returned feed entries. Mixed subject matter includes medicines and cosmetics, so wholesale import would be unsuitable for KACL.
- VSD homepage: https://vsd.gov.gh/
- VSD RSS: https://vsd.gov.gh/feed/ returned entries, with the newest observed dated 2 July 2025. Do not describe these as breaking or current alerts.
- No explicit syndication/republication licence was verified in the pages and targeted searches reviewed. RSS availability is not assumed to grant unrestricted reuse. Search results for unrelated government sites are not treated as these publishers' terms.
- Ghana Copyright Act 2005 (Act 690), WIPO source: https://www.wipo.int/wipolex/en/legislation/details/1789 (government copyright and permitted uses). Government publication is not a blanket public-domain licence. This implementation does not rely on a claimed statutory exception.

## Selected items

1. FDA: https://fdaghana.gov.gh/fda-engages-stakeholders-on-the-implementation-of-site-verification-for-frozen-animal-products/
   Body explicitly dates the stakeholder sessions 16–18 September 2025. Date displayed as an event range, not an invented publication date. Independently worded topic heading and brief factual summary. No copied quotation, full article, photograph or logo.
2. VSD: https://vsd.gov.gh/news-on-food-safety-awareness-on-metro-tv/
   Page and RSS date: 2 July 2025. Original short factual summary. Links to the source page, not an embedded Facebook player.

## MoFA exclusion

The page below contains relevant reporting, but its fetched content also included unrelated adult/essay spam links in the surrounding page. This is a warning sign, not a confirmed diagnosis of compromise. No new MoFA news link or automated importer was added. Existing user-approved footer MoFA link is unchanged. Recheck site integrity before adding a news item.

https://mofa.gov.gh/site/index.php/media-centre/latest-news/item/713-mofa-receives-fao-supported-logistics-to-strengthen-ghana-s-animal-health-and-pandemic-preparedness

## Implementation

Automatic filtered RSS headlines are served by `api/official-news.mjs` on Vercel, with a matching Vite development middleware. The browser requests the same-origin `/api/official-news` endpoint on page entry and hourly while the page remains open. No client-side requests to the official domains, API keys, database, paid news service or approval interface are needed.

Only fixed FDA/VSD feed URLs are fetched. Request parameters cannot select destinations. Fetches reject redirects, time out after 7 seconds and limit responses to 2 MB. XML with DTD/entity declarations is rejected. Items require HTTPS source-host links, valid non-future dates, and relevant headline/category keywords. Remote article HTML, descriptions, pictures, tracking widgets and full text are not returned. React escapes all headline text. Six matching items per source, newest first; duplicate URLs are removed.

Successful responses are cached for an hour on the CDN and in each warm function instance, with concurrent fetch deduplication. The CDN can serve stale successful responses while revalidating. A warm instance retains its last successful source results on failure. On a cold start plus upstream failure, the client retains the verified starter headlines from `officialUpdates.ts`; this is not a durable archive or a guarantee of uninterrupted freshness. Sources succeed/fail independently. A valid feed with no relevant items displays an honest empty state. No scheduled background polling: updates happen on page visits and hourly while open, subject to caching and publisher feed cadence.

FDA and VSD have separate labelled and colour-differentiated sections. Unverified KACL starter media records are removed until real company publications are supplied. MoFA news remains excluded for the reason above.

## Relevance and limitations

Filters target food safety/hygiene, meat, livestock, animal health, cold storage and relevant diseases using headline/category keywords, not the full article body. FDA cosmetics, unrelated medicines, and VSD historical pieces are generally excluded. This is heuristic, not editorial or legal review: matches can be imperfect and feeds can omit older stories. Keep dates visible; never imply every item is a current alert. RSS availability was verified, but unrestricted reuse permission was not established. Only attributed headline links are displayed; no full-text syndication is implemented. Seek publisher guidance before broadening reuse.

## Verification

`node scripts/official-news-test.mjs` tests parsing, relevance, safe links, deduplication, dates, DTD rejection, caching, method rejection and stale fallback with mocked upstreams. UI smoke checks cover publisher separation and source links. Outbound sandbox restrictions prevent live Node HTTP requests to the official domains, so live serverless retrieval must be checked after deployment. Earlier research fetched both feeds through the page-retrieval tool. No claim of iPhone or production RSS verification has been made.
