import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // Keep invite links stable without locale prefixes for app/universal links.
  if (pathname.startsWith('/invite/')) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - files with extensions (e.g. favicon.ico)
  // - files in the _next directory
  // - API routes and internal paths
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
