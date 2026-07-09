/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // SkillQuest brand colors (teal primary, coral CTA)
        primary: {
          50: '#EAF8F5',
          100: '#D2F0EA',
          200: '#A8E0D7',
          300: '#74CBC2',
          400: '#3DAFA8',
          500: '#168F89',
          600: '#0F766E',
          700: '#115E59',
          800: '#134E4A',
          900: '#0F302E',
        },
        // Duolingo-style playful colors
        accent: {
          orange: '#FF9500', // Bright orange for CTAs
          green: '#58CC02', // Duolingo green
          mint: '#88DCBE', // Soft mint
          purple: '#CE82FF', // Soft purple
          yellow: '#FFC800', // Warm yellow
          pink: '#FF85C0', // Playful pink
        },
        // Phoenix fire colors (Zenith Reborn inspired)
        phoenix: {
          fire: '#D2381C', // Deep orange/red (core)
          flame: '#FF6B35', // Warm orange (wings)
          gold: '#FFB627', // Gold/yellow (wing tips)
          ember: '#8B2635', // Bordeaux/purple (accents)
          shadow: '#3D1F2E', // Deep purple (shadows)
        },
        // Background colors
        background: {
          50: '#F9FAFB', // Off-white (not pure white)
          100: '#F3F4F6',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-nunito)', 'system-ui', 'sans-serif'], // Rounded headlines
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
