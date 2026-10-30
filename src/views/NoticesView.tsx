/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, AlertCircle, ArrowUpRight } from 'lucide-react';
import { PublicNotice } from '../types';

interface NoticesViewProps {
  notices: PublicNotice[];
  onNavigate: (view: string) => void;
}

export const NoticesView: React.FC<NoticesViewProps> = ({ notices, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [collapsedNoticeIds, setCollapsedNoticeIds] = useState<Set<string>>(() => new Set());

  const categories = ['all', 'Operational', 'Holiday Schedule', 'Veterinary Notice', 'Public Announcement'];

  const filteredNotices = notices.filter(
    (n) => selectedCategory === 'all' || n.category === selectedCategory
  );

  return (
    <div className="bg-[#f7fbff] text-[#0C141D]">
      {/* Editorial Header */}
      <section className="border-b border-[#dce6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#0072ce] font-semibold">
                Official Bulletins
              </span>
              <span className="h-px w-8 bg-[#0072ce]/40" />
              <span className="font-mono text-[11px] text-slate-500 uppercase">
                Directives & Advisories
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#06457f] tracking-tight leading-[1.08]">
              Public Notices & Operational Gazettes.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-2">
              Official communications from Kumasi Abattoir Company Limited administration regarding statutory hygiene directives, holiday slaughter schedules, veterinary regulations, and facility operations.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar & Notices Register */}
      <section className="border-b border-[#dce6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          {/* Category Hairline Filter */}
          <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-[#dce6f0]">
            <span className="font-mono text-xs text-slate-400 mr-2 uppercase">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? 'border-[#06457f] bg-[#06457f] text-white font-semibold'
                    : 'border-[#dce6f0] bg-white text-slate-600 hover:text-[#06457f]'
                }`}
              >
                {cat === 'all' ? 'All Gazettes' : cat}
              </button>
            ))}
          </div>

          {/* Notices Ledger (Cardless) */}
          <div className="divide-y divide-[#dce6f0]">
            {filteredNotices.map((notice) => {
              const isExpanded = !collapsedNoticeIds.has(notice.id);

              return (
                <article
                  key={notice.id}
                  className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-black/[0.01] transition-colors"
                >
                  <div className="lg:col-span-3 space-y-1">
                    <span className="font-mono text-xs text-[#0072ce] font-semibold block">
                      {notice.category}
                    </span>
                    <span className="font-mono text-xs text-slate-500 block">
                      {notice.date}
                    </span>
                    {notice.isImportant && (
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-rose-700 font-semibold pt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Priority Directive
                      </span>
                    )}
                  </div>

                  <div className="lg:col-span-7 space-y-3">
                    <h2 className="font-serif text-xl sm:text-2xl text-[#06457f] leading-snug">
                      {notice.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {notice.summary}
                    </p>

                    {isExpanded && (
                      <div className="pt-4 border-t border-[#dce6f0] space-y-4">
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {notice.fullText}
                        </p>
                        <div className="text-[11px] font-mono text-slate-400">
                          Issued by: KACL Operations & Quality Assurance Directorate
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-2 flex lg:justify-end">
                    <button
                      aria-expanded={isExpanded}
                      onClick={() => setCollapsedNoticeIds(previous => {
                        const next = new Set(previous);
                        if (next.has(notice.id)) next.delete(notice.id);
                        else next.add(notice.id);
                        return next;
                      })}
                      className="font-mono text-xs text-[#06457f] hover:text-[#0072ce] font-semibold transition-colors cursor-pointer"
                    >
                      {isExpanded ? '[-] Collapse Gazette' : '[+] Read Full Gazette'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
