import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/* ═══════════════════════════════════════════════════════
   SECURITY MIDDLEWARE — Enterprise-grade protection
   ═══════════════════════════════════════════════════════ */

// ── Malicious bot user-agents to block ──
const BLOCKED_USER_AGENTS = [
  'sqlmap', 'nikto', 'nmap', 'masscan', 'zgrab',
  'dirbuster', 'gobuster', 'wfuzz', 'ffuf',
  'nuclei', 'httpx', 'subfinder', 'amass',
  'python-requests', 'scrapy', 'wget', 'curl',
  'ahrefs', 'semrush', 'mj12bot', 'dotbot',
  'blexbot', 'bytespider', 'petalbot',
  'seekport', 'zoominfobot', 'dataforseo',
];

// ── Sensitive paths that should NEVER be accessible ──
const BLOCKED_PATHS = [
  '/.env',
  '/.git',
  '/.gitignore',
  '/.htaccess',
  '/.htpasswd',
  '/wp-admin',
  '/wp-login',
  '/wp-content',
  '/wp-includes',
  '/xmlrpc.php',
  '/admin.php',
  '/phpmyadmin',
  '/phpinfo.php',
  '/config.php',
  '/package.json',
  '/package-lock.json',
  '/tsconfig.json',
  '/next.config',
  '/node_modules',
  '/.next',
  '/server.js',
  '/composer.json',
  '/Dockerfile',
  '/docker-compose',
  '/.aws',
  '/.ssh',
  '/id_rsa',
  '/backup',
  '/dump.sql',
  '/database',
  '/.vscode',
  '/.idea',
];

// ── Path traversal patterns ──
const PATH_TRAVERSAL_PATTERNS = [
  /\.\.\//,          // ../
  /\.\.\\/,          // ..\
  /%2e%2e/i,         // URL encoded ..
  /%252e%252e/i,     // Double encoded ..
  /\.%00/,           // Null byte
  /%00/,             // Null byte
  /<script/i,        // XSS attempt in URL
  /javascript:/i,    // JS protocol
  /data:text\/html/i,// Data URI XSS
  /\bon\w+\s*=/i,    // Event handler injection
];

// ── Rate limiting for superadmin auth (in-memory) ──
const authAttempts = new Map<string, { count: number; blockedUntil: number }>();

function checkAuthRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = authAttempts.get(ip);

  // Clean old entries periodically
  if (authAttempts.size > 5000) {
    for (const [key, val] of authAttempts.entries()) {
      if (now > val.blockedUntil) authAttempts.delete(key);
    }
  }

  if (!record || now > record.blockedUntil) {
    authAttempts.set(ip, { count: 1, blockedUntil: now + 60_000 });
    return { allowed: true };
  }

  record.count++;

  // After 5 attempts: block for 5 minutes
  if (record.count > 5) {
    record.blockedUntil = now + 5 * 60_000;
    return { allowed: false, retryAfter: 300 };
  }

  // After 10 attempts: block for 1 hour
  if (record.count > 10) {
    record.blockedUntil = now + 60 * 60_000;
    return { allowed: false, retryAfter: 3600 };
  }

  return { allowed: true };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  // ━━━━ 1. BLOCK MALICIOUS BOTS ━━━━
  if (BLOCKED_USER_AGENTS.some(bot => userAgent.includes(bot))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // ━━━━ 2. BLOCK SENSITIVE FILE ACCESS ━━━━
  const lowerPath = pathname.toLowerCase();
  if (BLOCKED_PATHS.some(blocked => lowerPath.startsWith(blocked))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // ━━━━ 3. BLOCK PATH TRAVERSAL ATTACKS ━━━━
  if (PATH_TRAVERSAL_PATTERNS.some(pattern => pattern.test(pathname))) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  // ━━━━ 4. BLOCK SUSPICIOUS QUERY STRINGS (SQL injection, XSS) ━━━━
  const url = request.nextUrl.toString();
  const suspiciousPatterns = [
    /union\s+select/i,
    /;\s*drop\s+table/i,
    /;\s*delete\s+from/i,
    /'\s*or\s+'1'\s*=\s*'1/i,
    /'\s*or\s+1\s*=\s*1/i,
    /<script>/i,
    /javascript:/i,
    /onerror\s*=/i,
    /onload\s*=/i,
  ];
  if (suspiciousPatterns.some(p => p.test(url))) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  // ━━━━ 5. SUPERADMIN AUTH — Rate limit + JWT verification ━━━━
  if (pathname.startsWith('/superadmin') || (pathname.startsWith('/api/superadmin') && !pathname.startsWith('/api/superadmin/auth'))) {
    const token = request.cookies.get('superadmin_token')?.value;

    if (!token) {
      if (!pathname.startsWith('/api/')) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const [, payloadB64] = token.split('.');
      const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());

      if (payload.exp && payload.exp < Date.now() / 1000) {
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

  // ━━━━ 6. RATE LIMIT SUPERADMIN LOGIN ━━━━
  if (pathname === '/api/superadmin/auth' && request.method === 'POST') {
    const { allowed, retryAfter } = checkAuthRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Inténtalo más tarde.' },
        {
          status: 429,
          headers: { 'Retry-After': String(retryAfter || 300) },
        }
      );
    }
  }

  // ━━━━ 7. ADD SECURITY HEADERS TO RESPONSE ━━━━
  const response = NextResponse.next();

  // Prevent information leakage
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  // Remove server info headers
  response.headers.delete('X-Powered-By');
  response.headers.delete('Server');

  return response;
}

export const config = {
  matcher: [
    // Match everything except static files and images
    '/((?!_next/static|_next/image|favicon\\.png|assets/images/).*)',
  ],
};
