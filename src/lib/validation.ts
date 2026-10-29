/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from 'zod';

// Ghana phone regex support: +233 XX XXX XXXX or 0XX XXX XXXX
const ghanaPhoneRegex = /^(?:\+233|0)[235][0-9]{8}$/;

export const inquiryFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: 'Please provide your full legal name (minimum 3 characters).' })
    .max(80, { message: 'Name must not exceed 80 characters.' }),
  organizationName: z
    .string()
    .trim()
    .max(100, { message: 'Organisation name must not exceed 100 characters.' })
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .trim()
    .email({ message: 'Please provide a valid corporate or personal email address.' }),
  phoneNumber: z
    .string()
    .trim()
    .min(10, { message: 'Phone number must be at least 10 digits (e.g. 0244123456 or +233244123456).' })
    .refine((val) => {
      const cleaned = val.replace(/[\s\-()]/g, '');
      return ghanaPhoneRegex.test(cleaned) || cleaned.length >= 10;
    }, {
      message: 'Please provide a valid Ghana phone number (e.g., 0244123456 or +233244123456).'
    }),
  inquiryType: z.enum(['quotation', 'bulk_institutional', 'contract_slaughter', 'general'] as const),
  preferredContact: z.enum(['phone', 'whatsapp', 'email'] as const),
  deliveryLocation: z
    .string()
    .trim()
    .min(3, { message: 'Please specify the intended delivery location or pickup outlet in Kumasi.' })
    .max(120),
  notes: z
    .string()
    .trim()
    .min(10, { message: 'Please describe your order requirements, estimated quantities, or enquiry details.' })
    .max(1500, { message: 'Requirements must not exceed 1500 characters.' }),
  // Anti-spam security fields
  honeypot: z.string().max(0, { message: 'Bot activity detected.' }).optional().or(z.literal('')),
  formRenderedAt: z.number().refine(
    (time) => {
      // Must take at least 3 seconds from render to submit
      const elapsed = Date.now() - time;
      return elapsed >= 2500;
    },
    { message: 'Submission completed too fast. Please verify your details before submitting.' }
  )
});

export type InquiryFormData = z.infer<typeof inquiryFormSchema>;

export const staffLoginSchema = z.object({
  username: z.string().trim().min(3, { message: 'Username is required.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  mfaCode: z.string().length(6, { message: 'MFA code must be exactly 6 digits.' }).optional().or(z.literal(''))
});

export type StaffLoginFormData = z.infer<typeof staffLoginSchema>;

// Rate limit helper: Maximum 4 submissions per 15 minutes per browser storage
export function checkSubmissionRateLimit(): { allowed: boolean; waitSeconds?: number } {
  try {
    const key = 'kacl_submission_log';
    const raw = localStorage.getItem(key);
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxSubmissions = 4;

    let timestamps: number[] = raw ? JSON.parse(raw) : [];
    timestamps = timestamps.filter((t) => now - t < windowMs);

    if (timestamps.length >= maxSubmissions) {
      const oldest = timestamps[0];
      const waitSeconds = Math.ceil((oldest + windowMs - now) / 1000);
      return { allowed: false, waitSeconds };
    }

    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

export function recordSubmission(): void {
  try {
    const key = 'kacl_submission_log';
    const raw = localStorage.getItem(key);
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    let timestamps: number[] = raw ? JSON.parse(raw) : [];
    timestamps = timestamps.filter((t) => now - t < windowMs);
    timestamps.push(now);
    localStorage.setItem(key, JSON.stringify(timestamps));
  } catch {
    // Ignore storage errors
  }
}
