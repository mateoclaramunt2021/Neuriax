-- =====================================================
-- VAPI INTEGRATION - Tablas Supabase
-- Flujo: Cliente llama (inbound) → VAPI contesta → agenda reunión
-- Ejecutar en Supabase Dashboard > SQL Editor
-- =====================================================

-- 1. Registro de llamadas VAPI (inbound)
CREATE TABLE IF NOT EXISTS vapi_calls (
  id SERIAL PRIMARY KEY,
  vapi_call_id VARCHAR(255) UNIQUE,
  assistant_id VARCHAR(255) DEFAULT '2c027356-c455-4039-bb78-f9da3184c79f',
  contact_id INTEGER,
  phone_number VARCHAR(50),
  contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  direction VARCHAR(10) NOT NULL DEFAULT 'inbound',
  -- inbound (cliente llama)
  status VARCHAR(50) NOT NULL DEFAULT 'in-progress',
  -- in-progress | ended | failed
  started_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER DEFAULT 0,
  summary TEXT,
  transcript JSONB DEFAULT '[]',
  recording_url TEXT,
  ended_reason VARCHAR(100),
  cost DECIMAL(10,4) DEFAULT 0,
  meeting_scheduled BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_vapi_calls_call_id ON vapi_calls(vapi_call_id);
CREATE INDEX IF NOT EXISTS idx_vapi_calls_status ON vapi_calls(status);
CREATE INDEX IF NOT EXISTS idx_vapi_calls_contact ON vapi_calls(contact_id);
CREATE INDEX IF NOT EXISTS idx_vapi_calls_phone ON vapi_calls(phone_number);
CREATE INDEX IF NOT EXISTS idx_vapi_calls_created ON vapi_calls(created_at DESC);

-- 2. Reuniones agendadas durante llamadas
CREATE TABLE IF NOT EXISTS vapi_meetings (
  id SERIAL PRIMARY KEY,
  vapi_call_id VARCHAR(255),
  contact_id INTEGER,
  contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
  meeting_type VARCHAR(100) DEFAULT 'demo',
  -- demo | consultoria | seguimiento | presentacion
  notes TEXT,
  status VARCHAR(50) DEFAULT 'scheduled',
  -- scheduled | confirmed | completed | cancelled | no-show
  reminder_email_sent BOOLEAN DEFAULT FALSE,
  calendly_url TEXT,
  meeting_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_vapi_meetings_call ON vapi_meetings(vapi_call_id);
CREATE INDEX IF NOT EXISTS idx_vapi_meetings_date ON vapi_meetings(meeting_date);
CREATE INDEX IF NOT EXISTS idx_vapi_meetings_status ON vapi_meetings(status);
CREATE INDEX IF NOT EXISTS idx_vapi_meetings_contact ON vapi_meetings(contact_id);

-- 3. Configuración de la integración VAPI
CREATE TABLE IF NOT EXISTS vapi_config (
  id SERIAL PRIMARY KEY,
  api_private_key VARCHAR(500),
  api_public_key VARCHAR(500),
  assistant_id VARCHAR(255) DEFAULT '2c027356-c455-4039-bb78-f9da3184c79f',
  webhook_secret VARCHAR(255),
  confirmation_email_enabled BOOLEAN DEFAULT TRUE,
  pdf_attachment_enabled BOOLEAN DEFAULT TRUE,
  reminder_minutes_before INTEGER DEFAULT 15,
  timezone VARCHAR(50) DEFAULT 'Europe/Madrid',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insertar configuración inicial
INSERT INTO vapi_config (
  api_private_key, api_public_key, assistant_id
) VALUES (
  'dc66e98b-9cb0-4970-80e3-05f2cdd34470',
  'fb4641d8-e98d-4a9d-b045-18d7a6497d4f',
  '2c027356-c455-4039-bb78-f9da3184c79f'
) ON CONFLICT DO NOTHING;

-- RLS policies
ALTER TABLE vapi_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE vapi_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE vapi_config ENABLE ROW LEVEL SECURITY;

-- Service role policies (full access for API)
DO $$ 
DECLARE
  t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'vapi_calls', 'vapi_meetings', 'vapi_config'
  ]) LOOP
    EXECUTE format('
      CREATE POLICY "service_role_all_%s" ON %I
        FOR ALL TO service_role USING (true) WITH CHECK (true);
    ', t, t);
  END LOOP;
END $$;
