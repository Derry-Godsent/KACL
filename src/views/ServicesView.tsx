/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Phone, ShieldCheck, Truck, Clock, MessageSquare, Award } from 'lucide-react';
import { KACL_ABATTOIR_SERVICES, KACL_MARKETING_CHANNELS, KACL_COMPANY_INFO } from '../data/initialData';
import { AbattoirProcessAnimation } from '../components/AbattoirProcessAnimation';
import {
  FlayingIcon,
  KraalIcon,
  SingeingIcon,
  CuttingIcon,
  RetailOutletIcon,
  BulkSalesIcon,
  DoorToDoorIcon,
  WalkInsIcon
} from '../components/AbattoirIcons';

interface ServicesViewProps {
  onNavigate: (view: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'abattoir' | 'marketing'>('abattoir');

  return (
    <div className="bg-[#FAF9F5] text-[#0C141D] min-h-screen py-10 sm:py-16 selection:bg-[#0A2618] selection:text-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        {/* Page Header (Editorial Luxury) */}
        <div className="space-y-4 max-w-3xl border-b border-[#E5E3DB] pb-8">
          <div className="font-mono text-xs font-bold text-[#047857] uppercase tracking-widest">
            KACL OPERATIONS & COMMERCIAL CHANNELS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0C141D] tracking-tight leading-tight">
            Abattoir Services & Marketing
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Operating under world class health and safety standards in the slaughtering and dressing of food animals (Cattle, Sheep, Goats, and Pigs) with rigorous scrutiny and certification of Veterinary Doctors.
          </p>
        </div>

        {/* Minimalist Tab Selector (Monarch / Letter Style) */}
        <div className="flex border-b border-[#E5E3DB] overflow-x-auto scrollbar-none gap-8 text-xs font-mono font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('abattoir')}
            className={`pb-4 transition-colors cursor-pointer whitespace-nowrap min-h-[44px] flex items-center gap-2 border-b-2 ${
              activeTab === 'abattoir'
                ? 'border-[#0A2618] text-[#0A2618]'
                : 'border-transparent text-slate-400 hover:text-slate-800'
            }`}
          >
            <span>01. Abattoir Services</span>
            <span className="text-[10px] text-slate-400 font-normal">[Flaying · Singeing · Kraal · Cutting]</span>
          </button>

          <button
            onClick={() => setActiveTab('marketing')}
            className={`pb-4 transition-colors cursor-pointer whitespace-nowrap min-h-[44px] flex items-center gap-2 border-b-2 ${
              activeTab === 'marketing'
                ? 'border-[#0A2618] text-[#0A2618]'
                : 'border-transparent text-slate-400 hover:text-slate-800'
            }`}
          >
            <span>02. Marketing & Distribution</span>
            <span className="text-[10px] text-slate-400 font-normal">[Bulk · Door to Door · Retail · Walk-Ins]</span>
          </button>
        </div>

        {/* TAB 1: ABATTOIR SERVICES */}
        {activeTab === 'abattoir' && (
          <div className="space-y-12">
            {/* Live Abattoir Process Simulator (No Boxy Card, Framed in Hairline Steel) */}
            <div className="border border-[#E5E3DB] rounded-lg overflow-hidden bg-white shadow-2xs">
              <AbattoirProcessAnimation initialMode="processing-line" />
            </div>

            {/* Services Architectural Ledger (NO CARDS) */}
            <div className="divide-y divide-[#E5E3DB] border-y border-[#E5E3DB]">
              {KACL_ABATTOIR_SERVICES.map((service, index) => (
                <div
                  key={service.id}
                  className="py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start group hover:bg-[#F4F3EE]/40 transition-colors px-2 sm:px-4"
                >
                  <div className="md:col-span-2 flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-400">0{index + 1} / SERVICE</span>
                    <div className="w-10 h-10 rounded-full border border-[#D5D2C7] flex items-center justify-center text-[#0A2618]">
                      {service.id === 'srv-flaying' && <FlayingIcon className="w-5 h-5" />}
                      {service.id === 'srv-kraal' && <KraalIcon className="w-5 h-5" />}
                      {service.id === 'srv-singeing' && <SingeingIcon className="w-5 h-5" />}
                      {service.id === 'srv-cutting' && <CuttingIcon className="w-5 h-5" />}
                    </div>
                  </div>

                  <div className="md:col-span-3 space-y-1">
                    <h2 className="text-2xl font-bold text-[#0C141D]">
                      {service.name}
                    </h2>
                    <span className="font-mono text-xs text-[#047857] font-semibold block">
                      {service.tagline}
                    </span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-500">
                      <span>Animals: Cattle, Sheep, Goats, Pigs</span>
                      <span>·</span>
                      <span>Supervision: Veterinary Doctors</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex md:justify-end items-center">
                    <button
                      onClick={() => onNavigate('contact')}
                      className="px-4 py-2 border border-slate-300 hover:border-[#0A2618] text-[#0A2618] text-xs font-bold rounded hover:bg-white transition-colors cursor-pointer min-h-[40px]"
                    >
                      Enquire Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MARKETING & DISTRIBUTION */}
        {activeTab === 'marketing' && (
          <div className="space-y-12">
            {/* Introductory Narrative */}
            <div className="border-l-2 border-[#0A2618] pl-6 py-2 max-w-3xl space-y-2">
              <h2 className="text-xl font-bold text-[#0C141D]">
                Integrated Cold Chain & Retail Distribution
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                KACL carries out Bulk Sales, Door to Door Sales, and Walk-Ins within the company premises, and through Retail Outlets. Our branded refrigerated vans maintain 0 to 4°C throughout transit across the Kumasi Metropolis.
              </p>
            </div>

            {/* 4-Quadrant Hairline Matrix (NO CARDS) */}
            <div className="border border-[#E5E3DB] divide-y lg:divide-y-0 lg:divide-x divide-[#E5E3DB] grid grid-cols-1 lg:grid-cols-4 bg-white">
              {/* Bulk Sales */}
              <div className="p-8 sm:p-10 space-y-6 hover:bg-[#FBFBFA] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400">CHANNEL 01</span>
                  <BulkSalesIcon className="w-7 h-7 text-[#0A2618]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#0C141D]">
                    Bulk Sales
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    KACL delivery vans are used to cart meat in bulk quantities from the company premises to hotels, restaurant, and other institutions in the culinary business.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
                  <span className="font-mono text-slate-400 uppercase text-[10px] block">Key Beneficiaries</span>
                  <span className="font-semibold text-slate-800 block">Hotels, Restaurants, Event Caterers, Institutional Pantries</span>
                </div>
              </div>

              {/* Door to Door Sales */}
              <div className="p-8 sm:p-10 space-y-6 hover:bg-[#FBFBFA] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400">CHANNEL 02</span>
                  <DoorToDoorIcon className="w-7 h-7 text-[#0A2618]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#0C141D]">
                    Door to Door Sales
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    KACL uses its branded cold vans to sell meat to individuals in various institutions like KNUST, KATH and others.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
                  <span className="font-mono text-slate-400 uppercase text-[10px] block">Key Routes</span>
                  <span className="font-semibold text-slate-800 block">KNUST Campus, Komfo Anokye Teaching Hospital (KATH), Government Agencies</span>
                </div>
              </div>

              {/* Retail Outlets */}
              <div className="p-8 sm:p-10 space-y-6 hover:bg-[#FBFBFA] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400">CHANNEL 03</span>
                  <RetailOutletIcon className="w-7 h-7 text-[#0A2618]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#0C141D]">
                    Retail Outlets
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    KACL has placed deep freezers in shops to sell meat to the Kumasi Metropolis, eg of such shops are Poku Trading.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
                  <span className="font-mono text-slate-400 uppercase text-[10px] block">Anchor Partner</span>
                  <span className="font-semibold text-slate-800 block">Poku Trading Company & Partner Supermarkets</span>
                </div>
              </div>

              {/* Walk-Ins */}
              <div className="p-8 sm:p-10 space-y-6 hover:bg-[#FBFBFA] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400">CHANNEL 04</span>
                  <WalkInsIcon className="w-7 h-7 text-[#0A2618]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#0C141D]">
                    Walk-Ins
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    KACL carries out walk-in butcher counter services directly within the company abattoir premises in Kumasi.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
                  <span className="font-mono text-slate-400 uppercase text-[10px] block">Location</span>
                  <span className="font-semibold text-slate-800 block">Company Main Facility, Kumasi (Mon to Sun)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Operating Hours & Dispatch Footer Strip */}
        <div className="p-6 border border-[#E5E3DB] bg-white rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-mono font-bold uppercase text-slate-400 text-[10px] block">
              Official Operating Hours
            </span>
            <div className="font-mono text-slate-800">
              {KACL_COMPANY_INFO.workingHoursText.monFri} · {KACL_COMPANY_INFO.workingHoursText.sat} · {KACL_COMPANY_INFO.workingHoursText.sun}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${KACL_COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Kumasi%20Abattoir,%20I%20would%20like%20to%20enquire%20about%20cold%20van%20schedule.`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-[#047857] hover:bg-[#065F46] text-white font-bold rounded transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Scheduling</span>
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 border border-[#0A2618] text-[#0A2618] hover:bg-slate-50 font-bold rounded transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
