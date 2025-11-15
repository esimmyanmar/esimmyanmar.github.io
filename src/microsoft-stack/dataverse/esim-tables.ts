interface DataverseTable {
  logicalName: string;
  displayName: string;
  description: string;
  columns: DataverseColumn[];
  relationships: DataverseRelationship[];
}

interface DataverseColumn {
  logicalName: string;
  displayName: string;
  dataType: string;
  required: boolean;
  description: string;
}

interface DataverseRelationship {
  name: string;
  relatedTable: string;
  type: "OneToMany" | "ManyToOne" | "ManyToMany";
}

export const ESIM_DATAVERSE_TABLES: DataverseTable[] = [
  {
    logicalName: "esim_company_info",
    displayName: "Company Information",
    description: "Core company profile and business information",
    columns: [
      { logicalName: "esim_name", displayName: "Company Name", dataType: "string", required: true, description: "Official company name" },
      { logicalName: "esim_description", displayName: "Description", dataType: "memo", required: true, description: "Company description" },
      { logicalName: "esim_founded_date", displayName: "Founded Date", dataType: "datetime", required: true, description: "Company founding date" },
      { logicalName: "esim_headquarters", displayName: "Headquarters", dataType: "string", required: true, description: "Headquarters location" },
      { logicalName: "esim_ceo", displayName: "CEO", dataType: "string", required: true, description: "Chief Executive Officer" },
      { logicalName: "esim_employees", displayName: "Employee Count", dataType: "whole.number", required: false, description: "Total number of employees" },
      { logicalName: "esim_revenue", displayName: "Annual Revenue", dataType: "money", required: false, description: "Annual revenue" },
      { logicalName: "esim_website", displayName: "Website", dataType: "string", required: true, description: "Official website URL" },
      { logicalName: "esim_phone", displayName: "Phone", dataType: "string", required: true, description: "Primary contact phone" },
      { logicalName: "esim_email", displayName: "Email", dataType: "string", required: true, description: "Primary contact email" }
    ],
    relationships: [
      { name: "esim_company_certifications", relatedTable: "esim_certifications", type: "OneToMany" },
      { name: "esim_company_awards", relatedTable: "esim_awards", type: "OneToMany" }
    ]
  },
  {
    logicalName: "esim_network_coverage",
    displayName: "Network Coverage",
    description: "Network coverage data for all regions and cities",
    columns: [
      { logicalName: "esim_region_name", displayName: "Region Name", dataType: "string", required: true, description: "Myanmar region or state name" },
      { logicalName: "esim_city_name", displayName: "City Name", dataType: "string", required: false, description: "City or township name" },
      { logicalName: "esim_coverage_percentage", displayName: "Coverage %", dataType: "decimal", required: true, description: "Coverage percentage" },
      { logicalName: "esim_population_covered", displayName: "Population Covered", dataType: "whole.number", required: false, description: "Population with coverage" },
      { logicalName: "esim_network_type", displayName: "Network Type", dataType: "picklist", required: true, description: "2G/3G/4G/5G network type" },
      { logicalName: "esim_speed_download", displayName: "Download Speed", dataType: "decimal", required: false, description: "Average download speed Mbps" },
      { logicalName: "esim_speed_upload", displayName: "Upload Speed", dataType: "decimal", required: false, description: "Average upload speed Mbps" },
      { logicalName: "esim_latency", displayName: "Latency", dataType: "decimal", required: false, description: "Network latency in ms" },
      { logicalName: "esim_coordinates", displayName: "Coordinates", dataType: "string", required: false, description: "GPS coordinates" },
      { logicalName: "esim_last_updated", displayName: "Last Updated", dataType: "datetime", required: true, description: "Last coverage update" }
    ],
    relationships: [
      { name: "esim_coverage_partners", relatedTable: "esim_partners", type: "ManyToMany" }
    ]
  },
  {
    logicalName: "esim_device_compatibility",
    displayName: "Device Compatibility",
    description: "eSIM compatible devices and specifications",
    columns: [
      { logicalName: "esim_device_brand", displayName: "Brand", dataType: "string", required: true, description: "Device manufacturer" },
      { logicalName: "esim_device_model", displayName: "Model", dataType: "string", required: true, description: "Device model name" },
      { logicalName: "esim_device_type", displayName: "Device Type", dataType: "picklist", required: true, description: "Phone/Tablet/Watch/IoT" },
      { logicalName: "esim_os_type", displayName: "OS Type", dataType: "picklist", required: true, description: "iOS/Android/WearOS" },
      { logicalName: "esim_os_version_min", displayName: "Min OS Version", dataType: "string", required: true, description: "Minimum OS version" },
      { logicalName: "esim_esim_support", displayName: "eSIM Support", dataType: "two.options", required: true, description: "eSIM supported yes/no" },
      { logicalName: "esim_dual_sim", displayName: "Dual SIM", dataType: "two.options", required: false, description: "Dual SIM capability" },
      { logicalName: "esim_5g_support", displayName: "5G Support", dataType: "two.options", required: false, description: "5G network support" },
      { logicalName: "esim_volte_support", displayName: "VoLTE Support", dataType: "two.options", required: false, description: "VoLTE capability" },
      { logicalName: "esim_release_date", displayName: "Release Date", dataType: "datetime", required: false, description: "Device release date" }
    ],
    relationships: []
  },
  {
    logicalName: "esim_partners",
    displayName: "Business Partners",
    description: "Telecom and business partners information",
    columns: [
      { logicalName: "esim_partner_name", displayName: "Partner Name", dataType: "string", required: true, description: "Partner company name" },
      { logicalName: "esim_partner_type", displayName: "Partner Type", dataType: "picklist", required: true, description: "Telecom/Financial/Payment/Digital Marketing" },
      { logicalName: "esim_partner_country", displayName: "Country", dataType: "string", required: true, description: "Partner country" },
      { logicalName: "esim_partner_website", displayName: "Website", dataType: "string", required: false, description: "Partner website" },
      { logicalName: "esim_integration_status", displayName: "Integration Status", dataType: "picklist", required: true, description: "Integrated/Pending/Planned" },
      { logicalName: "esim_partnership_date", displayName: "Partnership Date", dataType: "datetime", required: true, description: "Partnership start date" },
      { logicalName: "esim_services_offered", displayName: "Services Offered", dataType: "memo", required: false, description: "Services provided by partner" },
      { logicalName: "esim_contact_person", displayName: "Contact Person", dataType: "string", required: false, description: "Primary contact" },
      { logicalName: "esim_contact_email", displayName: "Contact Email", dataType: "string", required: false, description: "Contact email" }
    ],
    relationships: [
      { name: "esim_partner_coverage", relatedTable: "esim_network_coverage", type: "ManyToMany" }
    ]
  },
  {
    logicalName: "esim_news_articles",
    displayName: "News Articles",
    description: "Company news, press releases, and blog posts",
    columns: [
      { logicalName: "esim_article_title", displayName: "Title", dataType: "string", required: true, description: "Article title" },
      { logicalName: "esim_article_content", displayName: "Content", dataType: "memo", required: true, description: "Article content" },
      { logicalName: "esim_article_type", displayName: "Article Type", dataType: "picklist", required: true, description: "News/Press Release/Blog/Case Study" },
      { logicalName: "esim_publish_date", displayName: "Publish Date", dataType: "datetime", required: true, description: "Publication date" },
      { logicalName: "esim_author", displayName: "Author", dataType: "string", required: true, description: "Article author" },
      { logicalName: "esim_featured_image", displayName: "Featured Image", dataType: "string", required: false, description: "Featured image URL" },
      { logicalName: "esim_tags", displayName: "Tags", dataType: "string", required: false, description: "Article tags" },
      { logicalName: "esim_language", displayName: "Language", dataType: "picklist", required: true, description: "en/my/zh" },
      { logicalName: "esim_status", displayName: "Status", dataType: "picklist", required: true, description: "Draft/Published/Archived" }
    ],
    relationships: []
  },
  {
    logicalName: "esim_faq_items",
    displayName: "FAQ Items",
    description: "Frequently asked questions and answers",
    columns: [
      { logicalName: "esim_question", displayName: "Question", dataType: "memo", required: true, description: "FAQ question" },
      { logicalName: "esim_answer", displayName: "Answer", dataType: "memo", required: true, description: "FAQ answer" },
      { logicalName: "esim_category", displayName: "Category", dataType: "picklist", required: true, description: "eSIM/Transfer/Roaming/5G/Security/General" },
      { logicalName: "esim_priority", displayName: "Priority", dataType: "whole.number", required: true, description: "Display priority order" },
      { logicalName: "esim_language", displayName: "Language", dataType: "picklist", required: true, description: "en/my/zh" },
      { logicalName: "esim_last_updated", displayName: "Last Updated", dataType: "datetime", required: true, description: "Last update date" },
      { logicalName: "esim_view_count", displayName: "View Count", dataType: "whole.number", required: false, description: "Number of views" }
    ],
    relationships: []
  },
  {
    logicalName: "esim_certifications",
    displayName: "Certifications",
    description: "Company certifications and compliance records",
    columns: [
      { logicalName: "esim_cert_name", displayName: "Certification Name", dataType: "string", required: true, description: "Certification title" },
      { logicalName: "esim_cert_type", displayName: "Certification Type", dataType: "picklist", required: true, description: "GSMA/ISO/Regulatory/Security" },
      { logicalName: "esim_issuing_body", displayName: "Issuing Body", dataType: "string", required: true, description: "Certification authority" },
      { logicalName: "esim_issue_date", displayName: "Issue Date", dataType: "datetime", required: true, description: "Certification issue date" },
      { logicalName: "esim_expiry_date", displayName: "Expiry Date", dataType: "datetime", required: false, description: "Certification expiry date" },
      { logicalName: "esim_cert_number", displayName: "Certificate Number", dataType: "string", required: false, description: "Certificate reference number" },
      { logicalName: "esim_cert_document", displayName: "Certificate Document", dataType: "string", required: false, description: "Certificate file URL" }
    ],
    relationships: [
      { name: "esim_cert_company", relatedTable: "esim_company_info", type: "ManyToOne" }
    ]
  },
  {
    logicalName: "esim_regional_data",
    displayName: "Regional Data",
    description: "Myanmar regional and ASEAN market data",
    columns: [
      { logicalName: "esim_region_code", displayName: "Region Code", dataType: "string", required: true, description: "ISO region code" },
      { logicalName: "esim_region_name_en", displayName: "Region Name (EN)", dataType: "string", required: true, description: "English region name" },
      { logicalName: "esim_region_name_my", displayName: "Region Name (MY)", dataType: "string", required: false, description: "Myanmar region name" },
      { logicalName: "esim_population", displayName: "Population", dataType: "whole.number", required: false, description: "Regional population" },
      { logicalName: "esim_area_km2", displayName: "Area (km²)", dataType: "decimal", required: false, description: "Regional area" },
      { logicalName: "esim_capital_city", displayName: "Capital City", dataType: "string", required: false, description: "Regional capital" },
      { logicalName: "esim_time_zone", displayName: "Time Zone", dataType: "string", required: false, description: "Regional time zone" },
      { logicalName: "esim_market_potential", displayName: "Market Potential", dataType: "picklist", required: false, description: "High/Medium/Low" }
    ],
    relationships: [
      { name: "esim_regional_coverage", relatedTable: "esim_network_coverage", type: "OneToMany" }
    ]
  }
];

