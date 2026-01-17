const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://wfnaknuhwzmkriaetvtn.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE';

async function checkDatabase() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  
  // Contar todos los posts
  const { count: total } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true });
  
  // Contar posts publicados
  const { count: published } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', true);
  
  console.log('TOTAL POSTS:', total);
  console.log('POSTS PUBLICADOS:', published);
  
  // Ver los primeros 5 posts
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, published, created_at')
    .order('created_at', { ascending: false })
    .limit(5);
  
  console.log('\nÚLTIMOS 5 POSTS:');
  data.forEach(p => {
    console.log(`- [${p.published ? 'PUB' : 'NO'}] ${p.title} (${p.slug})`);
  });
}

checkDatabase();
