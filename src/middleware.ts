import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - files with extensions (e.g. favicon.ico)
  // - files in the _next directory
  // - API routes and internal paths
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
