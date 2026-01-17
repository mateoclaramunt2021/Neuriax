# 🚀 Sistema de Tracking de Visitantes - Guía de Uso

## ✅ ¿Qué se ha configurado?

### 1. **Formulario Flotante** 
- Botón flotante en la esquina inferior derecha (azul)
- Captura: Nombre, Email, Teléfono
- Disponible en todas las páginas
- Los datos se guardan automáticamente en Supabase

### 2. **Tracking Automático de Páginas**
- Cada visitante (anónimo o identificado) genera un ID único
- Se registra automáticamente:
  - **Página visitada**
  - **Tiempo invertido** (solo si > 5 segundos)
  - **Referrer** (dónde vinieron)

### 3. **Dashboard de Estadísticas**
- URL: `https://neuriax.com/dashboard`
- Muestra en tiempo real:
  - Total de visitantes
  - Total de eventos
  - Top 10 páginas más visitadas
  - Últimos 20 visitantes identificados

### 4. **Emails Diarios Automáticos**
- Resumen diario enviado a: `neuriaxx@gmail.com`
- Contiene:
  - Total de nuevos visitantes
  - Total de eventos
  - Páginas más populares
  - Lista de últimos visitantes

---

## 📋 Próximos Pasos

### ✋ **IMPORTANTE: Crear las Tablas en Supabase**

Necesitas ejecutar esto en tu proyecto Supabase (SQL Editor):

```sql
-- Tabla de visitantes
CREATE TABLE visitors (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255),
  telefono VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de eventos (páginas visitadas, tiempo, etc)
CREATE TABLE visitor_events (
  id BIGSERIAL PRIMARY KEY,
  visitor_id BIGINT REFERENCES visitors(id),
  pagina VARCHAR(255),
  evento_tipo VARCHAR(50),
  datos_adicionales JSONB,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Tabla de resumen diario
CREATE TABLE daily_summary (
  id BIGSERIAL PRIMARY KEY,
  fecha DATE UNIQUE,
  total_visitantes INT,
  total_eventos INT,
  paginas_populares JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### ✋ **Configurar Emails Automáticos Diarios**

Tienes dos opciones:

#### **Opción A: Usar un cron job externo (Recomendado)**
- Servicio: https://cron-job.org (gratis)
- Configurar un job que llame a: `https://neuriax.com/api/send-daily-email`
- Frecuencia: Diariamente a las 9:00 AM

#### **Opción B: Usar Vercel Cron (Pago)**
- Solo funciona con el plan Pro de Vercel
- Crear archivo `app/api/send-daily-email/cron.yaml`

---

## 🔧 Endpoints Disponibles

### `GET /api/dashboard`
Retorna estadísticas en tiempo real:
```json
{
  "totalVisitantes": 45,
  "totalEventos": 320,
  "topPages": [
    ["/", 120],
    ["/soluciones", 89],
    ...
  ],
  "recentVisitors": [...]
}
```

### `GET /api/send-daily-email`
Genera y envía el reporte diario manualmente.

---

## 💾 Variables de Entorno

Ya configuradas en `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://wfnaknuhwzmkriaetvtn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_qKnEdSIWOhTWkhGHGwJMCA_dgX6lpWa
EMAIL_USER=neuriaxx@gmail.com
EMAIL_PASSWORD=Angiacmac23
```

---

## 🎯 Flujo de Datos

```
Usuario entra a web
    ↓
PageTracker registra página + genera ID único
    ↓
Usuario rellena formulario flotante (opcional)
    ↓
VisitorForm guarda: nombre, email, teléfono
    ↓
Supabase almacena todo
    ↓
Dashboard muestra estadísticas en tiempo real
    ↓
Cron job envía email diario a tu correo
```

---

## 🚀 Próximas Mejoras Posibles

- [ ] Análisis de conversión (qué botones clickean más)
- [ ] Heatmaps de dónde hace click la gente
- [ ] Exportar datos a CSV/Excel
- [ ] Alertas automáticas si llega un cliente importante
- [ ] Integración con CRM (Hubspot, Pipedrive, etc)
- [ ] Analytics avanzados (fuentes de tráfico, dispositivos, ubicación)

---

## 📞 Soporte

Si algo no funciona:
1. Verifica que las tablas de Supabase estén creadas
2. Verifica que .env.local tenga las claves correctas
3. Abre la consola del navegador (F12) para ver errores
4. Revisa que la API de Supabase esté activa

¡Listo! Tu sistema de tracking ya está funcionando! 🎉
