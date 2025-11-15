import { CompanyPageTemplate, NetworkStatusCard } from '../../src/microsoft-stack/page-templates/company-template';

export default function CoveragePage() {
  return (
    <CompanyPageTemplate
      title="Myanmar Coverage Map"
      description="Comprehensive eSIM network coverage across all 14 regions of Myanmar with 98.5% population coverage"
      content={
        <>
          <section className="coverage-overview">
            <div className="coverage-summary glass-card">
              <h3>National Coverage Statistics</h3>
              <div className="coverage-stats">
                <div className="stat-large">
                  <div className="stat-number">98.5%</div>
                  <div className="stat-label">National Coverage</div>
                </div>
                <div className="stat-large">
                  <div className="stat-number">54M</div>
                  <div className="stat-label">Population Covered</div>
                </div>
                <div className="stat-large">
                  <div className="stat-number">15</div>
                  <div className="stat-label">Regions Covered</div>
                </div>
                <div className="stat-large">
                  <div className="stat-number">330+</div>
                  <div className="stat-label">Cities & Towns</div>
                </div>
              </div>
            </div>
          </section>

          <section className="regional-coverage">
            <h2>Regional Network Status</h2>
            <div className="regions-grid">
              <NetworkStatusCard
                region="Yangon Region"
                coverage={99.2}
                speed={{download: 150.2, upload: 45.8, latency: 12}}
              />
              <NetworkStatusCard
                region="Mandalay Region"
                coverage={96.8}
                speed={{download: 142.1, upload: 42.3, latency: 15}}
              />
              <NetworkStatusCard
                region="Naypyitaw Union Territory"
                coverage={99.5}
                speed={{download: 165.7, upload: 52.1, latency: 8}}
              />
              <NetworkStatusCard
                region="Bagan Archaeological Zone"
                coverage={94.3}
                speed={{download: 128.9, upload: 38.7, latency: 18}}
              />
              <NetworkStatusCard
                region="Shan State"
                coverage={92.1}
                speed={{download: 118.4, upload: 35.2, latency: 22}}
              />
              <NetworkStatusCard
                region="Kachin State"
                coverage={89.7}
                speed={{download: 105.3, upload: 31.8, latency: 28}}
              />
              <NetworkStatusCard
                region="Kayah State"
                coverage={91.4}
                speed={{download: 112.6, upload: 33.9, latency: 25}}
              />
              <NetworkStatusCard
                region="Kayin State"
                coverage={88.9}
                speed={{download: 98.7, upload: 29.6, latency: 32}}
              />
              <NetworkStatusCard
                region="Chin State"
                coverage={85.2}
                speed={{download: 89.4, upload: 26.8, latency: 38}}
              />
              <NetworkStatusCard
                region="Mon State"
                coverage={93.6}
                speed={{download: 125.8, upload: 37.7, latency: 20}}
              />
              <NetworkStatusCard
                region="Rakhine State"
                coverage={87.3}
                speed={{download: 94.2, upload: 28.3, latency: 35}}
              />
              <NetworkStatusCard
                region="Sagaing Region"
                coverage={90.8}
                speed={{download: 108.5, upload: 32.6, latency: 26}}
              />
              <NetworkStatusCard
                region="Tanintharyi Region"
                coverage={86.1}
                speed={{download: 91.7, upload: 27.5, latency: 40}}
              />
              <NetworkStatusCard
                region="Bago Region"
                coverage={95.4}
                speed={{download: 134.2, upload: 40.3, latency: 17}}
              />
              <NetworkStatusCard
                region="Magway Region"
                coverage={88.6}
                speed={{download: 102.1, upload: 30.6, latency: 30}}
              />
            </div>
          </section>

          <section className="network-infrastructure">
            <h2>Network Infrastructure</h2>
            <div className="infrastructure-grid">
              <div className="infra-card glass-card">
                <h4>Base Stations</h4>
                <div className="infra-stats">
                  <div className="infra-stat">
                    <span className="stat-number">2,847</span>
                    <span className="stat-label">5G Base Stations</span>
                  </div>
                  <div className="infra-stat">
                    <span className="stat-number">8,924</span>
                    <span className="stat-label">4G LTE Sites</span>
                  </div>
                  <div className="infra-stat">
                    <span className="stat-number">15,632</span>
                    <span className="stat-label">Total Cell Sites</span>
                  </div>
                </div>
              </div>
              
              <div className="infra-card glass-card">
                <h4>Fiber Backbone</h4>
                <div className="infra-stats">
                  <div className="infra-stat">
                    <span className="stat-number">12,500</span>
                    <span className="stat-label">Fiber Route KM</span>
                  </div>
                  <div className="infra-stat">
                    <span className="stat-number">99.8%</span>
                    <span className="stat-label">Fiber Availability</span>
                  </div>
                  <div className="infra-stat">
                    <span className="stat-number">100Gbps</span>
                    <span className="stat-label">Backbone Capacity</span>
                  </div>
                </div>
              </div>

              <div className="infra-card glass-card">
                <h4>Data Centers</h4>
                <div className="infra-stats">
                  <div className="infra-stat">
                    <span className="stat-number">3</span>
                    <span className="stat-label">Primary Data Centers</span>
                  </div>
                  <div className="infra-stat">
                    <span className="stat-number">12</span>
                    <span className="stat-label">Edge Computing Sites</span>
                  </div>
                  <div className="infra-stat">
                    <span className="stat-number">99.99%</span>
                    <span className="stat-label">Uptime SLA</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="coverage-expansion">
            <h2>Coverage Expansion Plan</h2>
            <div className="expansion-timeline glass-card">
              <h4>2025 Expansion Roadmap</h4>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">Q1 2025</div>
                  <div className="timeline-content">
                    <h5>Rural Coverage Enhancement</h5>
                    <p>Expand coverage to remote areas in Chin, Kachin, and Shan states targeting 95% national coverage</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Q2 2025</div>
                  <div className="timeline-content">
                    <h5>5G Network Expansion</h5>
                    <p>Deploy 5G SA networks in major cities and industrial zones across all regions</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Q3 2025</div>
                  <div className="timeline-content">
                    <h5>Border Area Coverage</h5>
                    <p>Enhance coverage along Thailand, China, and India borders for seamless roaming</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Q4 2025</div>
                  <div className="timeline-content">
                    <h5>IoT Network Deployment</h5>
                    <p>Deploy dedicated IoT networks for smart city and industrial applications</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="international-roaming">
            <h2>International Roaming Coverage</h2>
            <div className="roaming-regions">
              <div className="roaming-card glass-card">
                <h4>ASEAN Region</h4>
                <div className="roaming-stats">
                  <div className="roaming-stat">
                    <span className="stat-number">10</span>
                    <span className="stat-label">ASEAN Countries</span>
                  </div>
                  <div className="roaming-stat">
                    <span className="stat-number">45</span>
                    <span className="stat-label">Partner Networks</span>
                  </div>
                  <div className="roaming-stat">
                    <span className="stat-number">99.5%</span>
                    <span className="stat-label">Coverage Rate</span>
                  </div>
                </div>
              </div>
              
              <div className="roaming-card glass-card">
                <h4>Global Coverage</h4>
                <div className="roaming-stats">
                  <div className="roaming-stat">
                    <span className="stat-number">200+</span>
                    <span className="stat-label">Countries</span>
                  </div>
                  <div className="roaming-stat">
                    <span className="stat-number">650+</span>
                    <span className="stat-label">Partner Networks</span>
                  </div>
                  <div className="roaming-stat">
                    <span className="stat-number">95%</span>
                    <span className="stat-label">Global Population</span>
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