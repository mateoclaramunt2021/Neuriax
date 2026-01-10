import nodemailer from 'nodemailer'
import { supabase } from '@/lib/supabase'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function GET() {
  try {
    // Obtener datos de hoy
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Visitantes de hoy
    const { data: visitorsToday } = await supabase
      .from('visitors')
      .select('*')
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString())

    // Eventos de hoy
    const { data: eventsToday } = await supabase
      .from('visitor_events')
      .select('*')
      .gte('timestamp', today.toISOString())
      .lt('timestamp', tomorrow.toISOString())

    // Páginas populares de hoy
    const pageCount: Record<string, number> = {}
    eventsToday?.forEach((event: any) => {
      if (event.evento_tipo === 'page_view') {
        pageCount[event.pagina] = (pageCount[event.pagina] || 0) + 1
      }
    })

    const topPages = Object.entries(pageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([page, count]) => `${page}: ${count} visitas`)

    // Construir HTML del email
    const htmlContent = `
      <h2>Reporte Diario de Visitantes - ${today.toLocaleDateString('es-ES')}</h2>
      
      <h3>Resumen</h3>
      <ul>
        <li><strong>Total de nuevos visitantes:</strong> ${visitorsToday?.length || 0}</li>
        <li><strong>Total de eventos registrados:</strong> ${eventsToday?.length || 0}</li>
      </ul>

      <h3>Páginas Más Visitadas</h3>
      <ul>
        ${topPages.map((page) => `<li>${page}</li>`).join('')}
      </ul>

      <h3>Últimos Visitantes</h3>
      <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Hora</th>
        </tr>
        ${(visitorsToday || [])
          .map(
            (v: any) => `
          <tr>
            <td>${v.nombre || 'Anónimo'}</td>
            <td>${v.email}</td>
            <td>${v.telefono || '-'}</td>
            <td>${new Date(v.created_at).toLocaleTimeString('es-ES')}</td>
          </tr>
        `
          )
          .join('')}
      </table>

      <br>
      <p><small>Este es un reporte automático generado por tu sistema de tracking de visitantes.</small></p>
    `

    // Enviar email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📊 Reporte Diario de Visitantes - ${today.toLocaleDateString(
        'es-ES'
      )}`,
      html: htmlContent,
    })

    return Response.json({
      success: true,
      message: 'Email diario enviado correctamente',
      visitorsCount: visitorsToday?.length || 0,
      eventsCount: eventsToday?.length || 0,
    })
  } catch (error) {
    console.error('Error sending daily email:', error)
    return Response.json(
      { error: 'Error sending email', details: String(error) },
      { status: 500 }
    )
  }
}
