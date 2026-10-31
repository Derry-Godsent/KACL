/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialData';

const STORAGE_KEYS = {
  QUOTATION_CART: 'kacl_quotation_cart',
} as const;

/**
 * Older builds stored enquiries, audit entries and a fake staff session in the
 * browser. Remove those keys so contact details do not remain on shared devices.
 * The quotation cart is intentionally kept: it contains catalogue items only.
 */
const LEGACY_PRIVATE_KEYS = [
  'kacl_cms_inquiries',
  'kacl_cms_audit_logs',
  'kacl_staff_session',
  'kacl_submission_log',
  'kacl_cms_products',
  'kacl_cms_services',
  'kacl_cms_outlets',
  'kacl_cms_notices',
] as const;

export interface QuotationItem {
  productId: string;
  productName: string;
  categoryLabel: string;
  code: string;
  estimatedKg?: number;
}

const MAX_CART_ITEMS = 100;

export function purgeLegacyPrivateStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    for (const key of LEGACY_PRIVATE_KEYS) window.localStorage.removeItem(key);
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

function isQuotationItem(value: unknown): value is QuotationItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.productId === 'string' && item.productId.length > 0 && item.productId.length <= 100 &&
    typeof item.productName === 'string' && item.productName.length > 0 && item.productName.length <= 200 &&
    typeof item.categoryLabel === 'string' && item.categoryLabel.length <= 100 &&
    typeof item.code === 'string' && item.code.length > 0 && item.code.length <= 50 &&
    (item.estimatedKg === undefined ||
      (typeof item.estimatedKg === 'number' && Number.isFinite(item.estimatedKg) && item.estimatedKg > 0 && item.estimatedKg <= 100000))
  );
}

export function getQuotationCart(): QuotationItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.QUOTATION_CART);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, MAX_CART_ITEMS).filter(isQuotationItem).map(item => ({
      productId: item.productId,
      productName: item.productName,
      categoryLabel: item.categoryLabel,
      code: item.code,
      ...(item.estimatedKg === undefined ? {} : { estimatedKg: item.estimatedKg }),
    }));
  } catch {
    return [];
  }
}

export function saveQuotationCart(items: QuotationItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    const safeItems = items.slice(0, MAX_CART_ITEMS).filter(isQuotationItem);
    window.localStorage.setItem(STORAGE_KEYS.QUOTATION_CART, JSON.stringify(safeItems));
  } catch {
    // The cart still works in memory when storage is unavailable or full.
  }
}

/** Catalogue data is shipped with the build; it is not editable in the browser. */
export function getStoredProducts(): Product[] {
  return INITIAL_PRODUCTS;
}
