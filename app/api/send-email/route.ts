import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://wfnaknuhwzmkriaetvtn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmFrbnVod3pta3JpYWV0dnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1OTMwMCwiZXhwIjoyMDgzNjM1MzAwfQ.CQ4Gm1k_eZ3Pn5TGQRbPblL_sRp9gahQubIUiytUdlE'
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, posicion, experiencia, mensaje } = body;

    // Validar datos
    if (!nombre || !email || !posicion || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Guardar en Supabase
    const { error } = await supabase.from('job_applications').insert({
      nombre,
      email,
      telefono: telefono || null,
      posicion,
      experiencia: experiencia || null,
      mensaje,
      leido: false
    });

    if (error) {
      console.error('Error guardando postulación:', error);
      return NextResponse.json(
        { error: 'Error al guardar la postulación' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Postulación enviada correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la postulación' },
      { status: 500 }
    );
  }
}
