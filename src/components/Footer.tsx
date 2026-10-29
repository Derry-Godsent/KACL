/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, Clock, Shield, ArrowUpRight } from 'lucide-react';
import { KACL_COMPANY_INFO } from '../data/initialData';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenStaffPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenStaffPortal }) => {
  return (
    <footer className="bg-[#06180E] text-slate-300 border-t border-[#0E3321]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Organization & Mandate */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-tight">
              Kumasi Abattoir Company Limited
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Established under Act 179 to provide modern, hygienic, and veterinary-supervised meat processing in the Ashanti Region. Operating in partnership with the Veterinary Services Directorate and the Kumasi Metropolitan Assembly.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>
                <span className="text-slate-500">Supervisory Body:</span>{' '}
                <span className="text-slate-300">Veterinary Services Directorate (MoFA)</span>
              </div>
              <div>
                <span className="text-slate-500">Facility Location:</span>{' '}
                <span className="text-slate-300">Kaase Industrial Area, Kumasi</span>
              </div>
            </div>
          </div>

          {/* Column 2: Facility & Outlets */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">
              Retail Outlets & Depots
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('outlets')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Kaase Main Complex Butcher Outlet (AK-373-6444)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('outlets')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Central Market Wholesale Meat House (AK-039-4412)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('outlets')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Bantama High Street Depot (AK-112-7809)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('outlets')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Kejetia Market Northern Wing Depot (AK-005-2231)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('outlets')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Asafo Interchange Meat Centre (AK-150-6188)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">
              Operational Contacts
            </h4>
            <div className="text-xs space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {KACL_COMPANY_INFO.headquarters}
                  <br />
                  <span className="font-mono text-slate-300 font-medium">
                    Digital Address: {KACL_COMPANY_INFO.ghanaPostAddress}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${KACL_COMPANY_INFO.primaryPhone}`} className="hover:text-white font-mono">
                  {KACL_COMPANY_INFO.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${KACL_COMPANY_INFO.email}`} className="hover:text-white">
                  {KACL_COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight text-slate-400 font-mono">
                  {KACL_COMPANY_INFO.workingHoursText.monFri} · {KACL_COMPANY_INFO.workingHoursText.sat} · {KACL_COMPANY_INFO.workingHoursText.sun}
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Governance & Policies */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">
              Governance & Policies
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Privacy & Data Protection Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('refund-policy')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Cold Chain & Perishable Returns Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('food-safety')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Veterinary Inspection Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notices')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Public & Operational Notices
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenStaffPortal}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-white font-medium cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Protected Staff Administration</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-[#13422B] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Kumasi Abattoir Company Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Postal: {KACL_COMPANY_INFO.postalAddress}</span>
            <span>·</span>
            <span>Digital: {KACL_COMPANY_INFO.ghanaPostAddress}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
