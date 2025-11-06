'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Shield, CheckCircle } from 'lucide-react';
import Background3D from '@/components/animations/Background3D';
import { useTranslations } from '@/lib/translations';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations(locale);
  const sectionRef = useRef<HTMLDivElement>(null);


  const partnerCategories = [
    {
      title: t('partners.telecom.title'),
      partners: [
        { 
          name: t('partners.telecom.atom'), 
          url: 'https://atom.com.mm', 
          description: 'Leading telecommunications provider with nationwide 4G/5G coverage',
          logo: 'atom',
          eaasIntegrated: true
        },
        { 
          name: t('partners.telecom.mytel'), 
          url: 'https://mytel.com.mm', 
          description: 'Premium mobile network operator with advanced eSIM capabilities',
          logo: 'mytel',
          eaasIntegrated: true
        },
        { 
          name: t('partners.telecom.mpt'), 
          url: 'https://mpt.com.mm', 
          description: 'Myanmar\'s largest telecommunications company with extensive rural coverage',
          logo: 'mpt',
          eaasIntegrated: true
        },
        { 
          name: t('partners.telecom.u9'), 
          url: 'https://u9.com.mm', 
          description: 'Next-generation telecom provider with cutting-edge eSIM technology',
          logo: 'u9',
          eaasIntegrated: true
        }
      ]
    },
    {
      title: t('partners.financial.title'),
      partners: [
        { 
          name: t('partners.financial.aya'), 
          url: 'https://ayabank.com', 
          description: 'Leading commercial bank with digital banking solutions',
          logo: 'aya-bank',
          eaasIntegrated: false
        },
        { 
          name: t('partners.financial.uab'), 
          url: 'https://uab.com.mm', 
          description: 'United Amara Bank with comprehensive financial services',
          logo: 'uab-bank',
          eaasIntegrated: false
        }
      ]
    },
    {
      title: t('partners.payment.title'),
      partners: [
        { 
          name: t('partners.payment.wavepay'), 
          url: 'https://wavemoney.com.mm', 
          description: 'Digital wallet and mobile payment platform',
          logo: 'wavepay',
          eaasIntegrated: true
        },
        { 
          name: t('partners.payment.ayapay'), 
          url: 'https://ayapay.com', 
          description: 'AYA Bank digital payment solution',
          logo: 'ayapay',
          eaasIntegrated: true
        },
        { 
          name: t('partners.payment.uabpay'), 
          url: 'https://uabpay.com.mm', 
          description: 'UAB Bank mobile payment service',
          logo: 'uabpay',
          eaasIntegrated: true
        },
        { 
          name: t('partners.payment.mmqr'), 
          url: 'https://myanmarpay.com.mm', 
          description: 'Myanmar QR payment standard',
          logo: 'mmqr',
          eaasIntegrated: true
        },
        { 
          name: t('partners.payment.mpu'), 
          url: 'https://myanmarpaymentunion.com', 
          description: 'Myanmar Payment Union network',
          logo: 'mpu',
          eaasIntegrated: false
        },
        { 
          name: t('partners.payment.upi'), 
          url: 'https://npci.org.in/upi', 
          description: 'Unified Payments Interface integration',
          logo: 'upi',
          eaasIntegrated: false
        },
        { 
          name: t('partners.payment.visa'), 
          url: 'https://visa.com', 
          description: 'Global payment technology company',
          logo: 'visa',
          eaasIntegrated: false
        },
        { 
          name: t('partners.payment.mastercard'), 
          url: 'https://mastercard.com', 
          description: 'Worldwide payment solutions provider',
          logo: 'mastercard',
          eaasIntegrated: false
        }
      ]
    },
    {
      title: t('partners.digital.title'),
      partners: [
        { 
          name: t('partners.digital.activ'), 
          url: 'https://activdigitalmarketing.com', 
          description: 'Digital marketing and brand strategy consultancy',
          logo: 'activ',
          eaasIntegrated: false
        },
        { 
          name: t('partners.digital.netlync'), 
          url: 'https://netlync.com', 
          description: 'Entitlements-as-a-Service platform provider',
          logo: 'netlync',
          eaasIntegrated: true
        }
      ]
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo('.partner-category',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      }
    );


  }, []);

  const renderLogo = (logo: string, name: string) => {
    switch (logo) {
      case 'u9':
        return (
          <svg viewBox="0 0 120 40" className="w-full h-full" fill="#00ffff">
            <text x="10" y="25" fontSize="20" fontWeight="bold">U9</text>
          </svg>
        );
      case 'aya-bank':
        return (
          <svg viewBox="0 0 60 60" className="w-full h-full">
            <circle cx="30" cy="30" r="25" fill="#007BFF" />
            <text x="30" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">AYA</text>
          </svg>
        );
      case 'uab-bank':
        return (
          <svg viewBox="0 0 60 60" className="w-full h-full">
            <rect x="5" y="15" width="50" height="30" rx="5" fill="#28A745" />
            <text x="30" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">UAB</text>
          </svg>
        );
      case 'wavepay':
        return (
          <svg viewBox="0 0 60 60" className="w-full h-full">
            <path d="M10 30 Q20 20 30 30 T50 30" stroke="#00ffff" strokeWidth="3" fill="none" />
            <circle cx="30" cy="30" r="20" stroke="#00ffff" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'activ':
        return (
          <svg viewBox="0 0 60 60" className="w-full h-full">
            <circle cx="30" cy="20" r="8" fill="#FFD700" />
            <path d="M30 28 L25 45 L35 45 Z" fill="#FFD700" />
            <text x="30" y="55" textAnchor="middle" fill="#FFD700" fontSize="8">Activ</text>
          </svg>
        );
      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">
              {name.substring(0, 3).toUpperCase()}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen relative">
      <Background3D />
      <div className="relative z-10">
        
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                {t('partners.title')}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {locale === 'my' ? 'ကျွန်ုပ်တိ့များရှိ ယုံကြည်အားထားခံရသည် လုပ်ဖောင်ကိုင်များသည် eSIM ဖွင့်အဖွင့်မှုနှင့် အဖွဲ့ကြီးမှုကို အဆိုးပြည်ဆေးကောင်းပါပါ။' : 'Our ecosystem of trusted partners enables seamless eSIM activation and management across Myanmar and beyond.'}
              </p>
            </div>

            <div ref={sectionRef} className="space-y-16">
              {partnerCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="partner-category">
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gradient">
                    {category.title}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {category.partners.map((partner, index) => (
                      <a
                        key={index}
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="partner-card pearl-glass p-6 hover:scale-105 transition-all duration-300 group relative"
                      >
                        {partner.eaasIntegrated && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                        
                        <div className="w-16 h-16 mx-auto mb-4">
                          {renderLogo(partner.logo, partner.name)}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                          {partner.name}
                        </h3>
                        
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                          {partner.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <ExternalLink className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-cyan-400">Visit Site</span>
                          </div>
                          
                          {partner.eaasIntegrated && (
                            <div className="flex items-center space-x-1">
                              <Shield className="w-4 h-4 text-green-400" />
                              <span className="text-xs text-green-400">EaaS</span>
                            </div>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Partnership Benefits */}
            <div className="mt-20 text-center">
              <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gradient">
                  Partnership Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Secure Integration</h3>
                    <p className="text-sm text-gray-400">End-to-end encryption and GSMA compliance</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-400 to-teal-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Verified Partners</h3>
                    <p className="text-sm text-gray-400">All partners undergo rigorous verification</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Seamless Experience</h3>
                    <p className="text-sm text-gray-400">One-click activation across all partners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
      <div className="watermark" />
    </div>
  );
}