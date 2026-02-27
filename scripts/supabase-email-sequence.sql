-- ============================================
-- Tabla: email_sequences
-- Controla la secuencia de 15 emails automáticos
-- que se envían cada 2 días tras rellenar el formulario
-- ============================================

CREATE TABLE IF NOT EXISTS email_sequences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_email TEXT NOT NULL,
  contact_nombre TEXT NOT NULL,
  current_email INTEGER DEFAULT 1,       -- Próximo email a enviar (1-15)
  next_send_date DATE NOT NULL,          -- Fecha del próximo envío
  completed BOOLEAN DEFAULT FALSE,       -- true cuando se enviaron los 15
  unsubscribed BOOLEAN DEFAULT FALSE,    -- true si el contacto se dio de baja
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para optimizar las consultas del cron
CREATE INDEX IF NOT EXISTS idx_email_sequences_next_send 
  ON email_sequences(next_send_date) 
  WHERE completed = FALSE AND unsubscribed = FALSE;

CREATE INDEX IF NOT EXISTS idx_email_sequences_email 
  ON email_sequences(contact_email);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_email_sequences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_email_sequences_updated_at
  BEFORE UPDATE ON email_sequences
  FOR EACH ROW
  EXECUTE FUNCTION update_email_sequences_updated_at();
