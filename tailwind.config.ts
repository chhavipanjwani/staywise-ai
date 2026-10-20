import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['var(--font-inter)', 'Inter', 'sans-serif'] },
      boxShadow: {
        soft: '0 24px 80px rgba(10, 22, 50, 0.16)',
        glow: '0 0 0 1px rgba(120, 123, 255, 0.2), 0 18px 60px rgba(57, 55, 150, 0.22)'
      },
      animation: { float: 'float 6s ease-in-out infinite', 'pulse-soft': 'pulse-soft 3s ease-in-out infinite' },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        'pulse-soft': { '0%, 100%': { opacity: '.7' }, '50%': { opacity: '1' } }
      }
    }
  },
  plugins: []
};

export default config;
