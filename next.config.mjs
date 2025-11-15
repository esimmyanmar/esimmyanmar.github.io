/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'esimmyanmar.sharepoint.com',
      'graph.microsoft.com',
      'login.microsoftonline.com'
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https://*.microsoft.com https://*.microsoftonline.com https://*.graph.microsoft.com https://*.sharepoint.com https://*.office.com https://*.powerapps.com https://*.dynamics.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.microsoft.com https://*.microsoftonline.com https://*.powerapps.com; style-src 'self' 'unsafe-inline' https://*.microsoft.com https://*.office.com; img-src 'self' data: blob: https://*.microsoft.com https://*.office.com https://*.sharepoint.com; connect-src 'self' https://*.microsoft.com https://*.microsoftonline.com https://*.graph.microsoft.com https://*.sharepoint.com https://*.powerapps.com https://*.dynamics.com; font-src 'self' https://*.microsoft.com; frame-src 'self' https://*.microsoft.com https://*.powerapps.com https://*.dynamics.com; worker-src 'self' blob:; manifest-src 'self'"
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), payment=()'
          }
        ]
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://esim-myanmar-functions.azurewebsites.net/api/:path*'
      },
      {
        source: '/graph/:path*',
        destination: 'https://graph.microsoft.com/v1.0/:path*'
      },
      {
        source: '/sharepoint/:path*',
        destination: 'https://esimmyanmar.sharepoint.com/:path*'
      }
    ];
  },
  env: {
    NEXT_PUBLIC_MICROSOFT_CLIENT_ID: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID,
    NEXT_PUBLIC_MICROSOFT_TENANT_ID: process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID,
    NEXT_PUBLIC_SHAREPOINT_SITE: process.env.NEXT_PUBLIC_SHAREPOINT_SITE,
    NEXT_PUBLIC_DATAVERSE_URL: process.env.NEXT_PUBLIC_DATAVERSE_URL,
    NEXT_PUBLIC_COPILOT_BOT_ID: process.env.NEXT_PUBLIC_COPILOT_BOT_ID,
    NEXT_PUBLIC_POWER_BI_WORKSPACE: process.env.NEXT_PUBLIC_POWER_BI_WORKSPACE
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      '@microsoft/microsoft-graph-client',
      '@azure/identity',
      '@azure/functions'
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false
      };
    }
    
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    });

    return config;
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  reactStrictMode: true,
  swcMinify: true
};

export default nextConfig;