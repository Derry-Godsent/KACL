/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ServiceItem, RetailOutlet, PublicNotice, CustomerInquiry, AuditLog, StaffUser } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SERVICES, INITIAL_OUTLETS, INITIAL_NOTICES, INITIAL_INQUIRIES } from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'kacl_cms_products',
  SERVICES: 'kacl_cms_services',
  OUTLETS: 'kacl_cms_outlets',
  NOTICES: 'kacl_cms_notices',
  INQUIRIES: 'kacl_cms_inquiries',
  AUDIT_LOGS: 'kacl_cms_audit_logs',
  STAFF_SESSION: 'kacl_staff_session',
  QUOTATION_CART: 'kacl_quotation_cart'
};

export interface QuotationItem {
  productId: string;
  productName: string;
  categoryLabel: string;
  code: string;
  estimatedKg: number;
  packagingPreference?: string;
}

export function loadStoredData<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('Storage save failed:', err);
  }
}

// Initial audit logs
const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-10-28T09:15:20Z',
    user: 'System Inbound',
    action: 'INQUIRY_RECEIVED',
    targetCollection: 'inquiries',
    details: 'New bulk institutional enquiry received from Golden Stool Grand Hotel (Ref: KACL-RFQ-2026-0041)'
  },
  {
    id: 'log-002',
    timestamp: '2026-10-28T10:30:00Z',
    user: 'kofi.owusu',
    action: 'STATUS_UPDATE',
    targetCollection: 'inquiries',
    details: 'Updated status of KACL-RFQ-2026-0041 to REVIEWED. Added internal follow-up note.'
  },
  {
    id: 'log-003',
    timestamp: '2026-10-25T14:00:00Z',
    user: 'admin.director',
    action: 'POLICY_UPDATE',
    targetCollection: 'notices',
    details: 'Published advisory on cold-chain transport for commercial butchers.'
  }
];

export function getStoredProducts(): Product[] {
  return loadStoredData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
}

export function saveStoredProducts(products: Product[]): void {
  saveStoredData(STORAGE_KEYS.PRODUCTS, products);
}

export function getStoredServices(): ServiceItem[] {
  return loadStoredData<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

export function getStoredOutlets(): RetailOutlet[] {
  return loadStoredData<RetailOutlet[]>(STORAGE_KEYS.OUTLETS, INITIAL_OUTLETS);
}

export function getStoredNotices(): PublicNotice[] {
  return loadStoredData<PublicNotice[]>(STORAGE_KEYS.NOTICES, INITIAL_NOTICES);
}

export function saveStoredNotices(notices: PublicNotice[]): void {
  saveStoredData(STORAGE_KEYS.NOTICES, notices);
}

export function getStoredInquiries(): CustomerInquiry[] {
  return loadStoredData<CustomerInquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
}

export function saveStoredInquiries(inquiries: CustomerInquiry[]): void {
  saveStoredData(STORAGE_KEYS.INQUIRIES, inquiries);
}

export function getStoredAuditLogs(): AuditLog[] {
  return loadStoredData<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
}

export function addAuditLog(action: string, targetCollection: string, details: string, user = 'staff_operator'): void {
  const current = getStoredAuditLogs();
  const newLog: AuditLog = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    user,
    action,
    targetCollection,
    details
  };
  saveStoredData(STORAGE_KEYS.AUDIT_LOGS, [newLog, ...current]);
}

// Quotation builder items in customer session
export function getQuotationCart(): QuotationItem[] {
  return loadStoredData<QuotationItem[]>(STORAGE_KEYS.QUOTATION_CART, []);
}

export function saveQuotationCart(items: QuotationItem[]): void {
  saveStoredData(STORAGE_KEYS.QUOTATION_CART, items);
}

export function getStaffSession(): StaffUser | null {
  return loadStoredData<StaffUser | null>(STORAGE_KEYS.STAFF_SESSION, null);
}

export function setStaffSession(user: StaffUser | null): void {
  saveStoredData(STORAGE_KEYS.STAFF_SESSION, user);
}
