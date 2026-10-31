/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Plus, Check, Info, Flame, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface BeefCutsExplorerProps {
  onAddToQuotation: (product: Product, quantityKg?: number) => void;
  products: Product[];
}

interface PrimalCutInfo {
  id: string;
  name: string;
  matchedCode: string;
  tenderness: 'Supreme Tender' | 'Tender' | 'Moderate' | 'Rich & Firm (Slow Cook)';
  culinaryUse: string;
  description: string;
  popularInGhana: string;
  anatomyPath: string;
  labelCoord: { x: number; y: number };
}

const PRIMAL_CUTS: PrimalCutInfo[] = [
  {
    id: 'tenderloin',
    name: 'BEEF FILLET (TENDERLOIN)',
    matchedCode: 'BF-FLT',
    tenderness: 'Supreme Tender',
    culinaryUse: 'Pan-seared medallions, premium steaks, fine dining dining steaks',
    description: 'The most tender, lean primal cut situated along the spine. Zero tough connective tissue, subtle buttery finish.',
    popularInGhana: 'High-end hotel catering, diplomatic banquets, and Continental menus across Kumasi',
    anatomyPath: 'M 320 72 L 390 68 L 410 92 L 330 96 Z',
    labelCoord: { x: 360, y: 82 }
  },
  {
    id: 'sirloin',
    name: 'BEEF SIRLOIN',
    matchedCode: 'BF-SIR',
    tenderness: 'Tender',
    culinaryUse: 'Charcoal grilling, prime kebabs, steak cuts, stir-fry cuts',
    description: 'Located directly behind the short loin. Excellent balance of deep robust beef flavor and pleasant tenderness.',
    popularInGhana: 'Prime Suya skewers, executive barbecue, and grilled dinner plates',
    anatomyPath: 'M 390 68 L 470 65 L 485 108 L 410 92 Z',
    labelCoord: { x: 440, y: 85 }
  },
  {
    id: 'rib',
    name: 'T-BONE & RIB CUTS',
    matchedCode: 'BF-TBN',
    tenderness: 'Tender',
    culinaryUse: 'Bone-in steak roasting, open flame searing, institutional banquets',
    description: 'Generously marbled primal yielding ribeye steaks and classic bone-in T-bones with rich natural juices.',
    popularInGhana: 'Specialty steak menus in Kumasi restaurants and corporate celebration buffets',
    anatomyPath: 'M 240 76 L 320 72 L 330 96 L 250 102 Z',
    labelCoord: { x: 280, y: 88 }
  },
  {
    id: 'chuck',
    name: 'BEEF BONELESS (CHUCK & FOREQUARTER)',
    matchedCode: 'BF-BNL',
    tenderness: 'Moderate',
    culinaryUse: 'Rich stews, pot roasts, braised beef cubes, hearty slow cooks',
    description: 'Flavor-dense shoulder cut with intramuscular tissue that breaks down during braising into succulent tenderness.',
    popularInGhana: 'Traditional Ghanaian tomato gravy, Jollof beef stew, and party buffets',
    anatomyPath: 'M 140 85 L 240 76 L 250 102 L 210 148 L 130 135 Z',
    labelCoord: { x: 180, y: 110 }
  },
  {
    id: 'brisket',
    name: 'BEEF BRISKET',
    matchedCode: 'BF-BRS',
    tenderness: 'Rich & Firm (Slow Cook)',
    culinaryUse: 'Slow smoking, low-and-slow boiling, traditional soup bases',
    description: 'Breast cut rich in collagen. When simmered gently, delivers profound savory richness and gelatinous mouthfeel.',
    popularInGhana: 'Aromatic palm nut soup, groundnut soup, and spicy light pepper soup',
    anatomyPath: 'M 130 135 L 210 148 L 205 185 L 120 170 Z',
    labelCoord: { x: 165, y: 162 }
  },
  {
    id: 'round-rump',
    name: 'BEEF RUMP & ROUND',
    matchedCode: 'BF-RMP',
    tenderness: 'Moderate',
    culinaryUse: 'Lean roasts, diced table beef, wholesome minced beef burger blend',
    description: 'Lean hindquarter muscle group offering maximum lean yield with minimal trim loss, perfect for slicing.',
    popularInGhana: 'Daily chop bar beef stews, institutional canteen bulk meal prep',
    anatomyPath: 'M 470 65 L 530 80 L 535 150 L 460 160 L 485 108 Z',
    labelCoord: { x: 495, y: 115 }
  },
  {
    id: 'short-plate',
    name: 'SHREDDED BEEF / FLANK',
    matchedCode: 'BF-SHR',
    tenderness: 'Moderate',
    culinaryUse: 'Fast high-heat stir fry, shredded beef wraps, fajitas, minced meat',
    description: 'Fibrous belly cut that soaks up marinades and crisps rapidly when sliced against the grain.',
    popularInGhana: 'Ghanaian fried rice beef toppings, quick breakfast wraps, and canteen stir-fries',
    anatomyPath: 'M 250 102 L 410 92 L 460 160 L 290 175 L 210 148 Z',
    labelCoord: { x: 330, y: 135 }
  },
  {
    id: 'shank',
    name: 'BEEF BONE-IN (SHANK & MARROW)',
    matchedCode: 'BF-BNI',
    tenderness: 'Rich & Firm (Slow Cook)',
    culinaryUse: 'Deep marrow soups, slow stewing, traditional bone broth',
    description: 'Cross-cut leg section packed with rich marrow and connective tissue for unmatched depth in sauces.',
    popularInGhana: 'Classic Nkrakra (Light Soup), fufu accompaniment, and Sunday feasts',
    anatomyPath: 'M 205 185 L 235 190 L 225 240 L 195 240 Z',
    labelCoord: { x: 215, y: 215 }
  }
];

