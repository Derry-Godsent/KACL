/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { QuotationDrawer } from './components/QuotationDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';

// Views
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { FoodSafetyView } from './views/FoodSafetyView';
import { ProductsView } from './views/ProductsView';
import { BulkSupplyView } from './views/BulkSupplyView';
import { OutletsView } from './views/OutletsView';
import { DeliveryView } from './views/DeliveryView';
import { NoticesView } from './views/NoticesView';
import { ContactView } from './views/ContactView';
import { PoliciesView } from './views/PoliciesView';
import { StaffCmsView } from './views/StaffCmsView';
import { MediaView } from './views/MediaView';

// Data & Storage
import {
  getStoredProducts,
  getStoredServices,
  getStoredOutlets,
  getStoredNotices,
  saveStoredNotices,
  getStoredInquiries,
  saveStoredInquiries,
  getStoredAuditLogs,
  addAuditLog,
  getQuotationCart,
  saveQuotationCart,
  QuotationItem
} from './lib/storage';
import { Product, CustomerInquiry, PublicNotice } from './types';
import { resolveNavigation } from './lib/navigation';
import { useSiteMotion } from './lib/useSiteMotion';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  useSiteMotion(currentView);
  const [productCategory, setProductCategory] = useState('all');
  const [navigationRequest, setNavigationRequest] = useState<{ targetId: string | null } | null>(null);
  const [products, setProducts] = useState<Product[]>(getStoredProducts());
  const [services] = useState(getStoredServices());
  const [outlets] = useState(getStoredOutlets());
  const [notices, setNotices] = useState<PublicNotice[]>(getStoredNotices());
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(getStoredInquiries());
  const [auditLogs, setAuditLogs] = useState(getStoredAuditLogs());

  // Interactive overlays
  const [quotationItems, setQuotationItems] = useState<QuotationItem[]>(getQuotationCart());
  const [isQuotationDrawerOpen, setIsQuotationDrawerOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isStaffPortalOpen, setIsStaffPortalOpen] = useState(false);

  // Sync quotation cart changes to localStorage
  useEffect(() => {
    saveQuotationCart(quotationItems);
  }, [quotationItems]);

  // Wait for the destination view to mount before locating its section.
  useEffect(() => {
    if (!navigationRequest) return;
    const frame = window.requestAnimationFrame(() => {
      const target = navigationRequest.targetId
        ? document.getElementById(navigationRequest.targetId)
        : null;
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
      const top = target
        ? Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - 20)
        : 0;
      target?.focus({ preventScroll: true });
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top, behavior: reducedMotion ? 'instant' : 'smooth' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [navigationRequest]);

  const handleNavigate = (destination: string) => {
    const route = resolveNavigation(destination);
    if (route.category !== null) setProductCategory(route.category);
    setCurrentView(route.view);
    setNavigationRequest({ targetId: route.targetId });
  };

  const handleAddToQuotation = (product: Product, quantityKg: number = 20) => {
    setQuotationItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id
            ? { ...i, estimatedKg: (i.estimatedKg || 0) + quantityKg }
            : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          categoryLabel: product.categoryLabel,
          code: product.code,
          estimatedKg: quantityKg
        }
      ];
    });
  };

  const handleUpdateQuotationQuantity = (productId: string, newKg: number) => {
    setQuotationItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, estimatedKg: newKg } : item
      )
    );
  };

  const handleRemoveQuotationItem = (productId: string) => {
    setQuotationItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleClearQuotation = () => {
    setQuotationItems([]);
  };

  const handleNewInquirySubmitted = (newInquiry: CustomerInquiry) => {
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    saveStoredInquiries(updated);
    addAuditLog(
      'INQUIRY_RECEIVED',
      'inquiries',
      `New enquiry lodged by ${newInquiry.fullName} (${newInquiry.referenceNumber})`,
      'web_inbound'
    );
    setAuditLogs(getStoredAuditLogs());
  };

  const handleUpdateInquiryStatus = (
    inquiryId: string,
    newStatus: CustomerInquiry['status'],
    internalNotes?: string
  ) => {
    const updated = inquiries.map((inq) =>
      inq.id === inquiryId
        ? { ...inq, status: newStatus, internalNotes: internalNotes ?? inq.internalNotes }
        : inq
    );
    setInquiries(updated);
    saveStoredInquiries(updated);
    setAuditLogs(getStoredAuditLogs());
  };

  const handleAddNotice = (notice: PublicNotice) => {
    const updated = [notice, ...notices];
    setNotices(updated);
    saveStoredNotices(updated);
    setAuditLogs(getStoredAuditLogs());
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updated = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7fbff] text-[#0C141D]">
      {/* Global Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:p-3 focus:bg-white focus:text-[#0756a3] focus:font-bold focus:shadow"
      >
        Skip to main content
      </a>

      {/* Main Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        quotationItems={quotationItems}
        onOpenQuotationDrawer={() => setIsQuotationDrawerOpen(true)}
        onOpenStaffPortal={() => setIsStaffPortalOpen(true)}
      />

      {/* Primary Page Content */}
      <main id="main-content" className="flex-1">
        {currentView === 'home' && (
          <HomeView
            quotationItems={quotationItems}
            onOpenQuotationDrawer={() => setIsQuotationDrawerOpen(true)}
            onNavigate={handleNavigate}
            products={products}
            onAddToQuotation={handleAddToQuotation}
            onOpenProductModal={(p) => setActiveProductModal(p)}
          />
        )}

        {currentView === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {(currentView === 'services' || currentView === 'marketing') && (
          <ServicesView key={currentView} initialTab={currentView === 'marketing' ? 'marketing' : 'abattoir'} onNavigate={handleNavigate} />
        )}

        {currentView === 'products' && (
          <ProductsView
            quotationItems={quotationItems}
            key={productCategory}
            initialCategory={productCategory}
            products={products}
            onAddToQuotation={handleAddToQuotation}
            onOpenProductModal={(p) => setActiveProductModal(p)}
            onOpenQuotationDrawer={() => setIsQuotationDrawerOpen(true)}
            quotationItemCount={quotationItems.length}
          />
        )}

        {currentView === 'food-safety' && <FoodSafetyView onNavigate={handleNavigate} />}

        {currentView === 'media' && (
          <MediaView onNavigate={handleNavigate} />
        )}

        {currentView === 'contact' && (
          <ContactView
            quotationItems={quotationItems}
            onSubmitInquiry={handleNewInquirySubmitted}
            onClearQuotationItems={handleClearQuotation}
          />
        )}

        {currentView === 'privacy-policy' && (
          <PoliciesView initialTab="privacy" onNavigate={handleNavigate} />
        )}

        {currentView === 'refund-policy' && (
          <PoliciesView initialTab="refund" onNavigate={handleNavigate} />
        )}
      </main>

      {/* Quotation / RFQ Drawer */}
      <QuotationDrawer
        isOpen={isQuotationDrawerOpen}
        onClose={() => setIsQuotationDrawerOpen(false)}
        items={quotationItems}
        onUpdateQuantity={handleUpdateQuotationQuantity}
        onRemoveItem={handleRemoveQuotationItem}
        onClearAll={handleClearQuotation}
        onProceedToForm={() => {
          setIsQuotationDrawerOpen(false);
          handleNavigate('contact');
        }}
      />

      {/* Product Detailed Specification Modal */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onAddToQuotation={handleAddToQuotation}
      />

      {/* Protected Staff CMS Portal Modal */}
      {isStaffPortalOpen && (
        <StaffCmsView
          onClose={() => setIsStaffPortalOpen(false)}
          inquiries={inquiries}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          products={products}
          onUpdateProduct={handleUpdateProduct}
          notices={notices}
          onAddNotice={handleAddNotice}
          outlets={outlets}
          auditLogs={auditLogs}
        />
      )}

      <BackToTop hidden={isQuotationDrawerOpen || activeProductModal !== null || isStaffPortalOpen} />

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenStaffPortal={() => setIsStaffPortalOpen(true)}
      />
    </div>
  );
}
