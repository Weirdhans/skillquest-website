/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // lib/ holds the marketing copy and feature-page data. No class strings today,
    // but keeping it scanned means moving a className here will not silently purge.
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand teal. Used for structure, eyebrows, links - never for CTAs.
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
        // Action orange. CTAs only, so the accent keeps meaning something.
        phoenix: {
          fire: '#D2381C',
          flame: '#FF6B35',
        },
        background: {
          50: '#F9FAFB',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bricolage)', 'system-ui', 'sans-serif'],
        // Numerals: XP, minutes, levels, streaks, prices. The product measures
        // things, so the numbers should read as measured.
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      // A real type scale. Previously every heading was ad-hoc, which is why all
      // ten homepage <h2>s rendered at an identical 36px. clamp() means headings
      // scale continuously instead of jumping at breakpoints.
      fontSize: {
        // Max capped at 4rem, not 5rem: the headline has to hold two lines in
        // every locale, and the French string is 56 characters.
        display: [
          'clamp(2.5rem, 4.6vw, 4rem)',
          { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '700' },
        ],
        section: [
          'clamp(2rem, 3.5vw, 3.25rem)',
          { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        subsection: [
          'clamp(1.25rem, 1.6vw, 1.5rem)',
          { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
        lead: [
          'clamp(1.125rem, 1.4vw, 1.375rem)',
          { lineHeight: '1.6' },
        ],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
