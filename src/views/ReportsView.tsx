import React from 'react';

const reports = [
  {
    title: '2025 Annual Report and Audited Financial Statements',
    description: 'Annual report and financial statements for the year ended 31 December 2025.',
    metadata: 'PDF · 27 pages · approximately 5.5 MB',
    href: '/documents/kacl-annual-report-2025.pdf',
    cover: '/images/reports/kacl-annual-report-2025.webp',
    coverHeight: 1028,
  },
  {
    title: 'Right to Information Manual',
    description: 'Information about KACL, its departments, and procedures for requesting access to information under the Right to Information Act, 2019 (Act 989).',
    metadata: 'PDF · 18 pages · approximately 589 KB',
    href: '/documents/kacl-right-to-information-manual.pdf',
    cover: '/images/reports/kacl-right-to-information-manual.webp',
    coverHeight: 932,
  },
];

export const ReportsView: React.FC = () => (
  <div className="reports-page page-width">
    <header className="about-section-heading">
      <span className="about-kicker">Public information</span>
      <h1>Reports &amp; publications</h1>
      <p>Access KACL’s annual report, financial statements and Right to Information Manual.</p>
    </header>
    <div className="reports-grid">
      {reports.map(report => (
        <article className="report-card" key={report.href}>
          <a className="report-cover" href={report.href} aria-label={`View ${report.title} PDF`}>
            <img src={report.cover} alt={`Cover of ${report.title}`} width={720} height={report.coverHeight} loading="eager" decoding="async" />
            <span className="report-cover-label" aria-hidden="true">PDF</span>
          </a>
          <p className="report-metadata">{report.metadata}</p>
          <h2>{report.title}</h2>
          <p>{report.description}</p>
          <div className="report-actions">
            <a className="button-primary" href={report.href} aria-label={`View ${report.title} PDF`}>View PDF</a>
            <a className="button-secondary" href={report.href} download={report.href.split('/').pop()}>Download PDF<span className="sr-only">: {report.title}</span></a>
          </div>
        </article>
      ))}
    </div>
  </div>
);
