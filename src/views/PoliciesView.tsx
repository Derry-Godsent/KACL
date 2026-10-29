/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, FileText, ArrowUpRight } from 'lucide-react';
import { KACL_COMPANY_INFO } from '../data/initialData';

interface PoliciesViewProps {
  initialTab?: 'privacy' | 'refund';
  onNavigate: (view: string) => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({ initialTab = 'privacy', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'refund'>(initialTab);

  return (
    <div className="bg-[#FAF9F5] text-[#0C141D]">
      {/* Editorial Header */}
      <section className="border-b border-[#E5E3DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#047857] font-semibold">
                Governance & Terms
              </span>
              <span className="h-px w-8 bg-[#047857]/40" />
              <span className="font-mono text-[11px] text-slate-500 uppercase">
                Legal Charters
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A2618] tracking-tight leading-[1.08]">
              Policies & Statutory Charters.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-2">
              Statutory frameworks governing public data protection under Act 843 and commercial perishable cold chain handover protocols across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs & Content */}
      <section className="border-b border-[#E5E3DB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
          {/* Hairline Tabs */}
          <div className="flex border-b border-[#E5E3DB] mb-12">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`pb-4 px-6 text-xs font-mono font-semibold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'privacy'
                  ? 'border-[#0A2618] text-[#0A2618]'
                  : 'border-transparent text-slate-400 hover:text-slate-800'
              }`}
            >
              Privacy & Data Protection Policy (Act 843)
            </button>
            <button
              onClick={() => setActiveTab('refund')}
              className={`pb-4 px-6 text-xs font-mono font-semibold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'refund'
                  ? 'border-[#0A2618] text-[#0A2618]'
                  : 'border-transparent text-slate-400 hover:text-slate-800'
              }`}
            >
              Perishable Cold Chain & Returns Policy
            </button>
          </div>

          {activeTab === 'privacy' ? (
            <article className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="space-y-2 pb-6 border-b border-[#E5E3DB]">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#0A2618]">
                  Privacy & Data Protection Policy
                </h2>
                <p className="font-mono text-xs text-slate-500">
                  Effective Date: 1 January 2026. Compliant with the Data Protection Act, 2012 (Act 843) of the Republic of Ghana.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-[#0A2618] uppercase tracking-wider font-mono">1. Entity Identification & Scope</h3>
                <p>
                  This Privacy Policy explains how Kumasi Abattoir Company Limited (referred to as &quot;KACL&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating at Kaase Industrial Area, Kumasi, Ghana, collects, uses, stores, and protects corporate and individual information gathered through our official corporate portal, telephone orders, and wholesale quotation requests.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-[#0A2618] uppercase tracking-wider font-mono">2. Information We Collect</h3>
                <p>
                  When institutional clients, commercial buyers, or individual customers interact with KACL, we collect:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>Contact details: Name, organisation name, corporate email address, and phone number.</li>
                  <li>Delivery metadata: Delivery site address, Ghana Post Digital Address, and receiving dock contact.</li>
                  <li>Order specifications: Requested cuts, carcass quantities, scheduled delivery times, and invoicing preferences.</li>
                  <li>Technical metadata: Form submission timestamps and anti-spam verification tokens.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-[#0A2618] uppercase tracking-wider font-mono">3. Purpose of Processing</h3>
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
                <h3 className="text-sm font-bold text-[#0A2618] uppercase tracking-wider font-mono">4. Data Confidentiality</h3>
                <p>
                  KACL does not sell, lease, rent, or trade customer information to third-party marketing companies. Data is disclosed only to authorized staff, logistics drivers, or statutory regulatory officers when required by Ghanaian law.
                </p>
              </section>

              <section className="space-y-2 pt-6 border-t border-[#E5E3DB]">
                <h3 className="text-sm font-bold text-[#0A2618] uppercase tracking-wider font-mono">5. Administration Contact</h3>
                <div className="p-6 border border-[#E5E3DB] bg-white font-mono text-xs space-y-1">
                  <div className="font-bold text-[#0A2618]">Kumasi Abattoir Company Limited</div>
                  <div className="text-slate-600">Administration Block, Kaase Industrial Area, Kumasi, Ghana</div>
                  <div className="text-slate-600">Email: {KACL_COMPANY_INFO.email} | Phone: {KACL_COMPANY_INFO.primaryPhone}</div>
                </div>
              </section>
            </article>
          ) : (
            <article className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="space-y-2 pb-6 border-b border-[#E5E3DB]">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#0A2618]">
                  Perishable Cold Chain & Returns Policy
                </h2>
                <p className="font-mono text-xs text-slate-500">
                  Mandatory standards governing fresh meat handover, temperature checks, and return protocols.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-[#0A2618] uppercase tracking-wider font-mono">1. Perishable Food Integrity</h3>
                <p>
                  Fresh beef, processed meats, and edible offal are perishable food items subject to strict public health and temperature controls. To protect the public food supply and adhere to Veterinary Services Directorate regulations, return protocols differ from ordinary dry goods.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-[#0A2618] uppercase tracking-wider font-mono">2. Inspection at Time of Handover</h3>
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
                <h3 className="text-sm font-bold text-[#0A2618] uppercase tracking-wider font-mono">3. Immediate Non-Acceptance</h3>
                <p>
                  If a product delivered by KACL refrigerated vehicles fails temperature specifications at delivery or exhibits packaging damage, the customer must note the discrepancy on the delivery waybill immediately and decline acceptance of the affected portion. KACL will dispatch an immediate replacement from our Kaase cold holding inventory or issue a credit note on the customer account within 24 hours.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-[#0A2618] uppercase tracking-wider font-mono">4. Post-Acceptance Limitation</h3>
                <p>
                  Once a perishable consignment has been inspected, accepted, and signed for at the customer receiving facility, it enters the customer cold storage. KACL cannot accept returns of meat that has left our controlled custody and remained under unverified third-party storage conditions.
                </p>
              </section>

              <section className="space-y-2 pt-6 border-t border-[#E5E3DB]">
                <h3 className="text-sm font-bold text-[#0A2618] uppercase tracking-wider font-mono">5. Dispatch & Claims Desk</h3>
                <div className="p-6 border border-[#E5E3DB] bg-white font-mono text-xs space-y-1">
                  <div className="font-bold text-[#0A2618]">KACL Quality and Dispatch Desk</div>
                  <div className="text-slate-600">Telephone Hotline: {KACL_COMPANY_INFO.salesHotline}</div>
                  <div className="text-slate-600">Email: {KACL_COMPANY_INFO.email}</div>
                </div>
              </section>
            </article>
          )}
        </div>
      </section>
    </div>
  );
};
