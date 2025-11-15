/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#1e2f3c',
        accent: '#00ffff',
        pearl: 'rgba(192, 192, 192, 0.3)',
        graphite: 'rgba(128, 128, 128, 0.6)',
        'transparent-pearl': 'rgba(192, 192, 192, 0.1)',
        surface: 'rgba(30, 47, 60, 0.8)',
        'surface-elevated': 'rgba(30, 47, 60, 0.9)',
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.8)',
        tertiary: 'rgba(255, 255, 255, 0.6)',
        border: 'rgba(0, 255, 255, 0.2)',
        'border-subtle': 'rgba(128, 128, 128, 0.3)'
      },
      fontFamily: {
        sans: ['Segoe UI Variable', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        myanmar: ['Leelawadee UI', 'Myanmar Text', 'sans-serif'],
        chinese: ['Microsoft YaHei UI', 'sans-serif'],
        mono: ['Cascadia Code', 'Consolas', 'monospace']
      },
      fontSize: {
        'display': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title': ['1.5rem', { lineHeight: '1.3' }],
        'subtitle': ['1.125rem', { lineHeight: '1.4' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
        'overline': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.1em', textTransform: 'uppercase' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px'
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 20px 40px rgba(0, 0, 0, 0.15)',
        'glass-xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
        'inner-glass': 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
      },
      backdropBlur: {
        'glass': '20px'
      },
      backdropBrightness: {
        'glass': '1.1'
      },
      backdropContrast: {
        'glass': '1.1'
      },
      backdropSaturate: {
        'glass': '1.8'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-texture': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16'
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ease-in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)'
      },
      scale: {
        '102': '1.02',
        '103': '1.03'
      },
      blur: {
        'xs': '2px'
      },
      brightness: {
        '25': '.25',
        '175': '1.75'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    function({ addUtilities, addComponents, theme }) {
      addUtilities({
        '.glass': {
          background: theme('colors.pearl'),
          backdropFilter: 'blur(20px) brightness(1.1) contrast(1.1) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) brightness(1.1) contrast(1.1) saturate(1.8)',
          border: `1px solid ${theme('colors.border')}`,
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.glass')
        },
        '.glass-elevated': {
          background: theme('colors.surface-elevated'),
          backdropFilter: 'blur(20px) brightness(1.1) contrast(1.1) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) brightness(1.1) contrast(1.1) saturate(1.8)',
          border: `1px solid ${theme('colors.accent')}`,
          borderRadius: theme('borderRadius.xl'),
          boxShadow: theme('boxShadow.glass-xl')
        },
        '.glass-subtle': {
          background: theme('colors.transparent-pearl'),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${theme('colors.border-subtle')}`,
          borderRadius: theme('borderRadius.md')
        },
        '.text-gradient': {
          background: `linear-gradient(135deg, ${theme('colors.accent')} 0%, ${theme('colors.primary')} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        },
        '.dynamic-island': {
          background: theme('colors.surface-elevated'),
          backdropFilter: 'blur(20px) brightness(1.1)',
          WebkitBackdropFilter: 'blur(20px) brightness(1.1)',
          border: `1px solid ${theme('colors.accent')}`,
          borderRadius: theme('borderRadius.full'),
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          boxShadow: theme('boxShadow.glass'),
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        '.hero-section': {
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${theme('colors.background')} 0%, rgba(30, 47, 60, 0.8) 100%)`,
          position: 'relative',
          overflow: 'hidden'
        },
        '.floating-nav': {
          position: 'fixed',
          bottom: theme('spacing.6'),
          left: '50%',
          transform: 'translateX(-50%)',
          background: theme('colors.surface-elevated'),
          backdropFilter: 'blur(20px) brightness(1.1)',
          WebkitBackdropFilter: 'blur(20px) brightness(1.1)',
          border: `1px solid ${theme('colors.accent')}`,
          borderRadius: theme('borderRadius.full'),
          padding: theme('spacing.3'),
          boxShadow: theme('boxShadow.glass-xl'),
          zIndex: '1000'
        }
      });

      addComponents({
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme('spacing.2'),
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          fontFamily: theme('fontFamily.sans'),
          fontSize: theme('fontSize.base'),
          fontWeight: '500',
          lineHeight: '1',
          textDecoration: 'none',
          border: 'none',
          borderRadius: theme('borderRadius.lg'),
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          },
          '&:hover::before': {
            transform: 'translateX(100%)'
          }
        },
        '.btn-primary': {
          background: `linear-gradient(135deg, ${theme('colors.accent')} 0%, rgba(0, 255, 255, 0.8) 100%)`,
          color: theme('colors.background'),
          boxShadow: theme('boxShadow.md'),
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme('boxShadow.glass-xl')
          }
        },
        '.btn-secondary': {
          background: theme('colors.pearl'),
          color: theme('colors.primary'),
          border: `1px solid ${theme('colors.border')}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          '&:hover': {
            background: theme('colors.surface'),
            borderColor: theme('colors.accent')
          }
        },
        '.btn-ghost': {
          background: 'transparent',
          color: theme('colors.accent'),
          border: `1px solid ${theme('colors.accent')}`,
          '&:hover': {
            background: theme('colors.accent'),
            color: theme('colors.background')
          }
        },
        '.btn-large': {
          padding: `${theme('spacing.4')} ${theme('spacing.8')}`,
          fontSize: theme('fontSize.lg'),
          borderRadius: theme('borderRadius.xl')
        },
        '.btn-small': {
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          fontSize: theme('fontSize.sm'),
          borderRadius: theme('borderRadius.md')
        },
        '.card': {
          background: theme('colors.pearl'),
          backdropFilter: 'blur(20px) brightness(1.1)',
          WebkitBackdropFilter: 'blur(20px) brightness(1.1)',
          border: `1px solid ${theme('colors.border')}`,
          borderRadius: theme('borderRadius.xl'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.glass'),
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.glass-xl'),
            borderColor: theme('colors.accent')
          }
        },
        '.card-elevated': {
          background: theme('colors.surface-elevated'),
          borderColor: theme('colors.accent'),
          boxShadow: theme('boxShadow.glass-xl')
        },
        '.card-compact': {
          padding: theme('spacing.4'),
          borderRadius: theme('borderRadius.lg')
        }
      });
    }
  ]
};