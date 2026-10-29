/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { inquiryFormSchema, checkSubmissionRateLimit, recordSubmission } from '../lib/validation';
import { CustomerInquiry, InquiryType } from '../types';
import { QuotationItem } from '../lib/storage';
import { KACL_COMPANY_INFO } from '../data/initialData';

interface ContactViewProps {
  quotationItems: QuotationItem[];
  onSubmitInquiry: (inquiry: CustomerInquiry) => void;
  onClearQuotationItems: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  quotationItems,
  onSubmitInquiry,
  onClearQuotationItems
}) => {
  const [formRenderedAt, setFormRenderedAt] = useState<number>(Date.now());
  const [formData, setFormData] = useState({
    fullName: '',
    organizationName: '',
    email: '',
    phoneNumber: '',
    inquiryType: (quotationItems.length > 0 ? 'quotation' : 'general') as InquiryType,
    preferredContact: 'phone' as 'phone' | 'whatsapp' | 'email',
    deliveryLocation: '',
    notes: quotationItems.length > 0
      ? `Requested items from catalogue:\n${quotationItems
          .map((i) => `- ${i.productName} (${i.code}): ${i.estimatedKg} kg`)
          .join('\n')}\n\nPlease advise on pricing and cold van delivery availability.`
      : '',
    honeypot: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<CustomerInquiry | null>(null);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);

  useEffect(() => {
    setFormRenderedAt(Date.now());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRateLimitError(null);

    const rateCheck = checkSubmissionRateLimit();
    if (!rateCheck.allowed) {
      setRateLimitError(
        `Submission rate limit reached. Please wait ${rateCheck.waitSeconds} seconds before submitting another request.`
      );
      return;
    }

    const result = inquiryFormSchema.safeParse({
      ...formData,
      formRenderedAt
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path && typeof path === 'string') {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    const refNum = `KACL-RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: CustomerInquiry = {
      id: `inq-${Date.now()}`,
      referenceNumber: refNum,
      createdAt: new Date().toISOString(),
      inquiryType: formData.inquiryType,
      fullName: formData.fullName.trim(),
      organizationName: formData.organizationName.trim() || undefined,
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      preferredContact: formData.preferredContact,
      deliveryLocation: formData.deliveryLocation.trim(),
      requestedProducts: quotationItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        estimatedKg: item.estimatedKg
      })),
      notes: formData.notes.trim(),
      status: 'new'
    };

    setTimeout(() => {
      recordSubmission();
      onSubmitInquiry(newInquiry);
      setSubmittedInquiry(newInquiry);
      setIsSubmitting(false);
      onClearQuotationItems();
    }, 500);
  };

  const whatsappDirectUrl = `https://wa.me/${KACL_COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Kumasi%20Abattoir%20Sales,%20I%20am%20contacting%20you%20regarding%20meat%20supply.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="text-xs font-semibold text-[#0F2E1E] uppercase tracking-wider">
          Sales & Institutional Enquiries
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
          Contact Us
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Get in touch with Kumasi Abattoir Company Limited for bulk orders, door-to-door sales, retail inquiries, or contract slaughtering services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Official Contact Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 bg-white border border-[#E5E3DB] rounded-lg space-y-4 shadow-2xs">
            <h2 className="text-base font-bold text-[#0C141D]">
              Direct Contact Lines
            </h2>

            <div className="space-y-3">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-bold rounded transition-colors min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Start WhatsApp Conversation</span>
              </a>

              <a
                href={`tel:${KACL_COMPANY_INFO.primaryPhone}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0A2618] hover:bg-[#123C27] text-white text-xs font-bold rounded transition-colors font-mono min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span>Call Primary Line: {KACL_COMPANY_INFO.primaryPhone}</span>
              </a>
            </div>
          </div>

          {/* Official LIT Document Contact Data */}
          <div className="p-6 sm:p-8 bg-white border border-[#E5E3DB] rounded-lg space-y-4 shadow-2xs text-xs">
            <h3 className="font-bold text-[#0C141D] text-sm border-b border-[#E5E3DB] pb-2">
              Official Coordinates & Address
            </h3>

            <div className="space-y-3 text-slate-700">
              <div className="space-y-1.5">
                <strong className="block text-slate-900">Phone Numbers:</strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                  {KACL_COMPANY_INFO.allPhones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="p-2.5 bg-[#F4F4F2] rounded hover:text-[#0F2E1E] font-bold flex items-center justify-center min-h-[40px] text-center"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <strong className="block text-slate-900">Email Address:</strong>
                <a
                  href={`mailto:${KACL_COMPANY_INFO.email}`}
                  className="font-mono text-xs text-[#0F2E1E] hover:underline"
                >
                  {KACL_COMPANY_INFO.email}
                </a>
              </div>

              <div className="space-y-1 pt-1">
                <strong className="block text-slate-900">Digital Address:</strong>
                <span className="font-mono font-bold text-xs bg-[#F4F4F2] px-2 py-1 rounded inline-block">
                  {KACL_COMPANY_INFO.ghanaPostAddress}
                </span>
              </div>

              <div className="space-y-1 pt-1">
                <strong className="block text-slate-900">Postal Address:</strong>
                <span className="font-mono text-xs text-slate-800">
                  {KACL_COMPANY_INFO.postalAddress}
                </span>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100">
                <strong className="block text-slate-900">Opening Hours:</strong>
                <div className="space-y-0.5 text-slate-600 font-mono text-[11px]">
                  <div>{KACL_COMPANY_INFO.workingHoursText.monFri}</div>
                  <div>{KACL_COMPANY_INFO.workingHoursText.sat}</div>
                  <div>{KACL_COMPANY_INFO.workingHoursText.sun}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order / Quotation Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs">
          {submittedInquiry ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#0F172A]">
                  Request Submitted Successfully
                </h3>
                <p className="text-xs text-slate-500">
                  Reference Identifier:
                </p>
                <div className="font-mono font-bold text-base text-[#0F2E1E] bg-[#F4F4F2] py-1.5 px-4 rounded max-w-max mx-auto">
                  {submittedInquiry.referenceNumber}
                </div>
              </div>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, {submittedInquiry.fullName}. A KACL sales officer will contact you shortly via {submittedInquiry.preferredContact}.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmittedInquiry(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-[#0F172A]">
                  Quotation or Meat Supply Request
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Send your supply requirements directly to our sales and marketing department.
                </p>
              </div>

              {rateLimitError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{rateLimitError}</span>
                </div>
              )}

              {/* Honeypot field */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  value={formData.honeypot}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="fullName" className="text-xs font-semibold text-slate-700 block">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Kwame Mensah"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0F2E1E]"
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-red-600 block">{errors.fullName}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="organizationName" className="text-xs font-semibold text-slate-700 block">
                    Organisation / Institution (e.g. Hotel, School, Shop)
                  </label>
                  <input
                    id="organizationName"
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="e.g. KNUST Canteen, Hotel, or Poku Trading"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0F2E1E]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-700 block">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. name@domain.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0F2E1E]"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-600 block">{errors.email}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="phoneNumber" className="text-xs font-semibold text-slate-700 block">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g. 0202 015 746"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0F2E1E]"
                  />
                  {errors.phoneNumber && (
                    <span className="text-[11px] text-red-600 block">{errors.phoneNumber}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="inquiryType" className="text-xs font-semibold text-slate-700 block">
                    Supply Channel <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0F2E1E]"
                  >
                    <option value="quotation">Bulk Sales (Hotels & Culinary)</option>
                    <option value="bulk_institutional">Door to Door Sales (KNUST, KATH, Institutions)</option>
                    <option value="contract_slaughter">Abattoir Service (Flaying, Singeing, Kraal, Cutting)</option>
                    <option value="general">Retail Outlets / Walk-Ins Enquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="preferredContact" className="text-xs font-semibold text-slate-700 block">
                    Preferred Contact Channel <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="preferredContact"
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0F2E1E]"
                  >
                    <option value="phone">Phone Call</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="deliveryLocation" className="text-xs font-semibold text-slate-700 block">
                  Delivery Destination / Town in Kumasi <span className="text-red-600">*</span>
                </label>
                <input
                  id="deliveryLocation"
                  type="text"
                  name="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={handleChange}
                  placeholder="e.g. Kaase, KNUST Campus, Adum, Bantama"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0F2E1E]"
                />
                {errors.deliveryLocation && (
                  <span className="text-[11px] text-red-600 block">{errors.deliveryLocation}</span>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="notes" className="text-xs font-semibold text-slate-700 block">
                  Meat Requirements & Specifications <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="State products required (e.g. Beef Boneless, Diced Goat, Sausages), estimated weights, or questions..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0F2E1E]"
                />
                {errors.notes && (
                  <span className="text-[11px] text-red-600 block">{errors.notes}</span>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#0A2618] hover:bg-[#123C27] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer disabled:opacity-50 min-h-[44px]"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Meat Order / Quotation'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
