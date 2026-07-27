import {fontVariables} from '@/lib/fonts';
import {themeInitScript} from '@/lib/theme-script';
import '../styles/globals.css';

// Wrapper for every route that lives outside [locale]: /auth/*, /invite/*,
// /family/invite/*, /auth-callback. They never reach the locale layout, so
// without this they got no font variables, no theme resolution, and - for the
// invite and callback trees, which imported no layout at all - no stylesheet.
// Font variables and the .dark class both cascade, so a wrapping div plus the
// init script is enough.
export default function StandaloneLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${fontVariables} font-sans`}>
      <script dangerouslySetInnerHTML={{__html: themeInitScript}} />
      {children}
    </div>
  );
}
