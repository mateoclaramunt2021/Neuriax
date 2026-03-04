'use client';

import { usePathname } from 'next/navigation';

export default function LayoutShell({
  navbar,
  footer,
  extras,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  extras: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSuperAdmin = pathname.startsWith('/superadmin');

  if (isSuperAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main className="pt-20 min-h-screen">{children}</main>
      {footer}
      {extras}
    </>
  );
}
