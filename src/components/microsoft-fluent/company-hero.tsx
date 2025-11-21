import React from 'react';

interface CompanyHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaAction?: () => void;
}

export const CompanyHero: React.FC<CompanyHeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText,
  ctaAction
}) => {
  return (
    <section className="company-hero">
      <div className="hero-background">
        <div className="pearl-glass-overlay"></div>
        <div className="dynamic-island-header">
          <div className="island-content">
            <span className="status-indicator online"></span>
            <span className="network-status">98.5% Coverage</span>
          </div>
        </div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">{title}</h1>
          <h2 className="hero-subtitle">{subtitle}</h2>
          <p className="hero-description">{description}</p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">2M+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98.5%</div>
              <div className="stat-label">Coverage</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>

          {ctaText && (
            <button className="hero-cta-button" onClick={ctaAction}>
              {ctaText}
            </button>
          )}
        </div>

        <div className="hero-visual">
          <div className="esim-card-3d">
            <div className="card-front">
              <div className="esim-chip"></div>
              <div className="card-text">
                <div className="card-title">eSIM Myanmar</div>
                <div className="card-subtitle">Enterprise Grade</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-footer">
        <div className="contact-info">
          <span>esim.com.mm</span>
          <span>info@esim.com.mm</span>
          <span>09650000172</span>
          <span>@eSIMMyanmar</span>
        </div>
      </div>
    </section>
  );
};

export const CompanyProfileFlyer: React.FC = () => {
  return (
    <div className="company-profile-flyer">
      <div className="flyer-header">
        <div className="company-logo">
          <div className="logo-icon"></div>
          <div className="logo-text">
            <div className="company-name">eSIM MYANMAR</div>
            <div className="company-tagline">Enterprise eSIM Solutions</div>
          </div>
        </div>
      </div>

      <div className="flyer-content">
        <div className="flyer-section">
          <h3>Company Overview</h3>
          <p>Myanmar&apos;s leading enterprise eSIM provider with GSMA SGP.22 compliance, serving 2M+ customers across all 14 regions with 98.5% network coverage.</p>
        </div>

        <div className="flyer-section">
          <h3>Key Services</h3>
          <ul>
            <li>Enterprise eSIM Solutions</li>
            <li>5G Network Services</li>
            <li>Global Roaming (200+ Countries)</li>
            <li>IoT Connectivity</li>
            <li>24/7 Technical Support</li>
          </ul>
        </div>

        <div className="flyer-section">
          <h3>Technology Stack</h3>
          <div className="tech-grid">
            <div className="tech-item">GSMA SGP.22 v4.0</div>
            <div className="tech-item">5G SA/NSA</div>
            <div className="tech-item">VoLTE/VoNR</div>
            <div className="tech-item">Multi-IMSI</div>
          </div>
        </div>

        <div className="flyer-section">
          <h3>Network Coverage</h3>
          <div className="coverage-grid">
            <div className="coverage-item">
              <div className="coverage-region">Yangon</div>
              <div className="coverage-percent">99.2%</div>
            </div>
            <div className="coverage-item">
              <div className="coverage-region">Mandalay</div>
              <div className="coverage-percent">96.8%</div>
            </div>
            <div className="coverage-item">
              <div className="coverage-region">Naypyitaw</div>
              <div className="coverage-percent">99.5%</div>
            </div>
            <div className="coverage-item">
              <div className="coverage-region">All Regions</div>
              <div className="coverage-percent">98.5%</div>
            </div>
          </div>
        </div>

        <div className="flyer-section">
          <h3>Certifications</h3>
          <div className="cert-grid">
            <div className="cert-item">GSMA Certified</div>
            <div className="cert-item">ISO 27001</div>
            <div className="cert-item">WCAG 2.2 AAA</div>
            <div className="cert-item">OWASP Compliant</div>
          </div>
        </div>

        <div className="flyer-section">
          <h3>Leadership</h3>
          <div className="leadership-info">
            <div className="leader">
              <div className="leader-name">Kaung Htet Paung</div>
              <div className="leader-title">Chief Executive Officer</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flyer-footer">
        <div className="contact-details">
          <div className="contact-row">
            <span className="contact-label">Website:</span>
            <span className="contact-value">esim.com.mm</span>
          </div>
          <div className="contact-row">
            <span className="contact-label">Email:</span>
            <span className="contact-value">info@esim.com.mm</span>
          </div>
          <div className="contact-row">
            <span className="contact-label">Phone:</span>
            <span className="contact-value">09650000172</span>
          </div>
          <div className="contact-row">
            <span className="contact-label">Social:</span>
            <span className="contact-value">@eSIMMyanmar</span>
          </div>
        </div>
      </div>
    </div>
  );
};