'use client'

import { useEffect, useState } from 'react'

interface DashboardData {
  totalVisitantes: number
  totalEventos: number
  topPages: Array<[string, number]>
  recentVisitors: Array<{
    id: number
    email: string
    nombre: string | null
    telefono: string | null
    created_at: string
  }>
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div className="p-8 text-center">Cargando...</div>

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">📊 Dashboard de Visitantes</h1>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <p className="text-gray-600 text-sm">Total de Visitantes</p>
          <p className="text-4xl font-bold text-blue-600">{data?.totalVisitantes || 0}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <p className="text-gray-600 text-sm">Total de Eventos</p>
          <p className="text-4xl font-bold text-green-600">{data?.totalEventos || 0}</p>
        </div>
      </div>

      {/* Páginas populares */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <h2 className="text-xl font-bold mb-4">🔥 Páginas Más Visitadas</h2>
        <div className="space-y-3">
          {data?.topPages && data.topPages.length > 0 ? (
            data.topPages.map(([page, count]) => (
              <div key={page} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-700">{page}</span>
                <span className="font-bold text-blue-600">{count} visitas</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Sin datos aún</p>
          )}
        </div>
      </div>

      {/* Visitantes recientes */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4">👥 Últimos Visitantes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold">Nombre</th>
                <th className="text-left py-2 px-3 font-semibold">Email</th>
                <th className="text-left py-2 px-3 font-semibold">Teléfono</th>
                <th className="text-left py-2 px-3 font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentVisitors && data.recentVisitors.length > 0 ? (
                data.recentVisitors.map((visitor) => (
                  <tr key={visitor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3">{visitor.nombre || 'Anónimo'}</td>
                    <td className="py-3 px-3">{visitor.email}</td>
                    <td className="py-3 px-3">{visitor.telefono || '-'}</td>
                    <td className="py-3 px-3">
                      {new Date(visitor.created_at).toLocaleString('es-ES')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 px-3 text-center text-gray-500">
                    Sin visitantes aún
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}