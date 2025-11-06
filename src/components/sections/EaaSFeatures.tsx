'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Download, Settings, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EaaSFeaturesProps {
  locale?: string;
}

export default function EaaSFeatures({ locale = 'en' }: EaaSFeaturesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Smartphone,
      title: locale === 'my' ? 'အဖွင့်အမြို့ စိတ်ဆေးမှု' : 'Device Entitlement Check',
      description: locale === 'my' ? 'TAC အချက်ဆုံးမှုနှင့် RSP အဖွင့်အမြို့ စိတ်ဆေးမှု' : 'TAC validation and RSP eligibility verification with real-time carrier availability',
      step: '01'
    },
    {
      icon: Download,
      title: locale === 'my' ? 'ပရိုဖိုင် ဒေါင်လိုဒ်မှု' : 'Profile Download',
      description: locale === 'my' ? 'LPA QR ကိုဒ် အဖွင့်အမြို့နှင့် SM-DP+ ပရိုဖိုင် ဒေါင်လိုဒ်မှု' : 'LPA QR code generation and SM-DP+ profile download with activation binding',
      step: '02'
    },
    {
      icon: Settings,
      title: locale === 'my' ? 'မြုးပရိုဖိုင် အဖွဲ့ကြီးမှု' : 'Multi-Profile Management',
      description: locale === 'my' ? 'မြုး eSIM ပရိုဖိုင် အဖွဲ့ကြီးမှုနှင့် ဖွင့်/ပိတ်/ဖြက်ပြဲ့မှု' : 'Multiple eSIM profile management with enable/disable/delete lifecycle control',
      step: '03'
    },
    {
      icon: BarChart3,
      title: locale === 'my' ? 'အချိန်အချိန် အဖွဲ့ကြီးမှု' : 'Real-Time Monitoring',
      description: locale === 'my' ? 'အချိန်အချိန် အဖွဲ့ကြီးမှုနှင့် အဖွင့်အမြို့ အဖွင့်အမြို့ အဖွဲ့ကြီးမှု' : 'Live usage monitoring, quota management, and entitlement renewal automation',
      step: '04'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // Timeline animation for features
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1
      }
    });

    tl.fromTo('.feature-card',
      { opacity: 0, y: 100, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      }
    );

    // Step number animation
    gsap.fromTo('.step-number',
      { scale: 0, rotation: -180 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%'
        }
      }
    );

  }, []);

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            {locale === 'my' ? 'NetLync EaaS ပလက့ဖောင်' : 'NetLync EaaS Platform'}
          </h2>
          <p className="text-xl text-cyan-400 mb-4">
            {locale === 'my' ? 'Entitlements-as-a-Service အဖွင့်အမြို့ ပလက့ဖောင်' : 'Entitlements-as-a-Service Platform'}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card pearl-glass p-8 text-center relative group hover:scale-105 transition-all duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Step number */}
              <div className="step-number absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {feature.step}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 glass rounded-full flex items-center justify-center group-hover:bg-cyan-400 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-cyan-400 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* NetLync Branding */}
        <div className="mt-16 text-center">
          <div className="inline-block pearl-glass px-8 py-4">
            <p className="text-lg font-semibold text-gradient mb-2">
              Powered by NetLync
            </p>
            <p className="text-sm text-gray-400">
              The First. The Fastest. The Only.
            </p>
          </div>
        </div>

        {/* GSMA Compliance Badge */}
        <div className="mt-8 flex justify-center">
          <div className="glass px-6 py-3 flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold"></span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">GSMA Certified</p>
              <p className="text-xs text-gray-400">SGP.22 v4.0 & SGP.32 2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}