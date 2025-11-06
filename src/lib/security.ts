// Content Protection and Security System
export class ContentProtection {
  static init() {
    this.disableRightClick();
    this.disableTextSelection();
    this.disableKeyboardShortcuts();
    this.disableDevTools();
    this.preventImageSaving();
    this.addCopyProtection();
  }

  private static disableRightClick() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  }

  private static disableTextSelection() {
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    });
    
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });
  }

  private static disableKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+P
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.key === 'a') ||
        (e.ctrlKey && e.key === 'c') ||
        (e.ctrlKey && e.key === 'v') ||
        (e.ctrlKey && e.key === 'p') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C')
      ) {
        e.preventDefault();
        return false;
      }
    });
  }

  private static disableDevTools() {
    let devtools = { open: false };
    const threshold = 160;
    
    setInterval(() => {
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devtools.open) {
          devtools.open = true;
          window.location.href = 'about:blank';
        }
      } else {
        devtools.open = false;
      }
    }, 500);
  }

  private static preventImageSaving() {
    document.addEventListener('DOMContentLoaded', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
        img.style.pointerEvents = 'none';
        img.style.userSelect = 'none';
      });
    });
  }

  private static addCopyProtection() {
    // Add invisible watermark
    const watermark = document.createElement('div');
    watermark.innerHTML = 'ESIM MYANMAR COMPANY LIMITED - NetLync EaaS Platform';
    watermark.style.position = 'fixed';
    watermark.style.top = '0';
    watermark.style.left = '0';
    watermark.style.width = '100%';
    watermark.style.height = '100%';
    watermark.style.pointerEvents = 'none';
    watermark.style.opacity = '0.01';
    watermark.style.zIndex = '9999';
    document.body.appendChild(watermark);
  }
}

export const initSecurity = () => {
  if (typeof window !== 'undefined') {
    ContentProtection.init();
  }
};