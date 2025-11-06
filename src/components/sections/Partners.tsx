'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Partners() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLDivElement>(null);

  const partners = {
    telecom: [
      { name: t('partners.telecom.atom'), url: 'https://atom.com.mm', logo: 'atom.svg' },
      { name: t('partners.telecom.mytel'), url: 'https://mytel.com.mm', logo: 'mytel.svg' },
      { name: t('partners.telecom.mpt'), url: 'https://mpt.com.mm', logo: 'mpt.svg' },
      { name: t('partners.telecom.u9'), url: 'https://u9.com.mm', logo: 'u9.svg' }
    ],
    financial: [
      { name: t('partners.financial.aya'), url: 'https://ayabank.com', logo: 'aya-bank.svg' },
      { name: t('partners.financial.uab'), url: 'https://uab.com.mm', logo: 'uab-bank.svg' }
    ],
    payment: [
      { name: t('partners.payment.wavepay'), url: 'https://wavemoney.com.mm', logo: 'wavepay.svg' },
      { name: t('partners.payment.ayapay'), url: 'https://ayapay.com', logo: 'ayapay.svg' },
      { name: t('partners.payment.uabpay'), url: 'https://uabpay.com.mm', logo: 'uabpay.svg' },
      { name: t('partners.payment.mmqr'), url: 'https://myanmarpay.com.mm', logo: 'mmqr.svg' },
      { name: t('partners.payment.mpu'), url: 'https://myanmarpaymentunion.com', logo: 'mpu.svg' },
      { name: t('partners.payment.upi'), url: 'https://npci.org.in/upi', logo: 'upi.svg' },
      { name: t('partners.payment.visa'), url: 'https://visa.com', logo: 'visa.svg' },
      { name: t('partners.payment.mastercard'), url: 'https://mastercard.com', logo: 'mastercard.svg' }
    ],
    digital: [
      { name: t('partners.digital.activ'), url: 'https://activdigitalmarketing.com', logo: 'activ.svg' },
      { name: t('partners.digital.netlync'), url: 'https://netlync.com', logo: 'netlync.svg' }
    ]
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    // Stagger animation for partner cards
    gsap.fromTo('.partner-card',
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%'
        }
      }
    );

    // Hover animations with cleanup
    const cards = document.querySelectorAll('.partner-card');
    const handleMouseEnter = (card: Element) => () => {
      gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    };
    const handleMouseLeave = (card: Element) => () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };
    
    const listeners: Array<{ element: Element; enter: () => void; leave: () => void }> = [];
    
    cards.forEach(card => {
      const enterHandler = handleMouseEnter(card);
      const leaveHandler = handleMouseLeave(card);
      card.addEventListener('mouseenter', enterHandler);
      card.addEventListener('mouseleave', leaveHandler);
      listeners.push({ element: card, enter: enterHandler, leave: leaveHandler });
    });
    
    return () => {
      listeners.forEach(({ element, enter, leave }) => {
        element.removeEventListener('mouseenter', enter);
        element.removeEventListener('mouseleave', leave);
      });
    };

  }, []);

  const PartnerGrid = ({ title, partners }: { title: string; partners: any[] }) => (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-center mb-8 text-gradient">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {partners.map((partner, index) => (
          <a
            key={index}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="partner-card pearl-glass p-6 text-center hover:border-cyan-400 transition-all duration-300 group"
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              {partner.logo === 'u9.svg' ? (
                <svg viewBox="0 0 120 40" className="w-full h-full" fill="#00ffff">
                  <text x="10" y="25" fontSize="20" fontWeight="bold">U9</text>
                </svg>
              ) : partner.logo === 'aya-bank.svg' ? (
                <svg viewBox="0 0 60 60" className="w-full h-full">
                  <circle cx="30" cy="30" r="25" fill="#007BFF" />
                  <text x="30" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">AYA</text>
                </svg>
              ) : partner.logo === 'uab-bank.svg' ? (
                <svg viewBox="0 0 60 60" className="w-full h-full">
                  <rect x="5" y="15" width="50" height="30" rx="5" fill="#28A745" />
                  <text x="30" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">UAB</text>
                </svg>
              ) : partner.logo === 'wavepay.svg' ? (
                <svg viewBox="0 0 60 60" className="w-full h-full">
                  <path d="M10 30 Q20 20 30 30 T50 30" stroke="#00ffff" strokeWidth="3" fill="none" />
                  <circle cx="30" cy="30" r="20" stroke="#00ffff" strokeWidth="2" fill="none" />
                </svg>
              ) : partner.logo === 'activ.svg' ? (
                <svg viewBox="0 0 60 60" className="w-full h-full">
                  <circle cx="30" cy="20" r="8" fill="#FFD700" />
                  <path d="M30 28 L25 45 L35 45 Z" fill="#FFD700" />
                  <text x="30" y="55" textAnchor="middle" fill="#FFD700" fontSize="8">Activ</text>
                </svg>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">
                    {partner.name.substring(0, 3).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h4 className="text-sm font-medium text-gray-300 group-hover:text-cyan-400 transition-colors duration-200">
              {partner.name}
            </h4>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="hero-title text-3xl md:text-5xl font-bold mb-6 text-gradient">
            {t('partners.title')}
          </h2>
          <p className="hero-subtitle text-lg text-gray-300 max-w-2xl mx-auto">
            Trusted by leading telecommunications, financial, and payment providers across Myanmar
          </p>
        </div>

        <div className="space-y-16">
          <PartnerGrid 
            title={t('partners.telecom.title')} 
            partners={partners.telecom} 
          />
          
          <PartnerGrid 
            title={t('partners.financial.title')} 
            partners={partners.financial} 
          />
          
          <PartnerGrid 
            title={t('partners.payment.title')} 
            partners={partners.payment} 
          />
          
          <PartnerGrid 
            title={t('partners.digital.title')} 
            partners={partners.digital} 
          />
        </div>

        {/* EaaS Integration Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 pearl-glass px-6 py-3">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-gray-300">
              NetLync EaaS Integration Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}