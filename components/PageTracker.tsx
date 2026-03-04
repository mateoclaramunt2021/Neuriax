'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function PageTracker() {
  const pathname = usePathname()
  const timeStartRef = useRef<number>(0)
  const visitorIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Don't track superadmin pages
    if (pathname.startsWith('/superadmin')) return;

    const trackPageView = async () => {
      timeStartRef.current = Date.now()

      try {
        // Get or create visitor via API (uses service_role key server-side)
        let visitorId = sessionStorage.getItem('visitor_id')

        if (!visitorId) {
          const res = await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'create_visitor' }),
          });

          if (!res.ok) {
            console.warn('Tracking unavailable');
            return;
          }

          const data = await res.json();
          if (data.visitorId) {
            visitorId = String(data.visitorId);
            sessionStorage.setItem('visitor_id', visitorId);
            visitorIdRef.current = data.visitorId;
          }
        } else {
          visitorIdRef.current = parseInt(visitorId);
        }

        // Track page view via API
        if (visitorIdRef.current) {
          await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'page_view',
              visitorId: visitorIdRef.current,
              pathname,
              referrer: document.referrer || '',
            }),
          });
        }
      } catch (error) {
        console.warn('Error tracking page:', error);
      }
    }

    trackPageView()

    return () => {
      if (visitorIdRef.current && timeStartRef.current) {
        const timeSpent = Math.round((Date.now() - timeStartRef.current) / 1000)

        if (timeSpent > 5) {
          // Use sendBeacon for reliability on page unload
          const payload = JSON.stringify({
            type: 'time_spent',
            visitorId: visitorIdRef.current,
            pathname,
            timeSpent,
          });

          if (navigator.sendBeacon) {
            navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
          } else {
            fetch('/api/track', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: payload,
              keepalive: true,
            }).catch(() => {});
          }
        }
      }
    }
  }, [pathname])

  return null
}
