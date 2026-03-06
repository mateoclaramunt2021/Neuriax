-- ═══════════════════════════════════════════════════════════
-- VAPI Webhook Logs + Limpiar datos de prueba
-- Ejecutar en Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════

-- 1. Tabla de logs para debuggear webhooks
CREATE TABLE IF NOT EXISTS vapi_webhook_logs (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT,
  call_id TEXT,
  payload JSONB,
  processed BOOLEAN DEFAULT false,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_type ON vapi_webhook_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_call ON vapi_webhook_logs(call_id);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_created ON vapi_webhook_logs(created_at DESC);

ALTER TABLE vapi_webhook_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_webhook_logs"
  ON vapi_webhook_logs
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- 2. Limpiar datos de prueba
DELETE FROM vapi_business_profiles WHERE vapi_call_id LIKE 'test-%';
DELETE FROM vapi_meetings WHERE vapi_call_id LIKE 'test-%';
DELETE FROM vapi_calls WHERE vapi_call_id LIKE 'test-%';
