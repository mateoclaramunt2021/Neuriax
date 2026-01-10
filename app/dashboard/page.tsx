import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <Link href="/" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            Cerrar sesión
          </Link>
        </div>
        
        <div className="mb-8">
          <p className="text-xl text-gray-700">¡Bienvenido a tu panel de control! Aquí puedes gestionar tus métricas y datos.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Usuarios Activos</h3>
            <p className="text-3xl font-bold text-indigo-600">1,234</p>
            <p className="text-gray-600 mt-2">+12% desde el mes pasado</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ingresos Mensuales</h3>
            <p className="text-3xl font-bold text-green-600">$45,678</p>
            <p className="text-gray-600 mt-2">+8% desde el mes pasado</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tareas Completadas</h3>
            <p className="text-3xl font-bold text-blue-600">567</p>
            <p className="text-gray-600 mt-2">+15% desde la semana pasada</p>
          </div>
        </div>
      </div>
    </div>
  );
}