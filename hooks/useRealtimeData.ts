'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseRealtimeOptions {
  url: string;
  interval?: number; // ms, default 5000
  enabled?: boolean;
}

export function useRealtimeData<T>(options: UseRealtimeOptions) {
  const { url, interval = 5000, enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const isFirstLoad = useRef(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const result = await res.json();
        setData(result);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Realtime fetch error:', err);
    } finally {
      if (isFirstLoad.current) {
        setLoading(false);
        isFirstLoad.current = false;
      }
    }
  }, [url]);

  useEffect(() => {
    if (!enabled) return;
    
    fetchData();
    const timer = setInterval(fetchData, interval);
    return () => clearInterval(timer);
  }, [fetchData, interval, enabled]);

  return { data, loading, lastUpdated, refetch: fetchData };
}
