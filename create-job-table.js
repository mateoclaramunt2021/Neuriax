const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://wfnaknuhwzmkriaetvtn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE'
);

async function testInsert() {
  // Intentar insertar un registro de prueba
  const { data, error } = await supabase.from('job_applications').insert({
    nombre: 'Test',
    email: 'test@test.com',
    posicion: 'Desarrollador',
    mensaje: 'Prueba de formulario',
    leido: false
  }).select();

  if (error) {
    if (error.message.includes('does not exist')) {
      console.log('❌ La tabla no existe. Ve a Supabase y ejecuta:');
      console.log(`
CREATE TABLE job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  posicion TEXT NOT NULL,
  experiencia TEXT,
  mensaje TEXT NOT NULL,
  leido BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
      `);
    } else {
      console.log('Error:', error.message);
    }
  } else {
    console.log('✅ Tabla existe y funciona!');
    // Borrar el registro de prueba
    await supabase.from('job_applications').delete().eq('email', 'test@test.com');
    console.log('✅ Registro de prueba eliminado');
  }
}

testInsert();
