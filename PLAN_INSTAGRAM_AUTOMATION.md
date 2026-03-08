# 📸 PLAN COMPLETO: Instagram Automation para Neuriax

## Estado Actual (Lo que YA tienes)

Tu proyecto ya tiene una base sólida de automatización de Instagram:

| Componente | Estado | Ubicación |
|---|---|---|
| Webhook para recibir DMs | ✅ Hecho | `app/api/instagram/webhook/route.ts` |
| Bot IA con Groq (LLaMA 3.3 70B) | ✅ Hecho | Mismo archivo webhook |
| Panel SuperAdmin Instagram | ✅ Hecho | `app/superadmin/instagram/page.tsx` |
| API SuperAdmin (CRUD) | ✅ Hecho | `app/api/superadmin/instagram/route.ts` |
| Envío/recepción de mensajes | ✅ Hecho | Integrado en webhook |
| Almacenamiento en Supabase | ✅ Hecho | Tablas `instagram_messages` + `instagram_config` |
| Configuración bot on/off | ✅ Hecho | Desde panel SuperAdmin |

## Lo que FALTA para que sea "ultra automático"

---

## FASE 1: Conectar Instagram (Meta API) — OBLIGATORIO
**Prioridad: 🔴 CRÍTICA | Tiempo: 1-2 horas**

Sin esto, NADA funciona. Necesitas vincular tu cuenta de Instagram a la Meta Graph API.

### Paso a paso:

