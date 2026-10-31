/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProductCategory = 
  | 'beef'
  | 'processed'
  | 'chevon-mutton'
  | 'pork';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  code: string;
  description: string;
  packagingType: string;
  storageRequirement: string;
  inspectionStatus: string;
  imageUrl: string;
  inStock: boolean;
}

export interface BoardMember {
  /** Optional approved portrait. Missing or failed images use a monogram. */
  portraitUrl?: string;
  role: string;
  name: string;
  affiliation?: string;
}

export interface ManagementMember {
  /** Optional approved portrait. Missing or failed images use a monogram. */
  portraitUrl?: string;
  position: string;
  name: string;
  department: string;
}

export interface MediaItem {
  id: string;
  type: 'notice' | 'press_release' | 'news' | 'gallery';
  title: string;
  date: string;
  summary: string;
  content?: string;
  imageUrl?: string;
}

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  shortDescription: string;
  detailedProcess: string[];
  capacityOrSpecs: string;
  veterinaryOversight: string;
  intendedClients: string;
}

export interface RetailOutlet {
  id: string;
  name: string;
  locationArea: string;
  ghanaPostAddress: string;
  landmark: string;
  phoneNumber: string;
  operatingHours: string;
  cutsAvailable: string;
  deliveryPickupAvailable: boolean;
}

export interface PublicNotice {
  id: string;
  title: string;
  date: string;
  category: 'Operational' | 'Holiday Schedule' | 'Veterinary Notice' | 'Public Announcement';
  summary: string;
  fullText: string;
  isImportant?: boolean;
}

export type InquiryType = 'quotation' | 'bulk_institutional' | 'contract_slaughter' | 'general';
