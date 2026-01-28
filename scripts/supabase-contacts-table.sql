-- Crear tabla para almacenar los contactos del formulario
-- Ejecutar este SQL en Supabase Dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  empresa VARCHAR(255),
  sector VARCHAR(100),
  mensaje TEXT,
  tipo VARCHAR(50) DEFAULT 'contact_form',
  leido BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_leido ON contacts(leido);

-- Habilitar Row Level Security (opcional pero recomendado)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserciones desde la API
CREATE POLICY "Allow inserts from service role" ON contacts
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Política para lectura desde service role
CREATE POLICY "Allow reads from service role" ON contacts
  FOR SELECT
  TO service_role
  USING (true);

-- Política para updates desde service role
CREATE POLICY "Allow updates from service role" ON contacts
  FOR UPDATE
  TO service_role
  USING (true);
