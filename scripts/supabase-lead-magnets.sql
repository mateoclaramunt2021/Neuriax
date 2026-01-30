-- Crear tabla para lead magnets
CREATE TABLE IF NOT EXISTS lead_magnets (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  source VARCHAR(50) DEFAULT 'lead_magnet_popup',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para búsquedas rápidas por email
CREATE INDEX IF NOT EXISTS idx_lead_magnets_email ON lead_magnets(email);

-- Crear índice para búsquedas por fecha
CREATE INDEX IF NOT EXISTS idx_lead_magnets_created_at ON lead_magnets(created_at);

-- Habilitar Row Level Security
ALTER TABLE lead_magnets ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede insertar (anónimo)
CREATE POLICY "Allow anonymous inserts" ON lead_magnets
  FOR INSERT
  WITH CHECK (true);

-- Política: Solo autenticados pueden ver
CREATE POLICY "Allow authenticated select" ON lead_magnets
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_lead_magnets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS trigger_update_lead_magnets_updated_at ON lead_magnets;
CREATE TRIGGER trigger_update_lead_magnets_updated_at
  BEFORE UPDATE ON lead_magnets
  FOR EACH ROW
  EXECUTE FUNCTION update_lead_magnets_updated_at();
