-- Añadir columna cv_url a la tabla job_applications
ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS cv_url TEXT;

-- Crear bucket para CVs en Supabase Storage
-- Esto debe hacerse desde el dashboard de Supabase:
-- 1. Ve a Storage > New bucket
-- 2. Nombre: cvs
-- 3. Public bucket: YES (para que se pueda descargar el CV)

-- O ejecutar este SQL para crear el bucket:
INSERT INTO storage.buckets (id, name, public)
VALUES ('cvs', 'cvs', true)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir uploads públicos al bucket cvs
CREATE POLICY "Allow public uploads to cvs" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'cvs');

CREATE POLICY "Allow public reads from cvs" ON storage.objects
FOR SELECT USING (bucket_id = 'cvs');
