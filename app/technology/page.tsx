import { CompanyPageTemplate, FeatureCard } from '../../src/microsoft-stack/page-templates/company-template';

export default function TechnologyPage() {
  return (
    <CompanyPageTemplate
      title="eSIM Technology"
      description="Advanced eSIM implementation with GSMA SGP.22 compliance, 5G integration, and enterprise-grade security"
      content={
        <>
          <section className="technology-overview">
            <div className="tech-intro glass-card">
              <h3>eSIM Technology Overview</h3>
              <p>eSIM (embedded SIM) represents the next evolution in mobile connectivity, eliminating the need for physical SIM cards while enabling remote provisioning, multiple operator profiles, and enhanced security. Our implementation follows GSMA SGP.22 v4.0 specifications with full 5G SA/NSA support.</p>
            </div>
          </section>

          <section className="core-technologies">
            <h2>Core Technologies</h2>
            <div className="tech-grid">
              <FeatureCard
                title="GSMA SGP.22 v4.0"
                description="Full compliance with latest GSMA specifications for consumer eSIM remote provisioning and management"
                icon="GSMA"
              />
              <FeatureCard
                title="GSMA SGP.32 2025"
                description="Advanced IoT eSIM specifications for industrial and automotive applications with enhanced security"
                icon="IoT"
              />
              <FeatureCard
                title="3GPP Release 17"
                description="Latest 3GPP standards implementation for 5G SA/NSA networks with network slicing support"
                icon="3GPP"
              />
              <FeatureCard
                title="ETSI M2M"
                description="European Telecommunications Standards Institute M2M specifications for machine-to-machine communication"
                icon="M2M"
              />
            </div>
          </section>

          <section className="esim-architecture">
            <div className="architecture-card glass-card">
              <h3>eSIM Architecture</h3>
              <div className="architecture-diagram">
                <div className="component">
                  <h4>eUICC (Embedded Universal Integrated Circuit Card)</h4>
                  <p>Secure element integrated into device hardware, providing tamper-resistant storage for operator profiles</p>
                </div>
                <div className="component">
                  <h4>SM-DP+ (Subscription Manager Data Preparation)</h4>
                  <p>Secure profile generation and encryption server for remote eSIM provisioning and management</p>
                </div>
                <div className="component">
                  <h4>SM-DS (Subscription Manager Discovery Service)</h4>
                  <p>Discovery service enabling eUICC to locate and connect to appropriate SM-DP+ servers</p>
                </div>
                <div className="component">
                  <h4>LPA (Local Profile Assistant)</h4>
                  <p>Device-side application managing eSIM profile download, installation, and lifecycle operations</p>
                </div>
              </div>
            </div>
          </section>

          <section className="security-features">
            <h2>Security & Encryption</h2>
            <div className="security-grid">
              <div className="security-card glass-card">
                <h4>Hardware Security Module (HSM)</h4>
                <p>FIPS 140-2 Level 3 certified HSM for cryptographic key generation, storage, and management with tamper-evident protection</p>
              </div>
              <div className="security-card glass-card">
                <h4>End-to-End Encryption</h4>
                <p>AES-256 encryption for all profile data transmission with PKI-based certificate management and mutual authentication</p>
              </div>
              <div className="security-card glass-card">
                <h4>Secure Element Protection</h4>
                <p>Common Criteria EAL5+ certified secure elements with anti-tampering mechanisms and secure boot processes</p>
              </div>
              <div className="security-card glass-card">
                <h4>Zero Trust Architecture</h4>
                <p>Comprehensive zero trust implementation with continuous verification, least privilege access, and micro-segmentation</p>
              </div>
            </div>
          </section>

          <section className="network-integration">
            <h2>Network Integration</h2>
            <div className="network-features">
              <div className="network-card glass-card">
                <h4>5G SA/NSA Support</h4>
                <p>Full 5G Standalone and Non-Standalone network support with network slicing, edge computing integration, and ultra-low latency services</p>
                <ul>
                  <li>Enhanced Mobile Broadband (eMBB)</li>
                  <li>Ultra-Reliable Low Latency Communications (URLLC)</li>
                  <li>Massive Machine Type Communications (mMTC)</li>
                  <li>Network Function Virtualization (NFV)</li>
                </ul>
              </div>
              <div className="network-card glass-card">
                <h4>VoLTE/VoNR Integration</h4>
                <p>Voice over LTE and Voice over New Radio implementation with HD voice, video calling, and Rich Communication Services (RCS)</p>
                <ul>
                  <li>HD Voice (AMR-WB codec)</li>
                  <li>Video Calling (H.264/H.265)</li>
                  <li>RCS Advanced Messaging</li>
                  <li>Emergency Services (eCall/E911)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="device-compatibility">
            <h2>Device Compatibility</h2>
            <div className="compatibility-grid">
              <div className="device-category glass-card">
                <h4>Consumer Devices</h4>
                <ul>
                  <li>iPhone XS/XR and newer models</li>
                  <li>iPad Pro/Air with cellular connectivity</li>
                  <li>Apple Watch Series 3 and newer</li>
                  <li>Samsung Galaxy S20 and newer</li>
                  <li>Google Pixel 3 and newer</li>
                  <li>200+ additional eSIM-compatible devices</li>
                </ul>
              </div>
              <div className="device-category glass-card">
                <h4>Enterprise & IoT</h4>
                <ul>
                  <li>Industrial IoT sensors and gateways</li>
                  <li>Connected vehicle telematics units</li>
                  <li>Smart city infrastructure devices</li>
                  <li>Healthcare monitoring equipment</li>
                  <li>Asset tracking and logistics devices</li>
                  <li>Energy and utility smart meters</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="technical-specifications">
            <h2>Technical Specifications</h2>
            <div className="specs-table glass-card">
              <table>
                <tbody>
                  <tr>
                    <td>eSIM Form Factor</td>
                    <td>MFF2 (6mm x 5mm), Chip-scale package integration</td>
                  </tr>
                  <tr>
                    <td>Operating Temperature</td>
                    <td>-40°C to +105°C (industrial grade)</td>
                  </tr>
                  <tr>
                    <td>Memory Capacity</td>
                    <td>128KB to 1MB EEPROM (configurable)</td>
                  </tr>
                  <tr>
                    <td>Cryptographic Support</td>
                    <td>RSA-2048, ECC P-256/P-384, AES-128/256</td>
                  </tr>
                  <tr>
                    <td>Profile Capacity</td>
                    <td>Up to 8 operator profiles per eUICC</td>
                  </tr>
                  <tr>
                    <td>Provisioning Time</td>
                    <td>30-60 seconds over-the-air activation</td>
                  </tr>
                  <tr>
                    <td>Lifecycle Management</td>
                    <td>15+ years operational lifespan</td>
                  </tr>
                  <tr>
                    <td>Compliance Standards</td>
                    <td>GSMA, 3GPP, ETSI, Common Criteria, FIPS 140-2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      }
    />
  );
}