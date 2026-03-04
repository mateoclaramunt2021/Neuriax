import Sidebar from '@/components/superadmin/Sidebar';

export const metadata = {
  title: 'SuperAdmin | Neuriax',
  robots: 'noindex, nofollow',
};

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
