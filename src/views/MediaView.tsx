import React from 'react';
import { ArrowRight } from 'lucide-react';
import { OfficialUpdates } from '../components/OfficialUpdates';

interface MediaViewProps {
  onNavigate: (view: string) => void;
}

export const MediaView: React.FC<MediaViewProps> = ({ onNavigate }) => (
  <div className="media-page">
    <div className="page-width">
      <div className="media-intro">
        <span className="media-kicker">Food safety &amp; industry information</span>
        <h1>News &amp; media</h1>
        <p>Updates from the Food and Drugs Authority and Veterinary Services Department.</p>
      </div>
      <OfficialUpdates />
      <section className="media-contact">
        <div>
          <span className="media-kicker">Get in touch</span>
          <h2>Media enquiries</h2>
          <p>Contact our team for media enquiries about KACL.</p>
        </div>
        <button type="button" className="button-primary" onClick={() => onNavigate('contact')}>
          Contact KACL <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  </div>
);
