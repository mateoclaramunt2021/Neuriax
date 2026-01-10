'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function PageTracker() {
  const pathname = usePathname()
  const timeStartRef = useRef<number>(0)
  const visitorIdRef = useRef<number | null>(null)

  useEffect(() => {
    // Registrar página visitada
    const trackPageView = async () => {
      timeStartRef.current = Date.now()

      try {
        // Obtener o crear visitante anónimo
        let visitorId = sessionStorage.getItem('visitor_id')

        if (!visitorId) {
          // Crear visitante anónimo
          const { data, error } = await supabase
            .from('visitors')
            .insert([
              {
                email: `anon_${Date.now()}@tracking.local`,
                nombre: null,
                telefono: null,
              },
            ])
            .select()

          if (data && data[0]) {
            visitorId = String(data[0].id)
            sessionStorage.setItem('visitor_id', visitorId)
            visitorIdRef.current = data[0].id
          }
        } else {
          visitorIdRef.current = parseInt(visitorId)
        }

        // Registrar evento de page_view
        if (visitorIdRef.current) {
          await supabase.from('visitor_events').insert([
            {
              visitor_id: visitorIdRef.current,
              pagina: pathname,
              evento_tipo: 'page_view',
              datos_adicionales: { referrer: document.referrer },
            },
          ])
        }
      } catch (error) {
        console.error('Error tracking page:', error)
      }
    }

    trackPageView()

    // Limpiar: registrar tiempo invertido en la página
    return () => {
      if (visitorIdRef.current && timeStartRef.current) {
        const timeSpent = Math.round((Date.now() - timeStartRef.current) / 1000)

        if (timeSpent > 5) {
          // Solo registrar si pasó más de 5 segundos
          const trackTime = async () => {
            try {
              await supabase
                .from('visitor_events')
                .insert([
                  {
                    visitor_id: visitorIdRef.current,
                    pagina: pathname,
                    evento_tipo: 'time_spent',
                    datos_adicionales: { segundos: timeSpent },
                  },
                ])
            } catch (error) {
              console.error('Error tracking time:', error)
            }
          }
          trackTime()
        }
      }
    }
  }, [pathname])

  return null
}
