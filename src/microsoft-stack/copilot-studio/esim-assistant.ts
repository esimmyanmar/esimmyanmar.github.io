interface CopilotConfig {
  botId: string;
  tenantId: string;
  environmentId: string;
  topics: CopilotTopic[];
  languages: string[];
}

interface CopilotTopic {
  id: string;
  name: string;
  triggerPhrases: string[];
  responses: CopilotResponse[];
  category: string;
}

interface CopilotResponse {
  language: string;
  text: string;
  adaptiveCard?: any;
}

export const ESIM_MYANMAR_COPILOT_CONFIG: CopilotConfig = {
  botId: "esim-myanmar-assistant",
  tenantId: "esimmyanmar.onmicrosoft.com",
  environmentId: "prod-esim-myanmar",
  languages: ["en", "my", "zh"],
  topics: [
    {
      id: "company-overview",
      name: "Company Overview",
      category: "company",
      triggerPhrases: [
        "tell me about esim myanmar",
        "company information",
        "who is esim myanmar",
        "company profile"
      ],
      responses: [
        {
          language: "en",
          text: "eSIM Myanmar Company Limited is Myanmar's leading enterprise eSIM provider, offering GSMA SGP.22 compliant solutions with 98.5% network coverage across all regions. We serve over 2 million customers with 24/7 support and partnerships with major telecom operators."
        },
        {
          language: "my", 
          text: "eSIM Myanmar Company Limited သည် မြန်မာနိုင်ငံ၏ ထိပ်တန်း enterprise eSIM ပံ့ပိုးပေးသူဖြစ်ပြီး GSMA SGP.22 စံနှုန်းနှင့်အညီ ဒေသအားလုံးတွင် 98.5% ကွန်ယက်လွှမ်းခြုံမှုဖြင့် ဝန်ဆောင်မှုများပေးပါသည်။"
        },
        {
          language: "zh",
          text: "eSIM Myanmar Company Limited 是缅甸领先的企业级eSIM提供商，提供符合GSMA SGP.22标准的解决方案，在所有地区拥有98.5%的网络覆盖率。"
        }
      ]
    },
    {
      id: "esim-technology",
      name: "eSIM Technology",
      category: "technology",
      triggerPhrases: [
        "what is esim",
        "esim technology",
        "how does esim work",
        "esim benefits"
      ],
      responses: [
        {
          language: "en",
          text: "eSIM (embedded SIM) is a digital SIM technology that eliminates the need for physical SIM cards. It allows remote provisioning, multiple operator profiles, and seamless switching between networks. Our eSIM solution supports 5G, VoLTE, and global roaming across 200+ countries."
        },
        {
          language: "my",
          text: "eSIM (embedded SIM) သည် ရုပ်ပိုင်းဆိုင်ရာ SIM ကတ်များမလိုအပ်သော ဒစ်ဂျစ်တယ် SIM နည်းပညာဖြစ်သည်။ ၎င်းသည် အဝေးမှ ပံ့ပိုးမှု၊ အများအပြား operator profiles နှင့် ကွန်ယက်များအကြား ချောမွေ့စွာ ပြောင်းလဲခြင်းကို ခွင့်ပြုသည်။"
        },
        {
          language: "zh", 
          text: "eSIM（嵌入式SIM）是一种数字SIM技术，无需物理SIM卡。它支持远程配置、多运营商配置文件和网络间无缝切换。我们的eSIM解决方案支持5G、VoLTE和200多个国家的全球漫游。"
        }
      ]
    },
    {
      id: "network-coverage",
      name: "Network Coverage",
      category: "coverage",
      triggerPhrases: [
        "network coverage",
        "coverage map",
        "myanmar coverage",
        "which areas covered"
      ],
      responses: [
        {
          language: "en",
          text: "Our network covers 98.5% of Myanmar with strong presence in all 14 regions and 1 union territory. Key coverage includes Yangon (99.2%), Mandalay (96.8%), Naypyitaw (99.5%), Bagan (94.3%), and expanding rural coverage. We partner with ATOM Myanmar, Mytel, MPT, and U9 Telecom for comprehensive coverage."
        },
        {
          language: "my",
          text: "ကျွန်ုပ်တို့၏ ကွန်ယက်သည် မြန်မာနိုင်ငံ၏ 98.5% ကို လွှမ်းခြုံထားပြီး ဒေသ ၁၄ ခုနှင့် ပြည်ထောင်စုနယ်မြေ ၁ ခုတွင် ခိုင်မာသော တည်ရှိမှုရှိသည်။"
        },
        {
          language: "zh",
          text: "我们的网络覆盖缅甸98.5%的地区，在所有14个省邦和1个联邦区都有强大的覆盖。主要覆盖包括仰光(99.2%)、曼德勒(96.8%)、内比都(99.5%)、蒲甘(94.3%)。"
        }
      ]
    },
    {
      id: "device-compatibility",
      name: "Device Compatibility", 
      category: "devices",
      triggerPhrases: [
        "supported devices",
        "compatible phones",
        "iphone esim",
        "android esim",
        "device compatibility"
      ],
      responses: [
        {
          language: "en",
          text: "We support 200+ eSIM-compatible devices including iPhone XS/XR and newer, iPad Pro/Air with cellular, Apple Watch Series 3+, Samsung Galaxy S20+, Google Pixel 3+, and major Android flagships. Full compatibility list available at esim.com.mm/devices"
        },
        {
          language: "my",
          text: "ကျွန်ုပ်တို့သည် iPhone XS/XR နှင့် အသစ်များ၊ cellular ပါသော iPad Pro/Air၊ Apple Watch Series 3+၊ Samsung Galaxy S20+၊ Google Pixel 3+ အပါအဝင် eSIM-compatible device ၂၀၀+ ကို ပံ့ပိုးပါသည်။"
        },
        {
          language: "zh",
          text: "我们支持200多种eSIM兼容设备，包括iPhone XS/XR及更新型号、带蜂窝功能的iPad Pro/Air、Apple Watch Series 3+、Samsung Galaxy S20+、Google Pixel 3+等主要Android旗舰机型。"
        }
      ]
    },
    {
      id: "contact-support",
      name: "Contact & Support",
      category: "support", 
      triggerPhrases: [
        "contact information",
        "customer support",
        "phone number",
        "email address",
        "how to contact"
      ],
      responses: [
        {
          language: "en",
          text: "Contact eSIM Myanmar: Email: info@esim.com.mm | Phone: 09650000172 | Website: esim.com.mm | Social: @eSIMMyanmar | 24/7 technical support available. CEO: Kaung Htet Paung"
        },
        {
          language: "my",
          text: "eSIM Myanmar ဆက်သွယ်ရန်: အီးမေးလ်: info@esim.com.mm | ဖုန်း: 09650000172 | ဝက်ဘ်ဆိုက်: esim.com.mm | လူမှုကွန်ယက်: @eSIMMyanmar | ၂၄/၇ နည်းပညာပံ့ပိုးမှု ရရှိနိုင်သည်။"
        },
        {
          language: "zh",
          text: "联系eSIM Myanmar：邮箱：info@esim.com.mm | 电话：09650000172 | 网站：esim.com.mm | 社交媒体：@eSIMMyanmar | 24/7技术支持。CEO：Kaung Htet Paung"
        }
      ]
    }
  ]
};

