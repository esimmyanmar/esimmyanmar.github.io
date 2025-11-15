import React, { useState } from 'react';
import Head from 'next/head';
import { Question, Phone, Mail, Chat, Book, CheckmarkCircle, Info, PersonFeedback } from '@fluentui/react-icons';

const SupportPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const supportCategories = [
    { id: 'general', name: 'General', icon: Info },
    { id: 'activation', name: 'Activation', icon: CheckmarkCircle },
    { id: 'technical', name: 'Technical', icon: Question },
    { id: 'billing', name: 'Billing', icon: Mail },
    { id: 'roaming', name: 'Roaming', icon: Phone }
  ];

  const faqData = {
    general: [
      {
        id: 1,
        question: 'What is eSIM Myanmar?',
        questionMy: 'eSIM Myanmar ဆိုတာ ဘာလဲ?',
        questionZh: '什么是eSIM Myanmar？',
        answer: 'eSIM Myanmar is a premium digital SIM service providing ultra-fast 5G connectivity across Myanmar and ASEAN with entertainment server capabilities.',
        answerMy: 'eSIM Myanmar သည် မြန်မာနိုင်ငံနှင့် အာဆီယံတစ်ဝှမ်းတွင် အလွန်မြန်ဆန်သော 5G ချိတ်ဆက်မှုကို ဖျော်ဖြေရေးဆာဗာ စွမးရည်များနှင့်အတူ ပေးဆောင်သည့် ပရီမီယံ ဒစ်ဂျစ်တယ် SIM ဝန်ဆောင်မှုဖြစ်သည်။',
        answerZh: 'eSIM Myanmar是一项优质数字SIM服务，在缅甸和东盟地区提供超快5G连接和娱乐服务器功能。'
      },
      {
        id: 2,
        question: 'How fast is the 5G network?',
        questionMy: '5G ကွန်ယက် ဘယ်လောက်မြန်လဲ?',
        questionZh: '5G网络有多快？',
        answer: 'Our 5G network delivers up to 10Gbps download speeds with ultra-low latency under 20ms for premium entertainment streaming.',
        answerMy: 'ကျွန်ုပ်တို့၏ 5G ကွန်ယက်သည် ပရီမီယံ ဖျော်ဖြေရေး streaming အတွက် 20ms အောက်တွင် အလွန်နိမ့်သော latency နှင့်အတူ 10Gbps အထိ download အမြန်နှုန်းကို ပေးဆောင်သည်။',
        answerZh: '我们的5G网络提供高达10Gbps的下载速度，超低延迟低于20ms，适合优质娱乐流媒体。'
      },
      {
        id: 3,
        question: 'Which countries support roaming?',
        questionMy: 'ဘယ်နိုင်ငံတွေမှာ roaming ရနိုင်လဲ?',
        questionZh: '哪些国家支持漫游？',
        answer: 'eSIM Myanmar supports roaming in 200+ countries worldwide, with seamless connectivity across all ASEAN member states.',
        answerMy: 'eSIM Myanmar သည် ကမ္ဘာတစ်ဝှမ်းရှိ နိုင်ငံ ၂၀၀ ကျော်တွင် roaming ကို ပံ့ပိုးပေးပြီး အာဆီယံအဖွဲ့ဝင်နိုင်ငံများတွင် ချောမွေ့သော ချိတ်ဆက်မှုရှိသည်။',
        answerZh: 'eSIM Myanmar支持在全球200多个国家漫游，在所有东盟成员国都有无缝连接。'
      }
    ],
    activation: [
      {
        id: 4,
        question: 'How do I activate my eSIM?',
        questionMy: 'ကျွန်တော့် eSIM ကို ဘယ်လို activate လုပ်မလဲ?',
        questionZh: '如何激活我的eSIM？',
        answer: 'Simply scan the QR code provided after purchase. Your eSIM will activate automatically within 60 seconds.',
        answerMy: 'ဝယ်ယူပြီးနောက် ပေးထားသော QR code ကို scan လုပ်ရုံပါပဲ။ သင့် eSIM သည် ၆၀ စက္ကန့်အတွင်း အလိုအလျောက် activate ဖြစ်သွားမည်။',
        answerZh: '只需扫描购买后提供的二维码。您的eSIM将在60秒内自动激活。'
      },
      {
        id: 5,
        question: 'Can I transfer my existing number?',
        questionMy: 'ရှိပြီးသား နံပါတ်ကို transfer လုပ်လို့ရလား?',
        questionZh: '我可以转移现有号码吗？',
        answer: 'Yes, you can port your existing Myanmar mobile number to eSIM Myanmar while keeping all your contacts and services.',
        answerMy: 'ရပါတယ်၊ သင့်ရှိပြီးသား မြန်မာ မိုဘိုင်းနံပါတ်ကို သင့် contacts နှင့် ဝန်ဆောင်မှုများအားလုံးကို ထိန်းသိမ်းထားရင်း eSIM Myanmar သို့ port လုပ်နိုင်ပါတယ်။',
        answerZh: '是的，您可以将现有的缅甸手机号码转移到eSIM Myanmar，同时保留所有联系人和服务。'
      }
    ],
    technical: [
      {
        id: 6,
        question: 'What devices are compatible?',
        questionMy: 'ဘယ် device တွေနဲ့ compatible လဲ?',
        questionZh: '哪些设备兼容？',
        answer: 'eSIM Myanmar works with iPhone 12 and newer, iPad Pro, Apple Watch, Samsung Galaxy S20+, Google Pixel 4+, and 100+ other devices.',
        answerMy: 'eSIM Myanmar သည် iPhone 12 နှင့် အသစ်များ၊ iPad Pro၊ Apple Watch၊ Samsung Galaxy S20+၊ Google Pixel 4+ နှင့် အခြား device ၁၀၀ ကျော်နှင့် အလုပ်လုပ်ပါတယ်။',
        answerZh: 'eSIM Myanmar适用于iPhone 12及更新版本、iPad Pro、Apple Watch、Samsung Galaxy S20+、Google Pixel 4+和其他100多种设备。'
      },
      {
        id: 7,
        question: 'How do I troubleshoot connection issues?',
        questionMy: 'Connection ပြဿနာတွေကို ဘယ်လို ဖြေရှင်းမလဲ?',
        questionZh: '如何解决连接问题？',
        answer: 'Try restarting your device, checking network settings, or contact our 24/7 technical support team for immediate assistance.',
        answerMy: 'သင့် device ကို restart လုပ်ကြည့်ပါ၊ network settings တွေကို စစ်ကြည့်ပါ၊ သို့မဟုတ် ချက်ချင်း အကူညီအတွက် ကျွန်ုပ်တို့၏ ၂၄/၇ technical support team ကို ဆက်သွယ်ပါ။',
        answerZh: '尝试重启设备、检查网络设置，或联系我们的24/7技术支持团队获得即时帮助。'
      }
    ],
    billing: [
      {
        id: 8,
        question: 'What payment methods are accepted?',
        questionMy: 'ဘယ် payment method တွေကို လက်ခံလဲ?',
        questionZh: '接受哪些付款方式？',
        answer: 'We accept KBZ Pay, Wave Money, AYA Pay, and major credit cards through our secure Microsoft payment system.',
        answerMy: 'ကျွန်ုပ်တို့သည် ကျွန်ုပ်တို့၏ လုံခြုံသော Microsoft payment system မှတစ်ဆင့် KBZ Pay၊ Wave Money၊ AYA Pay နှင့် အဓိက credit card များကို လက်ခံပါတယ်။',
        answerZh: '我们通过安全的Microsoft支付系统接受KBZ Pay、Wave Money、AYA Pay和主要信用卡。'
      }
    ],
    roaming: [
      {
        id: 9,
        question: 'Are there additional roaming charges?',
        questionMy: 'Roaming အတွက် အပိုကြေးရှိလား?',
        questionZh: '有额外的漫游费用吗？',
        answer: 'No additional charges for roaming within ASEAN countries. Standard rates apply for other international destinations.',
        answerMy: 'အာဆီယံနိုင်ငံများအတွင်း roaming အတွက် အပိုကြေးမရှိပါ။ အခြား နိုင်ငံတကာ နေရာများအတွက် standard rate များ သက်ဆိုင်ပါတယ်။',
        answerZh: '在东盟国家内漫游无额外费用。其他国际目的地适用标准费率。'
      }
    ]
  };

  const contactMethods = [
    {
      id: 'phone',
      title: 'Phone Support',
      titleMy: 'ဖုန်း အကူအညီ',
      titleZh: '电话支持',
      description: '24/7 technical support hotline',
      descriptionMy: '၂၄/၇ နည်းပညာ အကူအညီ ဖုန်းလိုင်း',
      descriptionZh: '24/7技术支持热线',
      contact: '09650000172',
      icon: Phone,
      available: '24/7'
    },
    {
      id: 'email',
      title: 'Email Support',
      titleMy: 'အီးမေးလ် အကူအညီ',
      titleZh: '邮件支持',
      description: 'Get detailed help via email',
      descriptionMy: 'အီးမေးလ်မှတစ်ဆင့် အသေးစိတ် အကူအညီရယူပါ',
      descriptionZh: '通过邮件获得详细帮助',
      contact: 'support@esim.com.mm',
      icon: Mail,
      available: 'Response within 2 hours'
    },
    {
      id: 'chat',
      title: 'Live Chat',
      titleMy: 'တိုက်ရိုက် စကားပြော',
      titleZh: '在线聊天',
      description: 'Instant chat with our support team',
      descriptionMy: 'ကျွန်ုပ်တို့၏ အကူအညီအဖွဲ့နှင့် ချက်ချင်း စကားပြောပါ',
      descriptionZh: '与我们的支持团队即时聊天',
      contact: 'Start Chat',
      icon: Chat,
      available: 'Online now'
    },
    {
      id: 'copilot',
      title: 'AI Assistant',
      titleMy: 'AI လက်ထောက်',
      titleZh: 'AI助手',
      description: 'Get instant answers from our AI',
      descriptionMy: 'ကျွန်ုပ်တို့၏ AI မှ ချက်ချင်း အဖြေများရယူပါ',
      descriptionZh: '从我们的AI获得即时答案',
      contact: 'Ask AI',
      icon: PersonFeedback,
      available: 'Always available'
    }
  ];

  const currentFaqs = faqData[selectedCategory] || [];

  return (
    <>
      <Head>
        <title>Support Center - eSIM Myanmar Help & Customer Service</title>
        <meta name="description" content="Get help with eSIM Myanmar services. 24/7 support, FAQ, setup guides, and technical assistance for all your eSIM needs." />
        <meta name="keywords" content="eSIM support, customer service, help center, FAQ, technical support, Myanmar eSIM help" />
        <meta property="og:title" content="Support Center - eSIM Myanmar" />
        <meta property="og:description" content="24/7 customer support and help center" />
        <link rel="canonical" href="https://esim.com.mm/support" />
      </Head>

      <div className="min-h-screen bg-background">
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-accent/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                  <span className="text-background font-bold text-lg">e</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-primary">eSIM Myanmar</span>
                  <span className="text-xs text-secondary">Support Center</span>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="/" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Home</a>
                <a href="/entertainment" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Entertainment</a>
                <a href="/coverage" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Coverage</a>
                <a href="/devices" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Devices</a>
                <a href="/support" className="text-accent font-medium">Support</a>
              </nav>
            </div>
          </div>
        </header>

        <section className="pt-20 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-blue-500/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-display font-bold mb-6">Support Center</h1>
              <p className="text-subtitle max-w-3xl mx-auto mb-8">
                Get help with your eSIM Myanmar services. Our 24/7 support team is here to assist you with setup, troubleshooting, and any questions.
              </p>

              <div className="glass p-4 rounded-2xl max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <CheckmarkCircle className="w-4 h-4 text-accent" />
                  <span className="text-secondary">
                    Average response time: Under 2 minutes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8 mb-16">
              {contactMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <div key={method.id} className="card text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-title font-semibold mb-2">{method.title}</h3>
                    <p className="text-caption mb-4">{method.description}</p>
                    <div className="text-lg font-bold text-accent mb-2">{method.contact}</div>
                    <div className="text-xs text-secondary">{method.available}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* FAQ Categories */}
              <div className="lg:col-span-1">
                <h2 className="text-headline font-bold mb-6">FAQ Categories</h2>
                <div className="space-y-3">
                  {supportCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl font-medium transition-all duration-300 text-left ${
                          selectedCategory === category.id
                            ? 'glass-elevated text-accent border-accent'
                            : 'glass-subtle text-secondary hover:text-primary hover:glass'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 glass p-6 rounded-2xl">
                  <h3 className="text-title font-semibold mb-4 flex items-center gap-2">
                    <Book className="w-5 h-5 text-accent" />
                    Quick Links
                  </h3>
                  <div className="space-y-3">
                    <a href="/devices" className="block text-sm text-secondary hover:text-accent transition-colors duration-200">
                      Device Compatibility Guide
                    </a>
                    <a href="/coverage" className="block text-sm text-secondary hover:text-accent transition-colors duration-200">
                      Network Coverage Map
                    </a>
                    <a href="/speed-test" className="block text-sm text-secondary hover:text-accent transition-colors duration-200">
                      Network Speed Test
                    </a>
                    <a href="/entertainment" className="block text-sm text-secondary hover:text-accent transition-colors duration-200">
                      Entertainment Setup Guide
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQ Content */}
              <div className="lg:col-span-2">
                <h2 className="text-headline font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {currentFaqs.map((faq) => (
                    <div key={faq.id} className="glass rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/5 transition-colors duration-200"
                      >
                        <h3 className="text-title font-semibold pr-4">{faq.question}</h3>
                        <div className={`transform transition-transform duration-200 ${expandedFaq === faq.id ? 'rotate-180' : ''}`}>
                          <Question className="w-5 h-5 text-accent" />
                        </div>
                      </button>
                      
                      {expandedFaq === faq.id && (
                        <div className="px-6 pb-6 border-t border-accent/20">
                          <div className="pt-4 space-y-4">
                            <p className="text-secondary">{faq.answer}</p>
                            
                            {/* Multi-language support */}
                            <div className="space-y-2">
                              <details className="group">
                                <summary className="cursor-pointer text-sm text-accent hover:text-accent/80 transition-colors duration-200">
                                  မြန်မာဘာသာ
                                </summary>
                                <p className="mt-2 text-sm text-secondary font-myanmar">{faq.answerMy}</p>
                              </details>
                              
                              <details className="group">
                                <summary className="cursor-pointer text-sm text-accent hover:text-accent/80 transition-colors duration-200">
                                  中文
                                </summary>
                                <p className="mt-2 text-sm text-secondary font-chinese">{faq.answerZh}</p>
                              </details>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {currentFaqs.length === 0 && (
                  <div className="glass-elevated p-12 rounded-3xl text-center">
                    <Question className="w-16 h-16 text-accent mx-auto mb-4" />
                    <h3 className="text-title font-semibold mb-2">No FAQs Available</h3>
                    <p className="text-caption mb-6">
                      We're working on adding more frequently asked questions for this category.
                    </p>
                    <button className="btn btn-primary">
                      Contact Support
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-transparent to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-headline font-bold mb-4">Still Need Help?</h2>
              <p className="text-subtitle max-w-3xl mx-auto">
                Our expert support team is available 24/7 to help you with any questions or issues
              </p>
            </div>

            <div className="glass-elevated p-8 rounded-3xl max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-headline font-bold mb-4">Premium Support</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckmarkCircle className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary mb-1">24/7 Availability</h4>
                        <p className="text-sm text-secondary">Round-the-clock support in multiple languages</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckmarkCircle className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Expert Technicians</h4>
                        <p className="text-sm text-secondary">Certified eSIM and 5G network specialists</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckmarkCircle className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Remote Assistance</h4>
                        <p className="text-sm text-secondary">Screen sharing and remote device configuration</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="aspect-square bg-gradient-to-br from-accent/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                    <PersonFeedback className="w-24 h-24 text-accent" />
                  </div>
                  <div className="space-y-3">
                    <button className="btn btn-primary btn-large w-full">
                      <Phone className="w-5 h-5" />
                      Call Support Now
                    </button>
                    <button className="btn btn-secondary btn-large w-full">
                      <Chat className="w-5 h-5" />
                      Start Live Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-accent/20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-background font-bold">e</span>
                </div>
                <span className="text-lg font-semibold">eSIM Myanmar</span>
              </div>
              <p className="text-caption max-w-2xl mx-auto">
                24/7 premium support for all your eSIM and entertainment needs
              </p>
              <div className="flex items-center justify-center gap-8 text-sm text-secondary">
                <span>esim.com.mm</span>
                <span>info@esim.com.mm</span>
                <span>09650000172</span>
                <span>@eSIMMyanmar</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SupportPage;