export class DataverseService {
  private baseUrl: string;
  private accessToken: string;

  constructor(environmentUrl: string, token: string) {
    this.baseUrl = `${environmentUrl}/api/data/v9.2`;
    this.accessToken = token;
  }

  private getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0'
    };
  }

  public async getCompanyInfo(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/esim_company_infos`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  public async getNetworkCoverage(region?: string): Promise<any> {
    let url = `${this.baseUrl}/esim_network_coverages`;
    if (region) {
      url += `?$filter=esim_region_name eq '${region}'`;
    }
    const response = await fetch(url, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  public async getDeviceCompatibility(brand?: string): Promise<any> {
    let url = `${this.baseUrl}/esim_device_compatibilities`;
    if (brand) {
      url += `?$filter=esim_device_brand eq '${brand}'`;
    }
    const response = await fetch(url, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  public async getPartners(type?: string): Promise<any> {
    let url = `${this.baseUrl}/esim_partners`;
    if (type) {
      url += `?$filter=esim_partner_type eq '${type}'`;
    }
    const response = await fetch(url, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  public async getNewsArticles(language: string = 'en', limit: number = 10): Promise<any> {
    const url = `${this.baseUrl}/esim_news_articles?$filter=esim_language eq '${language}' and esim_status eq 'Published'&$orderby=esim_publish_date desc&$top=${limit}`;
    const response = await fetch(url, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  public async getFAQItems(category?: string, language: string = 'en'): Promise<any> {
    let url = `${this.baseUrl}/esim_faq_items?$filter=esim_language eq '${language}'`;
    if (category) {
      url += ` and esim_category eq '${category}'`;
    }
    url += '&$orderby=esim_priority asc';
    
    const response = await fetch(url, {
      headers: this.getHeaders()
    });
    return response.json();
  }
}