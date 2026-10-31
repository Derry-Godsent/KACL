import { HeroSlideshow } from "../components/HeroSlideshow";
import React from "react";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { QuotationItem } from "../lib/storage";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Product } from "../types";
import {
  KACL_COMPANY_INFO,
  KACL_ABATTOIR_SERVICES,
  KACL_MARKETING_CHANNELS,
} from "../data/initialData";
import {
  FlayingIcon,
  KraalIcon,
  SingeingIcon,
  CuttingIcon,
  RetailOutletIcon,
  BulkSalesIcon,
  DoorToDoorIcon,
  WalkInsIcon,
} from "../components/AbattoirIcons";

interface HomeViewProps {
  onNavigate: (view: string) => void;
  products: Product[];
  quotationItems: QuotationItem[];
  onOpenQuotationDrawer: () => void;
  onAddToQuotation: (product: Product, quantityKg?: number) => void;
  onOpenProductModal: (product: Product) => void;
}

const serviceIcons = [FlayingIcon, SingeingIcon, KraalIcon, CuttingIcon];
const channelIcons = [
  BulkSalesIcon,
  DoorToDoorIcon,
  RetailOutletIcon,
  WalkInsIcon,
];
const serviceCopy = [
  "Professional hide removal by trained butchers, with veterinary inspection for wholesomeness.",
  "LPG singeing, dressing and quartering by skilled butchers, with veterinary inspection.",
  "A livestock market where cattle, sheep and goats are offered for sale by independent sellers.",
  "Prime cuts prepared to table size or to your specific requirements.",
];
const ranges = [
  {
    id: "beef",
    name: "Beef products",
    detail: "From everyday cuts to fillet, brisket and oxtail.",
    number: "01",
  },
  {
    id: "processed",
    name: "Processed meat",
    detail: "Sausages, burgers, mince, bacon and ham.",
    number: "02",
  },
  {
    id: "chevon-mutton",
    name: "Chevon & mutton",
    detail: "Goat and sheep products, prepared for your kitchen.",
    number: "03",
  },
  {
    id: "pork",
    name: "Pork products",
    detail: "Chops, fillet, spare ribs and pork leg.",
    number: "04",
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  products,
  onAddToQuotation,
  onOpenProductModal,
  quotationItems,
  onOpenQuotationDrawer,
}) => {
  const whatsapp = `https://wa.me/${KACL_COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello%20KACL,%20I%20would%20like%20to%20enquire%20about%20meat%20supply.`;
  return (
    <div className="home-page">
      <HeroSlideshow>
        <div className="hero-copy">
          <span className="eyebrow">Home of Quality Meat</span>
          <h1>
            Kumasi Abattoir
            <br />
            Company Limited
          </h1>
          <p className="hero-description">
            Fresh, wholesome meat. Professional abattoir services. Serving
            Kumasi since 1999.
          </p>
          <div className="action-row">
            <button
              className="button-primary"
              onClick={() => onNavigate("products")}
            >
              Explore our products <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="button-secondary"
              onClick={() => onNavigate("services")}
            >
              Our abattoir services
            </button>
          </div>
        </div>
      </HeroSlideshow>

      <section className="trust-strip" aria-label="Our commitments">
        <div className="page-width trust-grid">
          <div>
            <ShieldCheck className="w-7 h-7" />
            <span>
              <strong>Veterinary inspected</strong>
              <small>Scrutiny by Veterinary Doctors</small>
            </span>
          </div>
          <div>
            <CuttingIcon className="w-7 h-7" />
            <span>
              <strong>Prepared to your needs</strong>
              <small>Prime cuts and custom sizes</small>
            </span>
          </div>
          <div>
            <Truck className="w-7 h-7" />
            <span>
              <strong>Bulk supply & delivery</strong>
              <small>For businesses and institutions</small>
            </span>
          </div>
        </div>
      </section>

      <section className="home-section page-width">
        <div className="section-heading">
          <div>
            <span className="eyebrow section-subheading">
              From our butcher counter
            </span>
            <h2>Good meat. A cut for every need.</h2>
          </div>
          <button className="text-link" onClick={() => onNavigate("products")}>
            Browse all {products.length} products{" "}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="range-grid">
          {ranges.map((range) => (
            <button
              className="range-tile"
              key={range.id}
              onClick={() => onNavigate(`products:${range.id}`)}
            >
              <span className="range-number">
                {range.number} /{" "}
                {products.filter((p) => p.category === range.id).length}{" "}
                products
              </span>
              <h3>{range.name}</h3>
              <p>{range.detail}</p>
              <span className="text-link">
                Explore range <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          ))}
        </div>
        <FeaturedProducts
          products={products}
          items={quotationItems}
          onAdd={onAddToQuotation}
          onDetails={onOpenProductModal}
          onReview={onOpenQuotationDrawer}
        />
      </section>

      <section className="services-section">
        <div className="page-width home-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                Experienced hands. Professional care.
              </span>
              <h2>More than a meat supplier.</h2>
            </div>
            <p>
              From livestock to your preferred cut, our services put health,
              safety and your requirements first.
            </p>
          </div>
          <div className="service-grid">
            {KACL_ABATTOIR_SERVICES.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <div key={service.id} className="service-tile">
                  <Icon className="w-10 h-10" />
                  <h3>{service.name}</h3>
                  <p>{serviceCopy[index]}</p>
                  <button
                    className="text-link"
                    onClick={() => onNavigate(`services:${service.id}`)}
                    aria-label={`Learn about ${service.name}`}
                  >
                    About this service <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-section page-width about-preview">
        <div>
          <span className="eyebrow section-subheading">Why choose KACL</span>
          <h2>
            Quality is our business.
            <br />
            Your confidence matters.
          </h2>
          <button className="text-link" onClick={() => onNavigate("about")}>
            Get to know KACL <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div>
          <p>
            Established in 1993 and operating since July 1999, Kumasi Abattoir
            Company Limited produces fresh, wholesome meat for public
            consumption.
          </p>
          <p>
            Our trained butchers slaughter and dress cattle, sheep, goats and
            pigs under the scrutiny of Veterinary Doctors, who inspect carcasses
            for wholesomeness.
          </p>
          <button
            className="text-link"
            onClick={() => onNavigate("food-safety")}
          >
            Our approach to food safety <ShieldCheck className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section className="supply-section">
        <div className="page-width home-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">For your home. For your business.</span>
              <h2>
                However you buy,
                <br />
                we're here to serve you.
              </h2>
            </div>
            <a
              className="button-light"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <MessageSquare className="w-4 h-4" />
              Talk to our sales team
            </a>
          </div>
          <div className="channel-grid">
            {KACL_MARKETING_CHANNELS.map((channel, index) => {
              const Icon = channelIcons[index];
              return (
                <div key={channel.id}>
                  <Icon className="w-8 h-8" />
                  <h3>{channel.title}</h3>
                  <p>{channel.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-width visit-section">
        <div>
          <span className="eyebrow">Visit us in Kumasi</span>
          <h2>Let's talk quality meat.</h2>
          <p>
            Kaase Industrial Area · Digital address{" "}
            {KACL_COMPANY_INFO.ghanaPostAddress}
          </p>
        </div>
        <div className="visit-actions">
          <a
            className="button-secondary"
            href={`tel:${KACL_COMPANY_INFO.primaryPhone}`}
          >
            <Phone className="w-4 h-4" />
            {KACL_COMPANY_INFO.primaryPhone}
          </a>
          <button
            className="button-primary"
            onClick={() => onNavigate("contact")}
          >
            Contact us <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
