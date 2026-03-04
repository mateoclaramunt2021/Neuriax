-- =====================================================
-- SUPERADMIN PANEL - Tablas Supabase
-- Ejecutar en Supabase Dashboard > SQL Editor
-- =====================================================

-- 1. Estados de clientes (CRM pipeline)
CREATE TABLE IF NOT EXISTS client_status (
  id SERIAL PRIMARY KEY,
  contact_id INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'nuevo',
  -- nuevo | contactado | negociacion | cliente | perdido
  source VARCHAR(100) DEFAULT 'web',
  -- web | whatsapp | instagram | email | referido
  priority VARCHAR(20) DEFAULT 'normal',
  -- baja | normal | alta | urgente
  assigned_to VARCHAR(255) DEFAULT 'Mateo',
  value DECIMAL(10,2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_client_status_contact ON client_status(contact_id);
CREATE INDEX IF NOT EXISTS idx_client_status_status ON client_status(status);

-- 2. Notas internas por contacto
CREATE TABLE IF NOT EXISTS client_notes (
  id SERIAL PRIMARY KEY,
  contact_id INTEGER NOT NULL,
  note TEXT NOT NULL,
  author VARCHAR(255) DEFAULT 'Mateo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_client_notes_contact ON client_notes(contact_id);

-- 3. Log de emails enviados
CREATE TABLE IF NOT EXISTS email_log (
  id SERIAL PRIMARY KEY,
  recipient_email VARCHAR(255) NOT NULL,
  recipient_name VARCHAR(255),
  subject VARCHAR(500),
  email_type VARCHAR(100) NOT NULL,
  -- contact_form | demo_request | lead_magnet | sequence | manual
  status VARCHAR(50) DEFAULT 'sent',
  -- sent | delivered | opened | bounced | failed
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_email_log_recipient ON email_log(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_log_type ON email_log(email_type);
CREATE INDEX IF NOT EXISTS idx_email_log_created ON email_log(created_at DESC);

-- 4. Conversaciones del chatbot web
CREATE TABLE IF NOT EXISTS chatbot_conversations (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  visitor_id INTEGER,
  messages JSONB NOT NULL DEFAULT '[]',
  lead_data JSONB DEFAULT '{}',
  total_messages INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  converted BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_chatbot_session ON chatbot_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_last_msg ON chatbot_conversations(last_message_at DESC);

-- 5. Mensajes de WhatsApp
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id SERIAL PRIMARY KEY,
  phone_number VARCHAR(50) NOT NULL,
  contact_name VARCHAR(255),
  direction VARCHAR(10) NOT NULL, -- inbound | outbound
  message_type VARCHAR(50) DEFAULT 'text',
  -- text | image | document | audio | template
  content TEXT,
  status VARCHAR(50) DEFAULT 'sent',
  -- sent | delivered | read | failed
  is_bot BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_wa_phone ON whatsapp_messages(phone_number);
CREATE INDEX IF NOT EXISTS idx_wa_created ON whatsapp_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wa_direction ON whatsapp_messages(direction);

-- 6. Configuración del bot WhatsApp
CREATE TABLE IF NOT EXISTS whatsapp_config (
  id SERIAL PRIMARY KEY,
  bot_enabled BOOLEAN DEFAULT TRUE,
  system_prompt TEXT,
  greeting_message TEXT DEFAULT 'Hola! Soy el asistente de Neuriax. ¿En qué puedo ayudarte?',
  business_hours JSONB DEFAULT '{"start": "09:00", "end": "20:00", "timezone": "Europe/Madrid"}',
  auto_reply_outside_hours TEXT DEFAULT 'Gracias por tu mensaje. Nuestro horario es de 9:00 a 20:00. Te responderemos lo antes posible.',
  api_token VARCHAR(500),
  phone_number_id VARCHAR(100),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 7. Configuración de Instagram
CREATE TABLE IF NOT EXISTS instagram_config (
  id SERIAL PRIMARY KEY,
  bot_enabled BOOLEAN DEFAULT FALSE,
  access_token VARCHAR(500),
  instagram_account_id VARCHAR(100),
  auto_reply_enabled BOOLEAN DEFAULT FALSE,
  auto_reply_message TEXT DEFAULT 'Hola! Gracias por escribirnos. Te responderemos pronto.',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 8. Configuración general del admin
CREATE TABLE IF NOT EXISTS admin_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insertar configuración inicial
INSERT INTO admin_settings (key, value) VALUES
  ('company_phone', '+34643045488'),
  ('company_email', 'hola@neuriax.com'),
  ('calendly_url', 'https://calendly.com/neuriax/30min'),
  ('chatbot_model', 'llama-3.3-70b-versatile'),
  ('chatbot_temperature', '0.7')
ON CONFLICT (key) DO NOTHING;

-- RLS policies for all tables
ALTER TABLE client_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Service role policies (full access for API)
DO $$ 
DECLARE
  t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'client_status','client_notes','email_log',
    'chatbot_conversations','whatsapp_messages',
    'whatsapp_config','instagram_config','admin_settings'
  ]) LOOP
    EXECUTE format('
      CREATE POLICY "service_role_all_%s" ON %I
        FOR ALL TO service_role USING (true) WITH CHECK (true);
    ', t, t);
  END LOOP;
END $$;
