/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Trash2, ArrowRight, MessageSquare } from 'lucide-react';
import { QuotationItem } from '../lib/storage';
import { KACL_COMPANY_INFO } from '../data/initialData';

interface QuotationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuotationItem[];
  onUpdateQuantity: (productId: string, newKg: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
  onProceedToForm: () => void;
}

export const QuotationDrawer: React.FC<QuotationDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  onProceedToForm
}) => {
  if (!isOpen) return null;

  const totalEstimatedKg = items.reduce((acc, item) => acc + (item.estimatedKg || 0), 0);

  // Generate WhatsApp text
  const whatsappItemsList = items
    .map((item) => `${item.productName} (${item.code}): approx. ${item.estimatedKg} kg`)
    .join('%0A');
  const whatsappUrl = `https://wa.me/${KACL_COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20KACL%20Sales,%20I%20would%20like%20a%20quotation%20for%20the%20following%20meat%20products:%0A${whatsappItemsList}%0APlease%20advise%20on%20wholesale%20rates%20and%20refrigerated%20delivery.`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0C141D]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="motion-drawer-panel fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full sm:w-auto">
        <div className="w-full sm:w-[460px] max-w-full bg-[#FAF9F5] border-l border-[#E5E3DB] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#E5E3DB] flex items-center justify-between bg-white">
            <div className="space-y-1">
              <span className="font-mono text-[11px] text-[#047857] uppercase tracking-wider font-semibold">
                Ready when you are
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-[#0A2618]">
                Your quote cart
              </h2>
              <p className="font-mono text-xs text-slate-500">
                {items.length} {items.length === 1 ? 'item' : 'items'} ready for a quote
              </p>
            </div>
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
              aria-label="Close quotation drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="font-serif text-lg text-slate-600">No items selected yet</div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Browse the wholesale catalogue or cuts ledger and select &quot;Add to Your quote cart&quot; to compile your supply requirements.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-[#E5E3DB]">
                  <span className="font-mono text-[11px] uppercase text-slate-400">Selected products</span>
                  <button
                    onClick={onClearAll}
                    className="font-mono text-xs text-rose-700 hover:text-rose-900 cursor-pointer font-medium"
                  >
                    Clear cart
                  </button>
                </div>

                <div className="divide-y divide-[#E5E3DB] border border-[#E5E3DB] bg-white">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-mono text-[#047857] font-semibold uppercase">
                            {item.code}
                          </span>
                          <h4 className="text-sm font-bold text-[#0A2618]">
                            {item.productName}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono block">
                            {item.categoryLabel}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.productId)}
                          className="p-1 text-slate-400 hover:text-rose-700 cursor-pointer"
                          title="Remove item"
                          aria-label={`Remove ${item.productName} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E5E3DB] text-xs">
                        <label htmlFor={`kg-input-${item.productId}`} className="text-slate-600 font-medium">Estimated Weight:</label>
                        <div className="flex items-center gap-1.5">
                          <input
                            id={`kg-input-${item.productId}`}
                            type="number"
                            min="1"
                            max="10000"
                            step="any"
                            value={item.estimatedKg || 1}
                            onChange={(e) =>
                              onUpdateQuantity(item.productId, Math.min(10000, Math.max(1, parseFloat(e.target.value) || 1)))
                            }
                            className="w-20 px-2 py-1 bg-[#FAF9F5] border border-[#E5E3DB] text-right font-mono text-xs tabular-nums focus:outline-none focus:border-[#0A2618]"
                          />
                          <span className="font-mono font-bold text-slate-700 text-xs">kg</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E5E3DB] bg-white space-y-4">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-[#E5E3DB]">
                <span className="font-mono text-slate-500 uppercase">Total Estimated Weight:</span>
                <span className="font-mono font-bold text-[#0A2618] text-base tabular-nums">
                  {totalEstimatedKg} kg
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToForm();
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0A2618] hover:bg-[#123C27] text-white text-xs font-mono font-semibold transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Request a quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 border border-[#E5E3DB] hover:border-[#0A2618] bg-white text-[#0A2618] text-xs font-mono font-semibold transition-colors min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 text-[#047857]" />
                <span>Send Quotation via WhatsApp</span>
              </a>

              <p className="text-[11px] text-slate-500 text-center leading-normal">
                KACL commercial sales officers respond within 24 business hours with official proforma invoice and cold chain delivery schedule.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
