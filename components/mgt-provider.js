import { useEffect } from 'react'

export default function MgtProvider({ children, clientId }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'module'
    script.innerHTML = `
      import { registerMgtComponents, Providers, Msal2Provider } from 'https://unpkg.com/@microsoft/mgt@4';
      Providers.globalProvider = new Msal2Provider({clientId: '${clientId || '[CLIENT-ID]'}'});
      registerMgtComponents();
    `
    document.head.appendChild(script)
    
    return () => {
      document.head.removeChild(script)
    }
  }, [clientId])

  return children
}