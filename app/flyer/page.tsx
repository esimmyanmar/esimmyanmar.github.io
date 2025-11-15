import { CompanyProfileFlyer } from '../../src/components/microsoft-fluent/company-hero';
import { CompanyPageTemplate } from '../../src/microsoft-stack/page-templates/company-template';

export default function FlyerPage() {
  return (
    <CompanyPageTemplate
      title="Digital Company Flyer"
      description="Interactive digital company flyer with downloadable PDF version - eSIM Myanmar Company Profile"
      content={
        <>
          <section className="flyer-actions">
            <div className="actions-bar glass-card">
              <button className="action-btn download-pdf">
                Download PDF Version
              </button>
              <button className="action-btn share-flyer">
                Share Digital Flyer
              </button>
              <button className="action-btn print-version">
                Print-Friendly Version
              </button>
              <button className="action-btn embed-code">
                Get Embed Code
              </button>
            </div>
          </section>

          <section className="digital-flyer-container">
            <CompanyProfileFlyer />
          </section>

          <section className="flyer-details">
            <div className="details-grid">
              <div className="detail-card glass-card">
                <h3>Digital Flyer Features</h3>
                <ul>
                  <li>Interactive company overview</li>
                  <li>Real-time network statistics</li>
                  <li>Comprehensive service portfolio</li>
                  <li>Technology specifications</li>
                  <li>Coverage maps and data</li>
                  <li>Certification badges</li>
                  <li>Contact information</li>
                  <li>Leadership team details</li>
                </ul>
              </div>
              
              <div className="detail-card glass-card">
                <h3>Available Formats</h3>
                <ul>
                  <li>Interactive Web Version</li>
                  <li>PDF Download (A4 Format)</li>
                  <li>Print-Optimized Version</li>
                  <li>Mobile-Responsive Layout</li>
                  <li>Embeddable Widget</li>
                  <li>Social Media Cards</li>
                  <li>Email Newsletter Format</li>
                  <li>Presentation Slides</li>
                </ul>
              </div>
              
              <div className="detail-card glass-card">
                <h3>Usage Guidelines</h3>
                <ul>
                  <li>Business presentations</li>
                  <li>Partner communications</li>
                  <li>Trade show materials</li>
                  <li>Website integration</li>
                  <li>Email campaigns</li>
                  <li>Social media sharing</li>
                  <li>Investor relations</li>
                  <li>Media kit inclusion</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="flyer-statistics">
            <div className="stats-card glass-card">
              <h3>Company Highlights</h3>
              <div className="highlight-grid">
                <div className="highlight-item">
                  <div className="highlight-icon">FIRST</div>
                  <div className="highlight-text">
                    <h4>First eSIM Provider</h4>
                    <p>Myanmar's pioneering eSIM company with GSMA certification</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">FASTEST</div>
                  <div className="highlight-text">
                    <h4>Fastest Deployment</h4>
                    <p>Rapid nationwide rollout with 98.5% coverage in record time</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">ONLY</div>
                  <div className="highlight-text">
                    <h4>Only Enterprise Focus</h4>
                    <p>Dedicated enterprise-grade solutions with 24/7 support</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="contact-cta">
            <div className="cta-card glass-card">
              <h3>Get in Touch</h3>
              <p>Ready to transform your connectivity with enterprise eSIM solutions?</p>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">WEB</div>
                  <div className="method-details">
                    <h4>Website</h4>
                    <p>esim.com.mm</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">EMAIL</div>
                  <div className="method-details">
                    <h4>Email</h4>
                    <p>info@esim.com.mm</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">PHONE</div>
                  <div className="method-details">
                    <h4>Phone</h4>
                    <p>09650000172</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">SOCIAL</div>
                  <div className="method-details">
                    <h4>Social</h4>
                    <p>@eSIMMyanmar</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}