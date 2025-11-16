import '../styles/globals.css'
import Head from 'next/head'
import MgtProvider from '../components/mgt-provider'

export default function App({ Component, pageProps }) {
  return (
    <MgtProvider clientId={process.env.NEXT_PUBLIC_AZURE_CLIENT_ID}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e2f3c" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <script type="module" dangerouslySetInnerHTML={{
          __html: `
            import { registerMgtComponents, Providers, Msal2Provider } from 'https://unpkg.com/@microsoft/mgt@4';
            Providers.globalProvider = new Msal2Provider({clientId: '[CLIENT-ID]'});
            registerMgtComponents();
          `
        }} />
      </Head>
      <Component {...pageProps} />
    </MgtProvider>
  )
}