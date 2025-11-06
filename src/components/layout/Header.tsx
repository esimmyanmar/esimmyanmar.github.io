'use client';

import { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';

export default function Header() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || 'en';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: locale === 'my' ? 'မွန်းပိုင်' : 'Home', href: `/${locale}` },
    { name: locale === 'my' ? 'အဖွဲ့ကြီး' : 'About', href: `/${locale}/about` },
    { name: locale === 'my' ? 'လိုက်ဖာက်မှု' : 'Compatibility', href: `/${locale}/compatibility` },
    { name: locale === 'my' ? 'အဖွဲ့ကြီးပိုင်' : 'How It Works', href: `/${locale}/how-it-works` },
    { name: locale === 'my' ? 'မှန်းချားမှု' : 'FAQ', href: `/${locale}/faq` },
    { name: locale === 'my' ? 'လုပ်ဖောင်ကိုင်' : 'Partners', href: `/${locale}/partners` },
    { name: locale === 'my' ? 'ဆက်ဆွဲ' : 'Contact', href: `/${locale}/contact` }
  ];

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'my' : 'en';
    window.location.href = `/${newLocale}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <div className="esim-chip" />
              <span className="text-xl font-bold text-gradient no-select">
                eSIM Myanmar
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {locale.toUpperCase()}
              </span>
            </button>

            <Link
              href={`/${locale}/dashboard`}
              className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-colors duration-200"
            >
              {locale === 'my' ? 'ဒက်ရှေးဘုတ်' : 'Dashboard'}
            </Link>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass mt-2 rounded-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={`/${locale}/dashboard`}
                className="text-white bg-cyan-600 hover:bg-cyan-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {locale === 'my' ? 'ဒက်ရှေးဘုတ်' : 'Dashboard'}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}