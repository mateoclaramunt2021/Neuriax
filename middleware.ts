import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirigir TODAS las rutas a mantenimiento
  return NextResponse.redirect(new URL('/', request.url));
}

// Aplicar a TODAS las rutas excepto API y archivos estáticos
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo-neuriax.png).*)',
  ],
};
