import React, { useState, useEffect } from 'react';
import { Person, PersonFeedback, Globe, Translate } from '@fluentui/react-icons';
import { useAuth } from '../auth/AuthProvider';
import { CopilotChat } from '../copilot/CopilotChat';

interface HeaderProps {
  transparent?: boolean;
  showAuth?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ transparent = false, showAuth = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showCopilot, setShowCopilot] = useState(false);
  const { user, login, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'my', name: 'မြန်မာ' },
    { code: 'zh', name: '中文' }
  ];

  const navigationItems = [
    { href: '/', label: 'Home', labelMy: 'ပင်မ', labelZh: '首页' },
    { href: '/coverage', label: 'Coverage', labelMy: 'ကွန်ယက်', labelZh: '覆盖' },
    { href: '/devices', label: 'Devices', labelMy: 'စက်ပစ္စည်း', labelZh: '设备' },
    { href: '/entertainment', label: 'Entertainment', labelMy: 'ဖျော်ဖြေရေး', labelZh: '娱乐' },
    { href: '/support', label: 'Support', labelMy: 'အကူအညီ', labelZh: '支持' }
  ];

  const getLabel = (item: any) => {
    switch (currentLanguage) {
      case 'my': return item.labelMy;
      case 'zh': return item.labelZh;
      default: return item.label;
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent && !isScrolled 
            ? 'bg-transparent' 
            : 'glass border-b border-accent/20'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                <span className="text-background font-bold text-lg">e</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-primary">eSIM Myanmar</span>
                <span className="text-xs text-secondary">Entertainment Server</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-secondary hover:text-accent transition-colors duration-200 font-medium"
                >
                  {getLabel(item)}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg glass-subtle hover:glass transition-all duration-200">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {languages.find(lang => lang.code === currentLanguage)?.name}
                  </span>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 glass-elevated rounded-xl border border-accent/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setCurrentLanguage(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/10 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                        currentLanguage === lang.code ? 'text-accent' : 'text-secondary'
                      }`}
                    >
                      <span className="text-sm font-semibold" aria-hidden>
                        {lang.code.toUpperCase()}
                      </span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowCopilot(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-subtle hover:glass transition-all duration-200"
                title="AI Assistant"
              >
                <PersonFeedback className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Assistant</span>
              </button>

              {showAuth && (
                <div className="flex items-center gap-3">
                  {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass-subtle">
                        <Person className="w-4 h-4" />
                        <span className="text-sm font-medium">{user?.displayName}</span>
                      </div>
                      <button
                        onClick={logout}
                        className="btn btn-ghost btn-small"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={login}
                        className="btn btn-secondary btn-small"
                      >
                        Sign In
                      </button>
                      <a
                        href="/register"
                        className="btn btn-primary btn-small"
                      >
                        Get Started
                      </a>
                    </div>
                  )}
                </div>
              )}

              <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg glass-subtle hover:glass transition-all duration-200">
                <div className="w-5 h-5 flex flex-col justify-center gap-1">
                  <div className="w-full h-0.5 bg-current transition-all duration-200"></div>
                  <div className="w-full h-0.5 bg-current transition-all duration-200"></div>
                  <div className="w-full h-0.5 bg-current transition-all duration-200"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden border-t border-accent/20 glass">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                >
                  {getLabel(item)}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {showCopilot && (
        <CopilotChat
          isOpen={showCopilot}
          onClose={() => setShowCopilot(false)}
          language={currentLanguage}
        />
      )}
    </>
  );
};

export default Header;