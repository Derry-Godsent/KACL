import React from 'react';
import { ArrowRight, Images, Newspaper } from 'lucide-react';
import { OfficialUpdates } from '../components/OfficialUpdates';
import { MediaGallery } from '../components/MediaGallery';
import { AGM_PHOTOS } from '../data/mediaGallery';

export type MediaSection = 'gallery' | 'news';

interface MediaViewProps {
  onNavigate: (view: string) => void;
  activeSection: MediaSection;
  onSectionChange: (section: MediaSection) => void;
}

const sections = [
  { id: 'gallery' as const, label: 'Photo gallery', icon: Images },
  { id: 'news' as const, label: 'News & updates', icon: Newspaper },
];

export const MediaView: React.FC<MediaViewProps> = ({ onNavigate, activeSection, onSectionChange }) => {
  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % sections.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + sections.length) % sections.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = sections.length - 1;
    else return;
    event.preventDefault();
    onSectionChange(sections[next].id);
    document.getElementById(`media-tab-${sections[next].id}`)?.focus();
  };

  return (
    <div className="media-page">
      <div className="page-width">
        <div className="media-intro">
          <span className="media-kicker">The KACL media centre</span>
          <h1>News &amp; media</h1>
          <p>Explore moments from across KACL and keep up with official food safety and industry news.</p>
        </div>
        <div className="media-section-tabs" role="tablist" aria-label="Media centre sections">
          {sections.map((section, index) => (
            <button
              key={section.id}
              id={`media-tab-${section.id}`}
              type="button"
              role="tab"
              aria-selected={activeSection === section.id}
              aria-controls={`media-panel-${section.id}`}
              tabIndex={activeSection === section.id ? 0 : -1}
              onClick={() => onSectionChange(section.id)}
              onKeyDown={event => handleTabKeyDown(event, index)}
            >
              <section.icon className="w-5 h-5" aria-hidden="true" />
              <span>{section.label}</span>
              {section.id === 'gallery' && <span className="media-tab-count">{AGM_PHOTOS.length}</span>}
            </button>
          ))}
        </div>

        {activeSection === 'gallery' ? (
          <section id="media-panel-gallery" role="tabpanel" aria-labelledby="media-tab-gallery" className="media-panel">
            <MediaGallery />
          </section>
        ) : (
          <section id="media-panel-news" role="tabpanel" aria-labelledby="media-tab-news" className="media-panel media-news-panel">
            <div className="media-section-heading">
              <div>
                <span className="media-kicker">From the regulators</span>
                <h2>News &amp; industry updates</h2>
              </div>
              <p>Official headlines, directly from the source.</p>
            </div>
            <p className="media-news-description">Read the latest from Ghana’s Food and Drugs Authority and Veterinary Services Department. Each article opens on the publisher’s own website.</p>
            <OfficialUpdates />
          </section>
        )}

        <section className="media-contact" aria-labelledby="media-contact-heading">
          <div>
            <span className="media-kicker">Get in touch</span>
            <h2 id="media-contact-heading">Media enquiries</h2>
            <p>Contact our team for photographs, interviews or further information about KACL.</p>
          </div>
          <button type="button" className="button-primary" onClick={() => onNavigate('contact')}>
            Contact KACL <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </section>
      </div>
    </div>
  );
};
