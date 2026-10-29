/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Thermometer, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { KACL_COMPANY_INFO } from '../data/initialData';

interface FoodSafetyViewProps {
  onNavigate: (view: string) => void;
}

export const FoodSafetyView: React.FC<FoodSafetyViewProps> = ({ onNavigate }) => {
  const safetyStages = [
    {
      step: '01',
      title: 'Ante-Mortem Clinical Screening',
      facility: 'Lairage Complex',
      detail: 'Animals are rested in shaded pens and observed for signs of infectious disease, fatigue, fever, abnormal gait, or respiratory distress. Sick animals are rejected or quarantined immediately.',
      standard: 'Zero entry for symptomatic livestock.'
    },
    {
      step: '02',
      title: 'Mechanical Hygiene & Hot Sterilisation',
      facility: 'Processing Rail',
      detail: 'Carcasses are conveyed overhead on stainless steel rails without touching the floor. Butchers use water-bath knife sterilisers maintained continuously at 82°C between individual carcasses.',
      standard: 'Knife sterilisation at 82°C.'
    },
    {
      step: '03',
      title: 'Systematic Post-Mortem Slicing',
      facility: 'Veterinary Station',
      detail: 'Veterinary technical officers incise mesenteric lymph nodes, examine the liver for fascioliasis (flukes), evaluate lungs for pleuropneumonia, and inspect carcass surfaces for cysticercosis.',
      standard: 'Indelible ink veterinary stamp applied upon passing.'
    },
    {
      step: '04',
      title: 'Rapid Chilling & Transit Control',
      facility: 'Cold Chain Bay',
      detail: 'Passed carcasses are transferred into pre-cooled chilling rooms holding 0°C to 4°C. Dispatch is conducted directly through temperature-sealed loading bays into refrigerated logistics vans.',
      standard: 'Temperature-logged transport waybill.'
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
                Sanitary Protocol
              </span>
              <span className="h-px w-8 bg-[#047857]/40" />
              <span className="font-mono text-[11px] text-slate-500 uppercase">
                Veterinary Oversight
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A2618] tracking-tight leading-[1.08]">
              Food Safety & Veterinary Certification.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-2">
              Public health is our non-negotiable priority. Every animal processed at Kumasi Abattoir Company Limited undergoes systematic ante-mortem clinical evaluation, sterile line dressing, organ examination, and indelible veterinary stamping.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Asset Spotlight (Cardless hairline split) */}
      <section className="border-b border-[#E5E3DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#E5E3DB]">
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[420px] bg-slate-100 border-b lg:border-b-0 lg:border-r border-[#E5E3DB]">
              <img
                src="/src/assets/images/processing_inspection_1793281367767.jpg"
                alt="Veterinary technician examining beef carcass along the stainless steel dressing line"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-5 p-8 lg:p-12 space-y-6 bg-[#FAF9F5] flex flex-col justify-center">
              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#047857] font-semibold">
                  Statutory Authority
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#0A2618]">
                  Resident Officers from the Veterinary Services Directorate
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Inspection is not self-audited. It is performed independently by government veterinarians from the Ministry of Food and Agriculture (MoFA). Their statutory stamp is the only legal permit authorising meat movement from our gates.
              </p>
              <div className="pt-4 border-t border-[#E5E3DB] space-y-2 text-xs">
                <div>
                  <span className="font-mono text-[11px] text-slate-400 uppercase block">Lead Directorate</span>
                  <span className="text-slate-800 font-semibold">Veterinary Services Directorate, Ghana (MoFA)</span>
                </div>
                <div>
                  <span className="font-mono text-[11px] text-slate-400 uppercase block">Audit Protocol</span>
                  <span className="text-slate-800 font-semibold">Ante-Mortem and Post-Mortem 100% Census</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Stage Sanitary Pipeline (Cardless Architectural Ledger) */}
      <section className="border-b border-[#E5E3DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E5E3DB]">
            <div className="space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                Systematic Sanitary Barrier
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#0A2618]">
                The Four-Stage Inspection Protocol
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              100% Census Protocol
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E5E3DB] divide-y sm:divide-y-0 sm:divide-x divide-[#E5E3DB]">
            {safetyStages.map((stage) => (
              <div key={stage.step} className="p-8 space-y-4 bg-[#FAF9F5]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#047857]">STAGE {stage.step}</span>
                  <span className="font-mono text-[11px] text-slate-400 uppercase">{stage.facility}</span>
                </div>
                <h3 className="text-base font-bold text-[#0A2618] leading-snug">
                  {stage.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {stage.detail}
                </p>
                <div className="pt-2 border-t border-[#E5E3DB] text-[11px]">
                  <span className="font-mono text-slate-400 uppercase block">Mandatory Rule</span>
                  <span className="font-semibold text-slate-800">{stage.standard}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Condemnation and Disposal Protocol */}
      <section className="border-b border-[#E5E3DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-20">
          <div className="p-8 sm:p-12 border border-[#E5E3DB] bg-[#FAF9F5] space-y-6">
            <div className="flex items-center gap-2 text-rose-800 font-mono text-xs uppercase tracking-wider font-semibold">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
              <span>Condemnation & Disposal Transparency</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#0A2618]">
              Zero Release Policy for Unwholesome Meat
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
              Any carcass found not to be wholesome by the Veterinary Doctors is condemned, confiscated, and disposed of by poisoning and burying same entirely. If any organ, quarter, or carcass displays pathological symptoms of zoonotic disease, it is seized immediately by the Veterinary Officer and disposed of within the facility boundary under official record. Under no circumstances is condemned meat permitted to leave the complex.
            </p>
            <div className="pt-4 border-t border-[#E5E3DB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <span className="text-slate-500">
                Official monthly veterinary condemnation returns are filed with the Ashanti Regional Veterinary Directorate.
              </span>
              <button
                onClick={() => onNavigate('products')}
                className="px-6 py-3 bg-[#0A2618] hover:bg-[#123C27] text-white text-xs font-mono font-semibold transition-colors cursor-pointer"
              >
                Browse Certified Products
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
