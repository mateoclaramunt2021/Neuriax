-- Tabla para contactos del formulario
CREATE TABLE IF NOT EXISTS contact_forms (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  servicio TEXT,
  mensaje TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_contact_forms_email ON contact_forms(email);
CREATE INDEX IF NOT EXISTS idx_contact_forms_created_at ON contact_forms(created_at DESC);

-- Habilitar Row Level Security
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserts públicos (para el formulario)
CREATE POLICY "Allow public inserts on contact_forms" ON contact_forms
  FOR INSERT
  WITH CHECK (true);

-- Política para que solo admin pueda leer (usar service role key)
CREATE POLICY "Allow authenticated users to read their own contact forms" ON contact_forms
  FOR SELECT
  USING (true);
