/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Thermometer, Truck, Phone, MessageSquare, Check, Store, Home, Users, Sparkles, Building2, Award, Clock, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { KACL_COMPANY_INFO, KACL_ABATTOIR_SERVICES, KACL_MARKETING_CHANNELS } from '../data/initialData';
import { AbattoirProcessAnimation } from '../components/AbattoirProcessAnimation';
import { AbattoirRailTicker } from '../components/AbattoirRailTicker';
import { BeefCutsExplorer } from '../components/BeefCutsExplorer';
import {
  FlayingIcon,
  KraalIcon,
  SingeingIcon,
  CuttingIcon,
  RetailOutletIcon,
  BulkSalesIcon,
  DoorToDoorIcon,
  WalkInsIcon
} from '../components/AbattoirIcons';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  products: Product[];
  onAddToQuotation: (product: Product, quantityKg?: number) => void;
  onOpenProductModal: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  products,
  onAddToQuotation,
  onOpenProductModal
}) => {
  const [activeSpecimenIndex, setActiveSpecimenIndex] = useState<number>(0);
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="bg-[#FAF9F5] text-[#0C141D] selection:bg-[#0A2618] selection:text-[#FAF9F5]">
      {/* 1. Live Overhead Abattoir Monorail Conveyor (Architectural Stream) */}
      <AbattoirRailTicker />

      {/* 2. Hero Section: Editorial Luxury (Monarch & Letter.co Inspired) */}
      <section className="relative border-b border-[#E5E3DB] overflow-hidden pt-8 sm:pt-14 pb-16 sm:pb-24">
        {/* Subtle Architectural Hairline Grid Guidelines */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="max-w-7xl mx-auto h-full border-x border-[#E5E3DB]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12 sm:space-y-16">
          {/* Eyebrow & Institutional Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-[#E5E3DB] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#047857]" />
              <span className="font-mono font-bold tracking-widest text-[#0A2618] uppercase text-[11px]">
                WELCOME TO KACL · KUMASI METROPOLIS
              </span>
            </div>
            <div className="font-mono text-[11px] text-slate-500 tracking-wider">
              ACT 179 · INC. 1993 · COMMENCED JULY 1999
            </div>
          </div>

          {/* Main Hero Split: Left Editorial Text, Right Live Abattoir Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 7 Columns: Editorial Headline, Manifesto & Actions */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0C141D] leading-[1.06]">
                  KUMASI ABATTOIR COMPANY LIMITED
                </h1>
                <p className="font-serif italic text-2xl sm:text-4xl text-[#0A2618] font-normal tracking-tight">
                  Home of Quality Meat
                </p>
              </div>

              {/* Editorial Manifesto: Why Choose KACL (Cardless, Architectural Rule) */}
              <div className="border-l-2 border-[#0A2618] pl-5 sm:pl-7 py-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A2618]">
                    Why Choose KACL
                  </span>
                  <span className="font-mono text-[11px] text-[#047857] font-semibold bg-[#EFF6F1] px-2 py-0.5 rounded">
                    Veterinary Doctors Certified Wholesome
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {KACL_COMPANY_INFO.whyChooseKacl}
                </p>
              </div>

              {/* Action Pathways */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-6 py-3.5 bg-[#0A2618] hover:bg-[#123C27] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer min-h-[44px] flex items-center gap-2"
                >
                  <span>Explore Product Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3.5 bg-transparent hover:bg-slate-100 text-[#0C141D] text-xs font-bold uppercase tracking-wider border border-[#0C141D] rounded transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Abattoir Services</span>
                </button>

                <a
                  href={`https://wa.me/${KACL_COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Kumasi%20Abattoir%20Sales,%20I%20would%20like%20to%20enquire%20about%20meat%20supply.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-bold rounded transition-colors min-h-[44px] flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Wholesale</span>
                </a>
              </div>

              {/* Institutional Commercial Spec Ledger */}
              <div className="pt-6 border-t border-[#E5E3DB] grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="space-y-1">
                  <span className="font-mono uppercase font-bold text-slate-400 text-[10px] tracking-wider block">
                    Institutional Delivery Fleet
                  </span>
                  <div className="font-medium text-slate-800">
                    Branded temperature-controlled cold vans supplying KNUST, KATH, hotels, and restaurants.
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-mono uppercase font-bold text-slate-400 text-[10px] tracking-wider block">
                    Operating Schedule
                  </span>
                  <div className="font-mono text-slate-700 text-[11px] space-y-0.5">
                    <div>{KACL_COMPANY_INFO.workingHoursText.monFri}</div>
                    <div>{KACL_COMPANY_INFO.workingHoursText.sat} · {KACL_COMPANY_INFO.workingHoursText.sun}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Live Animated Abattoir Process Simulator */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border border-[#E5E3DB] rounded-lg overflow-hidden bg-white shadow-2xs">
                <AbattoirProcessAnimation />
              </div>

              {/* Pure Meat Proof Strip (NO Leaves, NO Hands) */}
              <div className="p-3.5 border border-[#E5E3DB] bg-white rounded-lg flex items-center gap-3">
                <div className="w-14 h-14 rounded overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src="/src/assets/images/raw_beef_cuts_pure_1793283890125.jpg"
                    alt="Pure fresh beef primary cuts on clean butcher table"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-0.5 text-xs">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Fresh Primary Cut Beef</span>
                    <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      MoFA Inspected
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Unwholesome carcass condemned, confiscated, and buried by Veterinary Doctors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Abattoir Services: Architectural Process Ledger (NO CARDS) */}
      <section className="border-b border-[#E5E3DB] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E3DB] pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="font-mono text-xs font-bold text-[#047857] uppercase tracking-widest">
                LET'S SERVE YOU
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0C141D] tracking-tight">
                ABATTOIR SERVICES
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                World class standard Abattoir where health and safety standards are applied in the slaughtering and dressing of food animals.
              </p>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A2618] hover:underline flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
            >
              <span>View Service Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Full-Width Architectural Process Ledger (No Cards) */}
          <div className="divide-y divide-[#E5E3DB] border-y border-[#E5E3DB]">
            {/* 1. Flaying */}
            <div className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start group hover:bg-[#F4F3EE]/50 transition-colors px-2 sm:px-4">
              <div className="md:col-span-2 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-400">01 / STAGE</span>
                <div className="w-10 h-10 rounded-full border border-[#D5D2C7] flex items-center justify-center text-[#0A2618]">
                  <FlayingIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="md:col-span-3 space-y-1">
                <h3 className="text-xl font-bold text-[#0C141D]">
                  Flaying
                </h3>
                <span className="font-mono text-[11px] text-[#047857] font-semibold block">
                  Hide & Skin Removal
                </span>
              </div>
              <div className="md:col-span-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                The process where our trained and qualified butchers remove the hide or skin from an animal’s carcass and certified by Veterinary Officers for its wholesomeness.
              </div>
              <div className="md:col-span-2 flex md:justify-end items-center">
                <span className="font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 font-semibold">
                  Vet Certified
                </span>
              </div>
            </div>

            {/* 2. Singeing */}
            <div className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start group hover:bg-[#F4F3EE]/50 transition-colors px-2 sm:px-4">
              <div className="md:col-span-2 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-400">02 / STAGE</span>
                <div className="w-10 h-10 rounded-full border border-[#D5D2C7] flex items-center justify-center text-[#0A2618]">
                  <SingeingIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="md:col-span-3 space-y-1">
                <h3 className="text-xl font-bold text-[#0C141D]">
                  Singeing
                </h3>
                <span className="font-mono text-[11px] text-[#047857] font-semibold block">
                  LPG Clean Gas Process
                </span>
              </div>
              <div className="md:col-span-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                This is where our trained, qualified and skilled butchers burn the hair or fur of the carcass, using LPG, dress and cut into four quarters and certified by Veterinary Officers for its wholesomeness.
              </div>
              <div className="md:col-span-2 flex md:justify-end items-center">
                <span className="font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 font-semibold">
                  LPG Hygienic
                </span>
              </div>
            </div>

            {/* 3. Kraal */}
            <div className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start group hover:bg-[#F4F3EE]/50 transition-colors px-2 sm:px-4">
              <div className="md:col-span-2 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-400">03 / STAGE</span>
                <div className="w-10 h-10 rounded-full border border-[#D5D2C7] flex items-center justify-center text-[#0A2618]">
                  <KraalIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="md:col-span-3 space-y-1">
                <h3 className="text-xl font-bold text-[#0C141D]">
                  Kraal
                </h3>
                <span className="font-mono text-[11px] text-[#047857] font-semibold block">
                  Live Animal Market Facility
                </span>
              </div>
              <div className="md:col-span-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                We have a facility (animal market) where life animals, cattle, sheep and goats are sold by individuals who bring their animals for sale to butchers and other individuals to slaughter.
              </div>
              <div className="md:col-span-2 flex md:justify-end items-center">
                <span className="font-mono text-[11px] text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200 font-semibold">
                  Live Trading
                </span>
              </div>
            </div>

            {/* 4. Cutting */}
            <div className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start group hover:bg-[#F4F3EE]/50 transition-colors px-2 sm:px-4">
              <div className="md:col-span-2 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-400">04 / STAGE</span>
                <div className="w-10 h-10 rounded-full border border-[#D5D2C7] flex items-center justify-center text-[#0A2618]">
                  <CuttingIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="md:col-span-3 space-y-1">
                <h3 className="text-xl font-bold text-[#0C141D]">
                  Cutting
                </h3>
                <span className="font-mono text-[11px] text-[#047857] font-semibold block">
                  Prime Table Sizes
                </span>
              </div>
              <div className="md:col-span-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                The abattoir renders the service of prime cuts (cutting meat to table size or any specific sizes) at the request of customers.
              </div>
              <div className="md:col-span-2 flex md:justify-end items-center">
                <span className="font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 font-semibold">
                  Prime Cuts
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Marketing Channels: 4-Quadrant Architectural Matrix (NO CARDS) */}
      <section className="border-b border-[#E5E3DB] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E3DB] pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="font-mono text-xs font-bold text-[#047857] uppercase tracking-widest">
                COMMERCIAL DISTRIBUTION
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0C141D] tracking-tight">
                MARKETING CHANNELS
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                KACL carries out Bulk Sales, Door to Door Sales, and Walk-Ins within the company premises, and through Retail Outlets.
              </p>
            </div>
            <div className="font-mono text-xs text-slate-500">
              KUMASI METROPOLIS NETWORK
            </div>
          </div>

          {/* 4-Quadrant Hairline Matrix (No Cards) */}
          <div className="border border-[#E5E3DB] divide-y lg:divide-y-0 lg:divide-x divide-[#E5E3DB] grid grid-cols-1 lg:grid-cols-4 bg-white">
            {/* 1. Bulk Sales */}
            <div className="p-8 sm:p-10 space-y-4 hover:bg-[#FBFBFA] transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400">CHANNEL 01</span>
                <BulkSalesIcon className="w-6 h-6 text-[#0A2618]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#0C141D]">
                  Bulk Sales
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  KACL delivery vans are used to cart meat in bulk quantities from the company premises to hotels, restaurant, and other institutions in the culinary business.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 font-mono text-[11px] text-[#0A2618] font-bold">
                Hotels · Restaurants · Catering
              </div>
            </div>

            {/* 2. Door to Door Sales */}
            <div className="p-8 sm:p-10 space-y-4 hover:bg-[#FBFBFA] transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400">CHANNEL 02</span>
                <DoorToDoorIcon className="w-6 h-6 text-[#0A2618]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#0C141D]">
                  Door to Door Sales
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  KACL uses its branded cold vans to sell meat to individuals in various institutions like KNUST, KATH and others.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 font-mono text-[11px] text-[#0A2618] font-bold">
                KNUST · KATH · Institutional Staff
              </div>
            </div>

            {/* 3. Retail Outlets */}
            <div className="p-8 sm:p-10 space-y-4 hover:bg-[#FBFBFA] transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400">CHANNEL 03</span>
                <RetailOutletIcon className="w-6 h-6 text-[#0A2618]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#0C141D]">
                  Retail Outlets
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  KACL has placed deep freezers in shops to sell meat to the Kumasi Metropolis, eg of such shops are Poku Trading.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 font-mono text-[11px] text-[#0A2618] font-bold">
                Poku Trading · Deep Freezer Network
              </div>
            </div>

            {/* 4. Walk-Ins */}
            <div className="p-8 sm:p-10 space-y-4 hover:bg-[#FBFBFA] transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400">CHANNEL 04</span>
                <WalkInsIcon className="w-6 h-6 text-[#0A2618]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#0C141D]">
                  Walk-Ins
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  KACL carries out walk-in butcher counter services directly within the company abattoir premises in Kumasi.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 font-mono text-[11px] text-[#0A2618] font-bold">
                Company Premises Butcher Counter
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Beef Cuts Explorer (Architectural Anatomical Layout) */}
      <section className="border-b border-[#E5E3DB] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <BeefCutsExplorer
            onAddToQuotation={onAddToQuotation}
            products={products}
          />
        </div>
      </section>

      {/* 6. Featured Meat Products: Editorial Specimen Ledger (NO CARDS, PURE MEAT) */}
      <section className="border-b border-[#E5E3DB] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E3DB] pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="font-mono text-xs font-bold text-[#047857] uppercase tracking-widest">
                OFFICIAL WHOLESOME CATALOGUE
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0C141D] tracking-tight">
                PRIMARY CUT MEAT SPECIMENS
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Beef Products, Processed Meat, Chevon/Mutton, and Pork. Prepared under Veterinary inspection with zero retail price tags.
              </p>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A2618] hover:underline flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
            >
              <span>View All 38 Cuts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Clean Editorial Horizontal Specimen List (Cardless) */}
          <div className="divide-y divide-[#E5E3DB] border-y border-[#E5E3DB]">
            {featuredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group hover:bg-white transition-colors px-2 sm:px-4"
              >
                {/* Code & Category */}
                <div className="md:col-span-2 space-y-1">
                  <div className="font-mono text-xs font-bold text-[#0A2618]">
                    {product.code}
                  </div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider">
                    {product.categoryLabel}
                  </div>
                </div>

                {/* Pure Meat Photography Thumbnail (Pure meat, no leaves, no hands) */}
                <div className="md:col-span-2">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded border border-[#E5E3DB] overflow-hidden bg-white shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Name & Specification */}
                <div className="md:col-span-5 space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#0C141D]">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {product.description}
                  </p>
                  <div className="font-mono text-[10px] text-emerald-800 font-semibold pt-1">
                    MoFA Inspected · Certified Wholesome
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="md:col-span-3 flex items-center md:justify-end gap-2.5">
                  <button
                    onClick={() => onOpenProductModal(product)}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded hover:bg-slate-100 transition-colors cursor-pointer min-h-[40px]"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onAddToQuotation(product)}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#0A2618] hover:bg-[#123C27] rounded transition-colors cursor-pointer min-h-[40px] flex items-center gap-1.5"
                  >
                    <span>Add to RFQ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Institutional Supply Callout (Architectural Velvet Section) */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-[#0A2618] text-white p-8 sm:p-14 border border-[#16422C] rounded-lg space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  INSTITUTIONAL SUPPLY & CONTRACT PROCESSING
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  Require Wholesale Meat Supply or Contract Slaughtering?
                </h3>
                <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
                  We supply KNUST, KATH, leading Kumasi hotels, restaurants, and retail butchers with wholesome, veterinary-certified meat. Connect directly with our marketing desk for scheduled cold van delivery and institutional contracts.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  href={`https://wa.me/${KACL_COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Kumasi%20Abattoir%20Marketing,%20I%20would%20like%20to%20enquire%20about%20institutional%20meat%20supply.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-bold rounded transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Marketing Desk</span>
                </a>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 bg-white text-[#0A2618] hover:bg-slate-100 text-xs font-bold rounded transition-colors cursor-pointer min-h-[44px]"
                >
                  Contact Management
                </button>
              </div>
            </div>

            {/* Direct Phone Numbers Strip */}
            <div className="pt-6 border-t border-[#16422C] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-mono">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-white font-bold">Direct Lines:</span>
                <span className="text-emerald-300">0202 015 746</span>
                <span>·</span>
                <span className="text-emerald-300">0577 361 460</span>
                <span>·</span>
                <span className="text-emerald-300">0577 361 443</span>
                <span>·</span>
                <span className="text-emerald-300">0577 361 444</span>
              </div>
              <div className="text-slate-400">
                P. O. Box AH 9203, Kumasi · AK-373-6444
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