export const BeefCutsExplorer: React.FC<BeefCutsExplorerProps> = ({
  onAddToQuotation,
  products
}) => {
  const [selectedCutId, setSelectedCutId] = useState<string>('tenderloin');
  const [addedCutId, setAddedCutId] = useState<string | null>(null);

  const selectedCut = PRIMAL_CUTS.find((c) => c.id === selectedCutId) || PRIMAL_CUTS[0];
  const matchedProduct = products.find((p) => p.code === selectedCut.matchedCode);

  const handleAdd = () => {
    if (matchedProduct) {
      onAddToQuotation(matchedProduct, 25);
    } else {
      // Fallback virtual product object
      const fallback: Product = {
        id: `virtual-${selectedCut.id}`,
        name: selectedCut.name,
        category: 'beef',
        categoryLabel: 'Beef Products',
        code: selectedCut.matchedCode,
        description: selectedCut.description,
        packagingType: 'Sanitary wholesale carton / hygienic wrap',
        storageRequirement: 'Chilled at 0°C to 4°C',
        inspectionStatus: 'MoFA Veterinary Certified Wholesome',
        imageUrl: '/src/assets/images/raw_beef_cuts_pure_1793283890125.jpg',
        inStock: true
      };
      onAddToQuotation(fallback, 25);
    }

    setAddedCutId(selectedCut.id);
    setTimeout(() => {
      setAddedCutId(null);
    }, 2200);
  };

  return (
    <div className="bg-white border border-[#dce6f0] rounded-lg overflow-hidden shadow-2xs">
      {/* Explorer Top Banner */}
      <div className="p-5 sm:p-6 bg-[#06457f] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Abattoir Butchery Guide</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Anatomical Beef Primal Cuts Explorer
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal leading-relaxed">
            Explore how our certified butchers prepare wholesale prime cuts to order. Select any primal section on the anatomical diagram to view culinary properties and add directly to your quote.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0 bg-[#0756a3] px-3 py-1.5 rounded text-xs text-sky-200 border border-sky-800/40">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>MoFA Certified Butchery Standards</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x lg:divide-slate-200">
        {/* Left Column: Anatomical Steer Vector Graphic */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-[#F8FAFC] flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Click or tap any cut on the steer diagram:</span>
            <span className="font-mono text-[11px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              Active: {selectedCut.name}
            </span>
          </div>

          {/* Steer Primal Cuts Diagram SVG */}
          <div className="w-full flex items-center justify-center py-2">
            <svg
              viewBox="80 30 500 240"
              className="w-full max-w-xl h-auto drop-shadow-sm select-none"
            >
              {/* Background Silhouette Outline */}
              <path
                d="M 120 70 C 130 55, 170 50, 210 52 C 260 48, 350 45, 470 50 C 510 52, 545 65, 555 90 C 565 110, 560 160, 545 180 C 535 195, 520 220, 510 255 C 500 258, 480 258, 475 240 C 470 215, 465 185, 455 175 C 410 185, 300 190, 230 185 C 220 200, 215 235, 205 255 C 195 258, 175 258, 170 240 C 165 210, 155 185, 140 170 C 120 160, 95 130, 95 105 C 95 85, 105 75, 120 70 Z"
                fill="#E2E8F0"
                stroke="#94A3B8"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />

              {/* Head Silhouette */}
              <path
                d="M 120 70 C 110 65, 85 70, 75 90 C 65 110, 75 135, 95 135 L 120 115 Z"
                fill="#CBD5E1"
                opacity="0.6"
              />

              {/* Anatomical Primal Regions */}
              {PRIMAL_CUTS.map((cut) => {
                const isSelected = selectedCutId === cut.id;
                return (
                  <g
                    key={cut.id}
                    onClick={() => setSelectedCutId(cut.id)}
                    className="cursor-pointer transition-all duration-200 group"
                  >
                    <path
                      d={cut.anatomyPath}
                      fill={
                        isSelected
                          ? '#0072ce'
                          : '#FFFFFF'
                      }
                      stroke={isSelected ? '#062a4e' : '#475569'}
                      strokeWidth={isSelected ? '3' : '1.8'}
                      className="transition-colors hover:fill-sky-100"
                    />
                    {/* Cut Label */}
                    <text
                      x={cut.labelCoord.x}
                      y={cut.labelCoord.y}
                      fill={isSelected ? '#FFFFFF' : '#1E293B'}
                      fontSize="10"
                      fontWeight="800"
                      textAnchor="middle"
                      className="pointer-events-none select-none uppercase tracking-wider"
                    >
                      {cut.name.split(' ')[1] || cut.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Selection Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200">
            {PRIMAL_CUTS.map((cut) => (
              <button
                key={cut.id}
                onClick={() => setSelectedCutId(cut.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer transition-colors ${
                  selectedCutId === cut.id
                    ? 'bg-[#06457f] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cut.name.replace('BEEF ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Selected Primal Cut Deep Dive & Quotation Action */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded">
                Code: {selectedCut.matchedCode}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Primary Cut Mandate (Act 179)
              </span>
            </div>

            <div>
              <h4 className="text-xl font-black text-[#0C141D] leading-tight">
                {selectedCut.name}
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {selectedCut.description}
              </p>
            </div>

            {/* Culinary Tenderness Gauge */}
            <div className="p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-sky-700" />
                  Butchery Tenderness:
                </span>
                <span className="font-bold text-[#06457f]">
                  {selectedCut.tenderness}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#0072ce] h-full rounded-full transition-all duration-500"
                  style={{
                    width:
                      selectedCut.tenderness === 'Supreme Tender'
                        ? '100%'
                        : selectedCut.tenderness === 'Tender'
                        ? '80%'
                        : selectedCut.tenderness === 'Moderate'
                        ? '60%'
                        : '45%'
                  }}
                />
              </div>
            </div>

            {/* Recommended Culinary Preparation */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-800">Optimal Culinary Methods:</div>
              <p className="text-slate-600 leading-relaxed bg-[#F8FAFC] p-3 rounded border border-slate-100">
                {selectedCut.culinaryUse}
              </p>
            </div>

            {/* Usage in Ghanaian Culinary Landscape */}
            <div className="space-y-1.5 text-xs">
              <div className="font-bold text-slate-800">Ashanti & Kumasi Commercial Application:</div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {selectedCut.popularInGhana}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Standard Order Increment:</span>
              <span className="font-mono font-bold text-slate-800">25 kg standard crate</span>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-3 px-4 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px] ${
                addedCutId === selectedCut.id
                  ? 'bg-sky-800 text-white'
                  : 'bg-[#06457f] hover:bg-[#06457f] text-white shadow-xs'
              }`}
            >
              {addedCutId === selectedCut.id ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {selectedCut.name.replace('BEEF ', '')} to Quotation</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add {selectedCut.name.replace('BEEF ', '')} to RFQ List (25kg)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
