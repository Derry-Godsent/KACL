/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface AbattoirRailTickerProps {
  className?: string;
}

export const AbattoirRailTicker: React.FC<AbattoirRailTickerProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#06457f] border-b border-[#06457f] py-2 text-white select-none ${className}`}
      aria-label="KACL Live Abattoir Monorail Processing Stream"
    >
      {/* Top stainless monorail track */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-400 opacity-80" />
      <div className="absolute top-1 left-0 right-0 h-[1px] bg-sky-500/40" />

      {/* Continuously gliding overhead rail conveyor */}
      <div className="flex items-center gap-12 whitespace-nowrap animate-rail-glide">
        {/* Repeating set of processing stations & trolley hooks */}
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-10 shrink-0">
            {/* Station 1: Kraal Intake */}
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px] font-mono text-sky-400 font-bold">
                01
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-sky-200">
                KRAAL RECEPTION
              </span>
              <span className="text-[11px] text-slate-300">
                [Live Cattle · Sheep · Goats · Pigs Ante-Mortem Scrutiny]
              </span>
              <span className="text-sky-400">→</span>
            </div>

            {/* Station 2: Flaying / LPG Clean Singeing */}
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px] font-mono text-sky-400 font-bold">
                02
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-sky-200">
                LPG GAS SINGEING & FLAYING
              </span>
              <span className="text-[11px] text-slate-300">
                [Hygienic Hide Removal · Clean Fur Dressing]
              </span>
              <span className="text-sky-400">→</span>
            </div>

            {/* Station 3: Four-Quarter Division */}
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px] font-mono text-sky-400 font-bold">
                03
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-sky-200">
                OVERHEAD CARCASS QUARTERING
              </span>
              <span className="text-[11px] text-slate-300">
                [Stainless Steel Rail · Split into 4 Hygienic Quarters]
              </span>
              <span className="text-sky-400">→</span>
            </div>

            {/* Station 4: Precision Prime Butchery Cuts */}
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px] font-mono text-sky-400 font-bold">
                04
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-sky-200">
                PRECISION PRIME BUTCHERY
              </span>
              <span className="text-[11px] text-slate-300">
                [Fillets · T-Bones · Brisket · Custom Table Sizes]
              </span>
              <span className="text-sky-400">→</span>
            </div>

            {/* Station 5: Veterinary Doctor Certification */}
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-sky-900 border border-sky-400 flex items-center justify-center text-[10px] font-mono text-white font-bold">
                05
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-sky-950/80 border border-sky-500/50 rounded text-xs font-bold text-sky-300">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>MOFA VET POST-MORTEM STAMP: CERTIFIED WHOLESOME</span>
              </div>
              <span className="text-sky-400">→</span>
            </div>

            {/* Station 6: Cold Vans Dispatch */}
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px] font-mono text-sky-400 font-bold">
                06
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-sky-200">
                REFRIGERATED COLD DISPATCH
              </span>
              <span className="text-[11px] text-slate-300">
                [KNUST · KATH · Kumasi Metropolis Delivery at 0-4°C]
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
