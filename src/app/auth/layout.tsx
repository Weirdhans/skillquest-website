import {fontVariables} from '@/lib/fonts';
import '../../styles/globals.css';

// These routes sit outside [locale], so they never reach the layout that sets
// the font variables. Without this wrapper every /auth/* page fell back to
// system-ui. Font variables cascade, so a wrapping div is enough.
export default function AuthLayout({children}: {children: React.ReactNode}) {
  return <div className={`${fontVariables} font-sans`}>{children}</div>;
}
