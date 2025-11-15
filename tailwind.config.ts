import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'esim-primary': '#1e2f3c',
        'esim-accent': '#00ffff',
        'esim-silver': '#c0c0c0',
        'esim-glass': 'rgba(192, 192, 192, 0.3)',
        'esim-glass-border': 'rgba(0, 255, 255, 0.3)',
        'esim-text-primary': '#ffffff',
        'esim-text-secondary': 'rgba(255, 255, 255, 0.8)',
      },
      fontFamily: {
        'segoe': ['Segoe UI Variable', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        'myanmar': ['Leelawadee UI', 'Myanmar Text', 'sans-serif'],
        'chinese': ['Microsoft YaHei UI', 'PingFang SC', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      backdropBlur: {
        'esim': '20px',
      },
      backdropBrightness: {
        'esim': '1.1',
      },
      boxShadow: {
        'esim': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'esim-hover': '0 12px 48px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pearl-shimmer': 'pearlShimmer 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        pearlShimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00ffff' },
          '100%': { boxShadow: '0 0 20px #00ffff, 0 0 30px #00ffff' },
        },
      },
      screens: {
        'xs': '475px',
        'iphone': '390px',
        'ipad': '768px',
        'surface': '1024px',
        'desktop': '1280px',
        'ultrawide': '1536px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default config