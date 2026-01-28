// Rate Limiter para APIs - Previene ataques de fuerza bruta y DDoS

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Store en memoria (en producción usar Redis para múltiples instancias)
const rateLimitStore = new Map<string, RateLimitEntry>();

interface RateLimitConfig {
  windowMs: number;  // Ventana de tiempo en ms
  maxRequests: number;  // Máximo de requests por ventana
}

// Configuraciones por tipo de endpoint
export const RATE_LIMIT_CONFIGS = {
  // APIs públicas - más estricto
  public: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 10
  },
  // Formularios de contacto - muy estricto
  contact: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 3
  },
  // APIs internas - más permisivo
  internal: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 100
  }
};

export function getClientIP(request: Request): string {
  // Intentar obtener IP real detrás de proxies
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  // Fallback
  return 'unknown';
}

export function checkRateLimit(
  identifier: string, 
  config: RateLimitConfig = RATE_LIMIT_CONFIGS.public
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  // Limpiar entradas expiradas periódicamente
  if (rateLimitStore.size > 10000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }
  
  // Si no hay entrada o expiró, crear nueva
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs
    });
    return { 
      allowed: true, 
      remaining: config.maxRequests - 1,
      resetIn: config.windowMs 
    };
  }
  
  // Incrementar contador
  entry.count++;
  
  // Verificar límite
  if (entry.count > config.maxRequests) {
    return { 
      allowed: false, 
      remaining: 0,
      resetIn: entry.resetTime - now 
    };
  }
  
  return { 
    allowed: true, 
    remaining: config.maxRequests - entry.count,
    resetIn: entry.resetTime - now 
  };
}

// Helper para crear respuesta de rate limit excedido
export function rateLimitExceededResponse(resetIn: number): Response {
  return new Response(
    JSON.stringify({ 
      error: 'Too many requests',
      message: 'Has excedido el límite de solicitudes. Intenta de nuevo más tarde.',
      retryAfter: Math.ceil(resetIn / 1000)
    }),
    { 
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(Math.ceil(resetIn / 1000)),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.ceil(resetIn / 1000))
      }
    }
  );
}
