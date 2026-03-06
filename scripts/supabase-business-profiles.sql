-- ═══════════════════════════════════════════════════════════
-- VAPI Business Profiles — Perfiles de negocio cualificados
-- Ejecutar en Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS vapi_business_profiles (
  id BIGSERIAL PRIMARY KEY,
  vapi_call_id TEXT REFERENCES vapi_calls(vapi_call_id) ON DELETE CASCADE,
  contact_id BIGINT,

  -- Datos del negocio
  sector TEXT NOT NULL DEFAULT 'otro',
  nombre_negocio TEXT,
  num_empleados TEXT DEFAULT 'no_definido',
  problema_principal TEXT,
  herramientas_actuales TEXT,
  experiencia_ia TEXT DEFAULT 'ninguna',
  presupuesto_mensual TEXT DEFAULT 'no_definido',
  urgencia TEXT DEFAULT 'media',
  notas TEXT,

  -- Lead scoring (1-10, calculado automáticamente)
  lead_score INTEGER DEFAULT 5,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_business_profiles_call ON vapi_business_profiles(vapi_call_id);
CREATE INDEX IF NOT EXISTS idx_business_profiles_sector ON vapi_business_profiles(sector);
CREATE INDEX IF NOT EXISTS idx_business_profiles_score ON vapi_business_profiles(lead_score);

-- RLS
ALTER TABLE vapi_business_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_business_profiles"
  ON vapi_business_profiles
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
