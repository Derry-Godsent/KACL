import React, { useState } from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import {
  KACL_ABATTOIR_SERVICES,
  KACL_MARKETING_CHANNELS,
  KACL_COMPANY_INFO,
} from "../data/initialData";
import { AbattoirProcessAnimation } from "../components/AbattoirProcessAnimation";
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

interface ServicesViewProps {
  initialTab?: "abattoir" | "marketing";
  onNavigate: (view: string) => void;
}

const serviceIcons = [FlayingIcon, SingeingIcon, KraalIcon, CuttingIcon];
const channelIcons = [
  BulkSalesIcon,
  DoorToDoorIcon,
  RetailOutletIcon,
  WalkInsIcon,
];
const serviceSummaries = [
  "Professional hide removal by trained butchers, with veterinary inspection.",
  "LPG singeing, dressing and quartering, carried out by skilled butchers.",
  "A livestock market for buying cattle, sheep and goats from independent sellers.",
  "Meat prepared to table size or cut to your specific requirements.",
];
const channelSummaries = [
  "Bulk meat delivered to hotels, restaurants and other culinary businesses.",
  "Branded cold vans serving individuals at KNUST, KATH and other institutions.",
  "Meat available through shops with KACL freezers, including Poku Trading.",
  "Buy directly from our butcher counter at the company premises in Kumasi.",
];

export const ServicesView: React.FC<ServicesViewProps> = ({
  onNavigate,
  initialTab = "abattoir",
}) => {
  const [activeTab, setActiveTab] = useState<"abattoir" | "marketing">(
    initialTab,
  );
  const isAbattoir = activeTab === "abattoir";

  return (
    <div className="services-page">
      <div className="page-width">
        <header className="services-intro">
          <span className="services-kicker">Care in every step</span>
          <h1>Our services</h1>
          <p>
            Professional meat processing and supply, shaped around what you
            need.
          </p>
        </header>

        <div
          className="services-switch"
          role="group"
          aria-label="Choose a service group"
        >
          <button
            type="button"
            aria-pressed={isAbattoir}
            aria-controls="services-content"
            onClick={() => setActiveTab("abattoir")}
          >
            Abattoir services
          </button>
          <button
            type="button"
            aria-pressed={!isAbattoir}
            aria-controls="services-content"
            onClick={() => setActiveTab("marketing")}
          >
            Meat supply & sales
          </button>
        </div>

        <section
          id="services-content"
          aria-label={
            isAbattoir ? "Abattoir services" : "Meat supply and sales"
          }
        >
          <div className="services-section-intro">
            <h2>
              {isAbattoir
                ? "From livestock to your preferred cut."
                : "Four ways to buy from KACL."}
            </h2>
            <p>
              {isAbattoir
                ? "Trained butchers. Veterinary inspection. A focus on wholesome meat."
                : "For your home, your kitchen or your business."}
            </p>
          </div>

          <div className="services-card-grid">
            {isAbattoir
              ? KACL_ABATTOIR_SERVICES.map((service, index) => {
                  const Icon = serviceIcons[index];
                  return (
                    <article
                      className="services-card"
                      key={service.id}
                      id={service.id}
                      tabIndex={-1}
                      aria-label={service.name}
                    >
                      <div className="services-icon">
                        <Icon className="w-10 h-10" />
                      </div>
                      <h3>{service.name}</h3>
                      <p>{serviceSummaries[index]}</p>
                      <details open className="services-explanation">
                        <summary>How it works</summary>
                        <p>{service.description}</p>
                      </details>
                      <button
                        type="button"
                        className="services-card-action"
                        onClick={() => onNavigate("contact")}
                      >
                        Enquire about {service.name.toLowerCase()}{" "}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </article>
                  );
                })
              : KACL_MARKETING_CHANNELS.map((channel, index) => {
                  const Icon = channelIcons[index];
                  return (
                    <article className="services-card" key={channel.id}>
                      <div className="services-icon">
                        <Icon className="w-10 h-10" />
                      </div>
                      <h3>{channel.title}</h3>
                      <p>{channelSummaries[index]}</p>
                      <button
                        type="button"
                        className="services-card-action"
                        onClick={() => onNavigate("contact")}
                      >
                        Enquire about {channel.title.toLowerCase()}{" "}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </article>
                  );
                })}
          </div>
        </section>

        {isAbattoir && (
          <details open className="services-process">
            <summary>
              <span>
                <strong>See our processing in motion</strong>
                <small>Explore the animated abattoir process.</small>
              </span>
              <span className="services-process-toggle" aria-hidden="true" />
            </summary>
            <div className="services-animation">
              <AbattoirProcessAnimation initialMode="processing-line" />
            </div>
          </details>
        )}

        <section
          className="services-help"
          aria-labelledby="services-help-heading"
        >
          <div>
            <span className="services-kicker">Let's make it simple</span>
            <h2 id="services-help-heading">Not sure where to start?</h2>
            <p>
              Tell our team what you need. We'll help you choose the right
              service.
            </p>
          </div>
          <div className="services-help-actions">
            <a
              className="button-primary"
              href={`https://wa.me/${KACL_COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello KACL, I would like to enquire about your " + (isAbattoir ? "abattoir services." : "meat supply and sales."))}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageSquare className="w-4 h-4" />
              Chat with our team
            </a>
            <button
              type="button"
              className="services-contact"
              onClick={() => onNavigate("contact")}
            >
              Contact us <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
        <details open className="services-hours">
          <summary>View opening hours</summary>
          <div>
            <p>{KACL_COMPANY_INFO.workingHoursText.monFri}</p>
            <p>{KACL_COMPANY_INFO.workingHoursText.sat}</p>
            <p>{KACL_COMPANY_INFO.workingHoursText.sun}</p>
          </div>
        </details>
      </div>
    </div>
  );
};
