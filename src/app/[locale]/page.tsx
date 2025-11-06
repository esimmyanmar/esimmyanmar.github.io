'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Background3D from '@/components/animations/Background3D';
import Hero from '@/components/sections/Hero';
import EaaSFeatures from '@/components/sections/EaaSFeatures';
import Partners from '@/components/sections/Partners';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const params = useParams();
  const locale = params.locale as string;
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
        <Hero locale={locale} />
        <EaaSFeatures locale={locale} />
        <Partners locale={locale} />
      </div>
      <div className="watermark" />
    </div>
  );
}