#### 1.1 Crear Meta App
1. Ve a [developers.facebook.com](https://developers.facebook.com)
2. Click **"Crear app"** → selecciona **"Empresa"**
3. Nombre: `Neuriax Instagram Bot`
4. Asocia tu cuenta de empresa (Business Manager)

#### 1.2 Configurar productos
1. En tu app, ve a **"Agregar productos"**
2. Agrega **"Instagram Graph API"**
3. Agrega **"Webhooks"**

#### 1.3 Vincular cuenta de Instagram
1. Tu cuenta de Instagram DEBE ser **Profesional** (Empresa o Creador)
2. Tu cuenta de Instagram DEBE estar vinculada a una **Página de Facebook**
3. En la app de Meta → Instagram → **Configuración** → Añade tu cuenta

#### 1.4 Generar Token de Acceso
1. Ve a **Graph API Explorer** en developers.facebook.com
2. Selecciona tu app
3. Permisos necesarios:
   - `instagram_basic`
   - `instagram_manage_messages`
   - `pages_messaging`
   - `pages_show_list`
   - `pages_manage_metadata`
4. Genera el token → **Conviértelo a token de larga duración** (60 días)
5. **MÁS IMPORTANTE**: Configura un cron para renovar el token automáticamente

#### 1.5 Configurar Webhook
1. En tu app de Meta → Webhooks → **Configurar**
2. URL del webhook: `https://www.neuriax.com/api/instagram/webhook`
3. Token de verificación: `neuriax-webhook-2026` (ya configurado en tu código)
4. Suscribirte a: `messages`, `messaging_postbacks`

#### 1.6 Guardar credenciales
En **Vercel Environment Variables** (Settings → Environment Variables):
```
INSTAGRAM_ACCESS_TOKEN=tu_token_aqui
INSTAGRAM_ACCOUNT_ID=tu_id_numerico_aqui
```

Y desde el panel SuperAdmin → Instagram → Configuración, pegar los mismos datos.

---

## FASE 2: Respuestas Automáticas a Nuevos Seguidores — NUEVO
**Prioridad: 🟠 ALTA | Tiempo: 3-4 horas de desarrollo**

### 2.1 Webhook de nuevos seguidores
Instagram NO tiene webhook nativo para nuevos seguidores. Soluciones:

**Opción A: Polling periódico (recomendada)**
- Crear un cron job que cada 15 min consulte los seguidores actuales
- Comparar con la lista anterior en Supabase
- Enviar DM de bienvenida a los nuevos

**Opción B: Responder al primer DM como "bienvenida"**
- Ya tienes esto parcialmente: cuando alguien escribe por primera vez, el bot IA responde
- Mejorar el prompt para detectar si es primera interacción

### 2.2 Implementación técnica

#### Nueva tabla Supabase: `instagram_followers`
```sql
CREATE TABLE instagram_followers (
  id BIGSERIAL PRIMARY KEY,
  instagram_user_id TEXT NOT NULL UNIQUE,
  username TEXT,
  first_seen_at TIMESTAMPTZ DEFAULT NOW(),
  welcome_sent BOOLEAN DEFAULT FALSE,
  welcome_sent_at TIMESTAMPTZ
);
```

#### Nuevo cron endpoint: `/api/cron/instagram-followers`
- Cada 15 minutos consulta followers vía API
- Detecta nuevos → les envía DM de bienvenida personalizado
- Marca como `welcome_sent = true`

#### Mensaje de bienvenida configurable
Desde el panel SuperAdmin, poder editar el mensaje de bienvenida:
```
¡Hola! 👋 Gracias por seguirnos en Instagram!
Soy el asistente de Neuriax. Si necesitas una web, chatbot o automatización, ¡estoy aquí para ayudarte! 🚀

¿En qué puedo echarte una mano?
```

### 2.3 Cron en Vercel
Añadir a `vercel.json`:
```json
{
  "path": "/api/cron/instagram-followers",
  "schedule": "*/15 * * * *"
}
```

---

## FASE 3: Auto-respuestas a Stories y Mentions — NUEVO
**Prioridad: 🟡 MEDIA | Tiempo: 2-3 horas**

### 3.1 Story Mentions
Cuando alguien te menciona en su Story:
- Instagram envía un webhook `story_mention`
- Responder automáticamente: _"¡Gracias por mencionarnos! 💜 ¿Necesitas algo?"_

### 3.2 Comentarios en publicaciones
- Webhook `comments` para detectar nuevos comentarios
- Respuesta automática inteligente con IA
- Filtro anti-spam

### Implementación:
Ampliar el webhook existente para procesar estos eventos además de `messaging`.

---

## FASE 4: Mejoras al Dashboard Instagram — NUEVO
**Prioridad: 🟡 MEDIA | Tiempo: 4-5 horas**

### 4.1 Métricas avanzadas
- Nuevos seguidores/día (gráfica)
- Tasa de respuesta del bot
- Tiempo medio de respuesta
- Conversiones (leads generados desde Instagram)
- DMs sin responder

### 4.2 Campañas masivas
- Enviar DM masivo a seguidores (con límites de Instagram: 100/día)
- Templates de mensajes predefinidos
- Programar envíos

### 4.3 Etiquetas y CRM
- Etiquetar conversaciones: `lead`, `cliente`, `interesado`, `spam`
- Pipeline visual desde Instagram
- Integrar con el pipeline general del CRM que ya tienes

### 4.4 Quick Replies
- Botones de respuesta rápida predefinidos en el chat
- _"Enviar precios"_, _"Agendar llamada"_, _"Enviar portfolio"_

---

## FASE 5: Automatización de Contenido — NUEVO
**Prioridad: 🟢 BAJA | Tiempo: 6-8 horas**

### 5.1 Auto-publicación (vía Meta Content Publishing API)
- Subir imágenes y reels programados desde el dashboard
- Calendario de contenido
- Generación de captions con IA

### 5.2 Hashtag research
- Sugerir hashtags relevantes por IA
- Analizar rendimiento de hashtags anteriores

---

## FASE 6: Token Auto-Refresh — CRÍTICO
**Prioridad: 🔴 CRÍTICA | Tiempo: 1 hora**

El token de Instagram caduca cada 60 días. Necesitas renovación automática.

### Implementación:
```
/api/cron/instagram-token-refresh
```
- Se ejecuta cada 50 días
- Usa el endpoint de Meta para renovar el token
- Guarda el nuevo token en Supabase
- Envía email de confirmación

### Cron en Vercel:
```json
{
  "path": "/api/cron/instagram-token-refresh",
  "schedule": "0 3 1,15 * *"
}
```
(Se ejecuta el 1 y 15 de cada mes a las 3am)

---

## RESUMEN DE TAREAS ORDENADAS POR PRIORIDAD

| # | Tarea | Prioridad | Tiempo | Tipo |
|---|---|---|---|---|
| 1 | Crear Meta App + vincular Instagram | 🔴 CRÍTICA | 1h | Manual (tú) |
| 2 | Generar token + configurar webhook | 🔴 CRÍTICA | 30min | Manual (tú) |
| 3 | Poner variables de entorno en Vercel | 🔴 CRÍTICA | 5min | Manual (tú) |
| 4 | Token auto-refresh cron | 🔴 CRÍTICA | 1h | Código |
| 5 | Auto-DM a nuevos seguidores | 🟠 ALTA | 3h | Código |
| 6 | Mejorar prompt del bot IA | 🟠 ALTA | 30min | Código |
| 7 | Story mentions + comentarios | 🟡 MEDIA | 2h | Código |
| 8 | Métricas avanzadas en dashboard | 🟡 MEDIA | 3h | Código |
| 9 | Quick replies + etiquetas CRM | 🟡 MEDIA | 3h | Código |
| 10 | Campañas masivas DM | 🟡 MEDIA | 2h | Código |
| 11 | Auto-publicación de contenido | 🟢 BAJA | 6h | Código |
| 12 | Hashtag research IA | 🟢 BAJA | 2h | Código |

---

## LO QUE TÚ TIENES QUE HACER (Manual, no se puede automatizar)

### Checklist para ti, Mateo:

- [ ] **1. Cuenta Instagram Profesional**: Ve a Instagram → Configuración → Cuenta → Cambiar a cuenta profesional (si no lo es ya)
- [ ] **2. Página de Facebook**: Crea una página de Facebook para Neuriax (si no la tienes) y vincula tu Instagram
- [ ] **3. Meta Business Suite**: Regístrate en [business.facebook.com](https://business.facebook.com)
- [ ] **4. Developer App**: Crea la app en [developers.facebook.com](https://developers.facebook.com)
- [ ] **5. Permisos de la app**: Solicita los permisos `instagram_manage_messages` (requiere revisión de Meta)
- [ ] **6. Token de acceso**: Genera y copia el token
- [ ] **7. ID de cuenta**: Copia el ID numérico de tu cuenta de Instagram
- [ ] **8. Variables en Vercel**: Añade `INSTAGRAM_ACCESS_TOKEN` e `INSTAGRAM_ACCOUNT_ID`
- [ ] **9. Configurar webhook en Meta**: URL: `https://www.neuriax.com/api/instagram/webhook`, Token: `neuriax-webhook-2026`
- [ ] **10. Probar**: Envíate un DM desde otra cuenta y verifica que el bot responde

### ⚠️ IMPORTANTE: Revisión de Meta
El permiso `instagram_manage_messages` requiere que Meta revise tu app. Este proceso tarda **2-5 días laborables**. Mientras tanto, puedes probar en modo desarrollo con cuentas de prueba.

---

## LO QUE YO PUEDO IMPLEMENTAR AHORA (Código)

Dime qué quieres que implemente primero y lo hago:

1. **Cron de token auto-refresh** → Para que nunca caduque
2. **Auto-DM a nuevos seguidores** → Cron + tabla + lógica
3. **Mejoras al dashboard** → Métricas, quick replies, etiquetas
4. **Story mentions handler** → En el webhook
5. **Todo lo anterior** → Full implementation

---

## Arquitectura Final

```
Instagram User
      │
      ▼
Meta Webhook ──────────────────────────────────┐
      │                                         │
      ▼                                         ▼
/api/instagram/webhook              /api/cron/instagram-followers
      │                                         │
      ├─ Recibe DM                              ├─ Detecta nuevos followers
      ├─ Guarda en Supabase                     ├─ Envía DM bienvenida
      ├─ Genera respuesta IA (Groq)             └─ Marca como enviado
      ├─ Envía respuesta por API
      └─ Registra en BD
      
      ▼
/superadmin/instagram
      │
      ├─ Ver todas las conversaciones
      ├─ Responder manualmente
      ├─ Activar/desactivar bot
      ├─ Configurar tokens
      ├─ Métricas en tiempo real
      └─ Quick replies + etiquetas
      
/api/cron/instagram-token-refresh
      │
      └─ Renueva token cada 50 días
```

---

> **Siguiente paso**: Dime "implementa la fase X" o "hazlo todo" y me pongo a codear. Las fases 1-3 del checklist manual las tienes que hacer tú en Meta/Instagram.
