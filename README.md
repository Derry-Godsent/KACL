# Kumasi Abattoir Company Limited (KACL) - Corporate Portal & Product Catalogue

Private, secure, modern corporate website, product catalogue, and protected content management foundation for **Kumasi Abattoir Company Limited (KACL)** in Kumasi, Ghana.

---

## 1. Project Overview & Institutional Purpose

Kumasi Abattoir Company Limited is the central regulated livestock processing, lairage, chilling, and meat distribution facility in the Ashanti Region of Ghana. Located in the Kaase Industrial Area, KACL operates in partnership with the **Veterinary Services Directorate (Ministry of Food and Agriculture - MoFA)** and the **Kumasi Metropolitan Assembly (KMA)**.

This application provides:
- A modern corporate presence detailing KACL history, veterinary oversight, sanitary processing, and cold-chain logistics.
- An intelligent wholesale and retail product catalogue with complete specifications (storage temperature, cut styles, packaging types, minimum wholesale orders, and veterinary certification).
- A quotation request (RFQ) builder and multi-channel enquiry system (direct phone, WhatsApp direct chat, and validated web enquiry).
- A directory of KACL municipal butcher depots across Kumasi with Ghana Post Digital Addresses (`AK-XXX-XXXX`), contact numbers, and operating schedules.
- Public notices and veterinary advisories.
- A protected staff administration portal (CMS) featuring role-based access control (RBAC), multi-factor authentication (MFA) support, customer enquiry review, CSV export, and immutable security audit logs.

---

## 2. Design Rules & Anti-AI Slop Compliance

This implementation strictly enforces all project design constraints:
- **No Em Dashes:** Website copy uses standard hyphens, commas, colons, or typographic separators. No em dashes appear in user-facing prose.
- **No Decorative Icons:** Icons are restricted strictly to functional affordances (phone links, search inputs, modal dismissal, dropdown indicators, and quantity buttons). No arbitrary decorative bullet icons.
- **No Gradients:** Surfaces use solid, high-contrast corporate palettes (Deep Forest Green `#143D2B`, Rich Pine `#1E5A3D`, Ghana Gold `#C59B27`, Slate `#0F172A`, Clean Canvas `#F8F9FA`).
- **Zero-Pill Metadata Discipline:** Metadata (codes, categories, weights, dates) is rendered as clean unboxed typography with subtle separators (`·`), avoiding badge clutter.
- **Top Bar Contract:** Exactly three zones separated by clean spacing (Brand Wordmark, 4-5 single-line navigation links, 1 primary action button).
- **No Fictitious Information:** No invented executives, fake awards, placeholder social links, or stock testimonials. Real institutional landmarks (Kaase, Bantama, Kejetia, Asafo, Kumasi Central Market) and verified operating hours (GMT) are maintained throughout.
- **Development Assets Notice:** All interim photography is watermarked with development asset identifiers pending delivery of official KACL photography.

---

## 3. Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide React (affordance-only).
- **Validation:** Zod for strict client and server-side schema verification.
- **Typography:** Plus Jakarta Sans (Headings), DM Sans (Body copy), Space Mono (Codes and Ghana Post Digital Addresses).
- **Architecture:** Modular component architecture with clean separation of domain types, storage adapters, validation schemas, and view templates.
- **Content Management:** Custom staff portal reflecting Payload CMS content models with collection schemas for Products, Categories, Public Notices, Inquiries, Outlets, and Audit Logs.

---

## 4. Website Architecture & Pages

The application delivers the 15 required sections:

