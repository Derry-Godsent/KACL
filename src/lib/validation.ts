/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from 'zod';

/**
 * The public website prepares an enquiry for WhatsApp/email. It does not submit
 * contact details to a server, so this schema is UX validation, not a security
 * boundary. Any future backend must repeat validation server-side and add real
 * authentication, rate limiting and abuse controls.
 */
export const inquiryFormSchema = z.object({
  fullName: z.string().trim().min(3, 'Please enter your full name.').max(100, 'Name is too long.'),
  organizationName: z.string().trim().max(120, 'Organisation name is too long.'),
  email: z.string().trim().email('Please enter a valid email address.').max(254, 'Email address is too long.'),
  phoneNumber: z.string().trim().min(10, 'Please enter a valid phone number.').max(30, 'Phone number is too long.')
    .refine(value => /^[+()\d\s.-]+$/.test(value) && value.replace(/\D/g, '').length >= 10 && value.replace(/\D/g, '').length <= 15, 'Please enter a valid phone number.'),
  inquiryType: z.enum(['quotation', 'bulk_institutional', 'contract_slaughter', 'general']),
  preferredContact: z.enum(['phone', 'whatsapp', 'email']),
  deliveryLocation: z.string().trim().min(2, 'Please enter your town or pickup location.').max(120, 'Location is too long.'),
  notes: z.string().trim().min(10, 'Please tell us a little more about your request.').max(1500, 'Message must be 1500 characters or fewer.'),
}).strict();

export type InquiryFormData = z.infer<typeof inquiryFormSchema>;
