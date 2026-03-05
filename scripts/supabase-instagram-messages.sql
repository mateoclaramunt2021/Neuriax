-- Instagram Messages table (similar to whatsapp_messages)
CREATE TABLE IF NOT EXISTS instagram_messages (
  id SERIAL PRIMARY KEY,
  sender_id VARCHAR(255) NOT NULL,
  sender_name VARCHAR(255),
  direction VARCHAR(10) NOT NULL, -- inbound | outbound
  content TEXT,
  status VARCHAR(50) DEFAULT 'sent',
  is_bot BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_ig_sender ON instagram_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_ig_created ON instagram_messages(created_at DESC);

ALTER TABLE instagram_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all_instagram_messages" ON instagram_messages
  FOR ALL TO service_role USING (true) WITH CHECK (true);
