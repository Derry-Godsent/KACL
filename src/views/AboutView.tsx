import React from "react";
import {
  KACL_COMPANY_INFO,
  KACL_CORE_VALUES,
  KACL_BOARD_MEMBERS,
  KACL_MANAGEMENT,
  KACL_DEPARTMENTS,
} from "../data/initialData";
import { LeadershipPortrait } from "../components/LeadershipPortrait";

interface AboutViewProps {
  onNavigate: (view: string) => void;
}

const milestones = [
  {
    date: "1993",
    title: "Our beginning",
    text: "Incorporated with a mission to produce hygienic meat for public consumption.",
  },
  {
    date: "22 September 1994",
    title: "Ready for business",
    text: "Issued with the Certificate to Commence Business.",
  },
  {
    date: "July 1999",
    title: "Operations begin",
    text: "KACL begins actual operations in Kumasi.",
  },
];

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => (
  <div className="about-page">
    <div className="page-width">
      <div className="about-intro">
        <span className="about-kicker">Get to know KACL</span>
        <h1>
          Quality meat.
          <br />A lasting commitment.
        </h1>
        <p>
          Kumasi Abattoir Company Limited was established to produce fresh,
          wholesome and hygienic meat for public consumption.
        </p>
      </div>

      <section className="about-story" aria-labelledby="about-story-heading">
        <div className="about-section-heading">
          <span className="about-kicker">Our story</span>
          <h2 id="about-story-heading">Rooted in Kumasi since 1993.</h2>
          <p>
            From incorporation to the start of operations, our purpose has
            remained the same: quality meat and excellent customer care.
          </p>
        </div>
        <ol className="about-milestones">
          {milestones.map((milestone) => (
            <li key={milestone.date}>
              <span>{milestone.date}</span>
              <h3>{milestone.title}</h3>
              <p>{milestone.text}</p>
            </li>
          ))}
        </ol>
        <details open className="about-mandate">
          <summary>
            Our lines of business under Company Code 1963 (Act 179)
          </summary>
          <ul>
            {KACL_COMPANY_INFO.linesOfBusiness.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </details>
      </section>

      <section className="about-purpose" aria-label="Our vision and mission">
        <div>
          <span className="about-kicker">Where we're going</span>
          <h2>Our vision</h2>
          <p>{KACL_COMPANY_INFO.vision}</p>
        </div>
        <div>
          <span className="about-kicker">What drives us</span>
          <h2>Our mission</h2>
          <p>{KACL_COMPANY_INFO.mission}</p>
        </div>
      </section>

      <section className="about-values" aria-labelledby="about-values-heading">
        <div className="about-section-heading">
          <span className="about-kicker">The way we work</span>
          <h2 id="about-values-heading">Our values,<br />every day.</h2>
          <p>The principles behind our work, our relationships and the quality we stand for.</p>
        </div>
        <ol className="about-values-list">
          {KACL_CORE_VALUES.map((value, index) => (
            <li key={value.name}>
              <span className="about-value-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{value.name}</h3>
                <p>{value.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-board" aria-labelledby="about-board-heading">
        <div className="about-section-heading">
          <span className="about-kicker">Leadership & governance</span>
          <h2 id="about-board-heading">Board of Directors</h2>
          <p>The people guiding KACL's direction and accountability.</p>
        </div>
        <div className="board-portrait-grid">
          {[...KACL_BOARD_MEMBERS]
            .sort((a, b) => Number(Boolean(b.portraitUrl)) - Number(Boolean(a.portraitUrl)))
            .map((member) => (
            <article className="board-profile" key={member.name}>
              <LeadershipPortrait
                name={member.name}
                portraitUrl={member.portraitUrl}
              />
              <div className="board-profile-info">
                <span>{member.role}</span>
                <h3>{member.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="about-management"
        aria-labelledby="about-management-heading"
      >
        <div className="about-section-heading">
          <span className="about-kicker">The team behind our operations</span>
          <h2 id="about-management-heading">Executive Management</h2>
          <p>
            Working together across production, administration, finance and
            customer service.
          </p>
        </div>
        <div className="management-profile-grid">
          {KACL_MANAGEMENT.map((member) => (
            <article className="management-profile" key={member.name}>
              <LeadershipPortrait
                name={member.name}
                portraitUrl={member.portraitUrl}
                compact
              />
              <div>
                <span>{member.position}</span>
                <h3>{member.name}</h3>
                <p>{member.department}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="about-departments"
        aria-labelledby="about-departments-heading"
      >
        <div>
          <h2 id="about-departments-heading">One company. Many strengths.</h2>
          <p>Our departments work together to keep KACL moving.</p>
        </div>
        <ul>
          {KACL_DEPARTMENTS.map((department) => (
            <li key={department}>{department}</li>
          ))}
        </ul>
      </section>
      <section className="about-contact">
        <div>
          <h2>Get to know us through our work.</h2>
          <p>Explore our abattoir services or speak with our team.</p>
        </div>
        <div>
          <button
            type="button"
            className="button-primary"
            onClick={() => onNavigate("services")}
          >
            Explore our services
          </button>
          <button
            type="button"
            className="button-secondary"
            onClick={() => onNavigate("contact")}
          >
            Contact KACL
          </button>
        </div>
      </section>
    </div>
  </div>
);