1. **Home:** High-impact facility visual, value proposition, operational standards strip, services bento, featured certified cuts, and institutional CTA.
2. **About KACL:** Historical mandate, vision, mission, core values, and regulatory oversight by MoFA and KMA.
3. **Services:** Six operational divisions (Lairage, Humane Slaughter & Rail Dressing, Veterinary Inspection, Cold Storage, Commercial Deboning, and Refrigerated Delivery).
4. **Food Safety and Quality:** The four-stage sanitary barrier, knife sterilization at 82°C, organ pathology checks, indelible ink stamping, and zero-release condemnation rules.
5. **Products:** Intelligent catalogue with category filtering, search, cut specifications, and RFQ cart integration.
6. **Product Categories:** Prime Beef Cuts, Specialty Cuts & Offal, Processed Meats, and Institutional Bulk Wholesale.
7. **Individual Product Details:** Dedicated modal with temperature requirements, packaging formats, cut portion styles, and direct WhatsApp / RFQ actions.
8. **Bulk Orders and Institutional Supply:** Tailored procurement pathways for SHS schools, colleges, hotels, hospitals, and corporate caterers, plus third-party toll slaughtering.
9. **Retail Outlets:** Complete directory for Kaase Main Gate, Central Market, Bantama, Kejetia, and Asafo with Ghana Post GPS addresses.
10. **Delivery Information:** Refrigerated van fleet protocols, temperature monitoring, and Kumasi metropolitan delivery routes.
11. **News and Notices:** Official public advisories, holiday slaughter schedules, and veterinary health bulletins.
12. **Contact and Location:** Physical coordinates in Kaase, Ghana Post Address (`AK-284-9104`), direct phones, WhatsApp, and validated enquiry form.
13. **Privacy Policy:** Compliant with Ghana Data Protection Act 2012 (Act 843).
14. **Refund and Returns Policy:** Perishable cold-chain return criteria and dock acceptance protocols.
15. **Protected Staff Administration Area:** Staff login, MFA verification, customer RFQ workflow (New -> Reviewed -> Quoted -> Fulfilled), product catalog editor, notice publisher, and audit logs.

---

## 5. Security Architecture & Anti-Spam Controls

- **Input Validation:** All customer enquiries and quotation submissions are validated against strict Zod schemas (`src/lib/validation.ts`).
- **Honeypot Protection:** Forms include a hidden honeypot field (`honeypot`). Submissions containing values in this field are rejected as automated bot spam.
- **Timing Anti-Spam Check:** Submissions completed in under 2.5 seconds from form load are flagged and rejected.
- **Rate Limiting:** Browser storage and IP-level session rate limits prevent submission floods (maximum 4 enquiries per 15 minutes).
- **Staff Access Control:** Role-Based Access Control (RBAC) supporting Super Administrator, Commercial Sales Manager, Veterinary Inspector, and Content Editor.
- **Security Audit Logging:** All sensitive administrative operations (logins, role changes, status updates, CSV exports) are immutably logged with user, action, and timestamp.
- **Payment Safety:** No credit card or sensitive payment details are stored. Wholesale payments follow approved Ghanaian corporate banking and official proforma wire procedures.

---

## 6. Local Setup and Development

### Prerequisites
- Node.js (v20 or higher recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository and enter the directory
git clone <repo-url>
cd applet

# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Run TypeScript verification / linter
npm run lint

# Build for production
npm run build
```

---

## 7. Environment Variables (`.env.example`)

Create a `.env` file in the project root:

```env
# Server URL for self-referential links and webhooks
APP_URL="http://localhost:3000"

# Optional: Database connection string when migrating to managed PostgreSQL
# DATABASE_URL="postgresql://kacl_admin:<password>@<db-host>:5432/kacl_production"

# Optional: Object storage for high-resolution media assets
# S3_BUCKET_NAME="kacl-production-assets"
# S3_REGION="eu-west-1"

# Production Session & Auth Secret
# AUTH_SECRET="generate-a-secure-random-secret-key"
```

---

## 8. Deployment & Backup Plan

1. **DNS & Edge Protection:** Route traffic through Cloudflare for DNS management, SSL/TLS termination (Strict mode), Web Application Firewall (WAF), rate limiting, and DDoS protection.
2. **Hosting Environment:** Deploy as a containerized Node.js service (Cloud Run, AWS ECS, or Render) with automatic health checks and autoscaling.
3. **Database Migration Path:** In production, connect to managed PostgreSQL (such as Google Cloud SQL or Supabase) with automated daily encrypted point-in-time snapshots.
4. **Media Storage:** Offload approved high-resolution facility and product photography to cloud object storage (Cloud Storage or AWS S3) served via CDN.
5. **Monitoring & Logging:** Enable structured JSON logging, uptime monitoring, and error tracking (e.g. Sentry) to detect any service interruptions.
