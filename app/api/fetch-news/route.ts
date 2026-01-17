import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Configuración directa de Supabase (seguro en el servidor)
const SUPABASE_URL = 'https://wfnaknuhwzmkriaetvtn.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE';

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
      const description = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/i);
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
  // Verificar autorización (cron secret o manual) - permitir siempre por ahora para debug
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || 'neuriax-cron-2026';
  
  // Permitir en desarrollo o con secret correcto o sin auth (para pruebas)
  const isDev = process.env.NODE_ENV === 'development';
  const isAuthorized = isDev || !authHeader || authHeader === `Bearer ${cronSecret}`;
  
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  
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
