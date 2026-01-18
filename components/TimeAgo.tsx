'use client';

import { useState, useEffect } from 'react';

interface TimeAgoProps {
  date: string;
  className?: string;
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 0) {
    return 'ahora mismo';
  }
  
  if (diffInSeconds < 60) {
    return `hace ${diffInSeconds} segundo${diffInSeconds !== 1 ? 's' : ''}`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `hace ${diffInWeeks} semana${diffInWeeks !== 1 ? 's' : ''}`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `hace ${diffInMonths} mes${diffInMonths !== 1 ? 'es' : ''}`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `hace ${diffInYears} año${diffInYears !== 1 ? 's' : ''}`;
}

export default function TimeAgo({ date, className = '' }: TimeAgoProps) {
  const [timeAgo, setTimeAgo] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const parsedDate = new Date(date);
    
    // Actualizar inmediatamente
    setTimeAgo(getTimeAgo(parsedDate));
    
    // Determinar el intervalo de actualización basado en la antigüedad
    const updateInterval = () => {
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000);
      
      if (diffInSeconds < 60) return 1000; // Cada segundo si es menos de 1 minuto
      if (diffInSeconds < 3600) return 60000; // Cada minuto si es menos de 1 hora
      if (diffInSeconds < 86400) return 300000; // Cada 5 minutos si es menos de 1 día
      return 3600000; // Cada hora si es más de 1 día
    };
    
    // Actualizar periódicamente
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(parsedDate));
    }, updateInterval());
    
    return () => clearInterval(interval);
  }, [date]);
  
  // Evitar hydration mismatch mostrando fecha estática en servidor
  if (!mounted) {
    return (
      <span className={className}>
        {new Date(date).toLocaleDateString('es-ES', { 
          day: 'numeric', 
          month: 'short',
          year: 'numeric'
        })}
      </span>
    );
  }
  
  return (
    <span className={className} title={new Date(date).toLocaleString('es-ES')}>
      {timeAgo}
    </span>
  );
}
