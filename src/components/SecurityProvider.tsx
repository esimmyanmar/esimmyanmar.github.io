'use client';

import { useEffect } from 'react';
import { initSecurity } from '@/lib/security';

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initSecurity();
    
    // Additional protection measures
    const preventPrint = () => {
      window.addEventListener('beforeprint', (e) => {
        e.preventDefault();
        return false;
      });
    };
    
    const preventScreenshot = () => {
      document.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
          navigator.clipboard.writeText('');
        }
      });
    };
    
    preventPrint();
    preventScreenshot();
    
    // Disable drag and drop
    document.addEventListener('dragover', (e) => e.preventDefault());
    document.addEventListener('drop', (e) => e.preventDefault());
    
  }, []);

  return <>{children}</>;
}