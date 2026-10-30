/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import { RetailOutlet } from '../types';

interface OutletsViewProps {
  outlets: RetailOutlet[];
  onNavigate: (view: string) => void;
}

export const OutletsView: React.FC<OutletsViewProps> = ({ outlets, onNavigate }) => {
  const [selectedOutletId, setSelectedOutletId] = useState<string>(outlets[0]?.id || '');
  const activeOutlet = outlets.find((o) => o.id === selectedOutletId) || outlets[0];

  return (
    <div className="bg-[#f7fbff] text-[#0C141D]">
      {/* Editorial Header */}
      <section className="border-b border-[#dce6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#0072ce] font-semibold">
                Direct Outlets & Depots
              </span>
              <span className="h-px w-8 bg-[#0072ce]/40" />
              <span className="font-mono text-[11px] text-slate-500 uppercase">
                Kumasi Municipal Footprint
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#06457f] tracking-tight leading-[1.08]">
              Retail Outlets & Municipal Meat Houses.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-2">
              KACL has placed deep freezers in shops to sell meat to the Kumasi Metropolis (such as Poku Trading), and operates direct butchery depots across key municipal trading corridors in Kumasi. Every cut sold across our network is veterinary-passed and kept under sanitary chill storage.
            </p>
          </div>
        </div>
      </section>

      {/* Outlets Register & Inspector */}
      <section className="border-b border-[#dce6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#dce6f0]">
            {/* Outlets List (Left) */}
            <div className="lg:col-span-6 divide-y divide-[#dce6f0] border-b lg:border-b-0 lg:border-r border-[#dce6f0]">
              <div className="p-6 bg-[#f7fbff] border-b border-[#dce6f0]">
                <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                  Municipal Network Directory
                </span>
              </div>

              {outlets.map((outlet) => {
                const isSelected = outlet.id === activeOutlet.id;
                return (
                  <div
                    key={outlet.id}
                    onClick={() => setSelectedOutletId(outlet.id)}
                    className={`p-6 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-black/[0.04]'
                        : 'bg-[#f7fbff] hover:bg-black/[0.02]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#0072ce]">
                            {outlet.ghanaPostAddress}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {outlet.deliveryPickupAvailable ? 'Pickup & Logistics' : 'Direct Butchery'}
                          </span>
                        </div>
                        <h2 className="text-base font-bold text-[#06457f]">
                          {outlet.name}
                        </h2>
                        <p className="text-xs text-slate-500">
                          {outlet.locationArea}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-slate-400">
                        {outlet.operatingHours.split('.')[0]}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#dce6f0] flex items-center justify-between text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Phone className="w-3.5 h-3.5 text-[#0072ce]" />
                        <span>{outlet.phoneNumber}</span>
                      </div>
                      <span className="text-[11px] font-mono uppercase text-[#0072ce]">
                        {isSelected ? 'Viewing' : 'Select'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Outlet Profile (Right) */}
            <div className="lg:col-span-6 p-8 lg:p-12 bg-[#f7fbff] space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-2 pb-6 border-b border-[#dce6f0]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#0072ce] font-semibold">
                      Location Specimen
                    </span>
                    <span className="font-mono text-xs font-bold text-[#06457f] border border-[#dce6f0] px-2.5 py-1">
                      {activeOutlet.ghanaPostAddress}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#06457f]">
                    {activeOutlet.name}
                  </h3>
                  <div className="flex items-start gap-2 text-xs text-slate-600 pt-1">
                    <MapPin className="w-4 h-4 text-[#0072ce] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-800">Landmark & Location:</strong> {activeOutlet.landmark}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1 pb-4 border-b border-[#dce6f0]">
                    <span className="font-mono text-[11px] uppercase text-slate-400 block">Inventory Handled</span>
                    <p className="text-slate-800 font-medium leading-relaxed">{activeOutlet.cutsAvailable}</p>
                  </div>

                  <div className="space-y-1 pb-4 border-b border-[#dce6f0]">
                    <span className="font-mono text-[11px] uppercase text-slate-400 block">Operating Hours</span>
                    <p className="text-slate-800 font-mono font-medium">{activeOutlet.operatingHours}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[11px] uppercase text-slate-400 block">Direct Counter Desk</span>
                    <p className="text-slate-900 font-mono font-semibold">
                      <a href={`tel:${activeOutlet.phoneNumber}`} className="hover:text-[#0072ce] transition-colors">
                        {activeOutlet.phoneNumber}
                      </a>
                    </p>
                  </div>
                </div>

                {/* GhanaPostGPS Notice */}
                <div className="p-6 border border-[#dce6f0] bg-white space-y-2">
                  <span className="font-mono text-xs font-bold text-[#0072ce] uppercase tracking-wider block">
                    GhanaPostGPS Digital Code
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To dispatch a courier, taxi, or logistics vehicle directly to this location, navigate using the digital address <strong className="font-mono text-[#06457f]">{activeOutlet.ghanaPostAddress}</strong>.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#dce6f0] flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="flex-1 px-6 py-3.5 bg-[#06457f] hover:bg-[#06457f] text-white text-xs font-mono font-semibold text-center transition-colors cursor-pointer"
                >
                  Contact Branch Manager
                </button>
                <button
                  onClick={() => onNavigate('products')}
                  className="flex-1 px-6 py-3.5 border border-[#dce6f0] hover:border-[#06457f] bg-white text-[#06457f] text-xs font-mono font-semibold text-center transition-colors cursor-pointer"
                >
                  Request Wholesale Cuts
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
