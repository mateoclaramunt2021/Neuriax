# 🛠️ GUÍA TÉCNICA - SISTEMA DE COOKIES Y LEGAL

## Descripción General

Este proyecto implementa un sistema completo de cumplimiento RGPD/LSSI con:
1. **Banner de consentimiento de cookies** con granularidad por categoría
2. **Bloqueo previo de scripts** hasta obtener consentimiento
3. **Páginas legales profesionales** (Aviso Legal, Privacidad, Cookies, Términos)
4. **Footer actualizado** con enlaces legales

---

## 🏗️ Arquitectura de Componentes

```
┌─ app/layout.tsx (Root Layout)
│  └─ CookieBanner ← Renderiza primero (antes de otros componentes)
│     ├─ Verifica localStorage por "cookie_consent_v1"
│     ├─ Muestra banner si no hay consentimiento
│     └─ Carga scripts condicionalmente (en loadConsentedScripts)
│
├─ components/CookieBanner.tsx
│  ├─ Estado: showBanner, preferences
│  ├─ localStorage: cookie_consent_v1 (JSON)
│  └─ Integración con CookiePreferencesModal
│
├─ components/CookiePreferencesModal.tsx
│  ├─ Toggles: necessary (bloqueado), analytics, marketing
│  ├─ Botones: "Rechazar todo", "Aceptar todo", "Guardar preferencias"
│  └─ Retorna: CookieConsent (tipo TypeScript)
│
├─ components/LegalLayout.tsx
│  ├─ Props: children, title, lastUpdated, toc
│  ├─ Renderiza: Índice + contenido + footer info
│  └─ Responsive: Grid con sidebar en lg
│
├─ app/aviso-legal/page.tsx
├─ app/politica-de-privacidad/page.tsx
├─ app/politica-de-cookies/page.tsx
├─ app/condiciones-generales/page.tsx
│  └─ Todas usan LegalLayout
│
└─ components/Footer.tsx
   ├─ Sección: "Mapa de la Web"
   ├─ Sección: "Legal" (enlaces + "Configurar cookies")
   ├─ Botón "Configurar cookies" → abre modal
   └─ Integración con CookiePreferencesModal
```

---

## 📦 Tipos TypeScript

```typescript
// Tipo de consentimiento de cookies
type CookieConsent = {
  necessary: boolean;    // Siempre true (no desactivable)
  analytics: boolean;    // Google Analytics, Hotjar, etc.
  marketing: boolean;    // Meta Pixel, Google Ads, etc.
  timestamp: string;     // ISO timestamp de aceptación
};

// Almacenamiento
localStorage.setItem('cookie_consent_v1', JSON.stringify(consent));
// Resultado:
// {
//   "necessary": true,
//   "analytics": false,
//   "marketing": false,
//   "timestamp": "2026-01-16T10:30:00.000Z"
// }
```

---

## 🎯 Flujo de Uso

### 1️⃣ Primera Visita (Sin Consentimiento Previo)

```
Usuario entra a neuriax.com
    ↓
CookieBanner verifica localStorage
    ↓
"cookie_consent_v1" NO existe
    ↓
Muestra banner con 3 opciones:
  • "Rechazar todo" → Solo cookies necesarias
  • "Configurar" → Abre modal
  • "Aceptar todo" → Todas las categorías
    ↓
Usuario hace clic en una opción
    ↓
Se guarda en localStorage: cookie_consent_v1
    ↓
Se ejecuta loadConsentedScripts(consent)
    ↓
Banner desaparece
```

### 2️⃣ Visitas Posteriores (Con Consentimiento)

```
Usuario vuelve a neuriax.com
    ↓
CookieBanner verifica localStorage
    ↓
"cookie_consent_v1" EXISTE
    ↓
Carga preferencias guardadas
    ↓
Ejecuta loadConsentedScripts(consent) con preferencias
    ↓
Banner NO se muestra
```

### 3️⃣ Cambiar Preferencias

```
Usuario hace clic en "Configurar cookies" (footer)
    ↓
Se abre CookiePreferencesModal
    ↓
Usuario ajusta toggles (analytics, marketing)
    ↓
Hace clic "Guardar preferencias"
    ↓
Se actualiza localStorage
    ↓
Se ejecuta loadConsentedScripts() nuevamente
    ↓
Modal se cierra
```

