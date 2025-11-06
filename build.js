const fs = require('fs');
const path = require('path');

const createBuild = () => {
  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>eSIM Myanmar - Entitlements-as-a-Service</title>
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-ancestors 'none';">
  <meta http-equiv="X-Frame-Options" content="DENY">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <style>
    * { -webkit-user-select: none; -moz-user-select: none; user-select: none; }
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #1e2f3c; color: #fff; }
    .container { max-width: 1200px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 40px; }
    .title { font-size: 2.5rem; margin-bottom: 10px; }
    .subtitle { font-size: 1.2rem; color: #00ffff; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 40px 0; }
    .feature { background: rgba(0,255,255,0.1); padding: 20px; border-radius: 10px; border: 1px solid #00ffff; }
    .partners { margin: 40px 0; }
    .partner-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
    .partner { background: rgba(192,192,192,0.1); padding: 15px; border-radius: 8px; }
    .security { background: rgba(255,0,0,0.1); padding: 20px; border-radius: 10px; border: 1px solid #ff0000; margin: 20px 0; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #00ffff; }
    img { pointer-events: none; -webkit-user-drag: none; }
  </style>
</head>
<body class="protected-content">
  <div class="container">
    <header class="header">
      <h1 class="title">eSIM MYANMAR</h1>
      <p class="subtitle">NetLync Entitlements-as-a-Service Platform</p>
      <p><strong>THE FIRST • THE FASTEST • THE ONLY</strong></p>
    </header>

    <section class="features">
      <div class="feature">
        <h3>GSMA SGP.22 v4.0 Compliant</h3>
        <p>Certified compliance with international eSIM standards</p>
      </div>
      <div class="feature">
        <h3>Pearl Glassmorphic Design</h3>
        <p>8-layer design system with translucent effects</p>
      </div>
      <div class="feature">
        <h3>16 Partner Network</h3>
        <p>Comprehensive ecosystem integration</p>
      </div>
    </section>

    <section class="partners">
      <h2>Partner Ecosystem</h2>
      <div class="partner-grid">
        <div class="partner">
          <h4>Telecommunication (4)</h4>
          <p>ATOM Myanmar, Mytel, MPT, U9 Telecom</p>
        </div>
        <div class="partner">
          <h4>Financial (2)</h4>
          <p>AYA Bank, UAB Bank</p>
        </div>
        <div class="partner">
          <h4>Payment (8)</h4>
          <p>WavePay, AYA Pay, UAB Pay, MMQR</p>
        </div>
        <div class="partner">
          <h4>Digital Marketing (2)</h4>
          <p>NetLync, Activ Digital</p>
        </div>
      </div>
    </section>

    <section class="security">
      <h2>Security Features</h2>
      <ul>
        <li>Right-click context menu disabled</li>
        <li>Text selection prevention</li>
        <li>Keyboard shortcuts blocked</li>
        <li>Developer tools detection</li>
        <li>Bot detection and filtering</li>
        <li>Enterprise security headers</li>
      </ul>
    </section>

    <footer class="footer">
      <p><strong>eSIM Myanmar Company Limited</strong></p>
      <p>Built in Myanmar | NetLync EaaS | GSMA SGP.22 | Enterprise Security</p>
      <p><strong>CEO:</strong> Kaung Htet Paung</p>
      <p><strong>Contact:</strong> info@esim.com.mm | +95-9650000172</p>
      <p>Copyright 2025 eSIM Myanmar Company Limited. All Rights Reserved.</p>
    </footer>
  </div>

  <script>
    (function() {
      // Disable right-click
      document.addEventListener('contextmenu', e => { e.preventDefault(); return false; });
      
      // Disable text selection
      document.addEventListener('selectstart', e => { e.preventDefault(); return false; });
      document.addEventListener('dragstart', e => { e.preventDefault(); return false; });
      
      // Disable keyboard shortcuts
      document.addEventListener('keydown', e => {
        if (e.key === 'F12' || 
            (e.ctrlKey && ['u','s','a','c','v','p'].includes(e.key.toLowerCase())) ||
            (e.ctrlKey && e.shiftKey && ['i','j','c'].includes(e.key.toLowerCase()))) {
          e.preventDefault();
          return false;
        }
      });
      
      // DevTools detection
      let devtools = false;
      setInterval(() => {
        if (window.outerHeight - window.innerHeight > 160 || window.outerWidth - window.innerWidth > 160) {
          if (!devtools) {
            devtools = true;
            document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1e2f3c;color:#00ffff;font-family:monospace;">Access Denied - Security Violation Detected</div>';
          }
        }
      }, 300);
      
      // Bot detection
      const botIndicators = [
        navigator.webdriver === true,
        navigator.languages === '',
        navigator.plugins.length === 0
      ];
      if (botIndicators.filter(Boolean).length >= 2) {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1e2f3c;color:#ff0000;font-family:monospace;">Automated Access Blocked</div>';
      }
      
      // Disable print
      window.addEventListener('beforeprint', e => { e.preventDefault(); return false; });
      
      // Clear clipboard on PrintScreen
      document.addEventListener('keyup', e => {
        if (e.key === 'PrintScreen') {
          navigator.clipboard?.writeText('').catch(() => {});
        }
      });
    })();
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);
  
  // Create CNAME for GitHub Pages
  fs.writeFileSync(path.join(outDir, 'CNAME'), 'esimmyanmar.github.io');
  
  // Create .nojekyll
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
  
  console.log('Build completed successfully');
};

createBuild();