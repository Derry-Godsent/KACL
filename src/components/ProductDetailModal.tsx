/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ShoppingBag, MessageSquare, ShieldCheck, Thermometer, Box } from 'lucide-react';
import { Product } from '../types';
import { KACL_COMPANY_INFO } from '../data/initialData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuotation: (product: Product, quantityKg?: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuotation
}) => {
  const [estimatedKg, setEstimatedKg] = useState<number>(20);

  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello KACL Sales, I would like to enquire about: ${product.name} (Code: ${product.code}), approx. ${estimatedKg} kg. Please advise on wholesale pricing and delivery availability in Kumasi.`
  );
  const whatsappUrl = `https://wa.me/${KACL_COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0C141D]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="motion-modal-panel relative w-full max-w-2xl bg-[#FAF9F5] border border-[#E5E3DB] shadow-2xl overflow-hidden my-0 sm:my-8 max-h-[92vh] sm:max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#E5E3DB] flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#0A2618] border border-[#E5E3DB] px-2.5 py-0.5">
                {product.code}
              </span>
              <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                {product.categoryLabel}
              </span>
            </div>
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
            {/* Image & Title Header */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="space-y-3 flex-1">
                <h3 className="font-serif text-2xl text-[#0A2618] leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#047857] font-semibold font-mono">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{product.inspectionStatus}</span>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-2 pt-4 border-t border-[#E5E3DB]">
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                Technical Specifications
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white border border-[#E5E3DB] space-y-1">
                  <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1 uppercase">
                    <Thermometer className="w-3.5 h-3.5 text-[#047857]" />
                    Storage & Transport
                  </span>
                  <div className="font-semibold text-slate-900 font-mono">
                    {product.storageRequirement}
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#E5E3DB] space-y-1">
                  <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1 uppercase">
                    <Box className="w-3.5 h-3.5 text-[#047857]" />
                    Packaging Format
                  </span>
                  <div className="font-semibold text-slate-900">
                    {product.packagingType}
                  </div>
                </div>
              </div>
            </div>

            {/* Estimated Quantity Input for Quotation */}
            <div className="p-5 bg-white border border-[#E5E3DB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div>
                <label htmlFor="modal-qty" className="font-bold text-[#0A2618] block">
                  Estimated Commercial Quantity:
                </label>
                <span className="text-slate-500 text-[11px]">
                  Kilograms required for wholesale quotation calculation
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="modal-qty"
                  type="number"
                  min="5"
                  step="5"
                  value={estimatedKg}
                  onChange={(e) => setEstimatedKg(Math.max(5, parseInt(e.target.value) || 0))}
                  className="w-24 px-3 py-2 bg-[#FAF9F5] border border-[#E5E3DB] font-mono text-xs tabular-nums text-right focus:outline-none focus:border-[#0A2618]"
                />
                <span className="font-mono font-bold text-slate-700">kg</span>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-5 border-t border-[#E5E3DB] bg-white flex flex-col sm:flex-row items-center justify-end gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 border border-[#E5E3DB] hover:border-[#0A2618] bg-white text-[#0A2618] text-xs font-mono font-semibold transition-colors min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4 text-[#047857]" />
              <span>WhatsApp Inquiry</span>
            </a>

            <button
              onClick={() => {
                onAddToQuotation(product, estimatedKg);
                onClose();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#0A2618] hover:bg-[#123C27] text-white text-xs font-mono font-semibold transition-colors cursor-pointer min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Quotation Draft</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
