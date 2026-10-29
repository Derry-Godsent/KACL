/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  inquiryFormSchema,
  checkSubmissionRateLimit,
  recordSubmission,
} from "../lib/validation";
import { CustomerInquiry, InquiryType } from "../types";
import { QuotationItem } from "../lib/storage";
import { KACL_COMPANY_INFO } from "../data/initialData";

interface ContactViewProps {
  quotationItems: QuotationItem[];
  onSubmitInquiry: (inquiry: CustomerInquiry) => void;
  onClearQuotationItems: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  quotationItems,
  onSubmitInquiry,
  onClearQuotationItems,
}) => {
  const [formRenderedAt, setFormRenderedAt] = useState<number>(Date.now());
  const [formData, setFormData] = useState({
    fullName: "",
    organizationName: "",
    email: "",
    phoneNumber: "",
    inquiryType: (quotationItems.length > 0
      ? "quotation"
      : "general") as InquiryType,
    preferredContact: "phone" as "phone" | "whatsapp" | "email",
    deliveryLocation: "",
    notes:
      quotationItems.length > 0
        ? `Requested items from catalogue:\n${quotationItems
            .map((i) => `- ${i.productName} (${i.code}): ${i.estimatedKg} kg`)
            .join(
              "\n",
            )}\n\nPlease advise on pricing and cold van delivery availability.`
        : "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] =
    useState<CustomerInquiry | null>(null);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);

  useEffect(() => {
    setFormRenderedAt(Date.now());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
    if (isSubmitting) return;
    setRateLimitError(null);

    const rateCheck = checkSubmissionRateLimit();
    if (!rateCheck.allowed) {
      setRateLimitError(
        `Submission rate limit reached. Please wait ${rateCheck.waitSeconds} seconds before submitting another request.`,
      );
      return;
    }

    const result = inquiryFormSchema.safeParse({
      ...formData,
      formRenderedAt,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path && typeof path === "string") {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      requestAnimationFrame(() =>
        document.getElementById(Object.keys(fieldErrors)[0])?.focus(),
      );
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
        estimatedKg: item.estimatedKg,
      })),
      notes: formData.notes.trim(),
      status: "new",
    };

    setTimeout(() => {
      recordSubmission();
      onSubmitInquiry(newInquiry);
      setSubmittedInquiry(newInquiry);
      setIsSubmitting(false);
      onClearQuotationItems();
    }, 500);
  };

  const whatsappDirectUrl = `https://wa.me/${KACL_COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello%20Kumasi%20Abattoir%20Sales,%20I%20am%20contacting%20you%20regarding%20meat%20supply.`;

  const fields = [
    {
      name: "fullName",
      label: "Your name",
      type: "text",
      autoComplete: "name",
      required: true,
      placeholder: "Full name",
    },
    {
      name: "organizationName",
      label: "Organisation",
      type: "text",
      autoComplete: "organization",
      required: false,
      placeholder: "Business or institution, if applicable",
    },
    {
      name: "email",
      label: "Email address",
      type: "email",
      autoComplete: "email",
      required: true,
      placeholder: "you@example.com",
    },
    {
      name: "phoneNumber",
      label: "Phone number",
      type: "tel",
      autoComplete: "tel",
      required: true,
      placeholder: "e.g. 0202 015 746",
    },
  ] as const;
  const preparedMessage = submittedInquiry
    ? `Hello KACL, I would like to send this enquiry.\nReference: ${submittedInquiry.referenceNumber}\nName: ${submittedInquiry.fullName}\nOrganisation: ${submittedInquiry.organizationName || "Not specified"}\nPhone: ${submittedInquiry.phoneNumber}\nEmail: ${submittedInquiry.email}\nPreferred contact: ${submittedInquiry.preferredContact}\nLocation: ${submittedInquiry.deliveryLocation}\n\n${submittedInquiry.notes}`
    : "";
  const sendWhatsApp = `https://wa.me/${KACL_COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(preparedMessage)}`;
  const sendEmail = `mailto:${KACL_COMPANY_INFO.email}?subject=${encodeURIComponent("KACL enquiry " + (submittedInquiry?.referenceNumber || ""))}&body=${encodeURIComponent(preparedMessage)}`;

  const mapQuery = encodeURIComponent('Kumasi Abattoir Company Limited, Kaase, Kumasi, Ghana');
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="contact-page">
      <section className="contact-map" aria-label="Find Kumasi Abattoir on Google Maps">
        <iframe
          title="Google Map showing Kumasi Abattoir Company Limited in Kaase, Kumasi"
          src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="contact-map-card">
          <span className="contact-map-icon"><MapPin className="w-6 h-6" aria-hidden="true" /></span>
          <div>
            <span className="contact-map-label">Find us in Kumasi</span>
            <h2>Kumasi Abattoir Company Limited</h2>
            <p>Kaase Industrial Area · {KACL_COMPANY_INFO.ghanaPostAddress}</p>
            <a href={mapUrl} target="_blank" rel="noreferrer">Open in Google Maps</a>
          </div>
        </div>
      </section>
      <div className="page-width">
        <div className="contact-intro">
          <span className="contact-kicker">We're here to help</span>
          <h1>Let's talk quality meat.</h1>
          <p>
            Orders, abattoir services or a quick question. Choose the way that
            works for you.
          </p>
        </div>

        <div className="contact-quick-links">
          <a href={`tel:${KACL_COMPANY_INFO.primaryPhone.replace(/\s/g, "")}`}>
            <span className="contact-option-icon">
              <Phone className="w-6 h-6" />
            </span>
            <strong>Give us a call</strong>
            <span>{KACL_COMPANY_INFO.primaryPhone}</span>
          </a>
          <a href={whatsappDirectUrl} target="_blank" rel="noreferrer">
            <span className="contact-option-icon">
              <MessageSquare className="w-6 h-6" />
            </span>
            <strong>Chat on WhatsApp</strong>
            <span>Speak with our sales team</span>
          </a>
          <a href={`mailto:${KACL_COMPANY_INFO.email}`}>
            <span className="contact-option-icon">
              <Mail className="w-6 h-6" />
            </span>
            <strong>Send an email</strong>
            <span>{KACL_COMPANY_INFO.email}</span>
          </a>
        </div>

        <div className="contact-main-grid">
          <section
            className="contact-form-panel"
            aria-labelledby="contact-form-heading"
          >
            {submittedInquiry ? (
              <div className="contact-success" role="status">
                <CheckCircle2 className="w-10 h-10" />
                <span className="contact-kicker">Ready for the next step</span>
                <h2>Your enquiry is ready.</h2>
                <p>
                  Thank you, {submittedInquiry.fullName}. Your draft is saved on
                  this device. Send it to KACL using one of the options below.
                </p>
                <div className="contact-reference">
                  <span>Your reference</span>
                  <strong>{submittedInquiry.referenceNumber}</strong>
                </div>
                <a
                  className="button-primary"
                  href={sendWhatsApp}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send via WhatsApp
                </a>
                <a className="button-secondary" href={sendEmail}>
                  <Mail className="w-4 h-4" />
                  Send via email
                </a>
                <button
                  type="button"
                  className="contact-another"
                  onClick={() => {
                    setSubmittedInquiry(null);
                    setFormData({
                      fullName: "",
                      organizationName: "",
                      email: "",
                      phoneNumber: "",
                      inquiryType: "general",
                      preferredContact: "phone",
                      deliveryLocation: "",
                      notes: "",
                      honeypot: "",
                    });
                    setErrors({});
                    setRateLimitError(null);
                    setFormRenderedAt(Date.now());
                  }}
                >
                  Start another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <span className="contact-kicker">Tell us what you need</span>
                <h2 id="contact-form-heading">Make an enquiry</h2>
                <p className="contact-form-description">
                  A few details will help our team understand your request.
                </p>
                {quotationItems.length > 0 && (
                  <div className="contact-quote-summary">
                    <strong>Your cart is included</strong>
                    <p>
                      {quotationItems.length}{" "}
                      {quotationItems.length === 1 ? "product" : "products"} ·{" "}
                      {Number(
                        quotationItems
                          .reduce((sum, item) => sum + item.estimatedKg, 0)
                          .toFixed(2),
                      )}{" "}
                      kg estimated
                    </p>
                    <ul>
                      {quotationItems.map((item) => (
                        <li key={item.productId}>
                          <span>{item.productName.toLowerCase()}</span>
                          <strong>{item.estimatedKg} kg</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="contact-required-note">
                  Fields marked * are required.
                </p>
                {(rateLimitError ||
                  errors.formRenderedAt ||
                  errors.honeypot) && (
                  <div className="contact-error-banner" role="alert">
                    <AlertCircle className="w-5 h-5" />
                    <span>
                      {rateLimitError ||
                        errors.formRenderedAt ||
                        errors.honeypot}
                    </span>
                  </div>
                )}
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
                <div className="contact-fields">
                  {fields.map((field) => (
                    <div className="contact-field" key={field.name}>
                      <label htmlFor={field.name}>
                        {field.label}
                        {field.required ? " *" : <span> (optional)</span>}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        required={field.required}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        aria-invalid={Boolean(errors[field.name])}
                        aria-describedby={
                          errors[field.name] ? `${field.name}-error` : undefined
                        }
                      />
                      {errors[field.name] && (
                        <span
                          className="contact-field-error"
                          id={`${field.name}-error`}
                        >
                          {errors[field.name]}
                        </span>
                      )}
                    </div>
                  ))}
                  <div className="contact-field">
                    <label htmlFor="inquiryType">
                      What can we help with? *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="general">
                        General enquiry / walk-in purchases
                      </option>
                      <option value="quotation">
                        Product quote / bulk order
                      </option>
                      <option value="bulk_institutional">
                        Institutional supply / delivery
                      </option>
                      <option value="contract_slaughter">
                        Abattoir services
                      </option>
                    </select>
                  </div>
                  <div className="contact-field">
                    <label htmlFor="preferredContact">
                      How should we reply? *
                    </label>
                    <select
                      id="preferredContact"
                      name="preferredContact"
                      required
                      value={formData.preferredContact}
                      onChange={handleChange}
                    >
                      <option value="phone">Phone call</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                    </select>
                  </div>
                  <div className="contact-field contact-field-full">
                    <label htmlFor="deliveryLocation">
                      Town or pickup location *
                    </label>
                    <input
                      id="deliveryLocation"
                      name="deliveryLocation"
                      value={formData.deliveryLocation}
                      required
                      onChange={handleChange}
                      placeholder="e.g. Kaase, Adum or KNUST Campus"
                      aria-invalid={Boolean(errors.deliveryLocation)}
                      aria-describedby={
                        errors.deliveryLocation
                          ? "deliveryLocation-error"
                          : undefined
                      }
                    />
                    {errors.deliveryLocation && (
                      <span
                        className="contact-field-error"
                        id="deliveryLocation-error"
                      >
                        {errors.deliveryLocation}
                      </span>
                    )}
                  </div>
                  <div className="contact-field contact-field-full">
                    <label htmlFor="notes">Your message *</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={5}
                      required
                      value={formData.notes}
                      maxLength={1500}
                      onChange={handleChange}
                      placeholder="Tell us about the products, quantities or service you need."
                      aria-invalid={Boolean(errors.notes)}
                      aria-describedby={
                        errors.notes ? "notes-error" : undefined
                      }
                    />
                    {errors.notes && (
                      <span className="contact-field-error" id="notes-error">
                        {errors.notes}
                      </span>
                    )}
                  </div>
                </div>
                <p className="contact-draft-note">
                  This form prepares and saves an enquiry on this device. In the
                  next step, send it to KACL via WhatsApp or email.
                </p>
                <button
                  className="button-primary contact-submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Preparing your enquiry..."
                    : "Prepare my enquiry"}
                </button>
              </form>
            )}
          </section>

          <aside
            className="contact-visit"
            aria-label="Visit and contact information"
          >
            <section className="contact-location">
              <MapPin className="w-7 h-7" />
              <h2>Visit us in Kumasi</h2>
              <p>{KACL_COMPANY_INFO.headquarters}</p>
              <span className="contact-digital-address">
                {KACL_COMPANY_INFO.ghanaPostAddress}
              </span>
              <p className="contact-postal">
                {KACL_COMPANY_INFO.postalAddress}
              </p>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                Find KACL on Google Maps
              </a>
            </section>
            <section className="contact-hours">
              <Clock className="w-6 h-6" />
              <h2>Opening hours</h2>
              <dl>
                <div>
                  <dt>Monday to Friday</dt>
                  <dd>8am to 5pm</dd>
                </div>
                <div>
                  <dt>Saturday</dt>
                  <dd>8am to 4pm</dd>
                </div>
                <div>
                  <dt>Sunday</dt>
                  <dd>8am to 2pm</dd>
                </div>
              </dl>
            </section>
            <section className="contact-more-lines">
              <h2>More ways to call</h2>
              {KACL_COMPANY_INFO.allPhones.slice(1).map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>
                  <Phone className="w-4 h-4" />
                  {phone}
                </a>
              ))}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};
