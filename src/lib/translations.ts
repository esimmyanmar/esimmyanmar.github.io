// Static translations for GitHub Pages compatibility
export const translations = {
  en: {
    'hero.title': 'eSIM Myanmar',
    'hero.subtitle': 'Entitlements-as-a-Service',
    'hero.description': 'The First. The Fastest. The Only. NetLync EaaS platform with GSMA SGP.22 v4.0 compliance.',
    'partners.title': 'Our Partners',
    'partners.telecom.title': 'Telecommunications',
    'partners.telecom.atom': 'ATOM Myanmar',
    'partners.telecom.mytel': 'Mytel',
    'partners.telecom.mpt': 'MPT',
    'partners.telecom.u9': 'U9 Telecom',
    'partners.financial.title': 'Financial Services',
    'partners.financial.aya': 'AYA Bank',
    'partners.financial.uab': 'UAB Bank',
    'partners.payment.title': 'Payment Solutions',
    'partners.payment.wavepay': 'WavePay',
    'partners.payment.ayapay': 'AYA Pay',
    'partners.payment.uabpay': 'UAB Pay',
    'partners.payment.mmqr': 'Myanmar QR',
    'partners.payment.mpu': 'MPU',
    'partners.payment.upi': 'UPI',
    'partners.payment.visa': 'VISA',
    'partners.payment.mastercard': 'Mastercard',
    'partners.digital.title': 'Digital Marketing',
    'partners.digital.activ': 'Activ Digital Marketing',
    'partners.digital.netlync': 'NetLync',
    'dashboard.title': 'eSIM Dashboard',
    'dashboard.profiles': 'eSIM Profiles',
    'dashboard.activate': 'Activate eSIM',
    'compatibility.title': 'Device Compatibility',
    'compatibility.subtitle': 'Check if your device supports eSIM activation',
    'compatibility.form.imei': 'Enter IMEI Number',
    'compatibility.form.placeholder': '123456789012345',
    'compatibility.form.check': 'Check Compatibility',
    'compatibility.form.checking': 'Checking...',
    'compatibility.form.eligible': 'Your device is compatible with eSIM'
  },
  my: {
    'hero.title': 'eSIM မြန်မာ',
    'hero.subtitle': 'Entitlements-as-a-Service',
    'hero.description': 'ပထမဆုံး။ အမြန်ဆုံး။ တစ်ခုတည်း။ GSMA SGP.22 v4.0 နှင့် NetLync EaaS ပလပ်ဖောင်း။',
    'partners.title': 'ကျွန်ုပ်တို့၏ လုပ်ဖော်ကိုင်ဖက်များ',
    'partners.telecom.title': 'ဆက်သွယ်ရေး',
    'partners.telecom.atom': 'ATOM Myanmar',
    'partners.telecom.mytel': 'Mytel',
    'partners.telecom.mpt': 'MPT',
    'partners.telecom.u9': 'U9 Telecom',
    'partners.financial.title': 'ဘဏ္ဍာရေး ဝန်ဆောင်မှုများ',
    'partners.financial.aya': 'AYA ဘဏ်',
    'partners.financial.uab': 'UAB ဘဏ်',
    'partners.payment.title': 'ငွေပေးချေမှု ဖြေရှင်းချက်များ',
    'partners.payment.wavepay': 'WavePay',
    'partners.payment.ayapay': 'AYA Pay',
    'partners.payment.uabpay': 'UAB Pay',
    'partners.payment.mmqr': 'Myanmar QR',
    'partners.payment.mpu': 'MPU',
    'partners.payment.upi': 'UPI',
    'partners.payment.visa': 'VISA',
    'partners.payment.mastercard': 'Mastercard',
    'partners.digital.title': 'ဒစ်ဂျစ်တယ် မားကတ်တင်း',
    'partners.digital.activ': 'Activ Digital Marketing',
    'partners.digital.netlync': 'NetLync',
    'dashboard.title': 'eSIM ဒက်ရှ်ဘုတ်',
    'dashboard.profiles': 'eSIM ပရိုဖိုင်များ',
    'dashboard.activate': 'eSIM ဖွင့်ရန်',
    'compatibility.title': 'စက်ပစ္စည်း လိုက်ဖက်မှု',
    'compatibility.subtitle': 'သင့်စက်ပစ္စည်းသည် eSIM ကို ပံ့ပိုးသည်ရှိမရှိ စစ်ဆေးပါ',
    'compatibility.form.imei': 'IMEI နံပါတ် ထည့်ပါ',
    'compatibility.form.placeholder': '123456789012345',
    'compatibility.form.check': 'လိုက်ဖက်မှု စစ်ဆေးရန်',
    'compatibility.form.checking': 'စစ်ဆေးနေသည်...',
    'compatibility.form.eligible': 'သင့်စက်ပစ္စည်းသည် eSIM နှင့် လိုက်ဖက်ပါသည်'
  }
};

export function useTranslations(locale: string = 'en') {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[locale as keyof typeof translations] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
}