---

## 🔐 Bloqueo de Scripts (Previo al Consentimiento)

### Implementación Actual

En **CookieBanner.tsx** línea 40-60:

```typescript
const loadConsentedScripts = (consent: CookieConsent) => {
  // Estos scripts SOLO se ejecutan si el usuario consiente
  
  if (consent.analytics) {
    console.log('[COOKIES] Analytics scripts would load here');
    // TODO: Descomentar cuando se integre Google Analytics
    // loadGoogleAnalytics();
  }

  if (consent.marketing) {
    console.log('[COOKIES] Marketing scripts would load here');
    // TODO: Descomentar cuando se integre Meta Pixel
    // loadMetaPixel();
  }
};
```

### Cómo Agregar Google Analytics

#### Opción A: Script Manual (Recomendado)

1. **En `layout.tsx`**, después de `<CookieBanner />`:

```typescript
{/* Google Analytics - Cargado solo si consentimiento */}
<Script 
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
  strategy="lazyOnload"
  onLoad={() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  }}
/>
```

2. **En `CookieBanner.tsx`**, línea 40-60, reemplaza comentarios:

```typescript
const loadConsentedScripts = (consent: CookieConsent) => {
  if (consent.analytics) {
    // Inyecta script de GA4
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  }
  
  if (consent.marketing) {
    // Meta Pixel
    // ...similar approach
  }
};
```

#### Opción B: Usando Next.js Script Tag

```typescript
// components/GoogleAnalytics.tsx
'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_v1');
    if (consent) {
      const parsed = JSON.parse(consent);
      setHasConsent(parsed.analytics === true);
    }
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=GA_ID`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_ID');
          `,
        }}
      />
    </>
  );
}
```

---

## 📄 Páginas Legales - Estructura

### Componentes Comunes

Todas usan **LegalLayout**:

```typescript
import LegalLayout from '@/components/LegalLayout';

export default function Page() {
  const toc = [
    { id: 'seccion-1', label: 'Sección 1' },
    { id: 'seccion-2', label: 'Sección 2' },
  ];

  return (
    <LegalLayout
      title="Título de la Página"
      lastUpdated="16 de enero de 2026"
      toc={toc}
    >
      <section id="seccion-1">
        {/* Contenido aquí */}
      </section>
    </LegalLayout>
  );
}
```

### Actualizar Fechas

Busca y reemplaza `"16 de enero de 2026"` con la fecha actual en cada página.

---

## ✏️ Cómo Completar Datos Faltantes

### 1. NIF/CIF

**Busca:** `[PENDIENTE: NIF]` o `[PENDIENTE: NIF/CIF]`

**Archivos afectados:**
- [/aviso-legal](app/aviso-legal/page.tsx) → línea ~40
- [/politica-de-privacidad](app/politica-de-privacidad/page.tsx) → línea ~26

**Reemplaza por:** `ES12345678X` (formato español real)

### 2. Domicilio

**Busca:** `[PENDIENTE: DOMICILIO FISCAL]`

**Archivos afectados:**
- [/aviso-legal](app/aviso-legal/page.tsx) → línea ~24
- [/politica-de-privacidad](app/politica-de-privacidad/page.tsx) → línea ~30

**Reemplaza por:** `Calle Ejemplo, 123, 28000 Madrid, España`

### 3. Proveedor de Hosting

**Busca:** `[PENDIENTE: HOSTING]`

**Archivos afectados:**
- [/politica-de-privacidad](app/politica-de-privacidad/page.tsx) → línea ~250

**Reemplaza por:** `Vercel`, `AWS`, `DigitalOcean`, etc.

### 4. Google Analytics

**Busca:** `[PENDIENTE: Google Analytics]`

**Archivos afectados:**
- [/politica-de-cookies](app/politica-de-cookies/page.tsx) → línea ~96
- [CookiePreferencesModal](components/CookiePreferencesModal.tsx) → línea ~86

**Acciones:**
1. Reemplaza con nombre de herramienta real
2. Agrega URL de política de privacidad
3. Implementa bloqueo de script (ver sección anterior)

