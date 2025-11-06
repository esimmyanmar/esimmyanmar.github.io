import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Security Headers
  const securityHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), accelerometer=(), gyroscope=(), magnetometer=()',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-DNS-Prefetch-Control': 'off',
    'X-Permitted-Cross-Domain-Policies': 'none',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
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
    `.replace(/\s+/g, ' ').trim()
  };

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Bot detection and blocking
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousBots = [
    'bot', 'crawler', 'spider', 'scraper', 'headless', 'phantom', 'selenium',
    'puppeteer', 'playwright', 'automation', 'wget', 'curl', 'python-requests'
  ];

  if (suspiciousBots.some(bot => userAgent.toLowerCase().includes(bot))) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // Rate limiting check (basic implementation)
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitKey = `rate_limit_${ip}`;
  
  // In a real implementation, you would use a proper rate limiting solution
  // This is a basic example for demonstration
  
  // Block requests without proper headers
  if (!request.headers.get('accept')) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  // Add custom security identifier
  response.headers.set('X-Security-Token', generateSecurityToken());
  
  return response;
}

function generateSecurityToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};