import React from 'react';
import { RetailOutlet } from '../types';

interface OutletsViewProps {
  outlets: RetailOutlet[];
  onNavigate: (view: string) => void;
}

export const OutletsView: React.FC<OutletsViewProps> = ({ outlets, onNavigate }) => (
  <div className="reports-page page-width">
    <header className="about-section-heading">
      <span className="about-kicker">Find KACL meat</span>
      <h1>Our Meat Outlets</h1>
      <p>Find our meat at the following locations. Contact our team for directions, opening hours and availability before visiting.</p>
    </header>
    <ol className="outlets-confirmed-list">
      {outlets.map((outlet, index) => (
        <li key={outlet.id}>
          <span className="about-kicker" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <h2>{outlet.name}</h2>
        </li>
      ))}
    </ol>
    <button type="button" className="button-primary" onClick={() => onNavigate('contact')}>Contact our team</button>
  </div>
);
