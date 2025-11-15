import { CompanyHero, CompanyProfileFlyer } from '../src/components/microsoft-fluent/company-hero';
import { CompanyProfileLayout } from '../src/microsoft-stack/graph-toolkit/mgt-components';

export default function HomePage() {
  return (
    <CompanyProfileLayout showSearch={true} showTeam={true} showFiles={true} showEvents={true}>
      <CompanyHero
        title="eSIM MYANMAR"
        subtitle="Enterprise eSIM Solutions"
        description="Myanmar's leading enterprise eSIM provider with GSMA SGP.22 compliance, serving 2M+ customers across all 14 regions with 98.5% network coverage."
        ctaText="Explore Our Network"
        ctaAction={() => window.location.href = '/coverage'}
      />
      
      <section className="company-overview-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Company Profile</h2>
            <p>Leading Myanmar's digital transformation through enterprise-grade eSIM technology</p>
          </div>
          
          <div className="overview-grid">
            <div className="overview-card glass-card">
              <h3>Our Mission</h3>
              <p>To connect Myanmar to the global digital economy through innovative eSIM solutions that enable seamless connectivity, enhanced security, and superior user experiences.</p>
            </div>
            
            <div className="overview-card glass-card">
              <h3>Our Vision</h3>
              <p>To be the leading eSIM provider in Southeast Asia, driving digital inclusion and economic growth through cutting-edge telecommunications technology.</p>
            </div>
            
            <div className="overview-card glass-card">
              <h3>Our Values</h3>
              <ul>
                <li>Innovation in telecommunications</li>
                <li>Customer-centric solutions</li>
                <li>Security and compliance</li>
                <li>Sustainable growth</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Enterprise Services</h2>
            <p>Comprehensive eSIM solutions for businesses of all sizes</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card glass-card">
              <div className="service-icon">5G</div>
              <h3>5G Network Services</h3>
              <p>Ultra-fast 5G connectivity with eSIM integration for next-generation applications and IoT devices.</p>
              <a href="/5g" className="service-link">Learn More</a>
            </div>
            
            <div className="service-card glass-card">
              <div className="service-icon">VoLTE</div>
              <h3>VoLTE Services</h3>
              <p>High-quality voice calls over LTE networks with crystal-clear audio and enhanced features.</p>
              <a href="/volte" className="service-link">Learn More</a>
            </div>
            
            <div className="service-card glass-card">
              <div className="service-icon">GLOBAL</div>
              <h3>Global Roaming</h3>
              <p>Seamless connectivity across 200+ countries with competitive roaming rates and local partnerships.</p>
              <a href="/roaming" className="service-link">Learn More</a>
            </div>
            
            <div className="service-card glass-card">
              <div className="service-icon">IoT</div>
              <h3>IoT Connectivity</h3>
              <p>Specialized eSIM solutions for industrial IoT, automotive, and smart city applications.</p>
              <a href="/iot" className="service-link">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      <section className="network-status-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Live Network Status</h2>
            <p>Real-time network performance across Myanmar regions</p>
          </div>
          
          <div className="network-grid">
            <div className="network-card glass-card">
              <div className="region-name">Yangon Region</div>
              <div className="coverage-meter">
                <div className="meter-bar">
                  <div className="meter-fill" style={{width: '99.2%'}}></div>
                </div>
                <div className="coverage-text">99.2% Coverage</div>
              </div>
              <div className="speed-stats">
                <div className="speed-item">
                  <span className="speed-label">Download</span>
                  <span className="speed-value">150.2 Mbps</span>
                </div>
                <div className="speed-item">
                  <span className="speed-label">Upload</span>
                  <span className="speed-value">45.8 Mbps</span>
                </div>
                <div className="speed-item">
                  <span className="speed-label">Latency</span>
                  <span className="speed-value">12ms</span>
                </div>
              </div>
            </div>
            
            <div className="network-card glass-card">
              <div className="region-name">Mandalay Region</div>
              <div className="coverage-meter">
                <div className="meter-bar">
                  <div className="meter-fill" style={{width: '96.8%'}}></div>
                </div>
                <div className="coverage-text">96.8% Coverage</div>
              </div>
              <div className="speed-stats">
                <div className="speed-item">
                  <span className="speed-label">Download</span>
                  <span className="speed-value">142.1 Mbps</span>
                </div>
                <div className="speed-item">
                  <span className="speed-label">Upload</span>
                  <span className="speed-value">42.3 Mbps</span>
                </div>
                <div className="speed-item">
                  <span className="speed-label">Latency</span>
                  <span className="speed-value">15ms</span>
                </div>
              </div>
            </div>
            
            <div className="network-card glass-card">
              <div className="region-name">Naypyitaw</div>
              <div className="coverage-meter">
                <div className="meter-bar">
                  <div className="meter-fill" style={{width: '99.5%'}}></div>
                </div>
                <div className="coverage-text">99.5% Coverage</div>
              </div>
              <div className="speed-stats">
                <div className="speed-item">
                  <span className="speed-label">Download</span>
                  <span className="speed-value">165.7 Mbps</span>
                </div>
                <div className="speed-item">
                  <span className="speed-label">Upload</span>
                  <span className="speed-value">52.1 Mbps</span>
                </div>
                <div className="speed-item">
                  <span className="speed-label">Latency</span>
                  <span className="speed-value">8ms</span>
                </div>
              </div>
            </div>
            
            <div className="network-card glass-card">
              <div className="region-name">All Regions</div>
              <div className="coverage-meter">
                <div className="meter-bar">
                  <div className="meter-fill" style={{width: '98.5%'}}></div>
                </div>
                <div className="coverage-text">98.5% Average</div>
              </div>
              <div className="speed-stats">
                <div className="speed-item">
                  <span className="speed-label">Active Users</span>
                  <span className="speed-value">2M+</span>
                </div>
                <div className="speed-item">
                  <span className="speed-label">Countries</span>
                  <span className="speed-value">200+</span>
                </div>
                <div className="speed-item">
                  <span className="speed-label">Uptime</span>
                  <span className="speed-value">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="digital-flyer-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Company Digital Flyer</h2>
            <p>Download or view our comprehensive company profile</p>
          </div>
          
          <CompanyProfileFlyer />
          
          <div className="flyer-actions">
            <button className="download-btn glass-card">
              Download PDF
            </button>
            <button className="share-btn glass-card">
              Share Flyer
            </button>
            <button className="print-btn glass-card">
              Print Version
            </button>
          </div>
        </div>
      </section>
    </CompanyProfileLayout>
  );
}