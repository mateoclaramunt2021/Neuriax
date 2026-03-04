'use client';

import { useEffect, useState } from 'react';

export default function LiveIndicator({ lastUpdated }: { lastUpdated: Date | null }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (lastUpdated) {
        setSeconds(Math.floor((Date.now() - lastUpdated.getTime()) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lastUpdated]);

  return (
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
      </span>
      <span>EN DIRECTO</span>
      {lastUpdated && (
        <span className="text-slate-300">· hace {seconds < 5 ? 'ahora' : `${seconds}s`}</span>
      )}
    </div>
  );
}
