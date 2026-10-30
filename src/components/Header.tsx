import React, { useEffect, useRef, useState } from "react";
import {
  ShoppingBag,
  Menu,
  X,
  Phone,
  ArrowRight,
  Clock,
} from "lucide-react";
import { KACL_COMPANY_INFO } from "../data/initialData";
import { QuotationItem } from "../lib/storage";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  quotationItems: QuotationItem[];
  onOpenQuotationDrawer: () => void;
}

const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Our Services" },
  { id: "products", label: "Products" },
  { id: "media", label: "Media" },
  { id: "about", label: "About KACL" },
  { id: "contact", label: "Contact Us" },
];

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  quotationItems,
  onOpenQuotationDrawer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const isActive = (id: string) =>
    currentView === id || (id === "services" && currentView === "marketing");
  const handleNavigate = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };
  const openCart = () => {
    setMobileMenuOpen(false);
    onOpenQuotationDrawer();
  };


  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const rows = Array.from(header.children).filter(element =>
      element.classList.contains('nav-utility') || element.classList.contains('nav-main')
    );
    const measure = () => {
      // Reserve only the permanent navigation rows. Opening the mobile menu
      // overlays the page instead of pushing content down.
      const height = rows.reduce((total, row) => total + row.getBoundingClientRect().height, 0);
      if (height > 0) {
        spacerRef.current?.style.setProperty('height', `${height}px`);
        header.style.setProperty('--site-header-height', `${height}px`);
      }
    };
    measure();
    const resize = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    rows.forEach(row => resize?.observe(row));
    window.addEventListener('resize', measure);
    return () => { resize?.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  useEffect(() => {
    let frame: number | null = null;
    const update = () => { setScrolled(window.scrollY > 16); frame = null; };
    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentView]);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const focusFrame = window.requestAnimationFrame(() =>
      (menuRef.current?.querySelector<HTMLButtonElement>('button[aria-current="page"]') ?? menuRef.current?.querySelector<HTMLButtonElement>('button'))?.focus(),
    );
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node))
        setMobileMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1120px)");
    const onResize = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };
    onResize();
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    desktop.addEventListener("change", onResize);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      desktop.removeEventListener("change", onResize);
    };
  }, [mobileMenuOpen]);

  return (
    <>
    <div className="site-header-spacer" ref={spacerRef} aria-hidden="true" />
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} ref={headerRef}>
      <div className="nav-utility">
        <div className="page-width nav-utility-inner">
          <div className="nav-utility-about">
            <span>Home of Quality Meat</span>
            <span className="nav-utility-location">
              Kumasi · {KACL_COMPANY_INFO.ghanaPostAddress}
            </span>
          </div>
          <div className="nav-utility-actions">
            <span className="nav-utility-hours" aria-label="Opening hours">
              <Clock className="w-3 h-3" aria-hidden="true" />
              <span>Mon-Fri: 8am - 5pm</span>
              <span aria-hidden="true">·</span>
              <span>Sat: 8am - 4pm</span>
              <span aria-hidden="true">·</span>
              <span>Sun: 8am - 2pm</span>
            </span>
            <a
              href={`tel:${KACL_COMPANY_INFO.primaryPhone.replace(/\s/g, "")}`}
            >
              <Phone className="w-3 h-3" aria-hidden="true" />
              {KACL_COMPANY_INFO.primaryPhone}
            </a>
          </div>
        </div>
      </div>

      <div className="page-width nav-main">
        <button
          type="button"
          className="nav-brand"
          onClick={() => handleNavigate("home")}
          aria-label="Kumasi Abattoir Company Limited home"
        >
          <img
            className="nav-brand-logo"
            src="/images/brand/kacl-logo.png"
            alt="Kumasi Abattoir Company Limited logo"
            width={60}
            height={60}
          />
          <span className="nav-brand-name">
            <strong>Kumasi Abattoir</strong>
            <span>Company Limited</span>
          </span>
        </button>
        <nav className="nav-desktop" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              aria-current={isActive(link.id) ? "page" : undefined}
              onClick={() => handleNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="nav-main-actions">
          <button
            type="button"
            className="nav-cart"
            onClick={openCart}
            aria-label={`Open quote cart, ${quotationItems.length} ${quotationItems.length === 1 ? "product" : "products"}`}
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            <span className="nav-cart-text">Quote cart</span>
            <span className="nav-cart-count" aria-hidden="true">
              {quotationItems.length}
            </span>
          </button>
          <button
            type="button"
            ref={toggleRef}
            className="nav-menu-toggle"
            aria-label="Toggle navigation menu"
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          ref={menuRef}
          className="nav-mobile"
          aria-label="Mobile navigation"
        >
          <div className="page-width nav-mobile-content">
            <span className="nav-mobile-label">Explore KACL</span>
            <div className="nav-mobile-links">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  aria-current={isActive(link.id) ? "page" : undefined}
                  onClick={() => handleNavigate(link.id)}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="nav-mobile-contact">
              <div>
                <span>Need a hand?</span>
                <a
                  href={`tel:${KACL_COMPANY_INFO.salesHotline.replace(/\s/g, "")}`}
                >
                  <Phone className="w-4 h-4" />
                  {KACL_COMPANY_INFO.salesHotline}
                </a>
              </div>
            </div>
            <button
              type="button"
              className="nav-mobile-cart"
              onClick={openCart}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Review your quote cart</span>
              <span className="nav-cart-count">{quotationItems.length}</span>
            </button>
          </div>
        </nav>
      )}
    </header>
    </>
  );
};
