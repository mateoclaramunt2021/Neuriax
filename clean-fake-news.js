// Script para limpiar noticias ficticias y dejar solo las reales de RSS
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://wfnaknuhwzmkriaetvtn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE'
);

async function cleanFakeNews() {
  console.log('🧹 Limpiando noticias ficticias...\n');
  
  // Eliminar noticias que NO tienen source_url (son las inventadas)
  const { data: fakeNews, error: selectError } = await supabase
    .from('blog_posts')
    .select('id, title, source_name, source_url')
    .is('source_url', null);
  
  if (selectError) {
    console.error('Error:', selectError);
    return;
  }
  
  console.log(`📰 Encontradas ${fakeNews.length} noticias sin fuente real\n`);
  
  for (const news of fakeNews) {
    console.log(`🗑️  Eliminando: ${news.title.substring(0, 50)}...`);
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', news.id);
    
    if (error) {
      console.error(`   ❌ Error: ${error.message}`);
    }
  }
  
  // Verificar cuántas noticias reales quedan
  const { data: realNews, error: countError } = await supabase
    .from('blog_posts')
    .select('id, title, source_name, source_url, created_at')
    .not('source_url', 'is', null)
    .order('created_at', { ascending: false });
  
  console.log(`\n✅ Quedan ${realNews?.length || 0} noticias reales de RSS\n`);
  
  if (realNews && realNews.length > 0) {
    console.log('📋 Noticias reales:');
    realNews.slice(0, 10).forEach(n => {
      console.log(`   - ${n.source_name}: ${n.title.substring(0, 50)}...`);
    });
  }
}

cleanFakeNews();
