/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShoppingBag, ShieldCheck, Check, ArrowRight, LayoutList, LayoutGrid, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductsViewProps {
  products: Product[];
  onAddToQuotation: (product: Product, quantityKg?: number) => void;
  onOpenProductModal: (product: Product) => void;
  onOpenQuotationDrawer: () => void;
  quotationItemCount: number;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  onAddToQuotation,
  onOpenProductModal,
  onOpenQuotationDrawer,
  quotationItemCount
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'ledger' | 'gallery'>('ledger');
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Products', count: products.length },
    { id: 'beef', label: 'Beef Products', count: products.filter(p => p.category === 'beef').length },
    { id: 'processed', label: 'Processed Meat', count: products.filter(p => p.category === 'processed').length },
    { id: 'chevon-mutton', label: 'Chevon / Mutton', count: products.filter(p => p.category === 'chevon-mutton').length },
    { id: 'pork', label: 'Pork Products', count: products.filter(p => p.category === 'pork').length }
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddWithFeedback = (product: Product) => {
    onAddToQuotation(product, 25);
    setAddedNoticeId(product.id);
    setTimeout(() => {
      setAddedNoticeId(null);
    }, 1800);
  };

  return (
    <div className="bg-[#FAF9F5] text-[#0C141D] min-h-screen py-10 sm:py-16 selection:bg-[#0A2618] selection:text-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E3DB] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono text-xs font-bold text-[#047857] uppercase tracking-widest">
              OFFICIAL WHOLESOME PRODUCT CATALOGUE
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#0C141D] tracking-tight leading-tight">
              Primary Cuts & Processed Meats
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Prepared in strict adherence to Ghana Company Code Act 179 and veterinary health standards. Available for institutional bulk supply, door-to-door cold vans, and retail butcher walk-ins.
            </p>
          </div>

          {/* Quotation Drawer Trigger Button */}
          <button
            onClick={onOpenQuotationDrawer}
            className="flex items-center gap-2 px-5 py-3 bg-[#0A2618] hover:bg-[#123C27] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer self-start md:self-auto min-h-[44px] shadow-2xs"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-300" />
            <span>Review Quotation Request</span>
            {quotationItemCount > 0 && (
              <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[11px] font-mono font-bold tabular-nums">
                {quotationItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Bar: Category Tabs, Search, and View Mode Toggle (No Cards, Architectural Layout) */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E5E3DB] pb-4">
            {/* Category Navigation */}
            <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none text-xs font-mono font-bold uppercase tracking-wider">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`pb-2 transition-colors cursor-pointer whitespace-nowrap min-h-[36px] flex items-center gap-1.5 border-b-2 ${
                    selectedCategory === cat.id
                      ? 'border-[#0A2618] text-[#0A2618]'
                      : 'border-transparent text-slate-400 hover:text-slate-800'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-[10px] text-slate-400 tabular-nums">({cat.count})</span>
                </button>
              ))}
            </div>

            {/* Right Tools: Search & Layout Mode */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cuts by code or name..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E3DB] rounded text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0A2618] min-h-[40px]"
                />
              </div>

              {/* View Mode Toggle (Ledger List vs Architectural Specimen Grid) */}
              <div className="flex items-center border border-[#E5E3DB] rounded bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('ledger')}
                  className={`p-2 rounded cursor-pointer transition-colors ${
                    viewMode === 'ledger'
                      ? 'bg-[#0A2618] text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Editorial Ledger List View"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('gallery')}
                  className={`p-2 rounded cursor-pointer transition-colors ${
                    viewMode === 'gallery'
                      ? 'bg-[#0A2618] text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Specimen Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Result Counter & Veterinary Notice */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>
              Showing <strong className="text-slate-800 tabular-nums">{filteredProducts.length}</strong> authenticated meat cuts
            </span>
            <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              MoFA Veterinary Pass: Wholesome
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MODE 1: EDITORIAL BUTCHERY LEDGER (NO CARDS - LETTER.CO)  */}
        {/* ======================================================== */}
        {viewMode === 'ledger' && (
          <div className="divide-y divide-[#E5E3DB] border-y border-[#E5E3DB]">
            {filteredProducts.map((product) => {
              const isJustAdded = addedNoticeId === product.id;

              return (
                <div
                  key={product.id}
                  className="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center group hover:bg-[#F4F3EE]/50 transition-colors px-2 sm:px-4"
                >
                  {/* Column 1: Item Code */}
                  <div className="md:col-span-2 font-mono text-xs font-bold text-[#0A2618]">
                    {product.code}
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-normal">
                      {product.categoryLabel}
                    </div>
                  </div>

                  {/* Column 2: Pure Meat Photo Thumbnail (Pure meat, no garnish, no hands) */}
                  <div className="md:col-span-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded border border-[#E5E3DB] overflow-hidden bg-white shrink-0">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Column 3: Name & Narrative */}
                  <div className="md:col-span-5 space-y-1">
                    <h2 className="text-base sm:text-lg font-bold text-[#0C141D] leading-snug">
                      {product.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {product.description}
                    </p>
                    <div className="font-mono text-[10px] text-emerald-800 pt-0.5 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>MoFA Inspected · Certified Wholesome Carcass</span>
                    </div>
                  </div>

                  {/* Column 4: Actions (Zero Prices) */}
                  <div className="md:col-span-3 flex items-center md:justify-end gap-2.5">
                    <button
                      onClick={() => onOpenProductModal(product)}
                      className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded hover:bg-white transition-colors cursor-pointer min-h-[40px]"
                    >
                      Specs
                    </button>
                    <button
                      onClick={() => handleAddWithFeedback(product)}
                      className={`px-4 py-2 text-xs font-bold rounded transition-colors cursor-pointer min-h-[40px] flex items-center gap-1.5 ${
                        isJustAdded
                          ? 'bg-[#047857] text-white'
                          : 'bg-[#0A2618] hover:bg-[#123C27] text-white'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <span>Add to RFQ</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ======================================================== */}
        {/* MODE 2: ARCHITECTURAL SPECIMEN GRID (NO CARDS - NEON/MONARCH) */}
        {/* ======================================================== */}
        {viewMode === 'gallery' && (
          <div className="border border-[#E5E3DB] divide-y sm:divide-y-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white">
            {filteredProducts.map((product, idx) => {
              const isJustAdded = addedNoticeId === product.id;

              return (
                <div
                  key={product.id}
                  className="p-6 sm:p-8 space-y-4 border-b sm:border-r border-[#E5E3DB] hover:bg-[#FBFBFA] transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header meta */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-[#0A2618]">{product.code}</span>
                      <span className="text-[11px] text-slate-500 uppercase">{product.categoryLabel}</span>
                    </div>

                    {/* Pure Meat Photography Frame */}
                    <div className="h-48 sm:h-52 border border-[#E5E3DB] overflow-hidden bg-slate-50 relative group">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 right-2 bg-[#0A2618]/90 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                        MoFA Certified
                      </div>
                    </div>

                    {/* Meat Spec Info */}
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-[#0C141D] leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions (Zero Prices) */}
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => onOpenProductModal(product)}
                      className="px-2.5 py-2 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors text-center cursor-pointer min-h-[40px]"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleAddWithFeedback(product)}
                      className={`px-2.5 py-2 font-bold rounded transition-colors text-center cursor-pointer min-h-[40px] flex items-center justify-center gap-1 ${
                        isJustAdded
                          ? 'bg-[#047857] text-white'
                          : 'bg-[#0A2618] hover:bg-[#123C27] text-white'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <span>Add to RFQ</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Institutional Wholesale Prompt */}
        <div className="p-8 border border-[#E5E3DB] bg-white rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-lg font-bold text-[#0C141D]">
              Need Bulk Supply for Hotel, Restaurant, or Educational Institution?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We provide scheduled refrigerated van deliveries to KNUST, KATH, hotels, and food service establishments across the Kumasi Metropolis.
            </p>
          </div>
          <button
            onClick={onOpenQuotationDrawer}
            className="px-6 py-3 bg-[#0A2618] hover:bg-[#123C27] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shrink-0 cursor-pointer min-h-[44px]"
          >
            Submit Quotation Request
          </button>
        </div>
      </div>
    </div>
  );
};
