import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from 'history';
import '../styles/globals.css';
import '../styles/design-system.css';

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID}`,
    redirectUri: typeof window !== 'undefined' ? window.location.origin : '',
    postLogoutRedirectUri: typeof window !== 'undefined' ? window.location.origin : ''
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: string, containsPii: boolean) => {
        if (containsPii) return;
        switch (level) {
          case 0: console.error(message); break;
          case 1: console.warn(message); break;
          case 2: console.info(message); break;
          case 3: console.debug(message); break;
        }
      }
    }
  }
};

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Initialize Microsoft Graph Toolkit
if (typeof window !== 'undefined') {
  Providers.globalProvider = new Msal2Provider({
    clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID}`,
    scopes: [
      'User.Read',
      'User.ReadBasic.All',
      'Calendars.Read',
      'Files.Read',
      'Files.Read.All',
      'Sites.Read.All',
      'Mail.Read',
      'Presence.Read',
      'People.Read'
    ]
  });
}

// Application Insights Configuration
let reactPlugin: ReactPlugin | null = null;
let appInsights: ApplicationInsights | null = null;

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_APPLICATION_INSIGHTS_KEY) {
  const browserHistory = createBrowserHistory({ basename: '' });
  reactPlugin = new ReactPlugin();
  
  appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: process.env.NEXT_PUBLIC_APPLICATION_INSIGHTS_KEY,
      extensions: [reactPlugin],
      extensionConfig: {
        [reactPlugin.identifier]: { history: browserHistory }
      },
      enableAutoRouteTracking: true,
      enableCorsCorrelation: true,
      enableRequestHeaderTracking: true,
      enableResponseHeaderTracking: true,
      correlationHeaderExcludedDomains: [
        'localhost',
        '127.0.0.1'
      ],
      disableFetchTracking: false,
      enableAjaxPerfTracking: true,
      maxAjaxCallsPerView: 20,
      disableExceptionTracking: false,
      enableUnhandledPromiseRejectionTracking: true,
      enableDebugExceptions: process.env.NODE_ENV === 'development'
    }
  });
  
  appInsights.loadAppInsights();
  appInsights.trackPageView();
}

// React Query Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true
    },
    mutations: {
      retry: 1,
      retryDelay: 1000
    }
  }
});

// Custom Fluent UI Theme
const customTheme = {
  ...webDarkTheme,
  colorBrandBackground: '#00ffff',
  colorBrandBackgroundHover: '#00e6e6',
  colorBrandBackgroundPressed: '#00cccc',
  colorBrandForeground1: '#00ffff',
  colorBrandForeground2: '#00e6e6',
  colorNeutralBackground1: '#1e2f3c',
  colorNeutralBackground2: 'rgba(30, 47, 60, 0.8)',
  colorNeutralBackground3: 'rgba(30, 47, 60, 0.9)',
  colorNeutralForeground1: '#ffffff',
  colorNeutralForeground2: 'rgba(255, 255, 255, 0.8)',
  colorNeutralForeground3: 'rgba(255, 255, 255, 0.6)',
  colorNeutralStroke1: 'rgba(0, 255, 255, 0.2)',
  colorNeutralStroke2: 'rgba(128, 128, 128, 0.3)',
  fontFamilyBase: 'Segoe UI Variable, -apple-system, BlinkMacSystemFont, sans-serif',
  fontFamilyMonospace: 'Cascadia Code, Consolas, monospace'
};

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
    
    if (appInsights) {
      appInsights.trackException({
        exception: error,
        properties: {
          componentStack: errorInfo.componentStack,
          errorBoundary: true
        }
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="glass-elevated p-8 rounded-3xl text-center max-w-md">
            <h1 className="text-headline font-bold mb-4 text-accent">Something went wrong</h1>
            <p className="text-subtitle mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance Observer
if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (appInsights && entry.entryType === 'navigation') {
        const navigationEntry = entry as PerformanceNavigationTiming;
        appInsights.trackMetric({
          name: 'PageLoadTime',
          average: navigationEntry.loadEventEnd - navigationEntry.fetchStart
        });
      }
    }
  });
  
  observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
}

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Track page views
    if (appInsights) {
      appInsights.trackPageView({
        name: document.title,
        uri: window.location.pathname
      });
    }

    // Disable right-click context menu for security
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection for security
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable drag for security
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable F12, Ctrl+Shift+I, Ctrl+U for security
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C')
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#1e2f3c" />
        <meta name="msapplication-TileColor" content="#1e2f3c" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.microsoft.com" />
        <link rel="preconnect" href="https://graph.microsoft.com" />
        <link rel="preconnect" href="https://login.microsoftonline.com" />
        <link rel="dns-prefetch" href="https://powerbi.com" />
        <link rel="dns-prefetch" href="https://sharepoint.com" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="eSIM Myanmar" />
        <meta name="application-name" content="eSIM Myanmar Entertainment Server" />
        <meta name="msapplication-tooltip" content="Premium 5G Entertainment Server" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-navbutton-color" content="#00ffff" />
      </Head>

      <ErrorBoundary>
        <MsalProvider instance={msalInstance}>
          <FluentProvider theme={customTheme}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </QueryClientProvider>
          </FluentProvider>
        </MsalProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;