/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { KACL_COMPANY_INFO, INITIAL_OUTLETS } from '../data/initialData';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#071e38] text-slate-300 border-t border-[#083d73]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Organization & Mandate */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              aria-label="Kumasi Abattoir Company Limited home"
              className="block cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
            >
            <img
              src="/images/brand/kacl-logo.png"
              alt="Kumasi Abattoir Company Limited logo"
              width={88}
              height={88}
              className="h-[88px] w-[88px] object-contain"
              loading="lazy"
            />
            </button>
            <h3 className="text-white font-bold text-base tracking-tight">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-left cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
              >
                Kumasi Abattoir Company Limited
              </button>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Established under Act 179 to provide modern, hygienic, and veterinary-supervised meat processing in the Ashanti Region.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>
                <span className="text-slate-500">Supervisory Body:</span>{' '}
                <span className="text-slate-300">Ministry of Food &amp; Agriculture, Food and Drugs Authority, Veterinary Services Department</span>
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
              Our Meat Outlets
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              {INITIAL_OUTLETS.map(outlet => (
                <li key={outlet.id}>
                  <button onClick={() => onNavigate('outlets')} className="hover:text-white transition-colors text-left cursor-pointer">
                    {outlet.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">
              Operational Contacts
            </h4>
            <div className="text-xs space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  {KACL_COMPANY_INFO.headquarters}
                  <br />
                  <span className="font-mono text-slate-300 font-medium">
                    Digital Address: {KACL_COMPANY_INFO.ghanaPostAddress}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`tel:${KACL_COMPANY_INFO.primaryPhone}`} className="hover:text-white font-mono">
                  {KACL_COMPANY_INFO.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${KACL_COMPANY_INFO.email}`} className="hover:text-white">
                  {KACL_COMPANY_INFO.email}
                </a>
              </div>
              <section aria-labelledby="footer-opening-hours" className="pt-4 text-sm text-slate-200">
                <h4 id="footer-opening-hours" className="flex items-center gap-2 font-semibold text-white mb-3">
                  <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                  Opening hours
                </h4>
                <dl className="space-y-2">
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                    <dt>Monday to Friday</dt>
                    <dd className="font-medium text-white">8am - 5pm</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                    <dt>Saturday</dt>
                    <dd className="font-medium text-white">8am - 4pm</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                    <dt>Sunday</dt>
                    <dd className="font-medium text-white">8am - 2pm</dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>

          {/* Column 4: Governance & Policies */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">
              Governance & Policies
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('reports')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Reports &amp; Public Information
                </button>
              </li>
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
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-[#0756a3] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
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
