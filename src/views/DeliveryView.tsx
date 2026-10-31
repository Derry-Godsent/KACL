/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Truck, Thermometer, ShieldCheck, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { KACL_COMPANY_INFO } from '../data/initialData';

interface DeliveryViewProps {
  onNavigate: (view: string) => void;
}

export const DeliveryView: React.FC<DeliveryViewProps> = ({ onNavigate }) => {
  const deliveryZones = [
    {
      code: 'ZONE 01',
      name: 'Kumasi Central Commercial & Administrative Zone',
      coverage: 'Adum, Kejetia, Central Market, Roman Hill, Ridge, Nhyiaeso, Danyame',
      schedule: 'Daily morning dispatch: 06:00 to 09:30 GMT',
      cutoff: 'Order before 16:00 GMT previous business day'
    },
    {
      code: 'ZONE 02',
      name: 'South & Industrial Corridors',
      coverage: 'Kaase, Asokwa, Atonsu, Gyinyase, Ahinsan, Chirapatre, Kumasi Airport corridor',
      schedule: 'Daily morning & midday dispatch: 07:00 to 14:00 GMT',
      cutoff: 'Order before 16:00 GMT previous business day'
    },
    {
      code: 'ZONE 03',
      name: 'West & Academic Municipalities',
      coverage: 'Bantama, Kwadaso, Tanoso, Patasi, Sofoline, Santasi, Sunyani Road corridor',
      schedule: 'Monday, Wednesday, Friday: 06:30 to 11:00 GMT',
      cutoff: 'Order 24 hours prior to scheduled dispatch run'
    },
    {
      code: 'ZONE 04',
      name: 'North & East University Zone',
      coverage: 'Manhyia, Oforikrom, KNUST campus, Ayigya, Kentinkrono, Suame, Tafo',
      schedule: 'Tuesday, Thursday, Saturday: 06:30 to 11:30 GMT',
      cutoff: 'Order 24 hours prior to scheduled dispatch run'
    }
  ];

  return (
    <div className="bg-[#f7fbff] text-[#0C141D]">
      {/* Editorial Header */}
      <section className="border-b border-[#dce6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#0072ce] font-semibold">
                Refrigerated Logistics
              </span>
              <span className="h-px w-8 bg-[#0072ce]/40" />
              <span className="font-mono text-[11px] text-slate-500 uppercase">
                Active Cold Chain Fleet
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#06457f] tracking-tight leading-[1.08]">
              Temperature-Controlled Distribution.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-2">
              Kumasi Abattoir Company Limited operates an insulated and refrigerated delivery fleet designed to maintain strict food-grade temperatures from our Kaase cold rooms directly to your commercial kitchen receiving dock.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Feature Architectural Split */}
      <section className="border-b border-[#dce6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#dce6f0]">
            <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[420px] bg-slate-100 border-b lg:border-b-0 lg:border-r border-[#dce6f0]">
              <img
                src="/src/assets/images/refrigerated_logistics_1793281380810.jpg"
                alt="KACL refrigerated food transport delivery van loaded at distribution dock"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="lg:col-span-6 p-8 lg:p-12 space-y-6 bg-[#f7fbff] flex flex-col justify-center">
              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#0072ce] font-semibold">
                  Cold Chain Integrity
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#06457f]">
                  Active Temperature Preservation During Transit
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Perishable beef degrades rapidly under tropical ambient temperatures. Open transport via unshielded tricycles or open pickup trucks causes bacterial blooms and moisture loss. Our refrigerated bodies maintain internal temperatures between 0°C and 4°C continuously.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#dce6f0]">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] text-slate-400 uppercase">Pre-Cooling Protocol</span>
                  <div className="font-mono text-sm font-bold text-[#06457f]">0°C to 4°C verified</div>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[11px] text-slate-400 uppercase">Packaging Carrier</span>
                  <div className="text-sm font-semibold text-[#06457f]">Sanitised sealed crates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zones Ledger (Cardless) */}
      <section className="border-b border-[#dce6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#dce6f0]">
            <div className="space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                Route Schedule
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#06457f]">
                Kumasi Metropolitan Delivery Corridors
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              04 Active Corridors
            </span>
          </div>

          <div className="divide-y divide-[#dce6f0]">
            {deliveryZones.map((zone) => (
              <div
                key={zone.code}
                className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-black/[0.015] transition-colors"
              >
                <div className="lg:col-span-2 font-mono text-xs font-semibold text-[#0072ce]">
                  [{zone.code}]
                </div>
                <div className="lg:col-span-4 space-y-2">
                  <h3 className="text-base font-bold text-[#06457f]">
                    {zone.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Coverage:</strong> {zone.coverage}
                  </p>
                </div>
                <div className="lg:col-span-4 space-y-2">
                  <div className="text-xs text-slate-700">
                    <span className="font-mono text-[11px] uppercase text-slate-400 block">Dispatch Window</span>
                    {zone.schedule}
                  </div>
                  <div className="text-xs text-slate-500">
                    <span className="font-mono text-[11px] uppercase text-slate-400 block">Order Cutoff</span>
                    {zone.cutoff}
                  </div>
                </div>
                <div className="lg:col-span-2 flex lg:justify-end">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#06457f] hover:text-[#0072ce] font-semibold transition-colors cursor-pointer"
                  >
                    <span>Route Inquiry</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Receiving Dock Protocol */}
      <section className="border-b border-[#dce6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-20">
          <div className="max-w-3xl space-y-3 mb-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#0072ce] font-semibold">
              Quality Assurance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#06457f]">
              Customer Receiving Dock Protocol
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              At every institutional or hotel delivery point, the KACL driver presents verifiable proof of food safety before handover:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#dce6f0] divide-y md:divide-y-0 md:divide-x divide-[#dce6f0] bg-[#f7fbff]">
            <div className="p-8 space-y-2">
              <span className="font-mono text-xs font-bold text-[#0072ce]">STEP 01</span>
              <h3 className="text-sm font-bold text-[#06457f]">Temperature Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Digital probe temperature check of the consignment at the receiving door (0°C to 4°C).
              </p>
            </div>
            <div className="p-8 space-y-2">
              <span className="font-mono text-xs font-bold text-[#0072ce]">STEP 02</span>
              <h3 className="text-sm font-bold text-[#06457f]">Itemised Waybill</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Detailing piece counts, certified kilograms, cut categories, and gross weight verification.
              </p>
            </div>
            <div className="p-8 space-y-2">
              <span className="font-mono text-xs font-bold text-[#0072ce]">STEP 03</span>
              <h3 className="text-sm font-bold text-[#06457f]">MoFA Movement Certificate</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official Veterinary Movement Certificate verifying disease-free post-mortem clearance.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#dce6f0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <span className="text-slate-600">
              Greater Ashanti regional routes (Obuasi, Mampong, Ejisu, Offinso) arranged for contract orders above 250 kg.
            </span>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-[#06457f] hover:bg-[#06457f] text-white text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Schedule a Delivery Route
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
