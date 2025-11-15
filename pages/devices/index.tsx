import React, { useState } from 'react';
import Head from 'next/head';
import { DeviceMobile, Tablet, Watch, Desktop, CheckmarkCircle, Info, Download } from '@fluentui/react-icons';

const DevicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState(null);

  const deviceCategories = [
    { id: 'all', name: 'All Devices', icon: DeviceMobile },
    { id: 'smartphones', name: 'Smartphones', icon: DeviceMobile },
    { id: 'tablets', name: 'Tablets', icon: Tablet },
    { id: 'wearables', name: 'Wearables', icon: Watch },
    { id: 'iot', name: 'IoT Devices', icon: Desktop }
  ];

  const supportedDevices = [
    {
      id: 'iphone-15-pro',
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      category: 'smartphones',
      esimSupport: true,
      dualSim: true,
      maxSpeed: '10 Gbps',
      bands: ['n1', 'n3', 'n28', 'n78', 'n79'],
      image: '/images/iphone-15-pro.jpg',
      features: ['5G NR', 'VoLTE', 'Wi-Fi Calling', 'eSIM Transfer'],
      compatibility: 100
    },
    {
      id: 'iphone-14',
      name: 'iPhone 14 Series',
      brand: 'Apple',
      category: 'smartphones',
      esimSupport: true,
      dualSim: true,
      maxSpeed: '8 Gbps',
      bands: ['n1', 'n3', 'n28', 'n78'],
      image: '/images/iphone-14.jpg',
      features: ['5G NR', 'VoLTE', 'Wi-Fi Calling', 'eSIM Transfer'],
      compatibility: 100
    },
    {
      id: 'ipad-pro-m4',
      name: 'iPad Pro M4',
      brand: 'Apple',
      category: 'tablets',
      esimSupport: true,
      dualSim: false,
      maxSpeed: '12 Gbps',
      bands: ['n1', 'n3', 'n28', 'n78', 'n79'],
      image: '/images/ipad-pro-m4.jpg',
      features: ['5G NR', 'Ultra Wideband', 'Wi-Fi 7'],
      compatibility: 100
    },
    {
      id: 'apple-watch-ultra-2',
      name: 'Apple Watch Ultra 2',
      brand: 'Apple',
      category: 'wearables',
      esimSupport: true,
      dualSim: false,
      maxSpeed: '2 Gbps',
      bands: ['n1', 'n3', 'n28'],
      image: '/images/apple-watch-ultra-2.jpg',
      features: ['LTE', 'VoLTE', 'Emergency SOS'],
      compatibility: 95
    },
    {
      id: 'galaxy-s24-ultra',
      name: 'Galaxy S24 Ultra',
      brand: 'Samsung',
      category: 'smartphones',
      esimSupport: true,
      dualSim: true,
      maxSpeed: '10 Gbps',
      bands: ['n1', 'n3', 'n28', 'n78', 'n79'],
      image: '/images/galaxy-s24-ultra.jpg',
      features: ['5G NR', 'VoLTE', 'Wi-Fi Calling', 'Samsung Knox'],
      compatibility: 98
    },
    {
      id: 'pixel-8-pro',
      name: 'Pixel 8 Pro',
      brand: 'Google',
      category: 'smartphones',
      esimSupport: true,
      dualSim: true,
      maxSpeed: '9 Gbps',
      bands: ['n1', 'n3', 'n28', 'n78'],
      image: '/images/pixel-8-pro.jpg',
      features: ['5G NR', 'VoLTE', 'Wi-Fi Calling', 'Titan M Security'],
      compatibility: 96
    },
    {
      id: 'surface-pro-10',
      name: 'Surface Pro 10',
      brand: 'Microsoft',
      category: 'tablets',
      esimSupport: true,
      dualSim: false,
      maxSpeed: '8 Gbps',
      bands: ['n1', 'n3', 'n28', 'n78'],
      image: '/images/surface-pro-10.jpg',
      features: ['5G NR', 'Windows 11', 'Enterprise Security'],
      compatibility: 100
    },
    {
      id: 'galaxy-watch-6',
      name: 'Galaxy Watch 6 Classic',
      brand: 'Samsung',
      category: 'wearables',
      esimSupport: true,
      dualSim: false,
      maxSpeed: '1.5 Gbps',
      bands: ['n1', 'n3', 'n28'],
      image: '/images/galaxy-watch-6.jpg',
      features: ['LTE', 'VoLTE', 'Samsung Health'],
      compatibility: 92
    }
  ];

  const filteredDevices = supportedDevices.filter(device => 
    selectedCategory === 'all' || device.category === selectedCategory
  );

  const setupSteps = [
    {
      step: 1,
      title: 'Check Compatibility',
      description: 'Verify your device supports eSIM technology',
      icon: CheckmarkCircle
    },
    {
      step: 2,
      title: 'Purchase Plan',
      description: 'Choose your eSIM Myanmar data plan',
      icon: DeviceMobile
    },
    {
      step: 3,
      title: 'Scan QR Code',
      description: 'Use your device camera to scan the QR code',
      icon: Download
    },
    {
      step: 4,
      title: 'Activate Service',
      description: 'Your eSIM will activate automatically within 60 seconds',
      icon: CheckmarkCircle
    }
  ];

  return (
    <>
      <Head>
        <title>Supported Devices - eSIM Myanmar Compatible Devices</title>
        <meta name="description" content="Check eSIM compatibility for iPhone, iPad, Android, Samsung, Google Pixel, and other devices. Complete setup guide and device support." />
        <meta name="keywords" content="eSIM devices, iPhone eSIM, Android eSIM, iPad eSIM, Apple Watch, Samsung Galaxy, device compatibility" />
        <meta property="og:title" content="Supported Devices - eSIM Myanmar" />
        <meta property="og:description" content="Complete list of eSIM compatible devices and setup guide" />
        <link rel="canonical" href="https://esim.com.mm/devices" />
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
                  <span className="text-xs text-secondary">Supported Devices</span>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="/" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Home</a>
                <a href="/entertainment" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Entertainment</a>
                <a href="/coverage" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Coverage</a>
                <a href="/devices" className="text-accent font-medium">Devices</a>
                <a href="/support" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Support</a>
              </nav>
            </div>
          </div>
        </header>

        <section className="pt-20 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-500/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-display font-bold mb-6">Supported Devices</h1>
              <p className="text-subtitle max-w-3xl mx-auto mb-8">
                eSIM Myanmar works with all major smartphone, tablet, and wearable devices. Check compatibility and get setup instructions.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {deviceCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'glass-elevated text-accent border-accent'
                          : 'glass-subtle text-secondary hover:text-primary'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {category.name}
                    </button>
                  );
                })}
              </div>

              <div className="glass p-4 rounded-2xl max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Info className="w-4 h-4 text-accent" />
                  <span className="text-secondary">
                    All devices support instant eSIM activation and global roaming
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDevices.map((device) => (
                <div key={device.id} className="card group cursor-pointer" onClick={() => setSelectedDevice(device)}>
                  <div className="aspect-video bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DeviceMobile className="w-16 h-16 text-accent" />
                    </div>
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-accent text-background text-xs font-bold rounded-full">
                        eSIM Ready
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1 px-2 py-1 bg-background/80 rounded-full">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-xs text-primary">{device.compatibility}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-title font-semibold">{device.name}</h3>
                      <p className="text-sm text-secondary">{device.brand}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckmarkCircle className="w-4 h-4 text-accent" />
                        <span className="text-sm text-secondary">
                          {device.dualSim ? 'Dual eSIM' : 'Single eSIM'}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-accent">
                        {device.maxSpeed}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {device.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-accent/10 text-accent text-xs rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-accent/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary">5G Bands</span>
                        <span className="text-sm text-primary">{device.bands.length} supported</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-transparent to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-headline font-bold mb-4">eSIM Setup Process</h2>
              <p className="text-subtitle max-w-3xl mx-auto">
                Get your eSIM Myanmar activated in under 60 seconds with our simple setup process
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {setupSteps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.step} className="card text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center relative">
                      <IconComponent className="w-8 h-8 text-accent" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-background rounded-full flex items-center justify-center text-xs font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-title font-semibold mb-2">{step.title}</h3>
                    <p className="text-caption">{step.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 glass-elevated p-8 rounded-3xl max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-headline font-bold mb-4">Device Transfer Made Easy</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckmarkCircle className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary mb-1">eSIM Quick Transfer</h4>
                        <p className="text-sm text-secondary">Transfer your eSIM between iOS devices instantly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckmarkCircle className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Android to iPhone</h4>
                        <p className="text-sm text-secondary">Seamless migration from Android to iOS devices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckmarkCircle className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Multi-Device Support</h4>
                        <p className="text-sm text-secondary">Use the same plan across multiple devices</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="aspect-square bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
                    <DeviceMobile className="w-24 h-24 text-accent" />
                  </div>
                  <button className="btn btn-primary btn-large">
                    <Download className="w-5 h-5" />
                    Setup Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-headline font-bold mb-4">Device Categories</h2>
              <p className="text-subtitle max-w-3xl mx-auto">
                eSIM Myanmar supports all major device categories with optimized connectivity
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="card text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <DeviceMobile className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-title font-semibold mb-2">Smartphones</h3>
                <p className="text-caption mb-4">iPhone, Samsung Galaxy, Google Pixel, and more</p>
                <div className="text-2xl font-bold text-accent">50+</div>
                <div className="text-xs text-secondary">Models Supported</div>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Tablet className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-title font-semibold mb-2">Tablets</h3>
                <p className="text-caption mb-4">iPad Pro, Surface Pro, Galaxy Tab series</p>
                <div className="text-2xl font-bold text-accent">25+</div>
                <div className="text-xs text-secondary">Models Supported</div>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Watch className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-title font-semibold mb-2">Wearables</h3>
                <p className="text-caption mb-4">Apple Watch, Galaxy Watch, fitness trackers</p>
                <div className="text-2xl font-bold text-accent">15+</div>
                <div className="text-xs text-secondary">Models Supported</div>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Desktop className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-title font-semibold mb-2">IoT Devices</h3>
                <p className="text-caption mb-4">Industrial, automotive, and smart devices</p>
                <div className="text-2xl font-bold text-accent">100+</div>
                <div className="text-xs text-secondary">Device Types</div>
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
                Compatible with all major devices for seamless connectivity
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

export default DevicesPage;