export class ESIMCopilotService {
  private config: CopilotConfig;

  constructor() {
    this.config = ESIM_MYANMAR_COPILOT_CONFIG;
  }

  public async initializeCopilot(): Promise<void> {
    const script = document.createElement('script');
    script.src = 'https://cdn.botframework.com/botframework-webchat/latest/webchat.js';
    script.onload = () => {
      this.renderCopilot();
    };
    document.head.appendChild(script);
  }

  private renderCopilot(): void {
    const webchatDiv = document.getElementById('esim-copilot');
    if (webchatDiv && (window as any).WebChat) {
      (window as any).WebChat.renderWebChat(
        {
          directLine: (window as any).WebChat.createDirectLine({
            token: process.env.NEXT_PUBLIC_COPILOT_TOKEN
          }),
          userID: 'anonymous-user',
          username: 'eSIM Myanmar Visitor',
          locale: 'en-US',
          styleOptions: {
            backgroundColor: 'rgba(30, 47, 60, 0.9)',
            primaryFont: 'Segoe UI, system-ui, sans-serif',
            accent: '#00ffff',
            cardEmphasisBackgroundColor: 'rgba(192, 192, 192, 0.1)',
            paddingRegular: 12,
            paddingWide: 16,
            borderRadius: 8,
            botAvatarBackgroundColor: '#00ffff',
            userAvatarBackgroundColor: '#1e2f3c'
          }
        },
        webchatDiv
      );
    }
  }

  public getTopicsByCategory(category: string): CopilotTopic[] {
    return this.config.topics.filter(topic => topic.category === category);
  }

  public searchTopics(query: string): CopilotTopic[] {
    const lowercaseQuery = query.toLowerCase();
    return this.config.topics.filter(topic =>
      topic.triggerPhrases.some(phrase => 
        phrase.toLowerCase().includes(lowercaseQuery)
      ) || topic.name.toLowerCase().includes(lowercaseQuery)
    );
  }
}