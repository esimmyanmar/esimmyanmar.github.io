import React, { ReactNode, useEffect } from 'react';

interface MgtProviderProps {
  children: ReactNode;
}

// Minimal MGT provider wrapper. This file provides a single place
// to configure Microsoft Graph Toolkit features for the site.
export const MgtProvider: React.FC<MgtProviderProps> = ({ children }) => {
  useEffect(() => {
    // Placeholder for MGT initialization if needed.
    // Implement MSAL provider initialization or custom providers here.
    // Example (do not include secrets in code):
    // Providers.globalProvider = new Msal2Provider({ clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID });
  }, []);

  return <>{children}</>;
};

export default MgtProvider;
