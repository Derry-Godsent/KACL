import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = path => readFileSync(path, 'utf8');
const vercel = JSON.parse(read('vercel.json'));
const headers = Object.fromEntries(vercel.headers.find(rule => rule.source === '/(.*)').headers.map(h => [h.key, h.value]));
const csp = headers['Content-Security-Policy'];
for (const directive of ["default-src 'self'", "script-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'self'", "frame-ancestors 'none'", 'upgrade-insecure-requests']) {
  assert.ok(csp.includes(directive), `CSP missing ${directive}`);
}
assert.ok(!/script-src[^;]*unsafe-inline/.test(csp), 'CSP must not allow inline scripts');
assert.ok(!/script-src[^;]*unsafe-eval/.test(csp), 'CSP must not allow eval');
assert.ok(headers['Strict-Transport-Security'].includes('max-age=31536000'));
assert.ok(headers['Strict-Transport-Security'].includes('includeSubDomains'));
assert.equal(headers['X-Content-Type-Options'], 'nosniff');
assert.equal(headers['X-Frame-Options'], 'DENY');
assert.equal(headers['Referrer-Policy'], 'strict-origin-when-cross-origin');
assert.ok(headers['Permissions-Policy'].includes('camera=()'));
assert.ok(headers['Permissions-Policy'].includes('microphone=()'));
assert.ok(headers['Permissions-Policy'].includes('geolocation=()'));
assert.equal(vercel.installCommand, 'npm ci');
assert.ok(existsSync('package-lock.json'), 'npm lockfile is required for reproducible installs');
assert.ok(!existsSync('bun.lock'), 'use one lockfile to avoid dependency drift');
assert.ok(!existsSync('.npmrc') || !read('.npmrc').includes('legacy-peer-deps=true'), 'do not hide peer dependency conflicts');

const pkg = JSON.parse(read('package.json'));
for (const unused of ['@google/genai', 'dotenv', 'express', '@types/express', 'motion']) {
  assert.ok(!pkg.dependencies?.[unused] && !pkg.devDependencies?.[unused], `unused dependency ${unused} must stay removed`);
}
assert.ok(pkg.scripts.audit.includes('npm audit'));
assert.ok(pkg.engines.node);
assert.ok(read('.env.example').includes('VITE_'), 'environment example must warn about public client variables');
assert.ok(existsSync('public/.well-known/security.txt'));
assert.ok(existsSync('.github/workflows/security.yml'));
assert.ok(read('.github/workflows/security.yml').includes('contents: read'));
assert.ok(read('.github/workflows/security.yml').includes('npm ci'));

const storage = read('src/lib/storage.ts');
assert.ok(storage.includes('purgeLegacyPrivateStorage'));
for (const key of ['kacl_cms_inquiries', 'kacl_cms_audit_logs', 'kacl_staff_session', 'kacl_submission_log']) {
  assert.ok(storage.includes(key), `legacy key ${key} must be purged`);
}
assert.ok(!/localStorage\.setItem\([^)]*(inquiries|audit|staff)/i.test(storage));
const contact = read('src/views/ContactView.tsx');
assert.ok(!contact.includes('localStorage'));
assert.ok(!contact.includes('Math.random()'));
assert.ok(!contact.includes('recordSubmission'));
assert.ok(!read('src/data/initialData.ts').includes('INITIAL_INQUIRIES'));
assert.ok(!read('src/App.tsx').includes('saveStoredInquiries'));
assert.ok(!read('src/App.tsx').includes('addAuditLog'));

const api = read('api/official-news.mjs');
assert.ok(api.includes('processEntities: false'));
assert.ok(api.includes('<!DOCTYPE|<!ENTITY'));
assert.ok(api.includes("redirect: 'error'"));
assert.ok(api.includes('MAX_BYTES'));
assert.ok(api.includes('AbortSignal.timeout'));
assert.ok(api.includes('X-Content-Type-Options'));

for (const file of ['src/components/HeroSlideshow.tsx', 'src/components/ProductDetailModal.tsx', 'src/components/QuotationDrawer.tsx', 'src/views/ContactView.tsx', 'src/views/HomeView.tsx', 'src/views/ServicesView.tsx']) {
  const source = read(file);
  assert.ok(!source.includes('rel="noreferrer"'), `${file} must explicitly use noopener for new tabs`);
}
assert.ok(contact.includes('referrerPolicy="no-referrer"'));
console.log('Security checks passed: headers, CSP, HSTS, reproducible installs, dependency surface, private-storage purge, honest enquiry flow, feed parser and link isolation.');
