import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend('re_SkvxdW82_ChjGZRx157xETMZ3ejJfYCg9');

export async function GET() {
  try {
    // Obtener datos de hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Visitantes de hoy
    const { data: visitorsToday } = await supabase
      .from('visitors')
      .select('*')
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString());

    // Eventos de hoy
    const { data: eventsToday } = await supabase
      .from('visitor_events')
      .select('*')
      .gte('timestamp', today.toISOString())
      .lt('timestamp', tomorrow.toISOString());

    // Páginas populares de hoy
    const pageCount: Record<string, number> = {};
    eventsToday?.forEach((event: any) => {
      if (event.evento_tipo === 'page_view') {
        pageCount[event.pagina] = (pageCount[event.pagina] || 0) + 1;
      }
    });

    const topPages = Object.entries(pageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([page, count]) => `${page}: ${count} visitas`);

    // Construir HTML del email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">📊 Reporte Diario de Visitantes - ${today.toLocaleDateString('es-ES')}</h2>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Resumen</h3>
          <p><strong>👥 Total de nuevos visitantes:</strong> ${visitorsToday?.length || 0}</p>
          <p><strong>📈 Total de eventos registrados:</strong> ${eventsToday?.length || 0}</p>
        </div>

        <h3 style="color: #374151;">🔥 Páginas Más Visitadas</h3>
        <ul style="background: #fff; border: 1px solid #e5e7eb; padding: 15px 30px; border-radius: 8px;">
          ${topPages.length > 0 ? topPages.map((page) => `<li>${page}</li>`).join('') : '<li>Sin datos</li>'}
        </ul>

        <h3 style="color: #374151;">👤 Últimos Visitantes</h3>
        <table style="border-collapse: collapse; width: 100%; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px;">
          <tr style="background: #f3f4f6;">
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb;">Nombre</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb;">Email</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb;">Teléfono</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb;">Hora</th>
          </tr>
          ${(visitorsToday || [])
            .map(
              (v: any) => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${v.nombre || 'Anónimo'}</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${v.email}</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${v.telefono || '-'}</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${new Date(v.created_at).toLocaleTimeString('es-ES')}</td>
            </tr>
          `
            )
            .join('')}
        </table>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">
          Este reporte fue generado automáticamente por el sistema de tracking de neuriax.com
        </p>
      </div>
    `;

    // Enviar email con Resend
    const { error } = await resend.emails.send({
      from: 'Neuriax <hola@send.neuriax.com>',
      to: 'mateoclaramunt2021@gmail.com',
      subject: `📊 Reporte Diario de Visitantes - ${today.toLocaleDateString('es-ES')}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Error sending email:', error);
      return Response.json(
        { error: 'Error sending email', details: error },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'Email diario enviado correctamente',
      visitorsCount: visitorsToday?.length || 0,
      eventsCount: eventsToday?.length || 0,
    });
  } catch (error) {
    console.error('Error sending daily email:', error);
    return Response.json(
      { error: 'Error sending email', details: String(error) },
      { status: 500 }
    );
  }
}
