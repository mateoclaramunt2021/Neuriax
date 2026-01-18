// Script para actualizar fechas existentes con valores realistas
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://wfnaknuhwzmkriaetvtn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE'
);

async function updatePublishedDates() {
  console.log('🔄 Actualizando fechas de publicación...\n');
  
  // Obtener todos los posts
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, created_at')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error obteniendo posts:', error);
    return;
  }
  
  console.log(`📰 Encontrados ${posts.length} posts\n`);
  
  // Generar fechas variadas y realistas para los últimos días
  const now = new Date();
  
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    
    // Generar fecha aleatoria en los últimos 7 días con horas variadas
    const daysAgo = Math.floor(i / 3); // Cada 3 posts, un día más atrás
    const hoursAgo = Math.floor(Math.random() * 12) + (i % 12); // Horas variadas
    const minutesAgo = Math.floor(Math.random() * 60);
    
    const publishedAt = new Date(now);
    publishedAt.setDate(publishedAt.getDate() - daysAgo);
    publishedAt.setHours(publishedAt.getHours() - hoursAgo);
    publishedAt.setMinutes(publishedAt.getMinutes() - minutesAgo);
    
    // Actualizar usando created_at
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ created_at: publishedAt.toISOString() })
      .eq('id', post.id);
    
    if (updateError) {
      console.error(`❌ Error actualizando ${post.id}:`, updateError);
    } else {
      const timeAgo = getTimeAgo(publishedAt);
      console.log(`✅ ${post.title.substring(0, 40)}... → ${timeAgo}`);
    }
  }
  
  console.log('\n✨ Fechas actualizadas correctamente!');
}

function getTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 60) return `hace ${diffMins} minutos`;
  if (diffHours < 24) return `hace ${diffHours} horas`;
  return `hace ${diffDays} días`;
}

updatePublishedDates();
