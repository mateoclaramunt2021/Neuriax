import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { getEmailTemplate } from '@/lib/email-templates';

// ============================================
// CRON JOB: Enviar emails de la secuencia
// Se ejecuta diariamente a las 9:00 AM (Europa/Madrid)
// Revisa la tabla email_sequences y envía el email que toque
// ============================================

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://neuriax.com';

export async function GET(request: NextRequest) {
  try {
    // Verificar CRON_SECRET para proteger el endpoint
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      // Permitir en desarrollo sin secret
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
      }
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Buscar secuencias pendientes para hoy o antes
    const { data: pendingSequences, error: fetchError } = await supabase
      .from('email_sequences')
      .select('*')
      .eq('completed', false)
      .eq('unsubscribed', false)
      .lte('next_send_date', today)
      .order('next_send_date', { ascending: true })
      .limit(50); // Procesar máximo 50 por ejecución

    if (fetchError) {
      console.error('Error obteniendo secuencias pendientes:', fetchError);
      return NextResponse.json(
        { error: 'Error consultando secuencias', details: fetchError.message },
        { status: 500 }
      );
    }

    if (!pendingSequences || pendingSequences.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No hay emails pendientes para enviar',
        sent: 0,
      });
    }

    let sent = 0;
    let errors = 0;
    const results: { email: string; emailNumber: number; status: string }[] = [];

    for (const sequence of pendingSequences) {
      const { id, contact_email, contact_nombre, current_email } = sequence;

      // Obtener el template del email correspondiente
      const template = getEmailTemplate(current_email);
      if (!template) {
        console.error(`Template no encontrado para email #${current_email}`);
        results.push({ email: contact_email, emailNumber: current_email, status: 'template_not_found' });
        errors++;
        continue;
      }

      try {
        const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(contact_email)}`;

        // Enviar el email
        const { error: emailError } = await resend.emails.send({
          from: 'Neuriax <hola@neuriax.com>',
          to: contact_email,
          subject: template.subject,
          html: template.getHtml(contact_nombre, unsubscribeUrl),
        });

        if (emailError) {
          console.error(`Error enviando email #${current_email} a ${contact_email}:`, emailError);
          results.push({ email: contact_email, emailNumber: current_email, status: 'send_error' });
          errors++;
          continue;
        }

        // Actualizar la secuencia
        const nextEmailNumber = current_email + 1;
        const isCompleted = nextEmailNumber > 15;

        // Calcular próxima fecha: +2 días
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + 2);

        const { error: updateError } = await supabase
          .from('email_sequences')
          .update({
            current_email: nextEmailNumber,
            next_send_date: isCompleted ? null : nextDate.toISOString().split('T')[0],
            completed: isCompleted,
          })
          .eq('id', id);

        if (updateError) {
          console.error(`Error actualizando secuencia ${id}:`, updateError);
        }

        sent++;
        results.push({ email: contact_email, emailNumber: current_email, status: 'sent' });
        console.log(`✅ Email #${current_email} enviado a ${contact_email}`);

        // Pequeña pausa entre emails para no sobrecargar el API de Resend
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (err) {
        console.error(`Error procesando secuencia para ${contact_email}:`, err);
        results.push({ email: contact_email, emailNumber: current_email, status: 'error' });
        errors++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Secuencia procesada: ${sent} enviados, ${errors} errores`,
      sent,
      errors,
      total: pendingSequences.length,
      results,
    });

  } catch (error) {
    console.error('Error en cron de secuencia de emails:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: String(error) },
      { status: 500 }
    );
  }
}
