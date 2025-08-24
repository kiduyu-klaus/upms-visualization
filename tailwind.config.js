/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'slideIn': 'slideIn 0.8s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'soak': 'soak 1s ease-in-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)',
          }
        },
        'fadeInUp': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          }
        },
        'slideIn': {
          'from': {
            transform: 'translateX(-100%)',
          },
          'to': {
            transform: 'translateX(0)',
          }
        },
        'shimmer': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        },
        'soak': {
          '0%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.7',
            transform: 'scale(1.1)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.8)',
          }
        }
      },
      colors: {
        'upms-blue': {
          50: '#eff6ff',
          500: '#3b82f6',
          700: '#1d4ed8',
        },
        'upms-purple': {
          300: '#c084fc',
          500: '#a855f7',
        },
        'upms-red': {
          300: '#fca5a5',
          500: '#ef4444',
        }
      }
    },
  },
  plugins: [],
}