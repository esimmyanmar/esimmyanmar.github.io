import { CompanyPageTemplate, FeatureCard, CertificationBadge } from '../../src/microsoft-stack/page-templates/company-template';

export default function CompanyPage() {
  return (
    <CompanyPageTemplate
      title="Company Profile"
      description="eSIM Myanmar Company Limited - Leading enterprise eSIM provider in Myanmar with GSMA SGP.22 compliance"
      showTeam={true}
      showFiles={true}
      content={
        <>
          <section className="company-overview">
            <div className="overview-grid">
              <div className="overview-card glass-card">
                <h3>Company Overview</h3>
                <p>eSIM Myanmar Company Limited is Myanmar's premier enterprise eSIM provider, established in 2024 to revolutionize telecommunications through cutting-edge embedded SIM technology. We serve over 2 million customers across all 14 regions of Myanmar with 98.5% network coverage.</p>
                <ul>
                  <li>Founded: 2024</li>
                  <li>Headquarters: Yangon, Myanmar</li>
                  <li>CEO: Kaung Htet Paung</li>
                  <li>Employees: 50-100</li>
                  <li>Coverage: 98.5% Myanmar</li>
                  <li>Active Users: 2M+</li>
                </ul>
              </div>
              
              <div className="overview-card glass-card">
                <h3>Business Focus</h3>
                <p>We specialize in enterprise-grade eSIM solutions that enable seamless connectivity, enhanced security, and superior user experiences across Myanmar and the broader ASEAN region.</p>
                <ul>
                  <li>Enterprise eSIM Solutions</li>
                  <li>5G Network Services</li>
                  <li>Global Roaming (200+ Countries)</li>
                  <li>IoT Connectivity</li>
                  <li>24/7 Technical Support</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="key-features">
            <h2>Key Capabilities</h2>
            <div className="features-grid">
              <FeatureCard
                title="GSMA Certified"
                description="Full compliance with GSMA SGP.22 v4.0 and SGP.32 2025 specifications for enterprise eSIM deployment"
                icon="GSMA"
              />
              <FeatureCard
                title="5G Ready"
                description="Advanced 5G SA/NSA network support with VoLTE and VoNR capabilities for next-generation services"
                icon="5G"
              />
              <FeatureCard
                title="Multi-IMSI"
                description="Support for multiple operator profiles and seamless switching between networks globally"
                icon="SIM"
              />
              <FeatureCard
                title="Enterprise Security"
                description="End-to-end encryption, secure element protection, and zero-trust architecture implementation"
                icon="SECURITY"
              />
            </div>
          </section>

          <section className="certifications">
            <h2>Certifications & Compliance</h2>
            <div className="cert-grid">
              <CertificationBadge
                name="GSMA SGP.22 v4.0"
                issuer="GSMA Association"
                date="2024"
              />
              <CertificationBadge
                name="ISO 27001:2022"
                issuer="International Organization for Standardization"
                date="2024"
              />
              <CertificationBadge
                name="WCAG 2.2 AAA"
                issuer="W3C Web Accessibility Initiative"
                date="2024"
              />
              <CertificationBadge
                name="OWASP Compliant"
                issuer="Open Web Application Security Project"
                date="2024"
              />
            </div>
          </section>

          <section className="market-position">
            <div className="position-card glass-card">
              <h3>Market Leadership</h3>
              <p>As Myanmar's first and fastest eSIM provider, we lead the market in:</p>
              <div className="leadership-stats">
                <div className="stat">
                  <div className="stat-number">98.5%</div>
                  <div className="stat-label">Network Coverage</div>
                </div>
                <div className="stat">
                  <div className="stat-number">2M+</div>
                  <div className="stat-label">Active Users</div>
                </div>
                <div className="stat">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Countries</div>
                </div>
                <div className="stat">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support</div>
                </div>
              </div>
            </div>
          </section>

          <section className="partnerships">
            <h2>Strategic Partnerships</h2>
            <div className="partners-grid">
              <div className="partner-category glass-card">
                <h4>Telecom Partners</h4>
                <ul>
                  <li>ATOM Myanmar</li>
                  <li>Mytel</li>
                  <li>MPT (Myanmar Posts and Telecommunications)</li>
                  <li>U9 Telecom</li>
                </ul>
              </div>
              <div className="partner-category glass-card">
                <h4>Financial Partners</h4>
                <ul>
                  <li>AYA Bank</li>
                  <li>UAB Bank</li>
                  <li>WavePay</li>
                  <li>AYA Pay</li>
                </ul>
              </div>
              <div className="partner-category glass-card">
                <h4>Technology Partners</h4>
                <ul>
                  <li>Microsoft Corporation</li>
                  <li>NetLync</li>
                  <li>Activ Digital</li>
                  <li>MMQR</li>
                </ul>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}