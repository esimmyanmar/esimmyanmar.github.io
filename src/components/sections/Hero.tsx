'use client';

import { useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { CheckCircle, Zap, Shield } from 'lucide-react';

gsap.registerPlugin(TextPlugin);

export default function Hero() {
  const t = useTranslations();
  const locale = useLocale();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    // Text reveal animation
    tl.fromTo('.hero-title', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.hero-subtitle', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.hero-description', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo('.hero-cta', 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.2'
    );

    // Stats counter animation
    if (statsRef.current) {
      gsap.fromTo('.stat-number', 
        { textContent: 0 },
        {
          textContent: (i, target) => {
            const finalValue = target.getAttribute('data-value');
            return finalValue;
          },
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%'
          }
        }
      );
    }

    // Floating eSIM chip animation
    gsap.to('.hero-esim-chip', {
      rotationY: 360,
      duration: 8,
      repeat: -1,
      ease: 'none'
    });

    gsap.to('.hero-esim-chip', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative">
          {/* Floating eSIM chip */}
          <div className="hero-esim-chip absolute -top-20 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg shadow-2xl opacity-80" />
          
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-gradient no-select">
              {t('hero.title')}
            </span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-cyan-400 mb-8 font-medium">
            {t('hero.subtitle')}
          </p>
          
          <p className="hero-description text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href={`/${locale}/compatibility`}
              className="pearl-glass px-8 py-4 text-lg font-semibold text-white hover:scale-105 transition-all duration-300 flex items-center space-x-2 min-w-[200px] min-h-[48px]"
            >
              <CheckCircle className="w-5 h-5" />
              <span>{t('hero.cta')}</span>
            </Link>
            
            <Link
              href={`/${locale}/dashboard`}
              className="glass px-8 py-4 text-lg font-semibold text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300 flex items-center space-x-2 min-w-[200px] min-h-[48px]"
            >
              <Zap className="w-5 h-5" />
              <span>{t('nav.dashboard')}</span>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass p-6 text-center fade-in">
            <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
              <span className="stat-number" data-value="250000">0</span>+
            </div>
            <p className="text-gray-300">{t('hero.stats.activations')}</p>
          </div>
          
          <div className="glass p-6 text-center fade-in">
            <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
              <span className="stat-number" data-value="4">0</span>
            </div>
            <p className="text-gray-300">{t('hero.stats.carriers')}</p>
          </div>
          
          <div className="glass p-6 text-center fade-in">
            <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
              <span className="stat-number" data-value="99.9">0</span>%
            </div>
            <p className="text-gray-300">{t('hero.stats.uptime')}</p>
          </div>
        </div>

        {/* EaaS Badge */}
        <div className="mt-12 flex justify-center">
          <div className="pearl-glass px-6 py-3 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-gray-300">
              GSMA SGP.22 v4.0 Compliant
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}