import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Total de visitantes
    const { count: totalVisitantes } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })

    // Total de eventos
    const { count: totalEventos } = await supabase
      .from('visitor_events')
      .select('*', { count: 'exact', head: true })

    // Páginas más visitadas
    const { data: paginasPopulares } = await supabase
      .from('visitor_events')
      .select('pagina')
      .eq('evento_tipo', 'page_view')
      .order('timestamp', { ascending: false })

    const pageCount: Record<string, number> = {}
    paginasPopulares?.forEach((event: any) => {
      pageCount[event.pagina] = (pageCount[event.pagina] || 0) + 1
    })

    const topPages = Object.entries(pageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)

    // Visitantes recientes
    const { data: recentVisitors } = await supabase
      .from('visitors')
      .select('*')
      .neq('email', (email: string) => email.includes('anon_'))
      .order('created_at', { ascending: false })
      .limit(20)

    return NextResponse.json({
      totalVisitantes: totalVisitantes || 0,
      totalEventos: totalEventos || 0,
      topPages,
      recentVisitors,
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Error fetching data' },
      { status: 500 }
    )
  }
}
