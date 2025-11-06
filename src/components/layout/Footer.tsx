'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Phone, Twitter } from 'lucide-react';

export default function Footer() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const partnerLinks = [
    { name: 'ATOM', url: 'https://atom.com.mm' },
    { name: 'Mytel', url: 'https://mytel.com.mm' },
    { name: 'MPT', url: 'https://mpt.com.mm' },
    { name: 'U9', url: 'https://u9.com.mm' },
    { name: 'AYA Bank', url: 'https://ayabank.com' },
    { name: 'UAB Bank', url: 'https://uabbank.com' },
    { name: 'WavePay', url: 'https://wavemoney.com.mm' },
    { name: 'NetLync', url: 'https://netlync.com' },
    { name: 'Activ Digital', url: 'https://activdigitalmarketing.com' }
  ];

  return (
    <footer className="glass mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="esim-chip" />
              <span className="text-xl font-bold text-gradient">
                eSIM Myanmar
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {locale === 'my' ? 'NetLync Entitlements-as-a-Service ပလပ်ဖောင်း' : 'NetLync Entitlements-as-a-Service Platform'}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              ESIM MYANMAR COMPANY LIMITED
            </p>
            <p className="text-xs text-cyan-400">
              Powered by{' '}
              <a 
                href="https://netlync.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition-colors duration-200"
              >
                NetLync EaaS Platform
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              {locale === 'my' ? 'ဆက်ဆွဲ' : 'Contact'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <a 
                  href="mailto:info@esim.com.mm"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  info@esim.com.mm
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <a 
                  href="tel:+959650000172"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  09650000172
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Twitter className="w-4 h-4 text-cyan-400" />
                <a 
                  href="https://twitter.com/eSIMMyanmar"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @eSIMMyanmar
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              {locale === 'my' ? 'ခရက်ရေး' : 'Legal'}
            </h3>
            <div className="space-y-3">
              <Link
                href={`/${locale}/privacy`}
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                {locale === 'my' ? 'အချိန်းဆိုက်မှု' : 'Privacy Policy'}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                {locale === 'my' ? 'အဖွဲ့ကြီးမှု အခွန်အကြန်' : 'Terms of Service'}
              </Link>
              <Link
                href={`/${locale}/compliance`}
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                {locale === 'my' ? 'အနုးပါမှု' : 'Compliance'}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-wrap justify-center space-x-6 mb-4">
            {partnerLinks.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                {partner.name}
              </a>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">
               2025 ESIM MYANMAR COMPANY LIMITED. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              GSMA SGP.22 v4.0 Compliant | Myanmar ETL 2021 | GDPR | PDPA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}