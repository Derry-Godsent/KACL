# Kumasi Abattoir Company Limited (KACL) Website

Public corporate website and product catalogue for **Kumasi Abattoir Company Limited (KACL)**, Kaase Industrial Area, Kumasi, Ghana.

## What this application is

- A React 19 + TypeScript + Vite + Tailwind CSS v4 public website.
- Product catalogue, services, food-safety information, outlets, reports, media gallery and official FDA/VSD news links.
- A quotation cart stored in the visitor's browser. The cart contains catalogue items and quantities only.
- A contact form that **prepares** a message for WhatsApp or email. It does not submit to a server, create a reference number, or store contact details.
- One read-only serverless endpoint, `/api/official-news`, which fetches fixed FDA/VSD RSS feeds and returns validated headline links.

## What this application is not

There is no staff portal, CMS, login, MFA, role-based access control, payment processing, server-side enquiry database, or immutable audit log. Older documentation claiming those features was inaccurate and has been removed. Do not deploy this repository as an authenticated admin system.

## Local development

Requires Node.js 22.12 or newer.

```bash
npm ci
npm run dev
```

Checks:

```bash
npm run lint
npm test
npm run audit
npm run build
```

To test the production build with the same security headers used on Vercel:

```bash
npm run build
npm run preview:secure
```

## Security model

- **TLS/HSTS:** HTTPS is terminated by the hosting provider. `vercel.json` sets HSTS, a restrictive Content Security Policy, anti-framing, MIME-sniffing protection, referrer policy and permissions policy.
- **No client secrets:** `.env.example` documents that `VITE_*` values are public. Never put API keys, database URLs, auth secrets or tokens in them.
- **Reproducible installs:** `package-lock.json` is committed and CI/Vercel use `npm ci`. Dependabot checks npm and GitHub Actions weekly.
- **Minimal dependencies:** Unused AI, Express, dotenv and animation packages were removed. `npm audit` currently reports zero known vulnerabilities; this is not a guarantee of safety.
- **Private data:** Enquiries, audit logs and staff sessions are not persisted. Legacy browser keys from older builds are purged. Only the non-personal quotation cart is stored locally.
- **News proxy:** Fixed HTTPS sources, redirect rejection, timeout, 2 MB response cap, DTD/entity rejection, safe entity decoding, strict URL/date/title validation, bounded output and stale fallback.
- **Links and embeds:** New-tab links use `noopener noreferrer`; the Google Maps iframe uses `no-referrer` and is restricted by CSP.
- **Disclosure:** `public/.well-known/security.txt` and `SECURITY.md` provide a reporting route.

See `docs/security-audit.md` for the audit findings, remediation and residual risks.

## Deployment

The project is configured for Vercel (`vercel.json`). Production should be served only over HTTPS with a valid certificate. The custom domain must be attached to the hardened deployment and DNS pointed at the host before the old WordPress installation is retired.

**Migration warning:** If `kumasiabattoir.com` still resolves to an old WordPress host, secure or remove that host separately. An exposed `/wp-admin/install.php` is a site-takeover risk. Do not leave an unclaimed WordPress installer reachable while preparing the new site.

## Content and media

- Repository media assets live under `public/images/`.
- The Media page separates the AGM photo gallery from official FDA/VSD news.
- See `docs/media-gallery.md`, `docs/official-news-sources.md`, `docs/branding.md`, `docs/leadership-photos.md` and `docs/photography.md`.

## License

Source files retain their SPDX license identifiers. Contact KACL for reuse of institutional photography and branding.
