'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { initSecurity } from '@/lib/security';

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const preventPrint = useCallback(() => {
    try {
      const handleBeforePrint = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
      
      window.addEventListener('beforeprint', handleBeforePrint, { passive: false });
      
      // Also handle CSS media print
      const style = document.createElement('style');
      style.textContent = '@media print { body { display: none !important; } }';
      document.head.appendChild(style);
      
      return () => {
        window.removeEventListener('beforeprint', handleBeforePrint);
        document.head.removeChild(style);
      };
    } catch (error) {
      console.error('Print prevention failed:', error);
      return () => {};
    }
  }, []);
  
  const preventScreenshot = useCallback(() => {
    try {
      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'PrintScreen') {
          try {
            navigator.clipboard?.writeText('').catch(() => {});
            // Clear selection
            window.getSelection()?.removeAllRanges();
          } catch (clipboardError) {
            console.error('Clipboard clear failed:', clipboardError);
          }
        }
      };
      
      document.addEventListener('keyup', handleKeyUp);
      
      return () => {
        document.removeEventListener('keyup', handleKeyUp);
      };
    } catch (error) {
      console.error('Screenshot prevention failed:', error);
      return () => {};
    }
  }, []);
  
  const preventDragDrop = useCallback(() => {
    try {
      const dragEvents = ['dragover', 'drop', 'dragenter', 'dragleave', 'dragstart'];
      const handlers: Array<() => void> = [];
      
      dragEvents.forEach(eventType => {
        const handler = (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
        };
        
        document.addEventListener(eventType, handler, { passive: false });
        handlers.push(() => document.removeEventListener(eventType, handler));
      });
      
      return () => {
        handlers.forEach(cleanup => cleanup());
      };
    } catch (error) {
      console.error('Drag/drop prevention failed:', error);
      return () => {};
    }
  }, []);
  
  const initializeAdditionalSecurity = useCallback(() => {
    try {
      // Prevent text selection via CSS
      const style = document.createElement('style');
      style.textContent = `
        * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        input, textarea, [contenteditable] {
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
          user-select: text !important;
        }
      `;
      document.head.appendChild(style);
      
      // Add security watermark
      const watermark = document.createElement('div');
      watermark.style.cssText = `
        position: fixed;
        bottom: 0;
        right: 0;
        font-size: 8px;
        opacity: 0.02;
        pointer-events: none;
        z-index: 999999;
        color: #00ffff;
        font-family: monospace;
        transform: rotate(-45deg);
      `;
      watermark.textContent = 'ESIM-MM-PROTECTED';
      document.body.appendChild(watermark);
      
      return () => {
        try {
          if (style.parentNode) document.head.removeChild(style);
          if (watermark.parentNode) document.body.removeChild(watermark);
        } catch (cleanupError) {
          console.error('Security cleanup failed:', cleanupError);
        }
      };
    } catch (error) {
      console.error('Additional security initialization failed:', error);
      return () => {};
    }
  }, []);
  
  useEffect(() => {
    let cleanupFunctions: Array<() => void> = [];
    
    try {
      // Initialize main security
      initSecurity();
      
      // Initialize additional protections
      cleanupFunctions = [
        preventPrint(),
        preventScreenshot(),
        preventDragDrop(),
        initializeAdditionalSecurity()
      ];
      
    } catch (error) {
      console.error('Security provider initialization failed:', error);
    }
    
    // Cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => {
        try {
          cleanup();
        } catch (cleanupError) {
          console.error('Security cleanup error:', cleanupError);
        }
      });
    };
  }, [preventPrint, preventScreenshot, preventDragDrop, initializeAdditionalSecurity]);

  const memoizedChildren = useMemo(() => children, [children]);

  return <>{memoizedChildren}</>;
}