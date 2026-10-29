/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Building2, Users, Award, Scale, Check } from 'lucide-react';
import {
  KACL_COMPANY_INFO,
  KACL_CORE_VALUES,
  KACL_BOARD_MEMBERS,
  KACL_MANAGEMENT,
  KACL_DEPARTMENTS
} from '../data/initialData';

interface AboutViewProps {
  onNavigate: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FAF9F5] text-[#0C141D] min-h-screen py-10 sm:py-16 selection:bg-[#0A2618] selection:text-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 sm:space-y-24">
        {/* Page Header (Editorial Luxury) */}
        <div className="space-y-4 max-w-3xl border-b border-[#E5E3DB] pb-8">
          <div className="font-mono text-xs font-bold text-[#047857] uppercase tracking-widest">
            CORPORATE PROFILE & GOVERNANCE
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0C141D] tracking-tight leading-tight">
            Kumasi Abattoir Company Limited
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Incorporated in 1993 under the Ghana Company Code 1963 (Act 179) as the premier modern livestock processing and veterinary certification institution in the Ashanti Region and Ghana.
          </p>
        </div>

        {/* 1. Historical Milestones & Legal Act 179 Charter (NO CARDS) */}
        <section className="space-y-10">
          <div className="space-y-2 border-b border-[#E5E3DB] pb-4">
            <div className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
              SECTION 01
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0C141D]">
              Profile & Brief History
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left 4 Cols: Timeline Milestones */}
            <div className="lg:col-span-5 space-y-6 border-l-2 border-[#0A2618] pl-6 py-2">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#047857]">1993</span>
                <h3 className="text-lg font-bold text-[#0C141D]">Company Incorporation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Incorporated with the mission objective to produce hygienic meat for public consumption.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#047857]">22ND SEPTEMBER 1994</span>
                <h3 className="text-lg font-bold text-[#0C141D]">Certificate to Commence Business</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Official governmental authorization granted to establish abattoir facilities in Kumasi.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#047857]">JULY 1999</span>
                <h3 className="text-lg font-bold text-[#0C141D]">Actual Operations Commenced</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Commissioned full-scale modern slaughtering, dressing, kraal lairage, and cold chain distribution.
                </p>
              </div>
            </div>

            {/* Right 7 Cols: Act 179 Legal Mandate (The 4 Lines of Business) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#0A2618] uppercase tracking-wider block">
                  Company Code 1963 (Act 179) Authorization
                </span>
                <p className="text-xs sm:text-sm text-slate-600">
                  The Company Code 1963 Act 179 authorizes the Abattoir to undertake the following four core lines of business:
                </p>
              </div>

              {/* 4 Lines of Business in Hairline Architectural Ledger */}
              <div className="divide-y divide-[#E5E3DB] border-y border-[#E5E3DB]">
                {KACL_COMPANY_INFO.linesOfBusiness.map((line, idx) => (
                  <div key={idx} className="py-4 grid grid-cols-12 gap-4 items-center">
                    <span className="col-span-2 font-mono text-xs font-bold text-[#0A2618]">
                      CLAUSE 0{idx + 1}
                    </span>
                    <p className="col-span-10 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Vision & Mission Statements (High-Impact Editorial Typography) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 border-y border-[#E5E3DB] py-12 sm:py-16">
          {/* Vision */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#047857] uppercase tracking-widest block">
              OUR VISION
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-[#0C141D] leading-relaxed">
              &quot;{KACL_COMPANY_INFO.vision}&quot;
            </p>
          </div>

          {/* Mission */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#047857] uppercase tracking-widest block">
              OUR MISSION
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-[#0C141D] leading-relaxed">
              &quot;{KACL_COMPANY_INFO.mission}&quot;
            </p>
          </div>
        </section>

        {/* 3. Core Values: 8 Guiding Principles (4-Column Hairline Grid - NO CARDS) */}
        <section className="space-y-8">
          <div className="space-y-1 border-b border-[#E5E3DB] pb-4">
            <div className="font-mono text-xs font-bold text-[#047857] uppercase tracking-widest">
              GUIDING PRINCIPLES
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0C141D]">
              Core Values
            </h2>
          </div>

          <div className="border border-[#E5E3DB] divide-y sm:divide-y-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white">
            {KACL_CORE_VALUES.map((val, idx) => (
              <div
                key={val.name}
                className="p-6 sm:p-8 space-y-3 border-b sm:border-r border-[#E5E3DB] hover:bg-[#FBFBFA] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400">0{idx + 1}</span>
                  <Check className="w-4 h-4 text-[#047857]" />
                </div>
                <h3 className="text-base font-bold text-[#0C141D]">
                  {val.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Board of Directors & Management (Prestigious Institutional Ledger) */}
        <section className="space-y-12">
          <div className="space-y-1 border-b border-[#E5E3DB] pb-4">
            <div className="font-mono text-xs font-bold text-[#047857] uppercase tracking-widest">
              LEADERSHIP & GOVERNANCE
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0C141D]">
              Board of Directors & Management
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Board of Directors (10 Members from LIT) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5E3DB] pb-2">
                <h3 className="text-lg font-bold text-[#0C141D]">
                  Board of Directors
                </h3>
                <span className="font-mono text-xs text-slate-400">10 MEMBERS</span>
              </div>

              <div className="divide-y divide-[#E5E3DB]">
                {KACL_BOARD_MEMBERS.map((member, idx) => (
                  <div
                    key={idx}
                    className="py-3.5 flex items-center justify-between text-xs hover:bg-[#F4F3EE]/30 px-2 transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#0C141D]">{member.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">Kumasi Abattoir Company Limited</div>
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-[#0A2618] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Management Team (6 Members from LIT) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5E3DB] pb-2">
                <h3 className="text-lg font-bold text-[#0C141D]">
                  Executive Management
                </h3>
                <span className="font-mono text-xs text-slate-400">EXECUTIVE HEADS</span>
              </div>

              <div className="divide-y divide-[#E5E3DB]">
                {KACL_MANAGEMENT.map((mgr, idx) => (
                  <div
                    key={idx}
                    className="py-3.5 space-y-0.5 hover:bg-[#F4F3EE]/30 px-2 transition-colors text-xs"
                  >
                    <div className="font-bold text-[#0C141D]">{mgr.name}</div>
                    <div className="font-mono text-[11px] text-[#047857]">{mgr.position} · {mgr.department}</div>
                  </div>
                ))}
              </div>

              {/* Departments List (Exact 7 Departments) */}
              <div className="pt-6 border-t border-[#E5E3DB] space-y-3">
                <span className="font-mono text-xs font-bold uppercase text-slate-400 tracking-wider block">
                  Operational Departments
                </span>
                <div className="flex flex-wrap gap-2">
                  {KACL_DEPARTMENTS.map((dept, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white border border-[#E5E3DB] text-slate-800 text-xs font-medium rounded"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
