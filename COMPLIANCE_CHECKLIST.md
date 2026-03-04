# 📋 CUMPLIMIENTO RGPD/LSSI - SISTEMA LEGAL NEURIAX

**Estado:** ✅ Implementación Inicial Completada  
**Fecha:** 16 de enero de 2026  
**Última actualización:** 16 de enero de 2026

---

## ✅ COMPLETADO

### Páginas Legales Creadas
1. ✓ **[/aviso-legal](app/aviso-legal/page.tsx)** - Aviso Legal (LSSI-CE)
2. ✓ **[/politica-de-privacidad](app/politica-de-privacidad/page.tsx)** - Política de Privacidad (RGPD/LOPDGDD)
3. ✓ **[/politica-de-cookies](app/politica-de-cookies/page.tsx)** - Política de Cookies
4. ✓ **[/condiciones-generales](app/condiciones-generales/page.tsx)** - Condiciones Generales de Servicio

### Componentes del Sistema de Cookies
1. ✓ **[CookieBanner.tsx](components/CookieBanner.tsx)**
   - Banner de consentimiento granular (Necesarias, Analíticas, Marketing)
   - Botones: Aceptar todo / Rechazar / Configurar
   - Almacenamiento en `cookie_consent_v1` (localStorage)
   - **BLOQUEO PREVIO** de scripts hasta consentimiento

2. ✓ **[CookiePreferencesModal.tsx](components/CookiePreferencesModal.tsx)**
   - Modal de configuración detallada
   - Toggles por categoría (necesarias bloqueadas, otras opcionales)
   - Información clara sobre cada tipo de cookie

3. ✓ **[LegalLayout.tsx](components/LegalLayout.tsx)**
   - Componente reutilizable para páginas legales
   - Índice automático (Table of Contents)
   - Diseño responsivo y coherente

### Footer Actualizado
✓ [Footer.tsx](components/Footer.tsx) incluye:
- Sección "Mapa de la Web"
- Sección "Legal" con enlaces:
  - Aviso Legal / Privacidad (en la misma línea)
  - Política de Cookies
  - Condiciones Generales
  - **Botón "Configurar cookies"** que abre el modal

### Integración en Layout
✓ [layout.tsx](app/layout.tsx) actualizado:
- CookieBanner importado y renderizado primero
- Bloqueo de scripts previo a consentimiento funcional

---

## 🔴 PENDIENTE DE COMPLETAR

### 1. DATOS FISCALES (Prioritario: actualizar cuando se formalice)

