/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, ArrowUpRight } from 'lucide-react';
import { KACL_COMPANY_INFO } from '../data/initialData';

interface PoliciesViewProps {
  initialTab?: 'privacy' | 'refund';
  onNavigate: (view: string) => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({ initialTab = 'privacy', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'refund'>(initialTab);
  useEffect(() => setActiveTab(initialTab), [initialTab]);

  return (
    <div className="policies-page">
      <div className="page-width">
        <header className="policies-intro">
          <span className="policies-kicker">Governance &amp; terms</span>
          <h1>Our policies. Your peace of mind.</h1>
          <p>
            How we handle your information and care for your order, from data
            protection under Ghana’s Act 843 to fresh meat handover and returns.
          </p>
        </header>

        <div className="policies-switch" role="group" aria-label="Choose a policy">
          <button type="button" aria-pressed={activeTab === 'privacy'}
            aria-controls="policy-document" onClick={() => setActiveTab('privacy')}>
            <strong>Privacy &amp; data protection</strong>
            <span>Your information and Act 843</span>
          </button>
          <button type="button" aria-pressed={activeTab === 'refund'}
            aria-controls="policy-document" onClick={() => setActiveTab('refund')}>
            <strong>Cold chain &amp; returns</strong>
            <span>Delivery, inspection and claims</span>
          </button>
        </div>

        <div className="policies-reading-layout">
          <aside className="policies-help">
            <span className="policies-kicker">Here to help</span>
            <h2>A question about these policies?</h2>
            <p>Speak with our team for clarification before placing your order.</p>
            <button className="button-secondary" type="button" onClick={() => onNavigate('contact')}>
              Contact KACL
            </button>
          </aside>
          <div id="policy-document" className="policies-document-wrap">
          {activeTab === 'privacy' ? (
            <article key="privacy" className="policies-document" aria-labelledby="privacy-policy-heading">
              <div className="policies-document-heading">
                <h2 id="privacy-policy-heading">
                  Privacy & Data Protection Policy
                </h2>
                <p className="policies-document-note">
                  Effective Date: 31 October 2026. This policy describes how we handle personal data under Ghana’s Data Protection Act, 2012 (Act 843).
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="policies-section-title">1. Entity Identification & Scope</h3>
                <p>
                  This Privacy Policy explains how Kumasi Abattoir Company Limited (referred to as &quot;KACL&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating at Kaase Industrial Area, Kumasi, Ghana, collects, uses, stores, and protects corporate and individual information gathered through our website, telephone orders, WhatsApp, email, and wholesale quotation requests.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="policies-section-title">2. Information We Collect</h3>
                <p>
                  The website contact form prepares a message in your browser. It does not send or store your contact details on our website. If you choose to send the message by WhatsApp or email, or contact us by phone, we receive the information you provide, which may include:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>Contact details: Name, organisation name, email address, and phone number.</li>
                  <li>Delivery metadata: Delivery site address, Ghana Post Digital Address, and receiving dock contact.</li>
                  <li>Order specifications: Requested cuts, quantities, scheduled delivery times, and invoicing preferences.</li>
                  <li>Technical metadata: Our hosting and communication providers may process IP addresses, request logs, and device information needed to deliver and secure their services.</li>
                </ul>
                <p>
                  The website stores a quotation cart in your browser. The cart contains catalogue items and quantities only, not your name, phone number, email address, or message. You can clear it by removing items or clearing your browser storage.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="policies-section-title">3. Purpose of Processing</h3>
                <p>
                  Collected data is used strictly for legitimate commercial and regulatory operations:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>Calculating and issuing commercial proforma invoices and official quotations.</li>
                  <li>Executing refrigerated van delivery routes and generating MoFA Veterinary Transit Waybills.</li>
                  <li>Managing institutional supply agreements and credit arrangements where pre-approved.</li>
                  <li>Complying with statutory audits from the Kumasi Metropolitan Assembly and Ghana Revenue Authority.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="policies-section-title">4. Data Confidentiality</h3>
                <p>
                  KACL does not sell, lease, rent, or trade customer information to third-party marketing companies. Data is disclosed only to authorized staff, logistics drivers, or statutory regulatory officers when required by Ghanaian law. WhatsApp, email, Google Fonts and Google Maps are third-party services; when you use them, their own privacy and security practices also apply.
                </p>
                <p>
                  We use HTTPS, access controls and security headers to reduce risk, but no online service can be guaranteed completely secure. Please do not send passwords, payment card details, or other sensitive credentials through the website contact form.
                </p>
              </section>

              <section className="policies-desk">
                <h3 className="policies-section-title">5. Administration Contact</h3>
                <div className="policies-contact-details">
                  <div className="font-bold text-[#06457f]">Kumasi Abattoir Company Limited</div>
                  <div className="text-slate-600">Administration Block, Kaase Industrial Area, Kumasi, Ghana</div>
                  <div className="text-slate-600">Email: <a href={`mailto:${KACL_COMPANY_INFO.email}`}>{KACL_COMPANY_INFO.email}</a> | Phone: <a href={`tel:${KACL_COMPANY_INFO.primaryPhone.replace(/[^+0-9]/g, '')}`}>{KACL_COMPANY_INFO.primaryPhone}</a></div>
                </div>
              </section>
            </article>
          ) : (
            <article key="refund" className="policies-document" aria-labelledby="returns-policy-heading">
              <div className="policies-document-heading">
                <h2 id="returns-policy-heading">
                  Perishable Cold Chain & Returns Policy
                </h2>
                <p className="policies-document-note">
                  Mandatory standards governing fresh meat handover, temperature checks, and return protocols.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="policies-section-title">1. Perishable Food Integrity</h3>
                <p>
                  Fresh beef, processed meats, and edible offal are perishable food items subject to strict public health and temperature controls. To protect the public food supply and adhere to Veterinary Services Directorate regulations, return protocols differ from ordinary dry goods.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="policies-section-title">2. Inspection at Time of Handover</h3>
                <p>
                  The customer or authorised receiving officer (chef, storekeeper, or butcher) is required to inspect every consignment upon arrival at their receiving dock before signing the delivery waybill. The inspection includes:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>Digital temperature reading of the transport compartment and product interior (must be within 0°C to 4°C).</li>
                  <li>Verification of official indelible Veterinary Ink Stamps on carcass sides or quarters.</li>
                  <li>Verification of package seal integrity, carton labels, and gross weight recorded against the invoice.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="policies-section-title">3. Immediate Non-Acceptance</h3>
                <p>
                  If a product delivered by KACL refrigerated vehicles fails temperature specifications at delivery or exhibits packaging damage, the customer must note the discrepancy on the delivery waybill immediately and decline acceptance of the affected portion. KACL will dispatch an immediate replacement from our Kaase cold holding inventory or issue a credit note on the customer account within 24 hours.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="policies-section-title">4. Post-Acceptance Limitation</h3>
                <p>
                  Once a perishable consignment has been inspected, accepted, and signed for at the customer receiving facility, it enters the customer cold storage. KACL cannot accept returns of meat that has left our controlled custody and remained under unverified third-party storage conditions.
                </p>
              </section>

              <section className="policies-desk">
                <h3 className="policies-section-title">5. Dispatch & Claims Desk</h3>
                <div className="policies-contact-details">
                  <div className="font-bold text-[#06457f]">KACL Quality and Dispatch Desk</div>
                  <div className="text-slate-600">Telephone Hotline: <a href={`tel:${KACL_COMPANY_INFO.salesHotline.replace(/[^+0-9]/g, '')}`}>{KACL_COMPANY_INFO.salesHotline}</a></div>
                  <div className="text-slate-600">Email: <a href={`mailto:${KACL_COMPANY_INFO.email}`}>{KACL_COMPANY_INFO.email}</a></div>
                </div>
              </section>
            </article>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};
