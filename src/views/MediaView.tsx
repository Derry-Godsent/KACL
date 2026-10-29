/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FileText, Newspaper, Bell, Image as ImageIcon, ArrowRight, ExternalLink } from 'lucide-react';
import { INITIAL_MEDIA_ITEMS } from '../data/initialData';
import { MediaItem } from '../types';

interface MediaViewProps {
  onNavigate: (view: string) => void;
}

export const MediaView: React.FC<MediaViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'notice' | 'press_release' | 'news' | 'gallery'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems = INITIAL_MEDIA_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: 'all', label: 'All Media' },
    { id: 'notice', label: 'Public Notice' },
    { id: 'press_release', label: 'Press Release' },
    { id: 'news', label: 'News' },
    { id: 'gallery', label: 'Gallery' }
  ];

  return (
    <div className="bg-[#FAF9F5] text-[#0C141D] min-h-screen py-10 sm:py-16 selection:bg-[#0A2618] selection:text-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        {/* Page Header (Editorial Luxury) */}
        <div className="space-y-4 max-w-3xl border-b border-[#E5E3DB] pb-8">
          <div className="font-mono text-xs font-bold text-[#047857] uppercase tracking-widest">
            OFFICIAL KACL COMMUNICATIONS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0C141D] tracking-tight leading-tight">
            Media, Notices & Press Releases
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Stay informed on official directives, public announcements, veterinary advisories, and facility infrastructure at Kumasi Abattoir Company Limited.
          </p>
        </div>

        {/* Minimalist Tab Selector (Monarch / Letter Style) */}
        <div className="flex border-b border-[#E5E3DB] overflow-x-auto scrollbar-none gap-6 sm:gap-8 text-xs font-mono font-bold uppercase tracking-wider">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 transition-colors cursor-pointer whitespace-nowrap min-h-[44px] flex items-center gap-2 border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#0A2618] text-[#0A2618]'
                  : 'border-transparent text-slate-400 hover:text-slate-800'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Media Editorial Ledger (NO CARDS) */}
        <div className="space-y-12">
          {/* Non-gallery announcements in clean full-width ledger */}
          {activeTab !== 'gallery' && (
            <div className="divide-y divide-[#E5E3DB] border-y border-[#E5E3DB]">
              {filteredItems.filter(item => item.type !== 'gallery').map((item) => {
                const isExpanded = expandedId === item.id;

                return (
                  <div
                    key={item.id}
                    className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group hover:bg-[#F4F3EE]/40 transition-colors px-2 sm:px-4"
                  >
                    <div className="md:col-span-2 space-y-1">
                      <span className="font-mono text-xs font-bold text-slate-400 block">
                        {item.date}
                      </span>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#047857] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                        {item.type.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="md:col-span-8 space-y-2">
                      <h2 className="text-lg sm:text-xl font-bold text-[#0C141D]">
                        {item.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {item.summary}
                      </p>
                      {isExpanded && item.content && (
                        <div className="mt-4 pt-4 border-t border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
                          <p>{item.content}</p>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2 flex md:justify-end items-center">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="font-mono text-xs text-[#0A2618] hover:underline font-bold flex items-center gap-1 cursor-pointer min-h-[40px]"
                      >
                        <span>{isExpanded ? 'Collapse' : 'Read Full'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Gallery Grid (When Gallery tab or All) */}
          {(activeTab === 'gallery' || activeTab === 'all') && (
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between border-b border-[#E5E3DB] pb-3">
                <h2 className="text-xl font-bold text-[#0C141D]">
                  Operational Facility & Livestock Kraal Gallery
                </h2>
                <span className="font-mono text-xs text-slate-400">PURE FACILITY & MEAT DOCUMENTATION</span>
              </div>

              {/* Architectural Frame Grid (No Cards) */}
              <div className="border border-[#E5E3DB] divide-y sm:divide-y-0 grid grid-cols-1 sm:grid-cols-3 bg-white">
                {INITIAL_MEDIA_ITEMS.filter((m) => m.type === 'gallery').map((item) => (
                  <div
                    key={item.id}
                    className="p-6 space-y-4 border-b sm:border-r border-[#E5E3DB] hover:bg-[#FBFBFA] transition-colors"
                  >
                    <div className="h-56 border border-[#E5E3DB] overflow-hidden bg-slate-50 relative group">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                        {item.date}
                      </div>
                      <h3 className="text-base font-bold text-[#0C141D]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