#### A. Aviso Legal
- **[PENDIENTE: NIF/CIF]** → Actualizar en [/aviso-legal](app/aviso-legal/page.tsx#L20)
- **[PENDIENTE: DOMICILIO FISCAL/PROFESIONAL]** → Actualizar en [/aviso-legal](app/aviso-legal/page.tsx#L24)

#### B. Política de Privacidad
- **[PENDIENTE: NIF/CIF]** → Actualizar en [/politica-de-privacidad](app/politica-de-privacidad/page.tsx#L26)
- **[PENDIENTE: Domicilio fiscal/profesional]** → Actualizar en [/politica-de-privacidad](app/politica-de-privacidad/page.tsx#L28)

#### C. Condiciones Generales
- **[PENDIENTE: Especificar modelo/s de facturación]** → [/condiciones-generales](app/condiciones-generales/page.tsx#L106)
- **[PENDIENTE: Depósito inicial %]** → [/condiciones-generales](app/condiciones-generales/page.tsx#L126)
- **[PENDIENTE: Método de pago]** → [/condiciones-generales](app/condiciones-generales/page.tsx#L127)
- **[PENDIENTE: Plazo de pago en días]** → [/condiciones-generales](app/condiciones-generales/page.tsx#L128)
- **[PENDIENTE: Días para período de aceptación]** → [/condiciones-generales](app/condiciones-generales/page.tsx#L163)

---

### 2. PROVEEDORES TÉCNICOS (Encargados de Tratamiento - RGPD Art. 28)

Completar en **[Política de Privacidad](app/politica-de-privacidad/page.tsx#L228)** cuando se contrate:

#### Hosting / Servidor
- **[PENDIENTE: Nombre del proveedor]** (ej: Vercel, AWS, DigitalOcean)
- URL política privacidad proveedor
- Ubicación geográfica servidores

#### Email
- **[PENDIENTE: Proveedor de correo]** (ej: SendGrid, Mailgun, SMTP propio)
- Política de privacidad

#### CRM / Base de Datos
- **[PENDIENTE: Sistema CRM]** (ej: Pipedrive, HubSpot, Salesforce)
- Política de privacidad
- Ubicación datos

#### Almacenamiento de Documentos (si aplica)
- **[PENDIENTE: Google Drive, OneDrive, etc.]**

---

### 3. HERRAMIENTAS ANALÍTICAS Y MARKETING

**Actualizar en:**
- [Política de Cookies](app/politica-de-cookies/page.tsx#L96-L120) - Tabla de cookies
- [Política de Privacidad](app/politica-de-privacidad/page.tsx#L284) - Datos analíticos
- [CookiePreferencesModal](components/CookiePreferencesModal.tsx#L83-L110) - Descripciones

#### Google Analytics (si aplica)
- Nombre completo: `Google Analytics 4` o `GA4`
- Cookies: `_ga`, `_gid`, etc.
- Duración: 14 meses
- Política: https://policies.google.com/privacy
- **TODO:** Confirmar si se usa y agregar Script de bloqueo

```typescript
// TODO: Descomentar cuando se use GA
// const loadGoogleAnalytics = () => {
//   // Script de GA4
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());
//   gtag('config', '[PENDIENTE: GA_ID]');
// };
```

#### Meta Pixel (si aplica)
- Cookies: `fbp`, `fr`
- Plataforma: Meta (Facebook, Instagram)
- Política: https://www.facebook.com/privacy/explanation
- **TODO:** Confirmar si se usa

```typescript
// TODO: Descomentar cuando se use Meta Pixel
// const loadMetaPixel = () => {
//   !function(f){if(!f.fbq)f.fbq=function(){f.fbq.callMethod ? f.fbq.callMethod.apply(f.fbq,arguments):f.fbq.queue.push(arguments)};...
// };
```

#### Google Ads (si aplica)
- Cookie: `_gac_*`
- **TODO:** Confirmar uso

#### TikTok Pixel (si aplica)
- **TODO:** Confirmar uso

#### Hotjar (si aplica)
- Para análisis de comportamiento
- **TODO:** Confirmar uso

---

### 4. INTEGRACIÓN DE SCRIPTS CON BLOQUEO (CookieBanner.tsx)

Implementado el mecanismo de bloqueo previo. Ahora se necesita:

```typescript
// En CookieBanner.tsx - Función loadConsentedScripts()
// Línea aprox. 40-60

// 1️⃣ TODO: Agregar condicionales para cada herramienta
if (consent.analytics) {
  console.log('[COOKIES] Analytics scripts would load here');
  // loadGoogleAnalytics(); // Descomentar cuando exista
}

if (consent.marketing) {
  console.log('[COOKIES] Marketing scripts would load here');
  // loadMetaPixel(); // Descomentar cuando exista
  // loadGoogleAds(); // Descomentar cuando exista
}

// 2️⃣ TODO: Verificar que scripts EXTERNOS están en una etiqueta <script> con 
// data-category="analytics" o "marketing" para que se carguen dinámicamente
// Ejemplo en next/script:
// <Script 
//   src="https://..." 
//   data-category="analytics"
//   strategy="lazyOnload"
// />
```

---

### 5. DATOS DE CONSERVACIÓN (Plazos) - [Política de Privacidad](app/politica-de-privacidad/page.tsx#L409)

Actualizar plazos según política interna:

```
Formularios de contacto no convertidos: [PENDIENTE: días/meses]
  Sugerencia: 2 años (conforme a RGPD - proporcionalidad)

Clientes activos: [PENDIENTE] años post-contrato
  Sugerencia: 5-7 años (por obligación fiscal española)

Registros de auditoría/seguridad: [PENDIENTE: período]
  Sugerencia: 1-3 años según políticas de seguridad

Suscriptores newsletter: hasta solicitar baja
```

---

### 6. TEXTOS Y CONFIGURACIÓN VARIABLES

#### En Condiciones Generales:
- **[PENDIENTE: Especificar servicios opcionales de mantenimiento]** → [Línea ~320](app/condiciones-generales/page.tsx#L320)
- **[PENDIENTE: Duración confidencialidad post-contrato]** → [Línea ~377](app/condiciones-generales/page.tsx#L377)

---

## 📱 PRÓXIMOS PASOS

### 1. Inmediato (1-7 días)
- [ ] Completar NIF/CIF y domicilio fiscal
- [ ] Confirmar proveedor de hosting
- [ ] Confirmar proveedor de email

### 2. Corto plazo (1-2 semanas)
- [ ] Integrar Google Analytics (si aplica) con bloqueo de consentimiento
- [ ] Integrar Meta Pixel (si aplica) con bloqueo de consentimiento
- [ ] Configurar política de cookies en navegador

### 3. Validación (antes de go-live)
- [ ] Revisar con abogado/asesor legal especializado en RGPD
- [ ] Probar banner de cookies en todos navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Verificar que scripts NO se cargan sin consentimiento (DevTools)
- [ ] Probar "Rechazar todo" y verificar que solo necesarias se cargan
- [ ] Probar "Configurar" y cambiar preferencias

### 4. Documentación
- [ ] Mantener registro de cambios en políticas
- [ ] Documentar cualquier herramienta tercera agregada

---

## 🔍 VERIFICACIÓN DE SEGURIDAD

### ✅ Ya Implementado
- [x] Banner de consentimiento explícito (opt-in)
- [x] Consentimiento granular (por categoría)
- [x] Almacenamiento de consentimiento en localStorage
- [x] Cookie técnica `cookie_consent_v1`
- [x] Botón "Rechazar" prominente
- [x] Modal para cambiar preferencias
- [x] Bloqueo previo de scripts no-necesarios
- [x] Página de Política de Cookies detallada
- [x] Instrucciones para cada navegador
- [x] Enlaces legales en footer

### ⚠️ Requiere Revisión Post-Integración
- [ ] Verificar que Google Analytics NO se carga sin consentimiento
- [ ] Verificar que Meta Pixel NO se carga sin consentimiento
- [ ] Test de retirada de consentimiento
- [ ] Audit de compliance RGPD

---

## 📞 CONTACTO Y RESPONSABILIDAD

**Titular (responsable del tratamiento):**
- Email: neuriaxx@gmail.com
- Teléfono: +34 643 045 488
- Dominio: neuriax.com
- Estado: En proceso de constitución (actualizar cuando se formalice)

---

## 📋 CHECKLIST PARA COMPLETITUD 100%

```
ANTES DE PUBLICAR EN PRODUCCIÓN:

□ NIF/CIF completado en todas las páginas legales
□ Domicilio fiscal/profesional actualizado
□ Proveedor de hosting especificado
□ Proveedor de email configurado
□ Google Analytics integrado (si aplica) Y BLOQUEADO sin consentimiento
□ Meta Pixel integrado (si aplica) Y BLOQUEADO sin consentimiento
□ Otros servicios de terceros integrados Y BLOQUEADOS
□ Plazos de conservación completados según política interna
□ Condiciones de pago especificadas en Condiciones Generales
□ Footer con links legales verificado en móvil y desktop
□ Banner de cookies probado en Chrome, Firefox, Safari, Edge
□ Modal de preferencias probado
□ Botón "Configurar cookies" en footer funcional
□ DevTools: Verificar que NO hay scripts analytics sin consentimiento
□ Revisar con asesor legal especializado en RGPD/LSSI
□ Comunicación a usuarios sobre nueva política (si aplica)
```

---

## 📚 REFERENCIAS NORMATIVAS

- **RGPD:** Reglamento (UE) 2016/679
- **LOPDGDD:** Ley Orgánica 3/2018
- **LSSI-CE:** Ley 34/1988 (modificada)
- **Directiva ePrivacy:** 2002/58/CE (2009/136/CE)
- **Ley de Servicios de Sociedad Información:** Real Decreto-ley 13/2012

---

**Documento generado:** 16 de enero de 2026  
**Archivo:** Este es un documento de referencia interna (no publicado en web)
