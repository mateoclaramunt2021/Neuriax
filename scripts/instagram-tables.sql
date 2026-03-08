-- ============================================
-- INSTAGRAM AUTOMATION - ALL TABLES
-- Run this SQL in Supabase SQL Editor
-- ============================================

-- 1. Main messages table
CREATE TABLE IF NOT EXISTS instagram_messages (
  id BIGSERIAL PRIMARY KEY,
  sender_id TEXT NOT NULL,
  direction TEXT NOT NULL DEFAULT 'inbound',
  content TEXT,
  status TEXT DEFAULT 'received',
  is_bot BOOLEAN DEFAULT FALSE,
  message_type TEXT DEFAULT 'message',
  sender_name TEXT,
  label TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ig_messages_sender ON instagram_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_ig_messages_created ON instagram_messages(created_at DESC);

-- 2. Config table
CREATE TABLE IF NOT EXISTS instagram_config (
  id BIGSERIAL PRIMARY KEY,
  bot_enabled BOOLEAN DEFAULT TRUE,
  access_token TEXT,
  instagram_account_id TEXT,
  auto_reply_enabled BOOLEAN DEFAULT TRUE,
  auto_reply_message TEXT DEFAULT 'Hola! Gracias por escribirnos. Te responderemos pronto.',
  welcome_dm_enabled BOOLEAN DEFAULT TRUE,
  welcome_message TEXT DEFAULT '¡Hola! 👋 Gracias por seguirnos en Instagram!
Soy el asistente de Neuriax. Si necesitas una web, chatbot o automatización con IA, ¡estoy aquí para ayudarte! 🚀

¿En qué puedo echarte una mano?',
  token_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Instagram followers tracking
CREATE TABLE IF NOT EXISTS instagram_followers (
  id BIGSERIAL PRIMARY KEY,
  instagram_user_id TEXT NOT NULL UNIQUE,
  username TEXT,
  label TEXT DEFAULT 'nuevo',
  first_seen_at TIMESTAMPTZ DEFAULT NOW(),
  welcome_sent BOOLEAN DEFAULT FALSE,
  welcome_sent_at TIMESTAMPTZ,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_ig_followers_user_id ON instagram_followers(instagram_user_id);

-- 3. Token refresh log
CREATE TABLE IF NOT EXISTS instagram_token_log (
  id BIGSERIAL PRIMARY KEY,
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Add config row if empty
CREATE TABLE IF NOT EXISTS instagram_quick_replies (
  id BIGSERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  message TEXT NOT NULL,
  icon TEXT DEFAULT '💬',
  sort_order INT DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default quick replies
INSERT INTO instagram_quick_replies (label, message, icon, sort_order) VALUES
  ('Ver precios', '💰 Nuestros precios:\n\n🌐 Web básica: desde 790€\n🛒 E-commerce: desde 1.500€\n🤖 Chatbot IA: desde 200€\n⚡ Automatización: desde 500€\n\n¿Te interesa alguno?', '💰', 1),
  ('Agendar llamada', '📅 ¡Genial! Agenda una llamada gratuita de 15 min con Mateo:\nhttps://calendly.com/neuriax/30min', '📞', 2),
  ('Ver portfolio', '🎨 Mira nuestro portfolio en:\nhttps://www.neuriax.com/webs\n\n¿Quieres algo similar?', '🎨', 3),
  ('Horario', '🕐 Nuestro horario:\nLunes a Viernes: 9:00 - 19:00\n\nPero el bot IA está disponible 24/7 😊', '🕐', 4),
  ('Contacto', '📱 Puedes contactarnos por:\n📧 Email: hola@neuriax.com\n🌐 Web: neuriax.com\n📞 Llamada: https://calendly.com/neuriax/30min', '📱', 5)
ON CONFLICT DO NOTHING;

-- 6. Ensure instagram_config has at least one row
INSERT INTO instagram_config (bot_enabled, auto_reply_enabled, auto_reply_message, welcome_dm_enabled)
SELECT TRUE, TRUE, 'Hola! Gracias por escribirnos. Te responderemos pronto.', TRUE
WHERE NOT EXISTS (SELECT 1 FROM instagram_config LIMIT 1);
