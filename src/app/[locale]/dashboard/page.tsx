'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Smartphone, BarChart3, RefreshCw, Plus, Settings, Loader2 } from 'lucide-react';
import Background3D from '@/components/animations/Background3D';
import { useTranslations } from '@/lib/translations';

interface eSIMProfile {
  id: string;
  iccid: string;
  carrier: string;
  status: 'active' | 'inactive' | 'suspended';
  dataUsed: string;
  dataRemaining: string;
  expiryDate: string;
}

export default function DashboardPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations(locale);
  const [profiles, setProfiles] = useState<eSIMProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch eSIM profiles
    const fetchProfiles = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProfiles: eSIMProfile[] = [
        {
          id: '1',
          iccid: '8959501234567890123',
          carrier: 'ATOM',
          status: 'active',
          dataUsed: '2.3GB',
          dataRemaining: '7.7GB',
          expiryDate: '2025-12-31'
        },
        {
          id: '2',
          iccid: '8959502345678901234',
          carrier: 'Mytel',
          status: 'inactive',
          dataUsed: '0GB',
          dataRemaining: '10GB',
          expiryDate: '2025-11-30'
        }
      ];
      
      setProfiles(mockProfiles);
      setLoading(false);
    };

    fetchProfiles();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'inactive': return 'text-gray-400 bg-gray-400/20';
      case 'suspended': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen relative">
      <Background3D />
      <div className="relative z-10">
        
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4 text-gradient">
                {t('dashboard.title')}
              </h1>
              <p className="text-xl text-gray-300">
                {locale === 'my' ? 'မင်းရှိ eSIM ပရိုဖိုင်များကို အဖွဲ့ကြီးပံနှင့် အဖွဲ့ကြီးမှုကို စိတ်ဆေးပါ' : 'Manage your eSIM profiles and monitor usage'}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="pearl-glass p-6 text-center">
                <Smartphone className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {profiles.filter(p => p.status === 'active').length}
                </div>
                <div className="text-sm text-gray-400">Active Profiles</div>
              </div>
              
              <div className="pearl-glass p-6 text-center">
                <BarChart3 className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {profiles.reduce((acc, p) => acc + parseFloat(p.dataUsed.replace('GB', '')), 0).toFixed(1)}GB
                </div>
                <div className="text-sm text-gray-400">Total Data Used</div>
              </div>
              
              <div className="pearl-glass p-6 text-center">
                <RefreshCw className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {profiles.reduce((acc, p) => acc + parseFloat(p.dataRemaining.replace('GB', '')), 0).toFixed(1)}GB
                </div>
                <div className="text-sm text-gray-400">Data Remaining</div>
              </div>
            </div>

            {/* eSIM Profiles */}
            <div className="glass p-8 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {t('dashboard.profiles')}
                </h2>
                <button className="pearl-glass px-4 py-2 text-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300 flex items-center space-x-2 min-h-[48px]">
                  <Plus className="w-4 h-4" />
                  <span>{t('dashboard.activate')}</span>
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading profiles...</p>
                </div>
              ) : profiles.length === 0 ? (
                <div className="text-center py-12">
                  <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No eSIM profiles found</p>
                  <button className="pearl-glass px-6 py-3 text-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300">
                    Activate Your First eSIM
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {profiles.map((profile) => (
                    <div key={profile.id} className="pearl-glass p-6 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {profile.carrier}
                            </h3>
                            <p className="text-sm text-gray-400">
                              ICCID: {profile.iccid}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-sm text-gray-400">Status</div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(profile.status)}`}>
                              {profile.status.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm text-gray-400">Usage</div>
                            <div className="text-sm font-medium text-white">
                              {profile.dataUsed} / {profile.dataRemaining} remaining
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm text-gray-400">Expires</div>
                            <div className="text-sm font-medium text-white">
                              {profile.expiryDate}
                            </div>
                          </div>

                          <button className="glass p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                            <Settings className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Usage Bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Data Usage</span>
                          <span>{profile.dataUsed} used</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-cyan-400 to-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${(parseFloat(profile.dataUsed.replace('GB', '')) / 10) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* EaaS Management Tools */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Entitlement Management
                </h3>
                <p className="text-gray-400 mb-4">
                  Manage your device entitlements and carrier relationships through NetLync EaaS platform.
                </p>
                <button className="pearl-glass px-4 py-2 text-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300">
                  Manage Entitlements
                </button>
              </div>

              <div className="glass p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Usage Analytics
                </h3>
                <p className="text-gray-400 mb-4">
                  View detailed usage analytics and optimize your eSIM consumption patterns.
                </p>
                <button className="pearl-glass px-4 py-2 text-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </main>

      </div>
      <div className="watermark" />
    </div>
  );
}