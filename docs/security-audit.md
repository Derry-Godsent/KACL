# KACL website security audit and remediation

Date: 31 October 2026  
Scope: repository code, dependencies, browser storage, contact flow, serverless news endpoint, security headers, deployment configuration and publicly reachable domain behaviour.

## Executive summary

The new React site is mostly static and has a small attack surface, but the audit found several issues that were fixed in this branch. The most urgent finding is **outside the repository**: the live domain was observed redirecting to an unclaimed WordPress installer. That must be removed or locked down before the domain is cut over to the hardened site.

No website can be guaranteed impenetrable. The goal is to remove known weaknesses, reduce attack surface, protect data, and make monitoring/patching/incident response possible.

## Findings and fixes

### Critical: live domain exposed WordPress installer

**Observation:** `https://kumasiabattoir.com` redirected to `/wp-admin/install.php` and displayed the WordPress installation language picker. The domain was not attached to the Vercel project.

**Risk:** If reachable by the public, an unclaimed installer can allow an attacker to create the administrator account and take over the site. The reported `ERR_CERT_AUTHORITY_INVALID` also indicates a TLS/certificate-chain problem, though a certificate error alone is not proof of a hack.

**Required action:** Take the old WordPress host offline or restrict access immediately; remove the installer if the site is being retired; attach `kumasiabattoir.com` to the hardened Vercel deployment; update DNS; verify Vercel issues a valid certificate; enable HTTPS-only access. Do not complete the WordPress installer as a "fix".

### High: customer data and fake admin artefacts in browser storage

**Observation:** Older code shipped a seeded customer enquiry, stored submitted enquiries/audit logs/staff session in `localStorage`, and included staff-login validation remnants.

**Risk:** Personal data could remain on shared devices or be exposed to any script running on the origin. Fake audit/admin artefacts also created misleading security claims.

**Fix:** Removed seeded enquiries, staff/audit types and storage functions. The app now purges legacy private keys and persists only a validated, non-personal quotation cart. Catalogue data comes from the build, not editable browser storage.

### High: misleading contact submission and anti-spam claims

**Observation:** The contact form generated a random reference number, waited 500 ms, and claimed submission/anti-spam/rate-limit protection, but never sent data to a server.

**Risk:** Users could believe an enquiry was received when it was not. Client-side honeypots/timing/rate limits are not security boundaries.

**Fix:** The form now clearly prepares a message for WhatsApp/email, does not store contact details, does not invent a reference number, and does not claim server-side submission or anti-spam protection.

### High: missing security headers

**Observation:** No CSP, HSTS, anti-framing, MIME-sniffing, referrer or permissions policy was configured.

**Fix:** Added `vercel.json` headers: restrictive CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP and cross-domain policy. Added a local secure-preview server and automated header tests.

### Medium: dependency and install drift

**Observation:** Unused dependencies (`@google/genai`, `dotenv`, `express`, `@types/express`, `motion`) increased attack surface. Vercel used `npm install --legacy-peer-deps` with only a Bun lockfile.

**Fix:** Removed unused dependencies, committed `package-lock.json`, removed `bun.lock` and `legacy-peer-deps`, switched to `npm ci`, added Node engine, Dependabot and CI audit/lint/test/build. `npm audit` reports zero known vulnerabilities at audit time.

### Medium: RSS parser entity handling and stale cache

**Observation:** The parser processed entities, although DTDs were rejected. Stale fallback had no maximum age.

**Fix:** Disabled document entity processing, rejected DTD/ENTITY declarations, decoded only predefined XML/numeric references, bounded item/category counts, and capped stale fallback at 7 days. Existing fixed-source, HTTPS-only, redirect-rejecting, timeout and size-cap controls were retained.

### Medium: inaccurate documentation and privacy copy

**Observation:** README and privacy copy claimed protected CMS/RBAC/MFA/immutable logs/anti-spam tokens.

**Fix:** Rewrote README, added `SECURITY.md`, corrected privacy copy to describe the actual WhatsApp/email hand-off, local quotation cart and third-party services.

### Low: link and embed hardening

**Observation:** Some new-tab links used only `noreferrer`; the map iframe used a weaker referrer policy and allowed fullscreen.

**Fix:** All new-tab links now use `noopener noreferrer`; the map iframe uses `no-referrer` and no fullscreen permission.

## Verification

Run:

```bash
npm ci
npm run lint
npm test
npm run audit
npm run build
npm run preview:secure
```

Results on this branch:

- `npm ci`: passed.
- `npm run lint`: passed.
- `npm test`: UI smoke, official feed safety and security checks passed.
- `npm run audit`: 0 known vulnerabilities.
- `npm run build`: passed.
- Secure static preview browser check: security headers present, legacy private storage purged, malformed cart entries rejected, contact hand-off does not persist PII, gallery/lightbox still works, `security.txt` served, and no CSP violations.
- Vercel project install command updated to `npm ci`.

GitHub secret scanning, push protection, Dependabot alerts and private vulnerability reporting could not be enabled from this session because the GitHub integration lacks repository-administration permission. A repository owner should enable them in GitHub Settings > Advanced Security.

## Residual risks and required operational controls

1. **Domain/hosting/DNS/registrar/email/GitHub accounts:** Enable MFA, least privilege, recovery codes, registrar lock and monitoring. Repository code cannot protect compromised accounts.
2. **Old WordPress host:** Remove or isolate it. If any WordPress instance remains, update core/plugins/themes, remove unused plugins, disable file editing, protect `wp-admin`/`xmlrpc.php`, use valid TLS, and restore from a known-clean backup if compromise is suspected.
3. **Third parties:** WhatsApp, email, Google Fonts and Google Maps have their own security/privacy practices.
4. **Future backend:** Any authenticated CMS, database or form backend needs server-side validation, authorization, rate limiting, secure session management, audit logging, backups and abuse monitoring.
5. **Monitoring:** Enable uptime/TLS expiry monitoring, dependency alerts, deployment notifications and incident response. Review Vercel/GitHub access regularly.
6. **No guarantee:** Zero known npm vulnerabilities and strong headers reduce risk but do not make the site impenetrable.
