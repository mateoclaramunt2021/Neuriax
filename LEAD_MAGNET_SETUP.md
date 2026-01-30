# 🎯 Configuración del Lead Magnet Backend

## Estado Actual ✅

El pop-up de lead magnet está **completamente funcional**:
- ✓ Aparece a los 45 segundos
- ✓ Aparece en exit-intent (cuando intenta salir)
- ✓ localStorage previene repeticiones
- ✓ Conexión API configurada

**Lo que falta:** Configurar Resend para enviar emails automáticamente.

---

## 📋 Paso 1: Crear tabla en Supabase

1. Entra a [supabase.com](https://supabase.com) → Tu proyecto
2. Ve a **SQL Editor** → **New Query**
3. Copia y pega el contenido de: `/scripts/supabase-lead-magnets.sql`
4. Ejecuta la query

Esto crea:
- Tabla `lead_magnets` (id, email, source, created_at, updated_at)
- Índices para búsquedas rápidas
- Políticas de seguridad (RLS)

---

## 🚀 Paso 2: Configurar Resend para emails

### 2.1 Crear cuenta en Resend
1. Ve a [resend.com](https://resend.com)
2. Sign up (gratis)
3. Ve a **API Keys** → **Create API Key**
4. Copia la clave (empieza con `re_`)

### 2.2 Agregar a variables de entorno
1. Abre `.env.local` en la raíz del proyecto
2. Agrega: `RESEND_API_KEY=re_tu_clave_aqui`

```env
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
RESEND_API_KEY=re_tu_clave_aqui
```

### 2.3 Verificar dominio (opcional pero recomendado)
Para usar un dominio personalizado (ejemplo: `noreply@neuriax.com`):
1. En Resend → **Domains** → **Add Domain**
2. Sigue los pasos de verificación DNS
3. Después puedes cambiar en `/app/api/lead-magnet/route.ts` el `from` email

---

## 📧 Paso 3: Crear la guía PDF

El sistema envía un email con:
- Titulo: "7 Secretos de Automatización"
- Enlace a: `https://neuriax.com/guias/7-secretos-automatizacion.pdf`

**Acciones:**
1. Crea la guía PDF (use Canva, Word, o similar)
2. Sube a `/public/guias/` o a un servicio como Dropbox/Google Drive
3. Si lo haces en `/public/guias/`, el enlace será automático

---

## 🧪 Paso 4: Probar en local

```bash
# 1. Instalar dependencias (ya hecho)
npm install

# 2. Asegurate que .env.local tiene las claves
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# RESEND_API_KEY

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir http://localhost:3000
# 5. Esperar 45 segundos O mover mouse fuera
# 6. Escribir un email de prueba
# 7. Enviar y verificar que funciona
```

---

## 📊 Cómo funciona el flujo

```
Usuario entra a web
        ↓
    45 segundos (o exit-intent)
        ↓
    Pop-up aparece
        ↓
    Escribe email@ejemplo.com
        ↓
    POST /api/lead-magnet
        ↓
    [Opción A] Guardar en Supabase ✓
    [Opción B] Enviar email con Resend ✓
        ↓
    Mostrar "¡Listo! Revisa tu email"
        ↓
    localStorage.setItem('lead_magnet_dismissed')
```

---

## 🔍 Verificar que está funcionando

### En Supabase
1. Ve a **Table Editor** → `lead_magnets`
2. Deberías ver los emails capturados

### En Resend
1. Ve a **Emails** tab
2. Verás los emails enviados (status: success/failed)

### En tu navegador (consola)
```javascript
// Abre DevTools (F12) → Console
// Deberías ver:
// "Email capturado exitosamente: { success: true, leadId: 123 }"
```

---

## ⚙️ Personalización

### Cambiar email del remitente
Archivo: `/app/api/lead-magnet/route.ts`
```typescript
from: 'Neuriax <noreply@neuriax.com>'  // ← Cambiar aquí
```

### Cambiar contenido del email
Archivo: `/app/api/lead-magnet/route.ts` - Sección `html: ...`

### Cambiar delay del pop-up (45s)
Archivo: `/components/LeadMagnetModal.tsx`
```typescript
}, 45000);  // ← 45000ms = 45 segundos
           // Cambiar a 30000 = 30s, etc
```

### Cambiar enlace de descarga
Archivo: `/app/api/lead-magnet/route.ts`
Busca: `https://neuriax.com/guias/7-secretos-automatizacion.pdf`
Y cambia al URL real de tu guía

---

## 🚀 Desplegar en Producción

Una vez todo funciona en local:

```bash
# 1. Hacer commit
git add .
git commit -m "feat: Configuración completa del lead magnet con Resend"

# 2. Hacer push (auto-deploya en Vercel)
git push origin main

# 3. En Vercel → Settings → Environment Variables
# Agregar las mismas variables:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - RESEND_API_KEY

# 4. Re-deploy en Vercel (si es necesario)
```

---

## 📈 Resultados Esperados

Con esta configuración:
- **Captura de leads:** +30-50% vs botón estático
- **Entrega de guías:** Automática dentro de 1-2 minutos
- **Base de datos:** Todos los emails organizados en Supabase

---

## ❓ Troubleshooting

### "Error: RESEND_API_KEY no configurada"
→ Agrega la clave en `.env.local` y reinicia `npm run dev`

### "Email no se envía"
→ Verifica en Resend Dashboard → Emails que no haya "Hard Bounce"

### "Pop-up no aparece"
→ Abre DevTools → Application → Storage → localStorage
→ Busca `lead_magnet_dismissed` - si existe, bórrala

### "404 en /api/lead-magnet"
→ Asegúrate que `/app/api/lead-magnet/route.ts` existe
→ Reinicia el servidor: `npm run dev`

---

**Preguntas?** Revisa el código comentado en:
- `/components/LeadMagnetModal.tsx` - Lógica del pop-up
- `/app/api/lead-magnet/route.ts` - API endpoint
- `/lib/supabase.ts` - Configuración de Supabase
