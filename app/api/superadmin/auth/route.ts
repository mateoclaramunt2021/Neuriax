import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Proper JWT creation with HMAC-SHA256
function createJWT(payload: Record<string, unknown>, secret: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

// Verify JWT signature
function verifyJWT(token: string, secret: string): Record<string, unknown> | null {
  try {
    const [header, body, signature] = token.split('.');
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${body}`)
      .digest('base64url');
    
    // Constant-time comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }
    return JSON.parse(Buffer.from(body, 'base64url').toString());
  } catch {
    return null;
  }
}

// Rate limiting with exponential backoff for login attempts
const loginAttempts = new Map<string, { count: number; resetAt: number; blockedUntil: number }>();

function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  
  // Clean old entries
  if (loginAttempts.size > 10000) {
    for (const [key, val] of loginAttempts.entries()) {
      if (now > val.blockedUntil && now > val.resetAt) loginAttempts.delete(key);
    }
  }
  
  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 60_000, blockedUntil: 0 });
    return { allowed: true };
  }

  // Check if currently blocked
  if (now < record.blockedUntil) {
    return { allowed: false, retryAfter: Math.ceil((record.blockedUntil - now) / 1000) };
  }
  
  record.count++;

  // 5 attempts → block 2 min
  if (record.count >= 5 && record.count < 10) {
    record.blockedUntil = now + 2 * 60_000;
    return { allowed: false, retryAfter: 120 };
  }

  // 10 attempts → block 30 min
  if (record.count >= 10 && record.count < 20) {
    record.blockedUntil = now + 30 * 60_000;
    return { allowed: false, retryAfter: 1800 };
  }

  // 20+ attempts → block 24 hours
  if (record.count >= 20) {
    record.blockedUntil = now + 24 * 60 * 60_000;
    return { allowed: false, retryAfter: 86400 };
  }

  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip') || 'unknown';
    
    const { allowed, retryAfter } = checkLoginRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: `Demasiados intentos. Espera ${retryAfter} segundos.` },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    const body = await request.json();
    const password = typeof body.password === 'string' ? body.password.slice(0, 200) : '';
    
    const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD;
    
    if (!SUPERADMIN_PASSWORD) {
      console.error('SUPERADMIN_PASSWORD not configured in environment');
      return NextResponse.json(
        { error: 'Panel no configurado' },
        { status: 500 }
      );
    }

    // Constant-time comparison to prevent timing attacks
    const passwordBuffer = Buffer.from(password);
    const correctBuffer = Buffer.from(SUPERADMIN_PASSWORD);
    
    if (passwordBuffer.length !== correctBuffer.length || 
        !crypto.timingSafeEqual(passwordBuffer, correctBuffer)) {
      // Don't reveal whether password is wrong or user doesn't exist
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }

    // Create JWT token (expires in 8h — reduced from 24h for security)
    const secret = process.env.SUPERADMIN_JWT_SECRET;
    if (!secret || secret === 'neuriax-superadmin-secret-2026') {
      console.error('SUPERADMIN_JWT_SECRET must be set to a strong random value');
      return NextResponse.json(
        { error: 'Configuración de seguridad incorrecta' },
        { status: 500 }
      );
    }

    const token = createJWT(
      {
        role: 'superadmin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 28800, // 8h
        jti: crypto.randomUUID(), // Unique token ID
      },
      secret
    );

    // Reset login attempts on success
    loginAttempts.delete(ip);

    const response = NextResponse.json({ success: true });
    
    response.cookies.set('superadmin_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 28800, // 8h
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Error de autenticación' },
      { status: 500 }
    );
  }
}

// Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('superadmin_token');
  return response;
}

// Check auth status (with signature verification)
export async function GET(request: NextRequest) {
  const token = request.cookies.get('superadmin_token')?.value;
  
  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    const secret = process.env.SUPERADMIN_JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ authenticated: false });
    }

    const payload = verifyJWT(token, secret);
    if (!payload) {
      return NextResponse.json({ authenticated: false });
    }

    if (typeof payload.exp === 'number' && payload.exp < Date.now() / 1000) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({ authenticated: true, role: payload.role });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
