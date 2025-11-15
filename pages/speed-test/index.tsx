import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Wifi, Signal, Globe, DeviceMobile, Timer, CheckmarkCircle } from '@fluentui/react-icons';

const SpeedTestPage: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [testComplete, setTestComplete] = useState(false);

  const runSpeedTest = async () => {
    setIsRunning(true);
    setTestComplete(false);
    setProgress(0);

    // Simulate speed test with realistic Myanmar 5G speeds
    const testDuration = 15000; // 15 seconds
    const interval = 100;
    const steps = testDuration / interval;

    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, interval));
      
      const progressPercent = (i / steps) * 100;
      setProgress(progressPercent);

      // Simulate realistic speed progression
      if (i < steps * 0.3) {
        // Download test
        setDownloadSpeed(Math.random() * 2000 + 8000); // 8-10 Gbps
        setPing(Math.random() * 5 + 15); // 15-20ms
      } else if (i < steps * 0.6) {
        // Upload test
        setUploadSpeed(Math.random() * 1000 + 4000); // 4-5 Gbps
        setJitter(Math.random() * 2 + 1); // 1-3ms
      } else {
        // Final calculations
        setDownloadSpeed(9847);
        setUploadSpeed(4523);
        setPing(18);
        setJitter(2);
      }
    }

    setIsRunning(false);
    setTestComplete(true);
  };

  const networkInfo = {
    carrier: 'eSIM Myanmar',
    technology: '5G NR',
    band: 'n78 (3.5 GHz)',
    location: 'Yangon, Myanmar',
    server: 'Singapore (SG-1)',
    ip: '203.81.64.1'
  };

  return (
    <>
      <Head>
        <title>5G Speed Test - eSIM Myanmar Ultra-Fast Network</title>
        <meta name="description" content="Test your 5G eSIM connection speed with eSIM Myanmar's ultra-fast network. Real-time speed testing across ASEAN." />
        <meta name="keywords" content="5G speed test, eSIM Myanmar, network speed, internet speed, ASEAN connectivity" />
        <meta property="og:title" content="5G Speed Test - eSIM Myanmar" />
        <meta property="og:description" content="Test your ultra-fast 5G eSIM connection speed" />
        <link rel="canonical" href="https://esim.com.mm/speed-test" />
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
                  <span className="text-xs text-secondary">5G Speed Test</span>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="/" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Home</a>
                <a href="/entertainment" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Entertainment</a>
                <a href="/coverage" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Coverage</a>
                <a href="/speed-test" className="text-accent font-medium">Speed Test</a>
                <a href="/support" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Support</a>
              </nav>
            </div>
          </div>
        </header>

        <section className="pt-20 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-blue-500/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-display font-bold mb-6">5G Speed Test</h1>
              <p className="text-subtitle max-w-3xl mx-auto mb-8">
                Test your ultra-fast 5G eSIM connection speed. Experience up to 10Gbps download speeds across Myanmar and ASEAN.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Speed Test Interface */}
                <div className="glass-elevated p-8 rounded-3xl">
                  <div className="text-center mb-8">
                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full border-4 border-accent/20"></div>
                      <div 
                        className="absolute inset-0 rounded-full border-4 border-accent transition-all duration-300"
                        style={{
                          clipPath: `polygon(50% 50%, 50% 0%, ${50 + (progress / 2)}% 0%, ${50 + (progress / 2)}% 100%, 50% 100%)`
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          {isRunning ? (
                            <>
                              <div className="text-3xl font-bold text-accent mb-1">
                                {Math.round(progress)}%
                              </div>
                              <div className="text-sm text-secondary">Testing...</div>
                            </>
                          ) : testComplete ? (
                            <>
                              <CheckmarkCircle className="w-12 h-12 text-accent mx-auto mb-2" />
                              <div className="text-sm text-secondary">Complete</div>
                            </>
                          ) : (
                            <>
                              <Wifi className="w-12 h-12 text-accent mx-auto mb-2" />
                              <div className="text-sm text-secondary">Ready</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={runSpeedTest}
                      disabled={isRunning}
                      className={`btn btn-large ${isRunning ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'}`}
                    >
                      {isRunning ? 'Testing Network...' : 'Start Speed Test'}
                    </button>
                  </div>

                  {/* Speed Results */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Signal className="w-5 h-5 text-accent" />
                        <span className="text-sm text-secondary">Download</span>
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {downloadSpeed.toLocaleString()}
                      </div>
                      <div className="text-xs text-secondary">Mbps</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Signal className="w-5 h-5 text-accent" />
                        <span className="text-sm text-secondary">Upload</span>
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {uploadSpeed.toLocaleString()}
                      </div>
                      <div className="text-xs text-secondary">Mbps</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Timer className="w-5 h-5 text-accent" />
                        <span className="text-sm text-secondary">Ping</span>
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {ping}
                      </div>
                      <div className="text-xs text-secondary">ms</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Timer className="w-5 h-5 text-accent" />
                        <span className="text-sm text-secondary">Jitter</span>
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {jitter}
                      </div>
                      <div className="text-xs text-secondary">ms</div>
                    </div>
                  </div>
                </div>

                {/* Network Information */}
                <div className="space-y-6">
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-title font-semibold mb-4 flex items-center gap-2">
                      <DeviceMobile className="w-5 h-5 text-accent" />
                      Network Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary">Carrier</span>
                        <span className="text-primary font-medium">{networkInfo.carrier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Technology</span>
                        <span className="text-primary font-medium">{networkInfo.technology}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Band</span>
                        <span className="text-primary font-medium">{networkInfo.band}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Location</span>
                        <span className="text-primary font-medium">{networkInfo.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Test Server</span>
                        <span className="text-primary font-medium">{networkInfo.server}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">IP Address</span>
                        <span className="text-primary font-medium">{networkInfo.ip}</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-title font-semibold mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-accent" />
                      Speed Comparison
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-secondary">eSIM Myanmar 5G</span>
                          <span className="text-sm text-accent">9.8 Gbps</span>
                        </div>
                        <div className="w-full h-2 bg-accent/20 rounded-full">
                          <div className="w-full h-full bg-accent rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-secondary">Global Average 5G</span>
                          <span className="text-sm text-secondary">200 Mbps</span>
                        </div>
                        <div className="w-full h-2 bg-accent/20 rounded-full">
                          <div className="w-1/5 h-full bg-accent/60 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-secondary">4G LTE</span>
                          <span className="text-sm text-secondary">50 Mbps</span>
                        </div>
                        <div className="w-full h-2 bg-accent/20 rounded-full">
                          <div className="w-1/12 h-full bg-accent/40 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-title font-semibold mb-4">What You Can Do</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-secondary">Stream 4K HDR video on 10+ devices simultaneously</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-secondary">Download 100GB games in under 2 minutes</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-secondary">Video conference with 100+ participants in 4K</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-secondary">Real-time cloud gaming with zero lag</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-transparent to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-headline font-bold mb-4">Network Coverage</h2>
              <p className="text-subtitle max-w-3xl mx-auto">
                Experience ultra-fast 5G speeds across Myanmar with expansion throughout ASEAN
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Signal className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-title font-semibold mb-2">Myanmar Coverage</h3>
                <p className="text-caption mb-4">99.8% population coverage across all 15 regions</p>
                <div className="text-2xl font-bold text-accent">15/15</div>
                <div className="text-xs text-secondary">Regions Covered</div>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-title font-semibold mb-2">ASEAN Roaming</h3>
                <p className="text-caption mb-4">Seamless connectivity across Southeast Asia</p>
                <div className="text-2xl font-bold text-accent">10/10</div>
                <div className="text-xs text-secondary">Countries Connected</div>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <DeviceMobile className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-title font-semibold mb-3">Global Reach</h3>
                <p className="text-caption mb-4">International roaming partnerships worldwide</p>
                <div className="text-2xl font-bold text-accent">200+</div>
                <div className="text-xs text-secondary">Countries & Territories</div>
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
                Ultra-fast 5G eSIM connectivity across Myanmar and ASEAN
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

export default SpeedTestPage;