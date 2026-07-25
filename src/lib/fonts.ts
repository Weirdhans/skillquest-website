import {Bricolage_Grotesque, Geist, Geist_Mono} from 'next/font/google';

// Shared so every layout gets the same stack. The auth layout used to import
// globals.css without any font, so /auth/* silently fell back to system-ui.

// Display: variable, with an optical-size axis that keeps large headings tight
// and small ones readable. The width axis helps the long German compounds.
export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  axes: ['opsz'],
});

export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

// Numerals only: XP, minutes, levels, streaks, prices.
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const fontVariables = `${geist.variable} ${bricolage.variable} ${geistMono.variable}`;
