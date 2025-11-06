'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Smartphone, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Background3D from '@/components/animations/Background3D';

const imeiSchema = z.object({
  imei: z.string()
    .min(15, 'IMEI must be 15 digits')
    .max(15, 'IMEI must be 15 digits')
    .regex(/^\d{15}$/, 'IMEI must contain only digits')
});

type ImeiForm = z.infer<typeof imeiSchema>;

export default function CompatibilityPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    eligible: boolean;
    carriers: string[];
    message: string;
  } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ImeiForm>({
    resolver: zodResolver(imeiSchema)
  });

  const onSubmit = async (data: ImeiForm) => {
    setIsChecking(true);
    setResult(null);

    // Simulate API call to EaaS service
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock entitlement check response
    const mockResult = {
      eligible: true,
      carriers: ['ATOM', 'Mytel', 'MPT', 'U9'],
      message: t('compatibility.form.eligible')
    };

    setResult(mockResult);
    setIsChecking(false);
  };

  return (
    <div className="min-h-screen relative">
      <Background3D />
      <div className="relative z-10">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                {t('compatibility.title')}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {t('compatibility.subtitle')}
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="pearl-glass p-8 rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="imei" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('compatibility.form.imei')}
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('imei')}
                        type="text"
                        id="imei"
                        placeholder={t('compatibility.form.placeholder')}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                        maxLength={15}
                      />
                    </div>
                    {errors.imei && (
                      <p className="mt-2 text-sm text-red-400">{errors.imei.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isChecking}
                    className="w-full glass px-6 py-4 text-lg font-semibold text-white hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-2 min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isChecking ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{t('compatibility.form.checking')}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>{t('compatibility.form.check')}</span>
                      </>
                    )}
                  </button>
                </form>

                {result && (
                  <div className="mt-8 p-6 glass rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      {result.eligible ? (
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-400" />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Entitlement Check Result
                        </h3>
                        <p className={`text-sm ${result.eligible ? 'text-green-400' : 'text-red-400'}`}>
                          {result.message}
                        </p>
                      </div>
                    </div>

                    {result.eligible && result.carriers.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-3">
                          Available Carriers:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {result.carriers.map((carrier) => (
                            <span
                              key={carrier}
                              className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm font-medium"
                            >
                              {carrier}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* EaaS Process Flow */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8 text-gradient">
                EaaS Activation Process
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Device Check', desc: 'TAC validation' },
                  { step: '2', title: 'Carrier Select', desc: 'Choose provider' },
                  { step: '3', title: 'Profile Download', desc: 'LPA activation' },
                  { step: '4', title: 'Ready to Use', desc: 'eSIM active' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
      <div className="watermark" />
    </div>
  );
}