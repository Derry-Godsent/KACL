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
  role: string;
  name: string;
  affiliation?: string;
}

export interface ManagementMember {
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

export interface CustomerInquiry {
  id: string;
  referenceNumber: string;
  createdAt: string;
  inquiryType: InquiryType;
  fullName: string;
  organizationName?: string;
  email: string;
  phoneNumber: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';
  deliveryLocation?: string;
  requestedProducts?: {
    productId: string;
    productName: string;
    estimatedKg?: number;
  }[];
  notes: string;
  status: 'new' | 'reviewed' | 'quoted' | 'fulfilled' | 'archived';
  internalNotes?: string;
  assignedStaff?: string;
}

export interface StaffUser {
  id: string;
  username: string;
  fullName: string;
  role: 'super_admin' | 'sales_manager' | 'quality_inspector' | 'content_editor';
  email: string;
  lastLogin?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  targetCollection: string;
  details: string;
}
