import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Usar service role key para poder escribir
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Fuentes RSS gratuitas de noticias de IA/Tech
const RSS_SOURCES = [
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    category: 'IA'
  },
  {
    name: 'VentureBeat AI',
    url: 'https://venturebeat.com/category/ai/feed/',
    category: 'IA'
  },
  {
    name: 'MIT Tech Review',
    url: 'https://www.technologyreview.com/feed/',
    category: 'Tecnología'
  },
  {
    name: 'Wired',
    url: 'https://www.wired.com/feed/category/business/latest/rss',
    category: 'Tecnología'
  }
];

// Función para parsear RSS básico (sin dependencias externas)
async function parseRSS(url: string): Promise<Array<{
  title: string;
  description: string;
  link: string;
  pubDate: string;
}>> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NeuriaxBot/1.0)'
      },
      next: { revalidate: 3600 } // Cache 1 hora
    });
    
    if (!response.ok) return [];
    
    const xml = await response.text();
    const items: Array<{title: string; description: string; link: string; pubDate: string}> = [];
    
    // Parser simple de RSS
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/gi) || [];
    
    for (const item of itemMatches.slice(0, 5)) { // Max 5 items por fuente
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/i);
      const description = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/is);
      const link = item.match(/<link>(.*?)<\/link>/i);
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/i);
      
      if (title && link) {
        items.push({
          title: (title[1] || title[2] || '').trim().replace(/<[^>]*>/g, ''),
          description: (description?.[1] || description?.[2] || '').trim().replace(/<[^>]*>/g, '').substring(0, 300),
          link: (link[1] || '').trim(),
          pubDate: pubDate?.[1] || new Date().toISOString()
        });
      }
    }
    
    return items;
  } catch (error) {
    console.error(`Error fetching RSS from ${url}:`, error);
    return [];
  }
}

// Generar slug único
function generateSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60);
  
  const timestamp = Date.now().toString(36);
  return `${baseSlug}-${timestamp}`;
}

// Filtrar noticias relacionadas con IA
function isAIRelated(title: string, description: string): boolean {
  const keywords = [
    'ai', 'artificial intelligence', 'inteligencia artificial',
    'machine learning', 'deep learning', 'neural', 'gpt', 'chatgpt',
    'openai', 'google ai', 'meta ai', 'microsoft ai', 'anthropic',
    'llm', 'language model', 'automation', 'automatización',
    'robot', 'algorithm', 'algoritmo', 'data science', 'ml'
  ];
  
  const text = `${title} ${description}`.toLowerCase();
  return keywords.some(keyword => text.includes(keyword));
}

export async function GET(request: Request) {
  // Verificar autorización (cron secret o manual)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  // Permitir en desarrollo o con secret correcto
  const isDev = process.env.NODE_ENV === 'development';
  const isAuthorized = isDev || authHeader === `Bearer ${cronSecret}`;
  
  if (!isAuthorized && cronSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ 
      error: 'Missing Supabase credentials',
      message: 'Configura SUPABASE_SERVICE_ROLE_KEY en las variables de entorno'
    }, { status: 500 });
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    const allNews: Array<{
      title: string;
      description: string;
      slug: string;
      category: string;
      source_url: string;
      source_name: string;
      read_time: string;
    }> = [];
    
    // Obtener noticias de todas las fuentes
    for (const source of RSS_SOURCES) {
      const items = await parseRSS(source.url);
      
      for (const item of items) {
        // Solo incluir noticias relacionadas con IA
        if (isAIRelated(item.title, item.description)) {
          allNews.push({
            title: item.title,
            description: item.description || 'Lee más sobre esta noticia de IA.',
            slug: generateSlug(item.title),
            category: source.category,
            source_url: item.link,
            source_name: source.name,
            read_time: `${Math.ceil(item.description.length / 200) + 2} min`
          });
        }
      }
    }
    
    // Insertar en Supabase (ignorar duplicados por título similar)
    let inserted = 0;
    let skipped = 0;
    
    for (const news of allNews.slice(0, 10)) { // Max 10 noticias por ejecución
      // Verificar si ya existe una noticia similar
      const { data: existing } = await supabase
        .from('blog_posts')
        .select('id')
        .ilike('title', `%${news.title.substring(0, 30)}%`)
        .limit(1);
      
      if (existing && existing.length > 0) {
        skipped++;
        continue;
      }
      
      const { error } = await supabase
        .from('blog_posts')
        .insert([news]);
      
      if (!error) {
        inserted++;
      } else {
        console.error('Error inserting:', error);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Procesadas ${allNews.length} noticias de IA`,
      inserted,
      skipped,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in fetch-news:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch news',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Configurar como Vercel Cron - ejecutar cada día a las 8:00 AM UTC
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 segundos máximo
