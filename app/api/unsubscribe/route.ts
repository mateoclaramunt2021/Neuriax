import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ============================================
// Endpoint para darse de baja de la secuencia de emails
// ============================================

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) {
    throw new Error(`Supabase config missing: url=${!!url}, key=${!!key}`);
  }
  return createClient(url, key);
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');

  if (!email) {
    return new NextResponse(unsubscribeHtml('Error', 'No se proporcionó email.'), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      status: 400,
    });
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('email_sequences')
      .update({ unsubscribed: true })
      .eq('contact_email', email);

    if (error) {
      console.error('Error dando de baja:', error);
    }

    return new NextResponse(
      unsubscribeHtml(
        '¡Listo!',
        `El email <strong>${email}</strong> ha sido eliminado de nuestra lista. No recibirás más emails de la secuencia de guías.<br><br>Si fue un error, contáctanos en <a href="mailto:hola@neuriax.com" style="color: #06b6d4;">hola@neuriax.com</a>`
      ),
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  } catch (err) {
    console.error('Error en unsubscribe:', err);
    return new NextResponse(unsubscribeHtml('Error', 'Hubo un problema. Contacta con hola@neuriax.com'), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      status: 500,
    });
  }
}

function unsubscribeHtml(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Neuriax</title>
  <style>
    body { margin: 0; padding: 0; background: #0f172a; color: #e2e8f0; font-family: 'Segoe UI', Arial, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .container { max-width: 500px; text-align: center; padding: 40px; }
    h1 { color: #06b6d4; font-size: 32px; margin-bottom: 16px; }
    p { font-size: 16px; line-height: 1.6; color: #94a3b8; }
    a { color: #06b6d4; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .back { margin-top: 30px; display: inline-block; background: #1e293b; color: #e2e8f0; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .back:hover { background: #334155; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="https://neuriax.com" class="back">← Volver a Neuriax</a>
  </div>
</body>
</html>`;
}
