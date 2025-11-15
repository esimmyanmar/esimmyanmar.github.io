import React from 'react';
import { CompanyProfileLayout } from '../graph-toolkit/mgt-components';

interface CompanyPageProps {
  title: string;
  description: string;
  content: React.ReactNode;
  showTeam?: boolean;
  showFiles?: boolean;
  showEvents?: boolean;
}

export const CompanyPageTemplate: React.FC<CompanyPageProps> = ({
  title,
  description,
  content,
  showTeam = false,
  showFiles = false,
  showEvents = false
}) => {
  return (
    <CompanyProfileLayout 
      showSearch={true} 
      showTeam={showTeam} 
      showFiles={showFiles} 
      showEvents={showEvents}
    >
      <div className="page-header glass-card">
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      
      <div className="page-content">
        {content}
      </div>
      
      <div className="page-footer glass-card">
        <div className="contact-info">
          <span>esim.com.mm</span>
          <span>info@esim.com.mm</span>
          <span>09650000172</span>
          <span>@eSIMMyanmar</span>
        </div>
      </div>
    </CompanyProfileLayout>
  );
};

export const NetworkStatusCard: React.FC<{region: string; coverage: number; speed: {download: number; upload: number; latency: number}}> = ({
  region, coverage, speed
}) => (
  <div className="network-card glass-card">
    <div className="region-name">{region}</div>
    <div className="coverage-meter">
      <div className="meter-bar">
        <div className="meter-fill" style={{width: `${coverage}%`}}></div>
      </div>
      <div className="coverage-text">{coverage}% Coverage</div>
    </div>
    <div className="speed-stats">
      <div className="speed-item">
        <span className="speed-label">Download</span>
        <span className="speed-value">{speed.download} Mbps</span>
      </div>
      <div className="speed-item">
        <span className="speed-label">Upload</span>
        <span className="speed-value">{speed.upload} Mbps</span>
      </div>
      <div className="speed-item">
        <span className="speed-label">Latency</span>
        <span className="speed-value">{speed.latency}ms</span>
      </div>
    </div>
  </div>
);

export const FeatureCard: React.FC<{title: string; description: string; icon: string}> = ({
  title, description, icon
}) => (
  <div className="feature-card glass-card">
    <div className="feature-icon">{icon}</div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

export const CertificationBadge: React.FC<{name: string; issuer: string; date: string}> = ({
  name, issuer, date
}) => (
  <div className="cert-badge glass-card">
    <div className="cert-name">{name}</div>
    <div className="cert-issuer">{issuer}</div>
    <div className="cert-date">{date}</div>
  </div>
);