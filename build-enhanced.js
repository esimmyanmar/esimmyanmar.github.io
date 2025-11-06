const fs = require('fs');
const path = require('path');

const createEnhancedBuild = () => {
  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>eSIM Myanmar - NetLync Entitlements-as-a-Service® Platform</title>
  <meta name="description" content="eSIM Myanmar - NetLync Entitlements-as-a-Service® – The First. The Fastest. The Only. GSMA SGP.22 v4.0 compliant with 16 partner ecosystem integration.">
  <meta name="keywords" content="eSIM Myanmar, NetLync EaaS, GSMA SGP.22, U9 Telecom, ATOM Myanmar, Mytel, MPT, WavePay, MMQR">
  
  <!-- Security Headers -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';">
  <meta http-equiv="Strict-Transport-Security" content="max-age=63072000; includeSubDomains; preload">
  <meta http-equiv="X-Frame-Options" content="DENY">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
  <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()">
  
  <!-- Open Graph / Social Media -->
  <meta property="og:title" content="eSIM Myanmar - NetLync Entitlements-as-a-Service®">
  <meta property="og:description" content="The First. The Fastest. The Only. GSMA SGP.22 v4.0 compliant eSIM platform with 16 partner ecosystem.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://esimmyanmar.github.io">
  <meta property="og:site_name" content="eSIM Myanmar">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://esimmyanmar.github.io">
  
  <!-- Preload Critical Resources -->
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style">
  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" as="script">
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    /* Reset and Base Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }
    
    html, body {
      height: 100%;
      overflow-x: hidden;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #1e2f3c;
      color: #ffffff;
      line-height: 1.6;
      position: relative;
    }
    
    /* Pearl Glassmorphic Design System */
    .pearl-glass {
      background: rgba(192, 192, 192, 0.3);
      backdrop-filter: blur(20px) brightness(1.1);
      border: 1px solid rgba(0, 255, 255, 0.3);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
    }
    
    .glass-overlay {
      background: linear-gradient(45deg, 
        rgba(0, 255, 255, 0.1) 0%, 
        transparent 50%, 
        rgba(192, 192, 192, 0.1) 100%);
      mix-blend-mode: multiply;
      opacity: 0.7;
    }
    
    .pearl-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: 
        radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(192, 192, 192, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(30, 47, 60, 0.8) 0%, transparent 70%);
    }
    
    /* 8-Layer Background System */
    .background-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.1;
      animation: pearlShimmer 8s ease-in-out infinite;
    }
    
    .layer-1 { background: radial-gradient(circle, #00ffff 0%, transparent 70%); animation-delay: 0s; }
    .layer-2 { background: radial-gradient(circle, #c0c0c0 0%, transparent 70%); animation-delay: 1s; }
    .layer-3 { background: linear-gradient(45deg, #00ffff, transparent); animation-delay: 2s; }
    .layer-4 { background: linear-gradient(-45deg, #c0c0c0, transparent); animation-delay: 3s; }
    .layer-5 { background: conic-gradient(from 0deg, #00ffff, transparent, #c0c0c0); animation-delay: 4s; }
    .layer-6 { background: radial-gradient(ellipse, rgba(0,255,255,0.3), transparent); animation-delay: 5s; }
    .layer-7 { background: linear-gradient(90deg, rgba(192,192,192,0.2), transparent); animation-delay: 6s; }
    .layer-8 { background: radial-gradient(circle at 30% 70%, rgba(0,255,255,0.15), transparent); animation-delay: 7s; }
    
    @keyframes pearlShimmer {
      0%, 100% { opacity: 0.1; transform: scale(1) rotate(0deg); }
      50% { opacity: 0.3; transform: scale(1.05) rotate(180deg); }
    }
    
    /* Layout */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
      z-index: 1;
    }
    
    /* Header */
    .header {
      text-align: center;
      padding: 60px 0;
      position: relative;
    }
    
    .title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #00ffff, #c0c0c0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
    }
    
    .subtitle {
      font-size: clamp(1.1rem, 2.5vw, 1.5rem);
      color: #00ffff;
      margin-bottom: 15px;
      font-weight: 500;
    }
    
    .tagline {
      font-size: clamp(0.9rem, 2vw, 1.2rem);
      font-weight: 600;
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 30px;
    }
    
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 40px;
    }
    
    .stat {
      padding: 20px;
      text-align: center;
    }
    
    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: #00ffff;
      display: block;
    }
    
    .stat-label {
      font-size: 0.9rem;
      color: #c0c0c0;
      margin-top: 5px;
    }
    
    /* Features Section */
    .features {
      padding: 80px 0;
    }
    
    .section-title {
      font-size: clamp(2rem, 4vw, 3rem);
      text-align: center;
      margin-bottom: 20px;
      color: #ffffff;
    }
    
    .section-subtitle {
      text-align: center;
      color: #c0c0c0;
      margin-bottom: 60px;
      font-size: 1.1rem;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    
    .feature {
      padding: 40px 30px;
      text-align: center;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .feature:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2);
    }
    
    .feature-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 20px;
      background: linear-gradient(135deg, #00ffff, #c0c0c0);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #1e2f3c;
    }
    
    .feature h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: #00ffff;
    }
    
    .feature p {
      color: #c0c0c0;
      line-height: 1.6;
    }
    
    /* Partners Section */
    .partners {
      padding: 80px 0;
      background: rgba(0, 0, 0, 0.2);
    }
    
    .partner-category {
      margin-bottom: 60px;
    }
    
    .category-title {
      font-size: 1.5rem;
      color: #00ffff;
      margin-bottom: 30px;
      text-align: center;
    }
    
    .partner-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .partner {
      padding: 25px;
      text-align: center;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .partner:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 30px rgba(0, 255, 255, 0.3);
    }
    
    .partner-logo {
      width: 80px;
      height: 80px;
      margin: 0 auto 15px;
      background: linear-gradient(135deg, #00ffff, #c0c0c0);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: #1e2f3c;
      font-size: 14px;
    }
    
    .partner h4 {
      font-size: 1.1rem;
      margin-bottom: 10px;
      color: #ffffff;
    }
    
    .partner-url {
      font-size: 0.9rem;
      color: #00ffff;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .partner-url:hover {
      color: #c0c0c0;
    }
    
    .partner-status {
      margin-top: 10px;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .status-integrated {
      background: rgba(0, 255, 0, 0.2);
      color: #00ff00;
      border: 1px solid #00ff00;
    }
    
    .status-pending {
      background: rgba(255, 165, 0, 0.2);
      color: #ffa500;
      border: 1px solid #ffa500;
    }
    
    /* EaaS Section */
    .eaas {
      padding: 80px 0;
    }
    
    .eaas-highlight {
      text-align: center;
      padding: 60px 40px;
      margin-bottom: 60px;
      position: relative;
      overflow: hidden;
    }
    
    .eaas-badge {
      display: inline-block;
      padding: 10px 20px;
      background: linear-gradient(135deg, #00ffff, #c0c0c0);
      color: #1e2f3c;
      border-radius: 25px;
      font-weight: 600;
      margin-bottom: 20px;
      font-size: 0.9rem;
    }
    
    .eaas-title {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      margin-bottom: 20px;
      color: #00ffff;
    }
    
    .eaas-description {
      font-size: 1.1rem;
      color: #c0c0c0;
      max-width: 600px;
      margin: 0 auto;
    }
    
    /* Security Section */
    .security {
      padding: 60px 0;
      background: rgba(255, 0, 0, 0.05);
      border: 1px solid rgba(255, 0, 0, 0.2);
      border-radius: 16px;
      margin: 40px 0;
    }
    
    .security h2 {
      color: #ff6b6b;
      text-align: center;
      margin-bottom: 30px;
    }
    
    .security-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .security-item {
      display: flex;
      align-items: center;
      padding: 15px;
      background: rgba(255, 0, 0, 0.1);
      border-radius: 8px;
    }
    
    .security-icon {
      width: 40px;
      height: 40px;
      background: #ff6b6b;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      font-size: 18px;
      color: #ffffff;
    }
    
    /* Footer */
    .footer {
      padding: 60px 0 40px;
      border-top: 1px solid rgba(0, 255, 255, 0.3);
      text-align: center;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      margin-bottom: 40px;
    }
    
    .footer-section h3 {
      color: #00ffff;
      margin-bottom: 20px;
    }
    
    .footer-section p, .footer-section a {
      color: #c0c0c0;
      text-decoration: none;
      margin-bottom: 10px;
      display: block;
    }
    
    .footer-section a:hover {
      color: #00ffff;
    }
    
    .footer-bottom {
      padding-top: 20px;
      border-top: 1px solid rgba(0, 255, 255, 0.2);
      color: #c0c0c0;
      font-size: 0.9rem;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .container {
        padding: 0 15px;
      }
      
      .header {
        padding: 40px 0;
      }
      
      .features, .partners, .eaas {
        padding: 60px 0;
      }
      
      .partner-grid {
        grid-template-columns: 1fr;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
    
    /* Accessibility */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    /* Focus Styles */
    *:focus {
      outline: 2px solid #00ffff;
      outline-offset: 2px;
    }
    
    /* Print Styles */
    @media print {
      body { display: none !important; }
    }
    
    /* Image Protection */
    img {
      pointer-events: none;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  </style>
</head>
<body class="protected-content">
  <!-- 8-Layer Pearl Background -->
  <div class="pearl-background">
    <div class="background-layer layer-1"></div>
    <div class="background-layer layer-2"></div>
    <div class="background-layer layer-3"></div>
    <div class="background-layer layer-4"></div>
    <div class="background-layer layer-5"></div>
    <div class="background-layer layer-6"></div>
    <div class="background-layer layer-7"></div>
    <div class="background-layer layer-8"></div>
  </div>

  <div class="container">
    <!-- Header -->
    <header class="header">
      <h1 class="title">eSIM MYANMAR</h1>
      <p class="subtitle">NetLync Entitlements-as-a-Service®</p>
      <p class="tagline">THE FIRST • THE FASTEST • THE ONLY</p>
      <p style="font-size: 1.1rem; color: #c0c0c0; margin-bottom: 30px;">
        Enterprise-grade eSIM activation platform with GSMA SGP.22 v4.0 compliance, 
        pearl glassmorphic design, and 16-partner ecosystem integration.
      </p>
      
      <div class="stats pearl-glass">
        <div class="stat">
          <span class="stat-number">250,000+</span>
          <span class="stat-label">Activations</span>
        </div>
        <div class="stat">
          <span class="stat-number">16</span>
          <span class="stat-label">Partners</span>
        </div>
        <div class="stat">
          <span class="stat-number">99.9%</span>
          <span class="stat-label">Uptime</span>
        </div>
      </div>
    </header>

    <!-- EaaS Highlight -->
    <section class="eaas">
      <div class="eaas-highlight pearl-glass">
        <div class="eaas-badge">GSMA SGP.22 v4.0 CERTIFIED</div>
        <h2 class="eaas-title">NetLync Entitlements-as-a-Service®</h2>
        <p class="eaas-description">
          Revolutionary eSIM activation platform delivering enterprise-grade security, 
          pearl translucent glassmorphic design, and comprehensive partner ecosystem 
          integration across Myanmar's telecommunications landscape.
        </p>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <h2 class="section-title">Key Features</h2>
      <p class="section-subtitle">Enterprise-grade capabilities with pearl glassmorphic design</p>
      
      <div class="features-grid">
        <div class="feature pearl-glass">
          <div class="feature-icon">📱</div>
          <h3>Device Entitlement Check</h3>
          <p>GSMA SGP.22 v4.0 compliant device verification with real-time carrier eligibility</p>
        </div>
        <div class="feature pearl-glass">
          <div class="feature-icon">⬇️</div>
          <h3>Profile Download & Activation</h3>
          <p>Seamless eSIM profile download with QR code generation and instant activation</p>
        </div>
        <div class="feature pearl-glass">
          <div class="feature-icon">🔄</div>
          <h3>Multi-eSIM Management</h3>
          <p>Comprehensive dashboard for managing multiple eSIM profiles across carriers</p>
        </div>
        <div class="feature pearl-glass">
          <div class="feature-icon">📊</div>
          <h3>Real-time Monitoring</h3>
          <p>Live usage tracking, data consumption analytics, and automated renewal alerts</p>
        </div>
      </div>
    </section>

    <!-- Partners -->
    <section class="partners">
      <h2 class="section-title">Partner Ecosystem</h2>
      <p class="section-subtitle">16 Partner Network Integration across Myanmar and beyond</p>

      <!-- Telecommunication Partners -->
      <div class="partner-category">
        <h3 class="category-title">Telecommunication Partners (4)</h3>
        <div class="partner-grid">
          <div class="partner pearl-glass">
            <div class="partner-logo">ATOM</div>
            <h4>ATOM Myanmar</h4>
            <a href="https://atom.com.mm" class="partner-url" target="_blank" rel="noopener">atom.com.mm</a>
            <div class="partner-status status-integrated">EaaS Integrated</div>
          </div>
          <div class="partner pearl-glass">
            <div class="partner-logo">Mytel</div>
            <h4>Mytel</h4>
            <a href="https://mytel.com.mm" class="partner-url" target="_blank" rel="noopener">mytel.com.mm</a>
            <div class="partner-status status-integrated">EaaS Integrated</div>
          </div>
          <div class="partner pearl-glass">
            <div class="partner-logo">MPT</div>
            <h4>MPT</h4>
            <a href="https://mpt.com.mm" class="partner-url" target="_blank" rel="noopener">mpt.com.mm</a>
            <div class="partner-status status-integrated">EaaS Integrated</div>
          </div>
          <div class="partner pearl-glass">
            <div class="partner-logo">U9</div>
            <h4>U9 Telecom</h4>
            <a href="https://u9.com.mm" class="partner-url" target="_blank" rel="noopener">u9.com.mm</a>
            <div class="partner-status status-integrated">EaaS Integrated</div>
          </div>
        </div>
      </div>

      <!-- Financial Partners -->
      <div class="partner-category">
        <h3 class="category-title">Financial Partners (2)</h3>
        <div class="partner-grid">
          <div class="partner pearl-glass">
            <div class="partner-logo">AYA</div>
            <h4>AYA Bank</h4>
            <a href="https://ayabank.com" class="partner-url" target="_blank" rel="noopener">ayabank.com</a>
            <div class="partner-status status-pending">Integration Pending</div>
          </div>
          <div class="partner pearl-glass">
            <div class="partner-logo">UAB</div>
            <h4>UAB Bank</h4>
            <a href="https://uab.com.mm" class="partner-url" target="_blank" rel="noopener">uab.com.mm</a>
            <div class="partner-status status-pending">Integration Pending</div>
          </div>
        </div>
      </div>

      <!-- Payment Partners -->
      <div class="partner-category">
        <h3 class="category-title">Payment Partners (8)</h3>
        <div class="partner-grid">
          <div class="partner pearl-glass">
            <div class="partner-logo">Wave</div>
            <h4>WavePay</h4>
            <a href="https://wavemoney.com.mm" class="partner-url" target="_blank" rel="noopener">wavemoney.com.mm</a>
            <div class="partner-status status-integrated">EaaS Integrated</div>
          </div>
          <div class="partner pearl-glass">
            <div class="partner-logo">AYA Pay</div>
            <h4>AYA Pay</h4>
            <a href="https://ayapay.com" class="partner-url" target="_blank" rel="noopener">ayapay.com</a>
            <div class="partner-status status-integrated">EaaS Integrated</div>
          </div>
          <div class="partner pearl-glass">
            <div class="partner-logo">UAB Pay</div>
            <h4>UAB Pay</h4>
            <a href="https://uabpay.com.mm" class="partner-url" target="_blank" rel="noopener">uabpay.com.mm</a>
            <div class="partner-status status-integrated">EaaS Integrated</div>
          </div>
          <div class="partner pearl-glass">
            <div class="partner-logo">MMQR</div>
            <h4>MMQR</h4>
            <a href="https://myanmarpay.com.mm" class="partner-url" target="_blank" rel="noopener">myanmarpay.com.mm</a>
            <div class="partner-status status-integrated">EaaS Integrated</div>
          </div>
          <div class="partner pearl-glass">
            <div class="partner-logo">MPU</div>
            <h4>Myanmar Payment Union</h4>
            <a href="https://myanmarpaymentunion.com" class="partner-url" target="_blank" rel="noopener">myanmarpaymentunion.com</a>
            <div class="partner-status status-pending">Integration Pending</div>
          </div>
          <div class="partner pearl-glass">
            <div class="partner-logo">UPI</div>
            <h4>Unified Payments Interface</h4>
            <a href="https://npci.org.in/upi" class="partner-url" target="_blank" rel="noopener">npci.org.in/upi</a>
            <div class="partner-status status-pending">Integration Pending</div>
          </div>
          <div class="partner pearl-glass">
            <div class="partner-logo">VISA</div>
            <h4>VISA</h4>
            <a href="https://visa.com" class="partner-url" target="_blank" rel="noopener">visa.com</a>
            <div class="partner-status status-pending">Integration Pending</div>
          </div>
          <div class="partner pearl-glass">
            <div class="partner-logo">Master</div>
            <h4>Mastercard</h4>
            <a href="https://mastercard.com" class="partner-url" target="_blank" rel="noopener">mastercard.com</a>
            <div class="partner-status status-pending">Integration Pending</div>
          </div>
        </div>
      </div>

      <!-- Digital Marketing Partners -->
      <div class="partner-category">
        <h3 class="category-title">Digital Marketing Partners (2)</h3>
        <div class="partner-grid">
          <div class="partner pearl-glass">
            <div class="partner-logo">NetLync</div>
            <h4>NetLync</h4>
            <a href="https://netlync.com" class="partner-url" target="_blank" rel="noopener">netlync.com</a>
            <div class="partner-status status-integrated">Primary EaaS Provider</div>
          </div>
          <div class="partner pearl-glass">
            <div class="partner-logo">Activ</div>
            <h4>Activ Digital Marketing</h4>
            <a href="https://activdigitalmarketing.com" class="partner-url" target="_blank" rel="noopener">activdigitalmarketing.com</a>
            <div class="partner-status status-pending">Integration Pending</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Security Features -->
    <section class="security pearl-glass">
      <h2>Enterprise-Grade Security</h2>
      <div class="security-grid">
        <div class="security-item">
          <div class="security-icon">🚫</div>
          <div>
            <strong>Right-click Protection</strong><br>
            Context menu disabled with event prevention
          </div>
        </div>
        <div class="security-item">
          <div class="security-icon">🔒</div>
          <div>
            <strong>Text Selection Prevention</strong><br>
            Content selection and copying blocked
          </div>
        </div>
        <div class="security-item">
          <div class="security-icon">⌨️</div>
          <div>
            <strong>Keyboard Shortcuts Blocked</strong><br>
            F12, Ctrl+U, Ctrl+S, and developer shortcuts
          </div>
        </div>
        <div class="security-item">
          <div class="security-icon">🛠️</div>
          <div>
            <strong>Developer Tools Detection</strong><br>
            Real-time monitoring and access blocking
          </div>
        </div>
        <div class="security-item">
          <div class="security-icon">🤖</div>
          <div>
            <strong>Bot Detection & Filtering</strong><br>
            Automated access prevention and validation
          </div>
        </div>
        <div class="security-item">
          <div class="security-icon">🛡️</div>
          <div>
            <strong>Security Headers</strong><br>
            CSP, HSTS, X-Frame-Options, and OWASP compliance
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Company Information</h3>
          <p><strong>eSIM Myanmar Company Limited</strong></p>
          <p>Built in Myanmar | NetLync EaaS | GSMA SGP.22</p>
          <p><strong>CEO:</strong> Kaung Htet Paung</p>
        </div>
        <div class="footer-section">
          <h3>Contact Details</h3>
          <a href="mailto:info@esim.com.mm">info@esim.com.mm</a>
          <a href="tel:+95965000172">+95-9650000172</a>
          <p><strong>Social:</strong> @eSIMMyanmar</p>
          <p><strong>Domains:</strong> esim.com.mm / www.esim.com.mm</p>
        </div>
        <div class="footer-section">
          <h3>Compliance & Legal</h3>
          <p>Myanmar Electronic Transactions Law 2021</p>
          <p>GDPR & PDPA Compliant</p>
          <p>GSMA SGP.22 v4.0 & SGP.32 2025</p>
          <p>WCAG 2.2 AAA Accessible</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Copyright © 2025 eSIM Myanmar Company Limited. All Rights Reserved.</p>
        <p>Enterprise Security | Pearl Glassmorphic Design | 16 Partner Ecosystem</p>
      </div>
    </footer>
  </div>

  <!-- GSAP Animation Library -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  
  <!-- Enhanced Security & Animation Script -->
  <script>
    (function() {
      'use strict';
      
      // Security Token
      const securityToken = Math.random().toString(36).substring(2, 15);
      
      // Enhanced Security Protection
      const SecurityProtection = {
        init() {
          this.disableRightClick();
          this.disableTextSelection();
          this.disableKeyboardShortcuts();
          this.disableDevTools();
          this.preventImageSaving();
          this.addCopyProtection();
          this.detectBots();
          this.preventAutomation();
          this.initAdvancedProtection();
        },
        
        disableRightClick() {
          document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.logSecurityEvent('RIGHT_CLICK_BLOCKED', { target: e.target?.tagName || 'unknown' });
            return false;
          }, { passive: false });
        },
        
        disableTextSelection() {
          const events = ['selectstart', 'dragstart', 'mousedown', 'touchstart'];
          events.forEach(eventType => {
            document.addEventListener(eventType, (e) => {
              if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return true;
              }
              e.preventDefault();
              e.stopPropagation();
              return false;
            }, { passive: false });
          });
        },
        
        disableKeyboardShortcuts() {
          document.addEventListener('keydown', (e) => {
            const forbiddenKeys = [
              'F12', 'F11', 'F10', 'F9', 'F8', 'F7', 'F6', 'F5', 'F4', 'F3', 'F2', 'F1',
              'PrintScreen', 'Insert', 'Delete'
            ];
            
            const forbiddenCombos = [
              { ctrl: true, shift: true, key: 'I' },
              { ctrl: true, shift: true, key: 'J' },
              { ctrl: true, shift: true, key: 'C' },
              { ctrl: true, key: 'u' },
              { ctrl: true, key: 's' },
              { ctrl: true, key: 'a' },
              { ctrl: true, key: 'c' },
              { ctrl: true, key: 'v' },
              { ctrl: true, key: 'p' },
              { ctrl: true, key: 'h' },
              { ctrl: true, key: 'f' },
              { ctrl: true, key: 'g' },
              { alt: true, key: 'Tab' }
            ];
            
            if (forbiddenKeys.includes(e.key) || 
                forbiddenCombos.some(combo => 
                  (!combo.ctrl || e.ctrlKey) &&
                  (!combo.shift || e.shiftKey) &&
                  (!combo.alt || e.altKey) &&
                  e.key.toLowerCase() === combo.key.toLowerCase()
                )) {
              e.preventDefault();
              e.stopPropagation();
              this.logSecurityEvent('KEYBOARD_SHORTCUT_BLOCKED', {
                key: e.key,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                altKey: e.altKey
              });
              return false;
            }
          }, { passive: false });
        },
        
        disableDevTools() {
          let devtools = { open: false };
          const threshold = 160;
          
          const checkDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if (widthThreshold || heightThreshold) {
              if (!devtools.open) {
                devtools.open = true;
                this.handleDevToolsDetection();
              }
            } else {
              devtools.open = false;
            }
          };
          
          setInterval(checkDevTools, 300);
          
          // Console detection
          let element = new Image();
          Object.defineProperty(element, 'id', {
            get: () => {
              this.handleDevToolsDetection();
            }
          });
          console.log('%c', element);
        },
        
        handleDevToolsDetection() {
          document.body.innerHTML = \`
            <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1e2f3c;color:#00ffff;font-family:monospace;flex-direction:column;">
              <h1 style="margin-bottom:20px;">🛡️ Access Denied</h1>
              <p>Security Violation Detected</p>
              <p style="font-size:0.8em;margin-top:20px;">eSIM Myanmar - Enterprise Security</p>
            </div>
          \`;
          setTimeout(() => {
            window.location.href = 'about:blank';
          }, 2000);
        },
        
        preventImageSaving() {
          const protectImages = () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
              img.addEventListener('dragstart', (e) => e.preventDefault());
              img.addEventListener('contextmenu', (e) => e.preventDefault());
              img.style.pointerEvents = 'none';
              img.style.userSelect = 'none';
              img.style.webkitUserDrag = 'none';
              img.setAttribute('draggable', 'false');
            });
          };
          
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', protectImages);
          } else {
            protectImages();
          }
          
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              mutation.addedNodes.forEach((node) => {
                if (node instanceof Element) {
                  const images = node.querySelectorAll ? node.querySelectorNodes('img') : [];
                  images.forEach(img => {
                    img.addEventListener('dragstart', (e) => e.preventDefault());
                    img.style.pointerEvents = 'none';
                    img.style.userSelect = 'none';
                  });
                }
              });
            });
          });
          
          observer.observe(document.body, { childList: true, subtree: true });
        },
        
        addCopyProtection() {
          const watermark = document.createElement('div');
          watermark.innerHTML = \`eSIM MYANMAR COMPANY LIMITED - NetLync EaaS Platform - \${securityToken}\`;
          watermark.style.cssText = \`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0.005;
            z-index: 999999;
            font-family: monospace;
            font-size: 1px;
            color: transparent;
            user-select: none;
          \`;
          document.body.appendChild(watermark);
        },
        
        detectBots() {
          const botIndicators = [
            window.navigator.webdriver === true,
            window.navigator.languages === '',
            window.navigator.plugins.length === 0,
            window.outerHeight === 0,
            window.outerWidth === 0,
            !window.navigator.userAgent,
            window.navigator.userAgent.includes('HeadlessChrome'),
            window.navigator.userAgent.includes('PhantomJS'),
            window.navigator.userAgent.includes('Selenium')
          ];
          
          if (botIndicators.filter(Boolean).length >= 2) {
            this.handleBotDetection();
          }
        },
        
        handleBotDetection() {
          document.body.innerHTML = \`
            <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1e2f3c;color:#ff0000;font-family:monospace;flex-direction:column;">
              <h1 style="margin-bottom:20px;">🤖 Automated Access Blocked</h1>
              <p>Bot Detection System Active</p>
              <p style="font-size:0.8em;margin-top:20px;">eSIM Myanmar - Enterprise Security</p>
            </div>
          \`;
          setTimeout(() => {
            window.location.href = 'about:blank';
          }, 1000);
        },
        
        preventAutomation() {
          let mouseMovements = 0;
          let keyPresses = 0;
          
          document.addEventListener('mousemove', () => {
            mouseMovements++;
          });
          
          document.addEventListener('keypress', () => {
            keyPresses++;
          });
          
          setTimeout(() => {
            if (mouseMovements === 0 && keyPresses === 0) {
              this.handleAutomationDetection();
            }
          }, 8000);
        },
        
        handleAutomationDetection() {
          document.body.style.display = 'none';
          setTimeout(() => {
            window.location.href = 'about:blank';
          }, 1000);
        },
        
        initAdvancedProtection() {
          // Disable print
          window.addEventListener('beforeprint', (e) => {
            e.preventDefault();
            return false;
          });
          
          // Clear clipboard on PrintScreen
          document.addEventListener('keyup', (e) => {
            if (e.key === 'PrintScreen') {
              navigator.clipboard?.writeText('').catch(() => {});
            }
          });
          
          // Prevent drag and drop
          ['dragover', 'drop', 'dragenter', 'dragleave'].forEach(eventType => {
            document.addEventListener(eventType, (e) => {
              e.preventDefault();
              e.stopPropagation();
            });
          });
        },
        
        logSecurityEvent(type, data) {
          // Security event logging (could be sent to monitoring service)
          console.warn(\`Security Event: \${type}\`, data);
        }
      };
      
      // GSAP Animations
      const initAnimations = () => {
        if (typeof gsap !== 'undefined') {
          // Pearl shimmer animation for background layers
          gsap.to('.background-layer', {
            duration: 8,
            opacity: 0.3,
            scale: 1.05,
            rotation: 180,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
            stagger: 1
          });
          
          // Title reveal animation
          gsap.from('.title', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
          });
          
          // Subtitle reveal
          gsap.from('.subtitle', {
            duration: 1.2,
            y: 30,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
          });
          
          // Stats animation
          gsap.from('.stat', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.6,
            stagger: 0.2,
            ease: 'power3.out'
          });
          
          // Features animation
          gsap.from('.feature', {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.features',
              start: 'top 80%'
            }
          });
          
          // Partners animation
          gsap.from('.partner', {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: '.partners',
              start: 'top 80%'
            }
          });
          
          // Hover animations for partners
          document.querySelectorAll('.partner').forEach(partner => {
            partner.addEventListener('mouseenter', () => {
              gsap.to(partner, {
                duration: 0.3,
                scale: 1.05,
                boxShadow: '0 15px 30px rgba(0, 255, 255, 0.3)',
                ease: 'power2.out'
              });
            });
            
            partner.addEventListener('mouseleave', () => {
              gsap.to(partner, {
                duration: 0.3,
                scale: 1,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                ease: 'power2.out'
              });
            });
          });
        }
      };
      
      // Initialize everything
      document.addEventListener('DOMContentLoaded', () => {
        SecurityProtection.init();
        initAnimations();
      });
      
      // Disable console
      const originalConsole = window.console;
      Object.defineProperty(window, 'console', {
        value: {
          log: () => {},
          warn: () => {},
          error: () => {},
          info: () => {},
          debug: () => {},
          trace: () => {},
          table: () => {},
          group: () => {},
          groupEnd: () => {},
          clear: () => {},
          count: () => {},
          time: () => {},
          timeEnd: () => {}
        },
        writable: false,
        configurable: false
      });
      
      // Disable eval and Function
      window.eval = undefined;
      window.Function = undefined;
      
    })();
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);
  
  // Create CNAME for custom domain
  fs.writeFileSync(path.join(outDir, 'CNAME'), 'esim.com.mm');
  
  // Create .nojekyll for GitHub Pages
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
  
  // Create robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://esimmyanmar.github.io/sitemap.xml

# eSIM Myanmar - NetLync Entitlements-as-a-Service®
# GSMA SGP.22 v4.0 Compliant eSIM Platform
`;
  fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt);
  
  // Create sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://esimmyanmar.github.io/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://esim.com.mm/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapXml);
  
  console.log('Enhanced build completed successfully with:');
  console.log('✅ Pearl glassmorphic design with 8-layer background');
  console.log('✅ All 16 partners integrated with proper URLs');
  console.log('✅ NetLync EaaS prominence in hero section');
  console.log('✅ GSMA SGP.22 v4.0 compliance badges');
  console.log('✅ Enhanced security protection');
  console.log('✅ GSAP animations and interactions');
  console.log('✅ SEO optimization with sitemap and robots.txt');
  console.log('✅ Custom domain configuration (esim.com.mm)');
};

createEnhancedBuild();