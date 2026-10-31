# Security Policy

## Reporting a vulnerability

Email **kumasiabatoir@gmail.com** with the affected URL, reproduction steps, impact and any screenshots. Do not include real customer data, passwords, payment details or live exploits in the report. Do not test against third-party systems, spam the contact channels, or attempt denial-of-service.

We aim to acknowledge reports within 5 business days. Please allow reasonable time for a fix before public disclosure.

## Supported version

Only the current `main` branch and the production deployment are supported.

## Security model

This is a public, mostly static React website with one read-only serverless endpoint (`/api/official-news`). It does **not** provide a staff login, CMS, payment processing, or server-side enquiry storage. The contact form prepares a message in the visitor's browser; the visitor chooses whether to send it through WhatsApp or email.

Controls include:

- HTTPS and HSTS at the hosting edge.
- Restrictive Content Security Policy, anti-framing, MIME-sniffing protection, referrer policy and permissions policy.
- No client-side secrets. `VITE_*` values are public and must never contain credentials.
- Reproducible npm installs (`npm ci` + `package-lock.json`), weekly Dependabot updates and CI dependency audit.
- No enquiry, audit-log or staff-session persistence in browser storage. Legacy private keys are purged.
- Read-only news proxy with fixed HTTPS sources, redirect rejection, timeout, response-size cap, XML DTD/entity rejection and strict output validation.
- New-tab links use `noopener noreferrer`; the embedded map uses `no-referrer`.

## Out of scope / residual risk

- WhatsApp, email, Google Fonts and Google Maps are third-party services with their own security and privacy practices.
- Browser-side validation is not a security boundary. Any future backend must add server-side validation, authentication, authorization, rate limiting, logging and abuse detection.
- Hosting, DNS, registrar, email and GitHub account security (strong passwords, MFA, least privilege, recovery codes) are required but are not controlled by this repository.
- No website can be guaranteed impenetrable. Security requires monitoring, patching, backups and incident response.
