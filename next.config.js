/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'esim.com.mm',
      'graph.microsoft.com',
      'login.microsoftonline.com',
      'powerbi.com',
      'sharepoint.com',
      'onedrive.com'
    ]
  },
  env: {
    NEXT_PUBLIC_MICROSOFT_CLIENT_ID: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID,
    NEXT_PUBLIC_MICROSOFT_TENANT_ID: process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID,
    NEXT_PUBLIC_SHAREPOINT_SITE: process.env.NEXT_PUBLIC_SHAREPOINT_SITE,
    NEXT_PUBLIC_DATAVERSE_URL: process.env.NEXT_PUBLIC_DATAVERSE_URL,
    NEXT_PUBLIC_COPILOT_BOT_ID: process.env.NEXT_PUBLIC_COPILOT_BOT_ID,
    NEXT_PUBLIC_POWER_BI_WORKSPACE: process.env.NEXT_PUBLIC_POWER_BI_WORKSPACE,
    NEXT_PUBLIC_AZURE_FUNCTIONS_URL: process.env.NEXT_PUBLIC_AZURE_FUNCTIONS_URL,
    NEXT_PUBLIC_SIGNALR_URL: process.env.NEXT_PUBLIC_SIGNALR_URL,
    NEXT_PUBLIC_APPLICATION_INSIGHTS_KEY: process.env.NEXT_PUBLIC_APPLICATION_INSIGHTS_KEY
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.microsoft.com *.microsoftonline.com *.powerbi.com *.azure.com",
              "style-src 'self' 'unsafe-inline' *.microsoft.com *.powerbi.com",
              "img-src 'self' data: blob: *.microsoft.com *.microsoftonline.com *.powerbi.com *.sharepoint.com *.onedrive.com",
              "font-src 'self' data: *.microsoft.com",
              "connect-src 'self' *.microsoft.com *.microsoftonline.com *.powerbi.com *.azure.com *.sharepoint.com *.onedrive.com wss: ws:",
              "frame-src 'self' *.microsoft.com *.microsoftonline.com *.powerbi.com *.sharepoint.com",
              "worker-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' *.microsoft.com *.microsoftonline.com"
            ].join('; ')
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
        source: '/api/graph/:path*',
        destination: 'https://graph.microsoft.com/v1.0/:path*'
      },
      {
        source: '/api/powerbi/:path*',
        destination: 'https://api.powerbi.com/v1.0/:path*'
      },
      {
        source: '/api/dataverse/:path*',
        destination: `${process.env.NEXT_PUBLIC_DATAVERSE_URL}/api/data/v9.2/:path*`
      }
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          microsoft: {
            name: 'microsoft',
            chunks: 'all',
            test: /node_modules\/@(microsoft|azure|fluentui)/,
            priority: 30
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      };
    }

    return config;
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@fluentui/react',
      '@fluentui/react-components',
      '@fluentui/react-icons',
      '@microsoft/microsoft-graph-toolkit'
    ]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2
  }
};

module.exports = nextConfig;