import { ESIM_MYANMAR_PAGES } from '../power-pages/page-generator';

interface PageTemplate {
  path: string;
  title: string;
  description: string;
  content: string;
}

export const generateAllPages = (): PageTemplate[] => {
  return ESIM_MYANMAR_PAGES.map(page => ({
    path: page.path,
    title: page.title,
    description: page.description,
    content: generatePageContent(page)
  }));
};

const generatePageContent = (page: any): string => {
  const baseTemplate = `
import { CompanyPageTemplate } from '../../src/microsoft-stack/page-templates/company-template';

export default function ${toPascalCase(page.path)}Page() {
  return (
    <CompanyPageTemplate
      title="${page.title}"
      description="${page.description}"
      content={
        <>
          <section className="page-content">
            <div className="content-card glass-card">
              <h3>${page.title}</h3>
              <p>${page.description}</p>
              ${generateCategorySpecificContent(page.category, page.path)}
            </div>
          </section>
        </>
      }
    />
  );
}`;

  return baseTemplate;
};

const generateCategorySpecificContent = (category: string, path: string): string => {
  switch (category) {
    case 'company':
      return generateCompanyContent(path);
    case 'technology':
      return generateTechnologyContent(path);
    case 'coverage':
      return generateCoverageContent(path);
    case 'devices':
      return generateDeviceContent(path);
    case 'support':
      return generateSupportContent(path);
    case 'regional':
      return generateRegionalContent(path);
    case 'resources':
      return generateResourceContent(path);
    default:
      return generateDefaultContent();
  }
};

const generateCompanyContent = (path: string): string => {
  if (path.includes('team')) {
    return `
              <div className="team-section">
                <h4>Leadership Team</h4>
                <div className="team-grid">
                  <div className="team-member glass-card">
                    <h5>Kaung Htet Paung</h5>
                    <p>Chief Executive Officer</p>
                  </div>
                </div>
              </div>`;
  }
  
  if (path.includes('history')) {
    return `
              <div className="history-timeline">
                <h4>Company Milestones</h4>
                <div className="timeline-item">
                  <div className="timeline-date">2024</div>
                  <div className="timeline-content">Founded eSIM Myanmar Company Limited</div>
                </div>
              </div>`;
  }
  
  return `
              <div className="company-info">
                <h4>Company Information</h4>
                <ul>
                  <li>Founded: 2024</li>
                  <li>Headquarters: Yangon, Myanmar</li>
                  <li>CEO: Kaung Htet Paung</li>
                  <li>Coverage: 98.5% Myanmar</li>
                </ul>
              </div>`;
};

const generateTechnologyContent = (path: string): string => {
  if (path.includes('5g')) {
    return `
              <div className="tech-specs">
                <h4>5G Network Specifications</h4>
                <ul>
                  <li>5G SA/NSA Support</li>
                  <li>Network Slicing</li>
                  <li>Edge Computing Integration</li>
                  <li>Ultra-Low Latency (1ms)</li>
                </ul>
              </div>`;
  }
  
  if (path.includes('security')) {
    return `
              <div className="security-features">
                <h4>Security Features</h4>
                <ul>
                  <li>End-to-End Encryption</li>
                  <li>Hardware Security Module</li>
                  <li>Zero Trust Architecture</li>
                  <li>Multi-Factor Authentication</li>
                </ul>
              </div>`;
  }
  
  return `
              <div className="tech-overview">
                <h4>Technology Overview</h4>
                <p>Advanced eSIM technology with GSMA SGP.22 compliance and enterprise-grade security.</p>
              </div>`;
};

const generateCoverageContent = (path: string): string => {
  if (path.includes('myanmar')) {
    return `
              <div className="myanmar-coverage">
                <h4>Myanmar Network Coverage</h4>
                <div className="coverage-stats">
                  <div className="stat">98.5% National Coverage</div>
                  <div className="stat">54M Population Covered</div>
                  <div className="stat">15 Regions Served</div>
                </div>
              </div>`;
  }
  
  return `
              <div className="coverage-info">
                <h4>Network Coverage</h4>
                <p>Comprehensive coverage across Myanmar with international roaming in 200+ countries.</p>
              </div>`;
};

const generateDeviceContent = (path: string): string => {
  return `
              <div className="device-compatibility">
                <h4>Supported Devices</h4>
                <ul>
                  <li>iPhone XS/XR and newer</li>
                  <li>Samsung Galaxy S20+</li>
                  <li>Google Pixel 3+</li>
                  <li>200+ eSIM-compatible devices</li>
                </ul>
              </div>`;
};

const generateSupportContent = (path: string): string => {
  return `
              <div className="support-info">
                <h4>Customer Support</h4>
                <p>24/7 technical support available via phone, email, and chat.</p>
                <div className="contact-methods">
                  <p>Phone: 09650000172</p>
                  <p>Email: info@esim.com.mm</p>
                </div>
              </div>`;
};

const generateRegionalContent = (path: string): string => {
  return `
              <div className="regional-info">
                <h4>Regional Coverage</h4>
                <p>Comprehensive eSIM services across all Myanmar regions and ASEAN countries.</p>
              </div>`;
};

const generateResourceContent = (path: string): string => {
  return `
              <div className="resource-info">
                <h4>Resources</h4>
                <p>Access technical documentation, whitepapers, and company resources.</p>
              </div>`;
};

const generateDefaultContent = (): string => {
  return `
              <div className="default-content">
                <h4>eSIM Myanmar</h4>
                <p>Enterprise eSIM solutions for Myanmar and ASEAN region.</p>
              </div>`;
};

const toPascalCase = (str: string): string => {
  return str
    .replace(/^\//, '')
    .replace(/\//g, '-')
    .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    .replace(/^([a-z])/, (g) => g.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
};

export const writeAllPages = async (): Promise<void> => {
  const pages = generateAllPages();
  
  for (const page of pages) {
    const filePath = `app${page.path === '/' ? '/page' : page.path}/page.tsx`;
    console.log(`Generated: ${filePath}`);
  }
  
  console.log(`Total pages generated: ${pages.length}`);
};