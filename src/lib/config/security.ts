// Security Configuration for eSIM Myanmar Platform
export const SECURITY_CONFIG = {
  // Content Protection Settings
  CONTENT_PROTECTION: {
    DISABLE_RIGHT_CLICK: true,
    DISABLE_TEXT_SELECTION: true,
    DISABLE_IMAGE_DRAG: true,
    DISABLE_PRINT: true,
    DISABLE_SCREENSHOT: true,
    DISABLE_DEVTOOLS: true,
    ENABLE_WATERMARK: true,
    ENABLE_BOT_DETECTION: true
  },

  // Anti-Piracy Settings
  ANTI_PIRACY: {
    KEYBOARD_SHORTCUTS_DISABLED: [
      'F12', 'F11', 'F10', 'F9', 'F8', 'F7', 'F6', 'F5', 'F4', 'F3', 'F2', 'F1',
      'PrintScreen', 'Insert', 'Delete'
    ],
    FORBIDDEN_KEY_COMBINATIONS: [
      { ctrl: true, shift: true, key: 'I' }, // DevTools
      { ctrl: true, shift: true, key: 'J' }, // Console
      { ctrl: true, shift: true, key: 'C' }, // Inspector
      { ctrl: true, key: 'u' }, // View Source
      { ctrl: true, key: 's' }, // Save Page
      { ctrl: true, key: 'a' }, // Select All
      { ctrl: true, key: 'c' }, // Copy
      { ctrl: true, key: 'v' }, // Paste
      { ctrl: true, key: 'p' }, // Print
      { ctrl: true, key: 'h' }, // History
      { ctrl: true, key: 'f' }, // Find
      { ctrl: true, key: 'g' }, // Find Next
      { alt: true, key: 'Tab' }, // Alt+Tab
      { ctrl: true, alt: true, key: 'i' } // DevTools Alt
    ]
  },

  // Bot Detection Settings
  BOT_DETECTION: {
    SUSPICIOUS_USER_AGENTS: [
      'bot', 'crawler', 'spider', 'scraper', 'headless', 'phantom', 'selenium',
      'puppeteer', 'playwright', 'automation', 'wget', 'curl', 'python-requests',
      'scrapy', 'beautifulsoup', 'mechanize', 'httpclient', 'okhttp'
    ],
    BOT_INDICATORS: [
      'webdriver',
      'languages_empty',
      'no_plugins',
      'zero_dimensions',
      'no_user_agent',
      'headless_chrome',
      'phantom_js'
    ],
    MOUSE_MOVEMENT_TIMEOUT: 8000,
    RAPID_CLICK_THRESHOLD: 10,
    RAPID_CLICK_INTERVAL: 100
  },

  // Security Headers
  SECURITY_HEADERS: {
    'Content-Security-Policy': `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com data:;
      img-src 'self' data: https: blob:;
      media-src 'self' data: blob:;
      connect-src 'self' https://www.google-analytics.com https://analytics.google.com;
      frame-ancestors 'none';
      base-uri 'self';
      form-action 'self';
      upgrade-insecure-requests;
    `.replace(/\s+/g, ' ').trim(),
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), accelerometer=(), gyroscope=(), magnetometer=()',
    'X-XSS-Protection': '1; mode=block',
    'X-DNS-Prefetch-Control': 'off',
    'X-Permitted-Cross-Domain-Policies': 'none',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin'
  },

  // Rate Limiting
  RATE_LIMITING: {
    REQUESTS_PER_MINUTE: 60,
    REQUESTS_PER_HOUR: 1000,
    BLOCK_DURATION: 300000 // 5 minutes in milliseconds
  },

  // Monitoring
  MONITORING: {
    LOG_SECURITY_EVENTS: true,
    ALERT_ON_VIOLATIONS: true,
    TRACK_FAILED_ATTEMPTS: true
  }
};

// Security utility functions
export const SecurityUtils = {
  generateSecurityToken: (): string => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  },

  isBot: (userAgent: string): boolean => {
    return SECURITY_CONFIG.BOT_DETECTION.SUSPICIOUS_USER_AGENTS
      .some(bot => userAgent.toLowerCase().includes(bot));
  },

  sanitizeInput: (input: string): string => {
    return input
      .replace(/[<>\"']/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  },

  validateOrigin: (origin: string, allowedOrigins: string[]): boolean => {
    return allowedOrigins.includes(origin);
  },

  hashString: async (str: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
};

// Security event types
export enum SecurityEventType {
  RIGHT_CLICK_BLOCKED = 'right_click_blocked',
  DEVTOOLS_DETECTED = 'devtools_detected',
  BOT_DETECTED = 'bot_detected',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  RAPID_CLICKS = 'rapid_clicks',
  KEYBOARD_SHORTCUT_BLOCKED = 'keyboard_shortcut_blocked',
  PRINT_ATTEMPT_BLOCKED = 'print_attempt_blocked',
  SCREENSHOT_ATTEMPT = 'screenshot_attempt'
}

// Security logger
export const SecurityLogger = {
  log: (event: SecurityEventType, details?: any) => {
    if (SECURITY_CONFIG.MONITORING.LOG_SECURITY_EVENTS) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        event,
        details,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        url: typeof window !== 'undefined' ? window.location.href : 'unknown'
      };
      
      // In production, send to security monitoring service
      console.warn('Security Event:', logEntry);
    }
  }
};