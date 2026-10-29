/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Play, Pause, RefreshCw, Scissors, Check, Flame, Truck, Award, Sparkles } from 'lucide-react';

interface AbattoirProcessAnimationProps {
  className?: string;
  variant?: 'hero-compact' | 'full-interactive';
  initialMode?: 'cutting' | 'processing-line';
}

export const AbattoirProcessAnimation: React.FC<AbattoirProcessAnimationProps> = ({
  className = '',
  variant = 'hero-compact',
  initialMode = 'cutting'
}) => {
  const [activeTab, setActiveTab] = useState<'cutting' | 'processing-line'>(initialMode);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [sliceProgress, setSliceProgress] = useState<number>(0);
  const [sliceCount, setSliceCount] = useState<number>(3);
  const [cutType, setCutType] = useState<'fillet' | 'tbone' | 'brisket'>('fillet');
  const [currentLineStep, setCurrentLineStep] = useState<number>(0);

  // Meat cutting knife stroke cycle
  useEffect(() => {
    if (!isPlaying || activeTab !== 'cutting') return;

    const interval = setInterval(() => {
      setSliceProgress((prev) => {
        const next = (prev + 1) % 100;
        if (next === 0) {
          setSliceCount((c) => (c >= 6 ? 1 : c + 1));
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isPlaying, activeTab]);

  // Overhead Processing line conveyor cycle (Kraal -> Singeing/Flaying -> 4-Quartering -> Prime Cuts -> Cold Dispatch)
  useEffect(() => {
    if (!isPlaying || activeTab !== 'processing-line') return;

    const interval = setInterval(() => {
      setCurrentLineStep((prev) => (prev + 1) % 5);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPlaying, activeTab]);

  // Knife position calculation: stroke down at 30%-60%
  const isSlicingDown = sliceProgress >= 25 && sliceProgress <= 65;
  const knifeY = isSlicingDown
    ? 60 + Math.sin(((sliceProgress - 25) / 40) * Math.PI) * 45
    : 45;
  const knifeAngle = isSlicingDown
    ? -8 + Math.sin(((sliceProgress - 25) / 40) * Math.PI) * 16
    : -8;
  const cutDepth = Math.max(0, Math.min(100, (sliceProgress - 25) * 2.5));

  const processingSteps = [
    {
      num: '01',
      title: 'Kraal Intake & Vet Scrutiny',
      sub: 'Ante-mortem veterinary examination of live cattle, sheep, goats, pigs',
      badge: 'Veterinary Check',
      icon: 'kraal',
      detail: 'Veterinary Doctors inspect each animal for wholesome health before clearance to slaughter.'
    },
    {
      num: '02',
      title: 'Flaying or LPG Clean Singeing',
      sub: 'Skilled butchery skinning or fur removal using hygienic LPG gas',
      badge: 'Certified Hygienic',
      icon: 'flame',
      detail: 'Trained butchers remove hide or burn fur using LPG, dress and prepare for quartering.'
    },
    {
      num: '03',
      title: 'Four-Quarter Division',
      sub: 'Carcass divided into clean quarters on stainless steel overhead rail',
      badge: 'Stainless Monorail',
      icon: 'split',
      detail: 'Split into hygienic four quarters under veterinary inspection for carcass wholesomeness.'
    },
    {
      num: '04',
      title: 'Prime Cuts & Precision Slicing',
      sub: 'Deboning, trimming, and custom table-size prime butchery cuts',
      badge: 'Precision Butchery',
      icon: 'knife',
      detail: 'Meat cut to table size or custom culinary sizes requested by institutions, hotels, and retail clients.'
    },
    {
      num: '05',
      title: 'Vet Stamping & Cold Van Dispatch',
      sub: 'Official food safety seal and dispatch in branded cold vans',
      badge: 'Certified Wholesome',
      icon: 'truck',
      detail: 'Inks stamped as certified wholesome and carted in branded cold vans to KNUST, KATH, hotels, and outlets.'
    }
  ];

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden ${className}`}>
      {/* Header Bar: Title & Mode Selector (No Gold, Deep Heritage Green & Surgical Steel) */}
      <div className="bg-[#0A2618] px-4 py-3 sm:px-5 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 text-white border-b border-[#123C27]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h3 className="text-xs sm:text-sm font-black tracking-tight flex items-center gap-2">
              <span>KACL LIVE ABATTOIR PROCESS SIMULATOR</span>
              <span className="hidden sm:inline-block text-[10px] font-mono font-normal uppercase bg-[#047857] px-2 py-0.5 rounded text-emerald-100">
                Act 179 Standard
              </span>
            </h3>
            <p className="text-[11px] text-emerald-200/90 font-mono">
              Live automated butchery & veterinary processing line
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-[#071D12] p-1 rounded-lg border border-[#16442D]">
          <button
            type="button"
            onClick={() => setActiveTab('cutting')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'cutting'
                ? 'bg-[#047857] text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Meat Cutting</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('processing-line')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'processing-line'
                ? 'bg-[#047857] text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Cow Processing Line</span>
          </button>
        </div>
      </div>

      {/* Main Animation Stage */}
      <div className="p-4 sm:p-6 bg-slate-100 relative min-h-[300px]">
        {/* ======================================================== */}
        {/* MODE 1: MEAT BEING CUT ANIMATION                         */}
        {/* ======================================================== */}
        {activeTab === 'cutting' && (
          <div className="space-y-4">
            {/* Cut Selection & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">Cut Style:</span>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setCutType('fillet')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                      cutType === 'fillet'
                        ? 'bg-white text-[#0A2618] shadow-2xs border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Beef Fillet (Table Cut)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCutType('tbone')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                      cutType === 'tbone'
                        ? 'bg-white text-[#0A2618] shadow-2xs border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    T-Bone Steak Cut
                  </button>
                  <button
                    type="button"
                    onClick={() => setCutType('brisket')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                      cutType === 'brisket'
                        ? 'bg-white text-[#0A2618] shadow-2xs border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Beef Brisket Slices
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#047857]" />
                  <span>Vet Inspection: PASSED</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause Animation' : 'Play Animation'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* The Butchery Block SVG Canvas */}
            <div className="relative w-full h-64 sm:h-72 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-inner flex items-center justify-center">
              {/* Surgical Stainless Steel Table Texture & Grid Lines */}
              <div className="absolute inset-0 opacity-15 bg-transparent [background-size:16px_16px]" />

              {/* Stainless Steel Overhead Light Glint */}
              <div className="absolute top-0 left-1/4 w-1/2 h-8 bg-slate-400 blur-md pointer-events-none" />

              {/* Rulers on butchery block */}
              <div className="absolute bottom-2 left-6 right-6 flex justify-between text-[9px] font-mono text-slate-400 border-t border-slate-700 pt-1">
                <span>0 mm</span>
                <span>50 mm</span>
                <span>100 mm (Table Cut)</span>
                <span>150 mm</span>
                <span>200 mm</span>
                <span>250 mm</span>
              </div>

              {/* Live Animated Butchery SVG Scene */}
              <svg
                viewBox="0 0 600 280"
                className="w-full h-full max-h-72 select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Clean Fresh Lean Beef Meat Gradient */}
                  <linearGradient id="freshMeatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C53030" />
                    <stop offset="45%" stopColor="#9B1C1C" />
                    <stop offset="85%" stopColor="#7F1D1D" />
                    <stop offset="100%" stopColor="#5F1414" />
                  </linearGradient>

                  {/* Clean Fat Cap / Marbling Gradient */}
                  <linearGradient id="fatCapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#F8FAFC" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>

                  {/* German Stainless Steel Knife Blade */}
                  <linearGradient id="knifeBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="25%" stopColor="#E2E8F0" />
                    <stop offset="60%" stopColor="#94A3B8" />
                    <stop offset="90%" stopColor="#64748B" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>

                  {/* Laser Cut Guide */}
                  <linearGradient id="laserGuide" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Butchery Stainless Steel Cutting Board Platform */}
                <rect x="80" y="160" width="440" height="70" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                <rect x="90" y="165" width="420" height="8" rx="2" fill="#334155" opacity="0.6" />

                {/* Stainless Table Guide Lasers (Shows Precision Cut Thickness) */}
                <line x1="310" y1="90" x2="310" y2="165" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
                <text x="316" y="105" fill="#34D399" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  PRECISION CUT LINE: 25mm
                </text>

                {/* MAIN MEAT BLOCK (The Loin / Fillet being sliced) */}
                <g transform="translate(140, 115)">
                  {/* Shadow under meat */}
                  <ellipse cx="140" cy="52" rx="135" ry="14" fill="#000000" opacity="0.5" />

                  {/* Meat Body (Wholesome primary cut) */}
                  <path
                    d="M 20 45 C 20 20, 50 15, 90 12 C 140 10, 200 12, 240 18 C 265 22, 270 38, 270 48 C 270 54, 250 56, 200 56 C 140 56, 70 55, 20 48 Z"
                    fill="url(#freshMeatGrad)"
                    stroke="#5F1414"
                    strokeWidth="1.5"
                  />

                  {/* Top White Fat Cap */}
                  <path
                    d="M 22 36 C 45 22, 90 14, 150 13 C 210 12, 245 16, 268 22 C 262 26, 230 22, 170 21 C 110 20, 50 26, 22 36 Z"
                    fill="url(#fatCapGrad)"
                    opacity="0.95"
                  />

                  {/* Internal Clean Beef Marbling Striations */}
                  <path d="M 60 32 Q 80 34 100 30" stroke="#F8FAFC" strokeWidth="1.2" opacity="0.65" fill="none" />
                  <path d="M 120 30 Q 140 33 165 28" stroke="#F8FAFC" strokeWidth="1.2" opacity="0.65" fill="none" />
                  <path d="M 190 28 Q 210 32 230 29" stroke="#F8FAFC" strokeWidth="1.2" opacity="0.65" fill="none" />
                  <path d="M 80 44 Q 105 46 130 42" stroke="#F8FAFC" strokeWidth="1" opacity="0.5" fill="none" />
                  <path d="M 150 42 Q 180 44 210 40" stroke="#F8FAFC" strokeWidth="1" opacity="0.5" fill="none" />

                  {/* Cut groove where blade enters */}
                  {isSlicingDown && (
                    <line
                      x1="170"
                      y1="13"
                      x2="170"
                      y2={13 + cutDepth * 0.4}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      opacity="0.9"
                    />
                  )}
                </g>

                {/* FALLING / SLICED PIECES (Animated separation as cut completes) */}
                <g transform={`translate(${310 + (isSlicingDown ? Math.min(22, (sliceProgress - 25) * 0.7) : 22)}, ${115 + (isSlicingDown ? Math.min(10, (sliceProgress - 25) * 0.3) : 10)})`}>
                  {/* Sliced beef portion separating */}
                  <path
                    d="M 0 16 C 15 16, 35 18, 48 24 C 52 35, 48 48, 45 52 C 30 55, 10 54, 0 52 Z"
                    fill="url(#freshMeatGrad)"
                    stroke="#5F1414"
                    strokeWidth="1.2"
                  />
                  {/* Sliced fat cap */}
                  <path
                    d="M 0 16 C 12 16, 30 18, 48 24 C 44 26, 25 21, 0 20 Z"
                    fill="url(#fatCapGrad)"
                  />
                  {/* Fresh cut surface shine */}
                  <line x1="2" y1="18" x2="2" y2="50" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.75" />
                </g>

                {/* STACK OF PREVIOUS PRIME CUTS (Neatly arranged on tray) */}
                <g transform="translate(370, 130)">
                  {[...Array(Math.min(sliceCount, 5))].map((_, i) => (
                    <g key={i} transform={`translate(${i * 14}, ${i * 4})`}>
                      <path
                        d="M 0 15 C 10 15, 25 18, 35 22 C 38 32, 35 44, 30 46 C 20 48, 8 47, 0 45 Z"
                        fill="url(#freshMeatGrad)"
                        stroke="#450A0A"
                        strokeWidth="1"
                        opacity={0.9 - i * 0.05}
                      />
                      <path d="M 0 15 C 8 15, 20 17, 35 22 C 30 24, 15 20, 0 19 Z" fill="#F8FAFC" />
                    </g>
                  ))}
                </g>

                {/* BUTCHER'S PRECISION GERMAN STAINLESS CLEAVER / KNIFE */}
                <g transform={`translate(305, ${knifeY}) rotate(${knifeAngle}, 15, 60)`}>
                  {/* Knife Shadow */}
                  <path
                    d="M 12 25 L 35 5 L 45 15 L 22 95 L 12 95 Z"
                    fill="#000000"
                    opacity="0.35"
                    transform="translate(10, 10)"
                  />

                  {/* Knife Handle (Ergonomic Butcher Composite Handle) */}
                  <rect x="0" y="-35" width="22" height="48" rx="4" fill="#0A2618" stroke="#164E33" strokeWidth="1.5" />
                  {/* Brass/Steel rivets on handle */}
                  <circle cx="11" cy="-24" r="2.5" fill="#E2E8F0" />
                  <circle cx="11" cy="-11" r="2.5" fill="#E2E8F0" />
                  <circle cx="11" cy="2" r="2.5" fill="#E2E8F0" />

                  {/* Knife Bolster */}
                  <rect x="-2" y="10" width="26" height="6" rx="1.5" fill="#64748B" />

                  {/* Knife Blade (Large precision butchery slicer) */}
                  <path
                    d="M 2 16 L 26 16 L 24 85 Q 22 98 12 100 Q 2 98 2 85 Z"
                    fill="url(#knifeBladeGrad)"
                    stroke="#475569"
                    strokeWidth="1"
                  />

                  {/* Razor Edge Highlight (Glints as it cuts) */}
                  <line x1="3" y1="20" x2="3" y2="92" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />

                  {/* KACL Professional Brand Etching on Blade */}
                  <text
                    x="14"
                    y="45"
                    fill="#1E293B"
                    fontSize="7"
                    fontFamily="monospace"
                    fontWeight="bold"
                    transform="rotate(90, 14, 45)"
                    opacity="0.8"
                  >
                    KACL SURGICAL CUT
                  </text>
                </g>

                {/* VETERINARY APPROVAL INK STAMP (Appears periodically) */}
                <g transform="translate(120, 40)" opacity={isSlicingDown ? '1' : '0.85'} className="transition-opacity">
                  <rect x="0" y="0" width="130" height="34" rx="6" fill="#047857" opacity="0.9" stroke="#10B981" strokeWidth="1.5" />
                  <text x="14" y="16" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.5">
                    MOFA VET INSPECTED
                  </text>
                  <text x="14" y="27" fill="#A7F3D0" fontSize="8" fontFamily="monospace" fontWeight="bold">
                    WHOLESOME · KACL-VET
                  </text>
                </g>
              </svg>

              {/* Live Metric Overlay Badges */}
              <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                <span className="bg-[#0A2618]/90 text-white font-mono text-[10px] px-2 py-0.5 rounded border border-emerald-500/40 font-bold flex items-center gap-1 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  CUT DEPTH: {Math.round(cutDepth)}%
                </span>
                <span className="bg-slate-900/85 text-slate-300 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700">
                  SLICES PREPARED: {sliceCount}
                </span>
              </div>
            </div>

            {/* Explanatory Technical Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px] text-slate-600">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-800 block">Prime Table Cuts</span>
                <span>Cut to table size or custom culinary portions per client specifications.</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-800 block">Hygienic De-boning</span>
                <span>Trained qualified butchers trim fat caps, sinew, and bone on stainless steel surfaces.</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-800 block">Veterinary Declaration</span>
                <span>Any unwholesome portion is instantly condemned, confiscated, and buried by MoFA Vets.</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODE 2: COW PROCESSING LINE (OVERHEAD MONORAIL)           */}
        {/* ======================================================== */}
        {activeTab === 'processing-line' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-200 pb-3">
              <div>
                <span className="font-bold text-slate-800">
                  Continuous Abattoir Processing Flow (Act 179 Standard)
                </span>
                <p className="text-[11px] text-slate-500">
                  From live Kraal reception to refrigerated cold dispatch
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  Current Station: {processingSteps[currentLineStep].title}
                </span>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause Animation' : 'Play Animation'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Overhead Conveyor Rail SVG Scene */}
            <div className="relative w-full h-72 sm:h-80 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-inner flex flex-col justify-between p-4">
              {/* Stainless Overhead Rail Beam */}
              <div className="w-full h-4 bg-slate-400 rounded relative shadow-md">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-600" />
                {/* Overhead Trolley Hooks Moving Along Rail */}
                <div
                  className="absolute -bottom-3 transition-all duration-700 ease-in-out flex items-center justify-center"
                  style={{ left: `${15 + currentLineStep * 18}%` }}
                >
                  <div className="w-4 h-6 bg-slate-800 border border-slate-400 rounded-sm flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-slate-300 -mt-1" />
                    <div className="w-0.5 h-4 bg-slate-200" />
                    <div className="w-2 h-2 border-b-2 border-l-2 border-slate-200 -rotate-45" />
                  </div>
                </div>
              </div>

              {/* Station Markers along the line */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {processingSteps.map((step, idx) => {
                  const isActive = idx === currentLineStep;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => setCurrentLineStep(idx)}
                      className={`text-left p-2 rounded-lg transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#0A2618]/90 border-emerald-400 text-white shadow-md scale-102 ring-1 ring-emerald-400/50'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                        <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                          STAGE {step.num}
                        </span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
                      </div>
                      <div className="text-xs font-bold leading-tight line-clamp-1">{step.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1 hidden sm:block line-clamp-2">
                        {step.sub}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Central Dynamic Processing Stage Visual */}
              <div className="my-2 p-3 bg-slate-900/80 rounded-lg border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0A2618] border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400">
                    {currentLineStep === 0 && <ShieldCheck className="w-6 h-6" />}
                    {currentLineStep === 1 && <Flame className="w-6 h-6 text-orange-400" />}
                    {currentLineStep === 2 && <Scissors className="w-6 h-6 text-emerald-400" />}
                    {currentLineStep === 3 && <Sparkles className="w-6 h-6 text-emerald-300" />}
                    {currentLineStep === 4 && <Truck className="w-6 h-6 text-emerald-400" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                        Active Step: {processingSteps[currentLineStep].badge}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ({currentLineStep + 1} of 5 in sequence)
                      </span>
                    </div>
                    <p className="text-xs text-white font-medium leading-relaxed">
                      {processingSteps[currentLineStep].detail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setCurrentLineStep((prev) => (prev > 0 ? prev - 1 : 4))}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded cursor-pointer"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentLineStep((prev) => (prev + 1) % 5)}
                    className="px-3 py-1.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-bold rounded cursor-pointer flex items-center gap-1"
                  >
                    <span>Next Stage</span>
                  </button>
                </div>
              </div>

              {/* Environmental Monitoring Ticker */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-2">
                <span>FACILITY TEMP: +2°C (CHILLED LINE)</span>
                <span className="text-emerald-400 font-bold">VETERINARY DOCTOR SCRUTINY: ACTIVE</span>
                <span>KUMASI METROPOLIS · ACT 179</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
