import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { EntertainmentHub } from '../components/entertainment/EntertainmentHub';
import { SpeedTest } from '../components/ui/SpeedTest';
import { CoverageMap } from '../components/ui/CoverageMap';
import { DeviceShowcase } from '../components/ui/DeviceShowcase';
import { FeatureGrid } from '../components/ui/FeatureGrid';
import { Play, Wifi, DeviceMobile, Globe, Shield, Zap } from '@fluentui/react-icons';

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: 'Premium Entertainment Server',
      titleMy: 'အရည်အသွေးမြင့် ဖျော်ဖြေရေးဆာဗာ',
      titleZh: '优质娱乐服务器',
      subtitle: 'Stream movies, TV shows, and games with lightning-fast 5G eSIM connectivity across Myanmar and ASEAN',
      subtitleMy: 'မြန်မာနိုင်ငံနှင့် အာဆီယံတစ်ဝှမ်းတွင် လျင်မြန်သော 5G eSIM ချိတ်ဆက်မှုဖြင့် ရုပ်ရှင်များ၊ တီဗီအစီအစဉ်များနှင့် ဂိမ်းများကို ကြည့်ရှုပါ',
      subtitleZh: '在缅甸和东盟地区通过闪电般快速的5G eSIM连接观看电影、电视节目和游戏',
      icon: Play,
      gradient: 'from-accent/20 to-purple-500/20'
    },
    {
      title: 'Global 5G Coverage',
      titleMy: 'ကမ္ဘာ့ 5G ကွန်ယက်',
      titleZh: '全球5G覆盖',
      subtitle: 'Experience ultra-fast connectivity in 200+ countries with our advanced eSIM technology',
      subtitleMy: 'ကျွန်ုပ်တို့၏ အဆင့်မြင့် eSIM နည်းပညာဖြင့် နိုင်ငံ ၂၀၀ ကျော်တွင် အလွန်မြန်ဆန်သော ချိတ်ဆက်မှုကို ခံစားပါ',
      subtitleZh: '通过我们先进的eSIM技术在200多个国家体验超快连接',
      icon: Globe,
      gradient: 'from-blue-500/20 to-accent/20'
    },
    {
      title: 'Enterprise Security',
      titleMy: 'လုပ်ငန်းအဆင့် လုံခြုံရေး',
      titleZh: '企业级安全',
      subtitle: 'Military-grade encryption and Zero Trust architecture protecting your entertainment experience',
      subtitleMy: 'သင့်ဖျော်ဖြေရေးအတွေ့အကြုံကို ကာကွယ်သည့် စစ်တပ်အဆင့် ကုဒ်ဝှက်ခြင်းနှင့် Zero Trust ဗိသုကာ',
      subtitleZh: '军用级加密和零信任架构保护您的娱乐体验',
      icon: Shield,
      gradient: 'from-green-500/20 to-accent/20'
    }
  ];

  const features = [
    {
      icon: Play,
      title: 'Entertainment Hub',
      titleMy: 'ဖျော်ဖြေရေးဗဟို',
      titleZh: '娱乐中心',
      description: 'Stream premium content with 4K HDR quality',
      descriptionMy: '4K HDR အရည်အသွေးဖြင့် ပရီမီယံအကြောင်းအရာများကို ကြည့်ရှုပါ',
      descriptionZh: '以4K HDR质量流式传输优质内容'
    },
    {
      icon: Wifi,
      title: '5G Ultra Speed',
      titleMy: '5G အလွန်မြန်ဆန်မှု',
      titleZh: '5G超高速',
      description: 'Up to 10Gbps download speeds nationwide',
      descriptionMy: 'နိုင်ငံတစ်ဝှမ်းတွင် 10Gbps အထိ ဒေါင်းလုဒ်အမြန်နှုန်း',
      descriptionZh: '全国范围内高达10Gbps的下载速度'
    },
    {
      icon: DeviceMobile,
      title: 'Multi-Device Support',
      titleMy: 'စက်ပစ္စည်းများစွာ ပံ့ပိုးမှု',
      titleZh: '多设备支持',
      description: 'iPhone, iPad, Android, and IoT devices',
      descriptionMy: 'iPhone၊ iPad၊ Android နှင့် IoT စက်ပစ္စည်းများ',
      descriptionZh: 'iPhone、iPad、Android和物联网设备'
    },
    {
      icon: Globe,
      title: 'Global Roaming',
      titleMy: 'ကမ္ဘာ့ ရိုမင်း',
      titleZh: '全球漫游',
      description: 'Seamless connectivity in 200+ countries',
      descriptionMy: 'နိုင်ငံ ၂၀၀ ကျော်တွင် ချောမွေ့သော ချိတ်ဆက်မှု',
      descriptionZh: '在200多个国家无缝连接'
    },
    {
      icon: Shield,
      title: 'Zero Trust Security',
      titleMy: 'Zero Trust လုံခြုံရေး',
      titleZh: '零信任安全',
      description: 'Advanced encryption and threat protection',
      descriptionMy: 'အဆင့်မြင့် ကုဒ်ဝှက်ခြင်းနှင့် ခြိမ်းခြောက်မှု ကာကွယ်ရေး',
      descriptionZh: '先进的加密和威胁防护'
    },
    {
      icon: Zap,
      title: 'Instant Activation',
      titleMy: 'ချက်ချင်း အသက်ဝင်ခြင်း',
      titleZh: '即时激活',
      description: 'QR code activation in under 60 seconds',
      descriptionMy: '၆၀ စက္ကန့်အောက်တွင် QR ကုဒ် အသက်ဝင်ခြင်း',
      descriptionZh: '60秒内二维码激活'
    }
  ];

  return (
    <>
      <Head>
        <title>eSIM Myanmar Entertainment Server - Premium 5G Streaming</title>
        <meta name="description" content="Premium entertainment server with 5G eSIM connectivity. Stream movies, TV shows, and games across Myanmar and ASEAN with ultra-fast speeds." />
        <meta name="keywords" content="eSIM Myanmar, 5G entertainment, streaming server, premium content, ASEAN connectivity" />
        <meta property="og:title" content="eSIM Myanmar Entertainment Server" />
        <meta property="og:description" content="Premium entertainment server with 5G eSIM connectivity across Myanmar and ASEAN" />
        <meta property="og:image" content="/images/og-entertainment-server.jpg" />
        <meta property="og:url" content="https://esim.com.mm" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://esim.com.mm" />
      </Head>

      <div className="min-h-screen bg-background">
        <Header transparent={true} />

        <section className="hero-section relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/80"></div>
          
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
              <div className={`space-y-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
                <div className="space-y-6">
                  <div className="dynamic-island inline-flex items-center gap-2 px-4 py-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Live Entertainment Server</span>
                  </div>
                  
                  <h1 className="text-display font-bold leading-tight">
                    {heroSlides[currentSlide].title}
                  </h1>
                  
                  <p className="text-subtitle max-w-2xl">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/entertainment" className="btn btn-primary btn-large">
                    <Play className="w-5 h-5" />
                    Start Streaming
                  </a>
                  <a href="/speed-test" className="btn btn-secondary btn-large">
                    <Wifi className="w-5 h-5" />
                    Test Speed
                  </a>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">50M+</div>
                    <div className="text-sm text-secondary">Users Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">200+</div>
                    <div className="text-sm text-secondary">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">99.9%</div>
                    <div className="text-sm text-secondary">Uptime</div>
                  </div>
                </div>
              </div>

              <div className={`relative ${isVisible ? 'slide-up' : 'opacity-0'}`}>
                <div className="glass-elevated p-8 rounded-3xl">
                  <div className="text-center space-y-4">
                    <h3 className="text-title font-semibold">Live Speed Test</h3>
                    <div className="w-32 h-32 mx-auto rounded-full border-4 border-accent/20 flex items-center justify-center">
                      <div className="text-2xl font-bold text-accent">10.2 Gbps</div>
                    </div>
                    <p className="text-caption">Ultra-fast 5G speeds available now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-accent' : 'bg-accent/30'
                }`}
              />
            ))}
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-headline font-bold mb-4">Entertainment Hub</h2>
              <p className="text-subtitle max-w-3xl mx-auto">
                Access premium movies, TV shows, live sports, and games with our high-performance entertainment server
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Movies', 'TV Shows', 'Live Sports', 'Games'].map((category) => (
                <div key={category} className="card hover:scale-105 transition-transform duration-300">
                  <div className="aspect-video bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-lg mb-4"></div>
                  <h3 className="text-title font-semibold mb-2">{category}</h3>
                  <p className="text-caption">Premium {category.toLowerCase()} content available 24/7</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-transparent to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-headline font-bold mb-4">Why Choose eSIM Myanmar</h2>
              <p className="text-subtitle max-w-3xl mx-auto">
                Experience the future of connectivity with our advanced eSIM technology and entertainment platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-title font-semibold mb-2">{feature.title}</h3>
                  <p className="text-caption">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-purple-500/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="glass-elevated p-12 rounded-3xl text-center max-w-4xl mx-auto">
              <h2 className="text-headline font-bold mb-6">Ready to Start Streaming?</h2>
              <p className="text-subtitle mb-8 max-w-2xl mx-auto">
                Join millions of users enjoying premium entertainment with eSIM Myanmar's ultra-fast 5G network
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/register" className="btn btn-primary btn-large">
                  Get Started Now
                </a>
                <a href="/entertainment" className="btn btn-secondary btn-large">
                  Explore Content
                </a>
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
                Premium entertainment server with 5G eSIM connectivity across Myanmar and ASEAN
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

export default HomePage;