'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Layer 2: Floating eSIM chips
    gsap.to('.esim-chip', {
      rotationY: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
      stagger: 2
    });

    // Layer 3: Signal waves
    gsap.to('.signal-wave', {
      scaleX: 1.5,
      scaleY: 0.8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5
    });

    // Layer 4: Myanmar map outline animation
    gsap.fromTo('.myanmar-map', 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { 
        strokeDashoffset: 0, 
        duration: 5, 
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 3
      }
    );

    // Layer 5: Particle field
    gsap.to('.particle', {
      x: 'random(-100, 100)',
      y: 'random(-100, 100)',
      rotation: 'random(0, 360)',
      duration: 'random(10, 20)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1
    });

    // Layer 6: Glass overlay animation
    gsap.to('.glass-overlay', {
      opacity: 'random(0.3, 0.7)',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Layer 7: Pearl overlay animation
    gsap.fromTo('.pearl-overlay', 
      { y: -50, opacity: 0.5 },
      {
        y: 0,
        opacity: 0.7,
        duration: 1.5,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      }
    );

    // Layer 8: Accent glow
    gsap.to('.accent-glow', {
      scale: 'random(1, 1.5)',
      opacity: 'random(0.5, 1)',
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 1
    });

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to('.floating-element', {
          y: progress * -100,
          rotation: progress * 180,
          duration: 0.3
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ perspective: '1500px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e2f3c] to-[#0a1a2a]" />
      
      <div className="absolute inset-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="esim-chip floating-element absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
              transform: `translateZ(${50 + i * 30}px)`
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="signal-wave absolute rounded-full border-2 border-cyan-400 opacity-20"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg width="300" height="400" viewBox="0 0 300 400" className="myanmar-map">
          <path
            d="M150 50 L200 100 L250 150 L230 200 L200 250 L150 300 L100 250 L70 200 L50 150 L100 100 Z"
            fill="none"
            stroke="#00ffff"
            strokeWidth="2"
            className="myanmar-map"
          />
        </svg>
      </div>

      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`
            }}
          />
        ))}
      </div>

      <div className="glass-overlay" />

      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="accent-glow absolute w-32 h-32 bg-cyan-400 rounded-full opacity-20 blur-3xl"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`
            }}
          />
        ))}
      </div>

      <div className="pearl-overlay" />
      
      <div className="transparent-layer" />
      
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(192, 192, 192, 0.1) 0%, transparent 50%)',
          mixBlendMode: 'multiply'
        }}
      />
    </div>
  );
}