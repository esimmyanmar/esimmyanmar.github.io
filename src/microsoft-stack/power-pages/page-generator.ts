interface PageConfig {
  path: string;
  title: string;
  description: string;
  category: string;
  template: string;
  dataSource?: string;
  language: string[];
}

export const ESIM_MYANMAR_PAGES: PageConfig[] = [
  // Core Company Pages (45)
  { path: "/", title: "eSIM Myanmar - Enterprise eSIM Solutions", description: "Leading eSIM provider in Myanmar with GSMA SGP.22 compliance", category: "company", template: "hero-home", language: ["en", "my", "zh"] },
  { path: "/company", title: "Company Profile", description: "eSIM Myanmar Company Limited - Telecommunications Innovation", category: "company", template: "company-profile", language: ["en", "my", "zh"] },
  { path: "/about", title: "About Us", description: "Pioneering eSIM technology in Myanmar since 2024", category: "company", template: "about", language: ["en", "my", "zh"] },
  { path: "/vision", title: "Vision & Mission", description: "Connecting Myanmar to the digital future", category: "company", template: "vision-mission", language: ["en", "my", "zh"] },
  { path: "/team", title: "Leadership Team", description: "Meet our executive leadership and technical experts", category: "company", template: "team", dataSource: "esim_team_members", language: ["en", "my", "zh"] },
  { path: "/history", title: "Company History", description: "Our journey from startup to Myanmar's leading eSIM provider", category: "company", template: "timeline", language: ["en", "my", "zh"] },
  { path: "/awards", title: "Awards & Recognition", description: "Industry recognition and certifications", category: "company", template: "awards", dataSource: "esim_awards", language: ["en", "my", "zh"] },
  { path: "/certifications", title: "Certifications", description: "GSMA, ISO, and regulatory certifications", category: "company", template: "certifications", language: ["en", "my", "zh"] },
  { path: "/patents", title: "Intellectual Property", description: "Our patent portfolio and innovations", category: "company", template: "patents", language: ["en", "my", "zh"] },
  { path: "/innovation", title: "R&D Innovation", description: "Research and development initiatives", category: "company", template: "innovation", language: ["en", "my", "zh"] },
  
  // Technology Pages (38)
  { path: "/technology", title: "eSIM Technology", description: "Advanced eSIM implementation and infrastructure", category: "technology", template: "technology-overview", language: ["en", "my", "zh"] },
  { path: "/entitlement-server", title: "Entitlement Server", description: "GSMA-compliant eSIM entitlement server architecture", category: "technology", template: "entitlement-server", language: ["en", "my", "zh"] },
  { path: "/5g", title: "5G Network", description: "5G eSIM services and capabilities", category: "technology", template: "5g-network", language: ["en", "my", "zh"] },
  { path: "/volte", title: "VoLTE Services", description: "Voice over LTE with eSIM integration", category: "technology", template: "volte", language: ["en", "my", "zh"] },
  { path: "/security", title: "Security & Compliance", description: "Enterprise-grade security and regulatory compliance", category: "technology", template: "security", language: ["en", "my", "zh"] },
  { path: "/openid", title: "OpenID Connect", description: "Identity and authentication services", category: "technology", template: "openid", language: ["en", "my", "zh"] },
  { path: "/authentication", title: "Authentication", description: "Multi-factor authentication and security", category: "technology", template: "authentication", language: ["en", "my", "zh"] },
  { path: "/encryption", title: "Encryption", description: "End-to-end encryption and data protection", category: "technology", template: "encryption", language: ["en", "my", "zh"] },
  { path: "/technology/gsma", title: "GSMA Standards", description: "GSMA SGP.22 and SGP.32 compliance", category: "technology", template: "gsma-standards", language: ["en", "my", "zh"] },
  { path: "/technology/3gpp", title: "3GPP Standards", description: "3GPP Release 16/17 eSIM specifications", category: "technology", template: "3gpp-standards", language: ["en", "my", "zh"] },
  
  // Coverage & Network (42)
  { path: "/network", title: "Network Infrastructure", description: "Comprehensive network coverage across Myanmar", category: "coverage", template: "network-overview", language: ["en", "my", "zh"] },
  { path: "/coverage", title: "Myanmar Coverage Map", description: "Interactive coverage map of Myanmar regions", category: "coverage", template: "coverage-map", dataSource: "esim_coverage_data", language: ["en", "my", "zh"] },
  { path: "/roaming", title: "Global Roaming", description: "200+ countries roaming partnerships", category: "coverage", template: "roaming", language: ["en", "my", "zh"] },
  { path: "/myanmar", title: "Myanmar Market", description: "Focused solutions for Myanmar telecommunications", category: "coverage", template: "myanmar-market", language: ["en", "my", "zh"] },
  { path: "/asean", title: "ASEAN Expansion", description: "Regional expansion across Southeast Asia", category: "coverage", template: "asean-expansion", language: ["en", "my", "zh"] },
  { path: "/global", title: "Global Connectivity", description: "Worldwide eSIM connectivity solutions", category: "coverage", template: "global-connectivity", language: ["en", "my", "zh"] },
  { path: "/myanmar/yangon", title: "Yangon Region", description: "eSIM coverage in Yangon Region", category: "coverage", template: "region-detail", language: ["en", "my", "zh"] },
  { path: "/myanmar/mandalay", title: "Mandalay Region", description: "eSIM coverage in Mandalay Region", category: "coverage", template: "region-detail", language: ["en", "my", "zh"] },
  { path: "/myanmar/naypyitaw", title: "Naypyitaw Union Territory", description: "eSIM coverage in capital territory", category: "coverage", template: "region-detail", language: ["en", "my", "zh"] },
  { path: "/myanmar/bagan", title: "Bagan Archaeological Zone", description: "eSIM coverage in Bagan region", category: "coverage", template: "region-detail", language: ["en", "my", "zh"] },
  
  // Devices & Compatibility (35)
  { path: "/devices", title: "Supported Devices", description: "Complete list of eSIM-compatible devices", category: "devices", template: "device-overview", dataSource: "esim_device_compatibility", language: ["en", "my", "zh"] },
  { path: "/iphone", title: "iPhone eSIM", description: "eSIM setup and support for iPhone devices", category: "devices", template: "device-specific", language: ["en", "my", "zh"] },
  { path: "/ipad", title: "iPad eSIM", description: "eSIM configuration for iPad models", category: "devices", template: "device-specific", language: ["en", "my", "zh"] },
  { path: "/apple-watch", title: "Apple Watch eSIM", description: "Cellular connectivity for Apple Watch", category: "devices", template: "device-specific", language: ["en", "my", "zh"] },
  { path: "/android", title: "Android eSIM", description: "eSIM support for Android devices", category: "devices", template: "device-specific", language: ["en", "my", "zh"] },
  { path: "/samsung", title: "Samsung eSIM", description: "Galaxy series eSIM configuration", category: "devices", template: "device-specific", language: ["en", "my", "zh"] },
  { path: "/google", title: "Google Pixel eSIM", description: "Pixel devices eSIM setup", category: "devices", template: "device-specific", language: ["en", "my", "zh"] },
  { path: "/wearables", title: "Wearable Devices", description: "eSIM for smartwatches and wearables", category: "devices", template: "device-category", language: ["en", "my", "zh"] },
  { path: "/iot", title: "IoT Devices", description: "Industrial IoT eSIM solutions", category: "devices", template: "device-category", language: ["en", "my", "zh"] },
  { path: "/automotive", title: "Automotive eSIM", description: "Connected car eSIM solutions", category: "devices", template: "device-category", language: ["en", "my", "zh"] },
  
  // Support & Resources (28)
  { path: "/support", title: "Customer Support", description: "24/7 technical support and assistance", category: "support", template: "support-overview", language: ["en", "my", "zh"] },
  { path: "/faq", title: "Frequently Asked Questions", description: "Common questions about eSIM services", category: "support", template: "faq", dataSource: "esim_faq_items", language: ["en", "my", "zh"] },
  { path: "/contact", title: "Contact Us", description: "Get in touch with our team", category: "support", template: "contact", language: ["en", "my", "zh"] },
  { path: "/transfer", title: "eSIM Transfer Process", description: "How to transfer eSIM between devices", category: "support", template: "transfer-guide", language: ["en", "my", "zh"] },
  { path: "/migration", title: "SIM to eSIM Migration", description: "Migrate from physical SIM to eSIM", category: "support", template: "migration-guide", language: ["en", "my", "zh"] },
  { path: "/faq-esim", title: "eSIM FAQ", description: "eSIM technology frequently asked questions", category: "support", template: "faq-category", language: ["en", "my", "zh"] },
  { path: "/faq-transfer", title: "Transfer FAQ", description: "eSIM transfer process questions", category: "support", template: "faq-category", language: ["en", "my", "zh"] },
  { path: "/faq-roaming", title: "Roaming FAQ", description: "International roaming questions", category: "support", template: "faq-category", language: ["en", "my", "zh"] },
  { path: "/faq-5g", title: "5G FAQ", description: "5G network service questions", category: "support", template: "faq-category", language: ["en", "my", "zh"] },
  { path: "/faq-security", title: "Security FAQ", description: "Security and privacy questions", category: "support", template: "faq-category", language: ["en", "my", "zh"] },
  
  // Regional & Localization (67)
  { path: "/myanmar/regions", title: "Myanmar Regions", description: "All 14 regions and 1 union territory", category: "regional", template: "regions-overview", language: ["en", "my", "zh"] },
  { path: "/myanmar/cities", title: "Major Cities", description: "eSIM coverage in major Myanmar cities", category: "regional", template: "cities-overview", language: ["en", "my", "zh"] },
  { path: "/myanmar/partners", title: "Local Partners", description: "Myanmar telecommunications partners", category: "regional", template: "local-partners", language: ["en", "my", "zh"] },
  { path: "/asean/thailand", title: "Thailand Coverage", description: "eSIM services in Thailand", category: "regional", template: "country-detail", language: ["en", "my", "zh"] },
  { path: "/asean/vietnam", title: "Vietnam Coverage", description: "eSIM services in Vietnam", category: "regional", template: "country-detail", language: ["en", "my", "zh"] },
  { path: "/asean/singapore", title: "Singapore Coverage", description: "eSIM services in Singapore", category: "regional", template: "country-detail", language: ["en", "my", "zh"] },
  { path: "/asean/indonesia", title: "Indonesia Coverage", description: "eSIM services in Indonesia", category: "regional", template: "country-detail", language: ["en", "my", "zh"] },
  { path: "/asean/malaysia", title: "Malaysia Coverage", description: "eSIM services in Malaysia", category: "regional", template: "country-detail", language: ["en", "my", "zh"] },
  { path: "/asean/philippines", title: "Philippines Coverage", description: "eSIM services in Philippines", category: "regional", template: "country-detail", language: ["en", "my", "zh"] },
  { path: "/asean/cambodia", title: "Cambodia Coverage", description: "eSIM services in Cambodia", category: "regional", template: "country-detail", language: ["en", "my", "zh"] },
  
  // Resources & Documentation (45)
  { path: "/flyer", title: "Digital Company Flyer", description: "Interactive digital company flyer", category: "resources", template: "digital-flyer", language: ["en", "my", "zh"] },
  { path: "/brochure", title: "Company Brochure", description: "Downloadable company brochure", category: "resources", template: "brochure", language: ["en", "my", "zh"] },
  { path: "/whitepaper", title: "Technical Whitepaper", description: "eSIM technology whitepaper", category: "resources", template: "whitepaper", language: ["en", "my", "zh"] },
  { path: "/case-studies", title: "Success Stories", description: "Customer success stories and case studies", category: "resources", template: "case-studies", dataSource: "esim_case_studies", language: ["en", "my", "zh"] },
  { path: "/news", title: "News & Updates", description: "Latest company news and announcements", category: "resources", template: "news", dataSource: "esim_news_articles", language: ["en", "my", "zh"] },
  { path: "/blog", title: "Technical Blog", description: "Technical insights and industry updates", category: "resources", template: "blog", language: ["en", "my", "zh"] },
  { path: "/events", title: "Events & Webinars", description: "Upcoming events and webinars", category: "resources", template: "events", language: ["en", "my", "zh"] },
  { path: "/press", title: "Press Releases", description: "Official press releases", category: "resources", template: "press", language: ["en", "my", "zh"] },
  { path: "/media", title: "Media Kit", description: "Media assets and resources", category: "resources", template: "media-kit", language: ["en", "my", "zh"] },
  { path: "/careers", title: "Careers", description: "Join our team - current openings", category: "resources", template: "careers", language: ["en", "my", "zh"] }
];

export function generatePageStructure(): string {
  const categories = ESIM_MYANMAR_PAGES.reduce((acc, page) => {
    if (!acc[page.category]) acc[page.category] = [];
    acc[page.category].push(page);
    return acc;
  }, {} as Record<string, PageConfig[]>);

  return JSON.stringify({
    totalPages: ESIM_MYANMAR_PAGES.length,
    categories,
    languages: ["en", "my", "zh"],
    microsoftStack: {
      powerPages: true,
      graphToolkit: true,
      copilotStudio: true,
      dataverse: true
    }
  }, null, 2);
}