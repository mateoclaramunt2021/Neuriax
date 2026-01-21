import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// MAINTENANCE MODE - change to false to disable
const MAINTENANCE_MODE = true;

export function middleware(request: NextRequest) {
  // Si el modo mantenimiento está ON, redirigir TODOS a /mantenimiento
  if (MAINTENANCE_MODE && !request.nextUrl.pathname.startsWith('/mantenimiento')) {
    return NextResponse.redirect(new URL('/mantenimiento', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo-neuriax.png).*)',
  ],
};
