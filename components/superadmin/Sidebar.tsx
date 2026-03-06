'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/superadmin', label: 'Dashboard', icon: '📊' },
  { href: '/superadmin/inbox', label: 'Bandeja Unificada', icon: '📥' },
  { href: '/superadmin/clientes', label: 'Clientes (CRM)', icon: '👥' },
  { href: '/superadmin/llamadas', label: 'Llamadas VAPI', icon: '📞' },
  { href: '/superadmin/reuniones', label: 'Reuniones', icon: '📅' },
  { href: '/superadmin/emails', label: 'Emails', icon: '📧' },
  { href: '/superadmin/whatsapp', label: 'WhatsApp IA', icon: '💬' },
  { href: '/superadmin/instagram', label: 'Instagram', icon: '📸' },
  { href: '/superadmin/analytics', label: 'Analítica Web', icon: '📈' },
  { href: '/superadmin/chatbot', label: 'Chatbot', icon: '🤖' },
  { href: '/superadmin/config', label: 'Configuración', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/superadmin/auth', { method: 'DELETE' });
    router.push('/');
  };

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-slate-900 text-white min-h-screen flex flex-col transition-all duration-300`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold text-cyan-400">Neuriax</h1>
            <p className="text-xs text-slate-400">SuperAdmin Panel</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          title={collapsed ? 'Expandir' : 'Colapsar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/superadmin' && pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400 border-r-2 border-cyan-400'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 text-sm text-red-400 hover:text-red-300 transition-colors w-full ${collapsed ? 'justify-center' : ''}`}
          title="Cerrar sesión"
        >
          <span>🚪</span>
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}
