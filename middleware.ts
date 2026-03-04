import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /superadmin routes (except the auth API)
  if (pathname.startsWith('/superadmin') || (pathname.startsWith('/api/superadmin') && !pathname.startsWith('/api/superadmin/auth'))) {
    const token = request.cookies.get('superadmin_token')?.value;

    if (!token) {
      // For page routes, redirect to home
      if (!pathname.startsWith('/api/')) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      // For API routes, return 401
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify JWT token
    try {
      const secret = process.env.SUPERADMIN_JWT_SECRET || 'neuriax-superadmin-secret-2026';
      const [, payloadB64] = token.split('.');
      const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());

      if (payload.exp && payload.exp < Date.now() / 1000) {
        // Token expired
        const response = pathname.startsWith('/api/')
          ? NextResponse.json({ error: 'Token expired' }, { status: 401 })
          : NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('superadmin_token');
        return response;
      }

      if (payload.role !== 'superadmin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    } catch {
      const response = pathname.startsWith('/api/')
        ? NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        : NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('superadmin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/superadmin/:path*', '/api/superadmin/:path*'],
};
