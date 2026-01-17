-- Ejecutar en Supabase SQL Editor: https://supabase.com/dashboard
-- Ve a tu proyecto > SQL Editor > New Query > Pegar esto y ejecutar

-- Tabla de posts del blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  slug TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'IA',
  image_url TEXT,
  source_url TEXT,
  source_name TEXT,
  read_time TEXT DEFAULT '5 min',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- Habilitar RLS (Row Level Security)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública (todos pueden leer posts publicados)
CREATE POLICY "Posts públicos son visibles para todos" ON blog_posts
  FOR SELECT USING (published = true);

-- Política para insertar (solo con service role key - para el cron)
CREATE POLICY "Service role puede insertar" ON blog_posts
  FOR INSERT WITH CHECK (true);

-- Política para actualizar (solo con service role key)
CREATE POLICY "Service role puede actualizar" ON blog_posts
  FOR UPDATE USING (true);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insertar algunos posts iniciales de ejemplo
INSERT INTO blog_posts (title, description, slug, category, source_name, read_time) VALUES
('OpenAI lanza GPT-5: La IA más potente hasta la fecha', 'La nueva versión de ChatGPT promete revolucionar la industria con capacidades multimodales avanzadas y razonamiento mejorado.', 'openai-gpt5-lanzamiento', 'IA', 'Neuriax', '4 min'),
('Google DeepMind presenta Gemini 2.0', 'El modelo de inteligencia artificial de Google supera benchmarks anteriores en razonamiento matemático y programación.', 'google-gemini-2-lanzamiento', 'IA', 'Neuriax', '5 min'),
('Cómo la IA está transformando el marketing digital', 'Las empresas que adoptan IA en sus estrategias de marketing ven un aumento del 40% en conversiones.', 'ia-transformando-marketing-digital', 'Marketing', 'Neuriax', '6 min')
ON CONFLICT (slug) DO NOTHING;
