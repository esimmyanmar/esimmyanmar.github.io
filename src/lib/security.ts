import { SECURITY_CONFIG, SecurityEventType, SecurityLogger } from './config/security';

// Content Protection and Security System
export class ContentProtection {
  private static isInitialized = false;
  private static securityToken = Math.random().toString(36).substring(2, 15);
  
  static init() {
    try {
      if (this.isInitialized) return;
      
      this.disableRightClick();
      this.disableTextSelection();
      this.disableKeyboardShortcuts();
      this.disableDevTools();
      this.preventImageSaving();
      this.addCopyProtection();
      this.initAdvancedProtection();
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Security initialization failed:', error);
    }
  }

  private static disableRightClick() {
    try {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        SecurityLogger.log(SecurityEventType.RIGHT_CLICK_BLOCKED, {
          target: e.target?.tagName || 'unknown',
          timestamp: Date.now()
        });
        return false;
      }, { passive: false });
    } catch (error) {
      console.error('Right-click protection failed:', error);
    }
  }

  private static disableTextSelection() {
    try {
      const events = ['selectstart', 'dragstart', 'mousedown', 'touchstart'];
      events.forEach(eventType => {
        document.addEventListener(eventType, (e) => {
          if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
            return true;
          }
          e.preventDefault();
          e.stopPropagation();
          return false;
        }, { passive: false });
      });
    } catch (error) {
      console.error('Text selection protection failed:', error);
    }
  }

  private static disableKeyboardShortcuts() {
    try {
      document.addEventListener('keydown', (e) => {
        const forbiddenKeys = [
          'F12', 'F11', 'F10', 'F9', 'F8', 'F7', 'F6', 'F5', 'F4', 'F3', 'F2', 'F1',
          'PrintScreen', 'Insert', 'Delete'
        ];
        
        const forbiddenCombos = [
          { ctrl: true, shift: true, key: 'I' },
          { ctrl: true, shift: true, key: 'J' },
          { ctrl: true, shift: true, key: 'C' },
          { ctrl: true, key: 'u' },
          { ctrl: true, key: 's' },
          { ctrl: true, key: 'a' },
          { ctrl: true, key: 'c' },
          { ctrl: true, key: 'v' },
          { ctrl: true, key: 'p' },
          { ctrl: true, key: 'h' },
          { ctrl: true, key: 'f' },
          { ctrl: true, key: 'g' },
          { alt: true, key: 'Tab' },
          { ctrl: true, alt: true, key: 'i' }
        ];
        
        if (forbiddenKeys.includes(e.key) || 
            forbiddenCombos.some(combo => 
              (!combo.ctrl || e.ctrlKey) &&
              (!combo.shift || e.shiftKey) &&
              (!combo.alt || e.altKey) &&
              e.key.toLowerCase() === combo.key.toLowerCase()
            )) {
          e.preventDefault();
          e.stopPropagation();
          SecurityLogger.log(SecurityEventType.KEYBOARD_SHORTCUT_BLOCKED, {
            key: e.key,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            timestamp: Date.now()
          });
          return false;
        }
      }, { passive: false });
    } catch (error) {
      console.error('Keyboard protection failed:', error);
    }
  }

  private static disableDevTools() {
    try {
      let devtools = { open: false, orientation: null };
      const threshold = 160;
      
      const checkDevTools = () => {
        try {
          const widthThreshold = window.outerWidth - window.innerWidth > threshold;
          const heightThreshold = window.outerHeight - window.innerHeight > threshold;
          
          if (widthThreshold || heightThreshold) {
            if (!devtools.open) {
              devtools.open = true;
              this.handleDevToolsDetection();
            }
          } else {
            devtools.open = false;
          }
        } catch (error) {
          console.error('DevTools detection error:', error);
        }
      };
      
      setInterval(checkDevTools, 300);
      
      // Additional detection methods
      let element = new Image();
      Object.defineProperty(element, 'id', {
        get: () => {
          this.handleDevToolsDetection();
        }
      });
      
      console.log('%c', element);
    } catch (error) {
      console.error('DevTools protection failed:', error);
    }
  }

  private static handleDevToolsDetection() {
    try {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1e2f3c;color:#00ffff;font-family:monospace;">Access Denied - Security Violation Detected</div>';
      setTimeout(() => {
        window.location.href = 'about:blank';
      }, 1000);
    } catch (error) {
      console.error('DevTools handling failed:', error);
    }
  }

  private static preventImageSaving() {
    try {
      const protectImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          img.addEventListener('dragstart', (e) => e.preventDefault());
          img.addEventListener('contextmenu', (e) => e.preventDefault());
          img.style.pointerEvents = 'none';
          img.style.userSelect = 'none';
          img.style.webkitUserDrag = 'none';
          img.setAttribute('draggable', 'false');
        });
      };
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', protectImages);
      } else {
        protectImages();
      }
      
      // Observe for dynamically added images
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              const images = node.querySelectorAll ? node.querySelectorAll('img') : [];
              images.forEach(img => {
                img.addEventListener('dragstart', (e) => e.preventDefault());
                img.style.pointerEvents = 'none';
                img.style.userSelect = 'none';
              });
            }
          });
        });
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
    } catch (error) {
      console.error('Image protection failed:', error);
    }
  }

  private static addCopyProtection() {
    try {
      // Add invisible watermark
      const watermark = document.createElement('div');
      watermark.innerHTML = `ESIM MYANMAR COMPANY LIMITED - NetLync EaaS Platform - ${this.securityToken}`;
      watermark.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.005;
        z-index: 999999;
        font-family: monospace;
        font-size: 1px;
        color: transparent;
        user-select: none;
      `;
      document.body.appendChild(watermark);
      
      // Advanced bot detection
      this.detectBots();
      this.preventAutomation();
    } catch (error) {
      console.error('Copy protection failed:', error);
    }
  }

  private static detectBots() {
    try {
      const botIndicators = [
        window.navigator.webdriver === true,
        window.navigator.languages === '',
        window.navigator.plugins.length === 0,
        window.outerHeight === 0,
        window.outerWidth === 0,
        !window.navigator.userAgent,
        window.navigator.userAgent.includes('HeadlessChrome'),
        window.navigator.userAgent.includes('PhantomJS'),
        window.navigator.userAgent.includes('Selenium'),
        window.chrome && window.chrome.runtime && window.chrome.runtime.onConnect === undefined
      ];
      
      if (botIndicators.filter(Boolean).length >= 2) {
        this.handleBotDetection();
      }
    } catch (error) {
      console.error('Bot detection failed:', error);
    }
  }

  private static handleBotDetection() {
    try {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1e2f3c;color:#ff0000;font-family:monospace;">Automated Access Blocked</div>';
      setTimeout(() => {
        window.location.href = 'about:blank';
      }, 500);
    } catch (error) {
      console.error('Bot handling failed:', error);
    }
  }

  private static preventAutomation() {
    try {
      let mouseMovements = 0;
      let keyPresses = 0;
      
      document.addEventListener('mousemove', () => {
        mouseMovements++;
      });
      
      document.addEventListener('keypress', () => {
        keyPresses++;
      });
      
      setTimeout(() => {
        if (mouseMovements === 0 && keyPresses === 0) {
          this.handleAutomationDetection();
        }
      }, 8000);
    } catch (error) {
      console.error('Automation prevention failed:', error);
    }
  }

  private static handleAutomationDetection() {
    try {
      document.body.style.display = 'none';
      setTimeout(() => {
        window.location.href = 'about:blank';
      }, 1000);
    } catch (error) {
      console.error('Automation handling failed:', error);
    }
  }

  private static initAdvancedProtection() {
    try {
      // Disable print functionality
      window.addEventListener('beforeprint', (e) => {
        e.preventDefault();
        return false;
      });
      
      // Clear clipboard on PrintScreen
      document.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
          navigator.clipboard?.writeText('').catch(() => {});
        }
      });
      
      // Prevent drag and drop
      ['dragover', 'drop', 'dragenter', 'dragleave'].forEach(eventType => {
        document.addEventListener(eventType, (e) => {
          e.preventDefault();
          e.stopPropagation();
        });
      });
      
      // Monitor for suspicious activity
      this.monitorSuspiciousActivity();
    } catch (error) {
      console.error('Advanced protection failed:', error);
    }
  }

  private static monitorSuspiciousActivity() {
    try {
      let rapidClicks = 0;
      let lastClickTime = 0;
      
      document.addEventListener('click', () => {
        const now = Date.now();
        if (now - lastClickTime < 100) {
          rapidClicks++;
          if (rapidClicks > 10) {
            this.handleSuspiciousActivity();
          }
        } else {
          rapidClicks = 0;
        }
        lastClickTime = now;
      });
    } catch (error) {
      console.error('Activity monitoring failed:', error);
    }
  }

  private static handleSuspiciousActivity() {
    try {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1e2f3c;color:#ff0000;font-family:monospace;">Suspicious Activity Detected</div>';
    } catch (error) {
      console.error('Suspicious activity handling failed:', error);
    }
  }
}

export const initSecurity = () => {
  if (typeof window !== 'undefined') {
    try {
      ContentProtection.init();
      
      // Additional runtime protection
      const originalConsole = window.console;
      Object.defineProperty(window, 'console', {
        value: {
          log: () => {},
          warn: () => {},
          error: () => {},
          info: () => {},
          debug: () => {},
          trace: () => {},
          table: () => {},
          group: () => {},
          groupEnd: () => {},
          clear: () => {},
          count: () => {},
          time: () => {},
          timeEnd: () => {}
        },
        writable: false,
        configurable: false
      });
      
      // Disable common debugging functions
      window.eval = undefined;
      window.Function = undefined;
      
    } catch (error) {
      console.error('Security initialization error:', error);
    }
  }
};