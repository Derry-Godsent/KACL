/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, ShieldCheck, Truck, FileSpreadsheet, Building, CheckCircle2 } from 'lucide-react';
import { KACL_COMPANY_INFO } from '../data/initialData';

interface BulkSupplyViewProps {
  onNavigate: (view: string) => void;
  onOpenQuotationDrawer: () => void;
}

export const BulkSupplyView: React.FC<BulkSupplyViewProps> = ({ onNavigate, onOpenQuotationDrawer }) => {
  const institutionalSectors = [
    {
      index: '01',
      title: 'Senior High Schools, Technical Institutes & Universities',
      description: 'Termly wholesale agreements for lean stewing beef, carcass halves, and soup bones portioned for high-capacity student dining halls with scheduled delivery days.',
      specs: 'Minimum 100 kg contract lots with verified MoFA veterinary dispatch documentation.'
    },
    {
      index: '02',
      title: 'Hotels, Resorts & Executive Banqueting',
      description: 'Custom-trimmed striploins, tenderloins, ribeye blocks, and vacuum-sealed steak portions cut to precise gram weight specifications for culinary directors.',
      specs: '0°C to 2°C unbroken cold transit in KACL refrigerated vans direct to receiving docks.'
    },
    {
      index: '03',
      title: 'Hospitals & Healthcare Facilities',
      description: 'Extra-lean beef cuts with strict fat-trim benchmarks for patient dietary recovery programs, hospital staff canteens, and therapeutic nutrition.',
      specs: 'Batch traceability with dedicated sanitary handling protocols.'
    },
    {
      index: '04',
      title: 'Industrial Catering & Corporate Canteens',
      description: 'Reliable weekly or bi-weekly standing orders for factory shift canteens, construction camps, and corporate events across Greater Kumasi.',
      specs: 'Standardised 20 kg wholesale boxes for easy storeroom inventory management.'
    }
  ];

  const procurementSteps = [
    {
      step: '01',
      label: 'Submit Specification',
      detail: 'Specify weekly volume, preferred cuts, packaging format, and delivery address in Kumasi.'
    },
    {
      step: '02',
      label: 'Proforma Invoicing',
      detail: 'KACL commercial sales issues formal proforma with wholesale volume pricing and delivery schedule.'
    },
    {
      step: '03',
      label: 'Veterinary Clearance',
      detail: 'Consignment is prepared under strict supervision with MoFA health inspection permits issued.'
    },
    {
      step: '04',
      label: 'Cold-Chain Handover',
      detail: 'Refrigerated van delivers to your receiving bay with temperature verification and signed waybill.'
    }
  ];

  return (
    <div className="bg-[#FAF9F5] text-[#0C141D]">
      {/* Editorial Header */}
      <section className="border-b border-[#E5E3DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#047857] font-semibold">
                Commercial Procurement
              </span>
              <span className="h-px w-8 bg-[#047857]/40" />
              <span className="font-mono text-[11px] text-slate-500 uppercase">
                Institutional Standing Agreements
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A2618] tracking-tight leading-[1.08]">
              Bulk Supply & Contract Logistics.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-2">
              Kumasi Abattoir Company Limited provides institutional contracts, predictable wholesale pricing, scheduled refrigerated van deliveries, and official veterinary transit certification for commercial food operators.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Sector Architectural Ledger (Cardless) */}
      <section className="border-b border-[#E5E3DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E5E3DB]">
            <div className="space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                Institutional Sectors
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#0A2618]">
                Customised Contract Frameworks
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              04 Commercial Profiles
            </span>
          </div>

          <div className="divide-y divide-[#E5E3DB]">
            {institutionalSectors.map((sector) => (
              <div
                key={sector.index}
                className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-black/[0.015] transition-colors"
              >
                <div className="lg:col-span-1 font-mono text-xs font-semibold text-[#047857]">
                  [{sector.index}]
                </div>
                <div className="lg:col-span-5 space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#0A2618] leading-snug">
                    {sector.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sector.description}
                  </p>
                </div>
                <div className="lg:col-span-4 space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 block">
                    Contract Specification
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {sector.specs}
                  </p>
                </div>
                <div className="lg:col-span-2 flex lg:justify-end">
                  <button
                    onClick={onOpenQuotationDrawer}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0A2618] hover:text-[#047857] font-semibold transition-colors cursor-pointer"
                  >
                    <span>Request Terms</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract Slaughtering Architectural Crosshair Matrix */}
      <section className="border-b border-[#E5E3DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-20">
          <div className="max-w-3xl space-y-3 mb-12">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#047857] font-semibold">
              Toll Processing
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#0A2618]">
              Contract Slaughtering for Livestock Dealers & Butchers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Commercial cattle owners, pastoral traders, and butcher associations can utilize KACL modern mechanical dressing lines, chilling halls, and veterinary certification on a per-head toll fee basis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#E5E3DB] divide-y md:divide-y-0 md:divide-x divide-[#E5E3DB] bg-[#FAF9F5]">
            <div className="p-8 space-y-3">
              <span className="font-mono text-xs font-bold text-[#047857]">PHASE 01</span>
              <h3 className="text-sm font-bold text-[#0A2618]">Lairage & Weighing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Animals received at Kaase gates, inspected by MoFA veterinarians, rested in shaded pens, and recorded on the electronic weighbridge.
              </p>
            </div>
            <div className="p-8 space-y-3">
              <span className="font-mono text-xs font-bold text-[#047857]">PHASE 02</span>
              <h3 className="text-sm font-bold text-[#0A2618]">Mechanical Line Dressing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Humane handling, automated LPG singeing, mechanical dehiding, and split rail dressing without ground contact.
              </p>
            </div>
            <div className="p-8 space-y-3">
              <span className="font-mono text-xs font-bold text-[#047857]">PHASE 03</span>
              <h3 className="text-sm font-bold text-[#0A2618]">Stamping & Cold Holding</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official post-mortem ink stamping, transfer to chilled chambers, and secure dispatch to customer refrigerated transport.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E5E3DB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <span className="text-slate-600">
              For current toll fees, lairage pen reservation, and scheduling, contact the abattoir reception desk.
            </span>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-[#0A2618] hover:bg-[#123C27] text-white text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Contact Toll Sales
            </button>
          </div>
        </div>
      </section>

      {/* Procurement Process Summary (Horizontal Flow) */}
      <section className="border-b border-[#E5E3DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-20">
          <div className="space-y-2 mb-12">
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
              Standard Procurement Flow
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#0A2618]">
              Setting Up an Institutional Supply Contract
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E5E3DB] divide-y sm:divide-y-0 sm:divide-x divide-[#E5E3DB]">
            {procurementSteps.map((item) => (
              <div key={item.step} className="p-6 space-y-3 bg-[#FAF9F5]">
                <span className="font-mono text-xs font-bold text-[#047857]">STEP {item.step}</span>
                <h3 className="text-sm font-bold text-[#0A2618]">{item.label}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#0A2618] hover:bg-[#123C27] text-white text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Start Institutional Account Request
            </button>
            <button
              onClick={onOpenQuotationDrawer}
              className="w-full sm:w-auto px-8 py-3.5 border border-[#E5E3DB] hover:border-[#0A2618] bg-white text-[#0A2618] text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Configure Quotation Draft
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
