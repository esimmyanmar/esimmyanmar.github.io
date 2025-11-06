'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Background3D from '@/components/animations/Background3D';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import EaaSFeatures from '@/components/sections/EaaSFeatures';
import Partners from '@/components/sections/Partners';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        '.fade-in',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative">
      <Background3D />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <EaaSFeatures />
          <Partners />
        </main>
        <Footer />
      </div>
      <div className="watermark" />
    </div>
  );
}