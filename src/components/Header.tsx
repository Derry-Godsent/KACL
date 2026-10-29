/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { KACL_COMPANY_INFO } from '../data/initialData';
import { QuotationItem } from '../lib/storage';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  quotationItems: QuotationItem[];
  onOpenQuotationDrawer: () => void;
  onOpenStaffPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  quotationItems,
  onOpenQuotationDrawer,
  onOpenStaffPortal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Abattoir Services' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'products', label: 'Products' },
    { id: 'media', label: 'Media' },
    { id: 'about', label: 'About KACL' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E5E3DB]">
      {/* Top Utility Bar (Zero Gold, Pure Deep Heritage Forest Green & Surgical Steel) */}
      <div className="bg-[#0A2618] text-white text-[11px] sm:text-xs px-3 sm:px-8 py-1.5 sm:py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-3 text-slate-200 text-center sm:text-left">
            <span className="font-bold text-white tracking-wide">KACL KUMASI</span>
            <span className="text-emerald-400 hidden xs:inline" aria-hidden="true">·</span>
            <span className="hidden xs:inline text-slate-300">Home of Quality Meat</span>
            <span className="text-emerald-400" aria-hidden="true">·</span>
            <span className="font-mono text-emerald-200 font-semibold">{KACL_COMPANY_INFO.ghanaPostAddress}</span>
            <span className="text-emerald-400 hidden md:inline" aria-hidden="true">·</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>Mon-Fri 8am-5pm · Sat 8am-4pm · Sun 8am-2pm</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={`tel:${KACL_COMPANY_INFO.primaryPhone}`}
              className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="font-mono">{KACL_COMPANY_INFO.primaryPhone}</span>
            </a>
            <span className="text-emerald-600" aria-hidden="true">·</span>
            <button
              onClick={onOpenStaffPortal}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors font-medium cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-8">
        {/* Zone 1: Brand Wordmark (Responsive, Clean, Professional) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left cursor-pointer group shrink min-w-0 pr-1"
        >
          <div className="flex flex-col">
            <span className="hidden sm:inline text-lg sm:text-xl font-extrabold tracking-tight text-[#0C141D] whitespace-nowrap group-hover:text-[#0A2618] transition-colors">
              Kumasi Abattoir Company Limited
            </span>
            <span className="sm:hidden text-base font-black tracking-tight text-[#0A2618] truncate">
              KACL Kumasi
            </span>
            <span className="text-[10px] sm:text-xs text-[#465567] font-medium truncate">
              Home of Quality Meat · Veterinary Supervised
            </span>
          </div>
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-[#293748]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`hover:text-[#0A2618] transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
                currentView === link.id
                  ? 'text-[#0A2618] border-[#0A2618] font-bold'
                  : 'border-transparent text-[#293748]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Order / RFQ Button (Zero Gold: Rich Heritage Forest & Emerald Badge) */}
          <button
            onClick={onOpenQuotationDrawer}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold text-white bg-[#0A2618] hover:bg-[#123C27] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs min-h-[40px]"
            title="Open Quotation Request List"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden sm:inline">Order / Quotation</span>
            <span className="sm:hidden">RFQ</span>
            {quotationItems.length > 0 && (
              <span className="ml-0.5 sm:ml-1 px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[11px] font-bold tabular-nums">
                {quotationItems.length}
              </span>
            )}
          </button>

          {/* Mobile Menu Button with 44px Touch Target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#0C141D] hover:text-[#0A2618] cursor-pointer rounded border border-[#DDE2DC] min-h-[44px] min-w-[44px] flex items-center justify-center bg-white"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Responsive, Touch-Friendly, Accessible) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DDE2DC] bg-white shadow-xl">
          {/* Navigation Items (44px Minimum Tap Targets) */}
          <div className="px-4 py-3 divide-y divide-slate-100">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left py-3.5 px-2 text-sm font-semibold flex items-center justify-between min-h-[44px] cursor-pointer rounded transition-colors ${
                  currentView === link.id
                    ? 'text-[#0A2618] font-bold bg-[#EFF6F1]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}

            <div className="pt-2">
              <button
                onClick={() => {
                  onOpenQuotationDrawer();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-3 px-2 text-sm font-bold text-[#0A2618] flex items-center justify-between min-h-[44px] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <span>View Quotation Request List</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-700 text-white rounded-full text-xs font-bold tabular-nums">
                  {quotationItems.length}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Drawer Footer Actions */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="p-3 bg-white border border-slate-200 rounded text-xs space-y-1 text-slate-700">
              <div className="font-bold text-[#0A2618]">Direct Sales Hotlines:</div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-slate-900 font-semibold pt-0.5">
                <a href={`tel:${KACL_COMPANY_INFO.primaryPhone}`} className="hover:underline p-1 bg-slate-100 rounded">
                  {KACL_COMPANY_INFO.primaryPhone}
                </a>
                <a href={`tel:${KACL_COMPANY_INFO.salesHotline}`} className="hover:underline p-1 bg-slate-100 rounded">
                  {KACL_COMPANY_INFO.salesHotline}
                </a>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Mon-Fri: 8am - 5pm · Sat: 8am - 4pm · Sun: 8am - 2pm
              </div>
            </div>

            <button
              onClick={() => {
                onOpenStaffPortal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-3 text-xs text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded font-semibold flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#0A2618]" />
              <span>Protected Staff Administration Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
