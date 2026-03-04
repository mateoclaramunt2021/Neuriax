import { NextRequest, NextResponse } from 'next/server';

// Simple JWT creation (no external deps needed)
function createJWT(payload: Record<string, unknown>, secret: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const crypto = require('crypto');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

// Rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function checkLoginRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  
  if (!record || record.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 60000 }); // 1 min window
    return true;
  }
  
  record.count++;
  return record.count <= 5; // Max 5 attempts per minute
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    if (!checkLoginRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Espera 1 minuto.' },
        { status: 429 }
      );
    }

    const { password } = await request.json();
    
    const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD;
    
    if (!SUPERADMIN_PASSWORD) {
      console.error('SUPERADMIN_PASSWORD not configured in environment');
      return NextResponse.json(
        { error: 'Panel no configurado' },
        { status: 500 }
      );
    }

    if (password !== SUPERADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    // Create JWT token (expires in 24h)
    const secret = process.env.SUPERADMIN_JWT_SECRET || 'neuriax-superadmin-secret-2026';
    const token = createJWT(
      {
        role: 'superadmin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400, // 24h
      },
      secret
    );

    const response = NextResponse.json({ success: true });
    
    response.cookies.set('superadmin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24h
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

// Check auth status
export async function GET(request: NextRequest) {
  const token = request.cookies.get('superadmin_token')?.value;
  
  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    const [, payloadB64] = token.split('.');
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());

    if (payload.exp && payload.exp < Date.now() / 1000) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({ authenticated: true, role: payload.role });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