---

## 🧪 Testing

### Test 1: Banner de Cookies Aparece

```bash
1. Abre navegador en modo incógnito
2. Ve a https://neuriax.com
3. Verifica que banner aparece en bottom del viewport
4. Comprueba localStorage:
   - Abre DevTools → Application → Local Storage
   - NO debe estar "cookie_consent_v1"
```

### Test 2: Aceptar Todo

```bash
1. Click en "Aceptar todo"
2. Banner desaparece
3. DevTools → Local Storage:
   - "cookie_consent_v1" contiene:
   {
     "necessary": true,
     "analytics": true,
     "marketing": true,
     "timestamp": "2026-01-16T..."
   }
```

### Test 3: Rechazar Todo

```bash
1. Limpia localStorage
2. Recarga página
3. Click en "Rechazar todo"
4. LocalStorage debe contener:
   {
     "necessary": true,
     "analytics": false,    ← false
     "marketing": false,    ← false
     "timestamp": "2026-01-16T..."
   }
5. Verifica que NO hay scripts de GA/Meta en Network tab
```

### Test 4: Cambiar Preferencias

```bash
1. Click en "Configurar cookies" (footer)
2. Modal aparece
3. Cambia toggles
4. Click "Guardar preferencias"
5. Verifica localStorage actualizado
```

### Test 5: Sin Consentimiento - Sin Scripts

```bash
1. Limpia localStorage
2. Abre DevTools → Network tab
3. Recarga página
4. "Rechaza todo"
5. Busca en Network: NO debe aparecer:
   - google-analytics
   - googletagmanager
   - facebook pixel
   - connect.facebook.net
6. Si aparecen → BUG: Scripts se cargaron sin consentimiento
```

---

## 🐛 Troubleshooting

### Problem: Banner no aparece

**Causa:** localStorage contiene "cookie_consent_v1"

**Solución:**
```javascript
// En DevTools Console:
localStorage.removeItem('cookie_consent_v1');
location.reload();
```

### Problem: Cambios en política no se reflejan

**Causa:** Next.js caché estático

**Solución:**
```bash
npm run build
# O en desarrollo:
npm run dev
# (Recarga la página, Ctrl+Shift+R)
```

### Problem: Scripts siguen cargándose sin consentimiento

**Causa:** Scripts no están bloqueados correctamente

**Solución:**
1. Verifica que `loadConsentedScripts()` está siendo llamada
2. Asegúrate que scripts externos usan `data-category` attribute
3. Usa DevTools Network para confirmar timing

### Problem: Cookies no se guardan

**Causa:** localStorage desactivado o incógnito mode

**Solución:**
1. Prueba en ventana normal (no incógnito)
2. Verifica que localStorage no está bloqueado en navegador
3. Usa estado React como fallback (no persistente)

---

## 📱 Responsive Testing

```bash
Dispositivos a probar:
☐ Desktop (1920x1080)
☐ Tablet (768x1024) 
☐ Mobile (375x667)
☐ Mobile (414x896)

Navegadores:
☐ Chrome (Stable)
☐ Firefox (Stable)
☐ Safari (Stable)
☐ Edge (Stable)

Verificar:
☐ Banner se ajusta correctamente
☐ Modal es completamente visible
☐ Botones son clickeables
☐ Índice (TOC) funciona en mobile
```

---

## 🚀 Deployment

### Antes de publicar a producción:

1. ✅ Compilación sin errores:
   ```bash
   npm run build
   # Debe completar sin errores
   ```

2. ✅ Testeo local:
   ```bash
   npm run dev
   # Prueba todas las funcionalidades del banner
   ```

3. ✅ Verificar políticas:
   - [ ] NIF/CIF completado
   - [ ] Domicilio completado
   - [ ] Proveedor hosting especificado
   - [ ] Scripts de analytics bloqueados correctamente

4. ✅ Audit RGPD:
   ```bash
   # Recomendado: Revisar con asesor legal antes de ir live
   ```

---

## 📞 Soporte

**Email:** neuriaxx@gmail.com  
**Teléfono:** +34 643 045 488  
**Dominio:** neuriax.com

---

**Última actualización:** 16 de enero de 2026
