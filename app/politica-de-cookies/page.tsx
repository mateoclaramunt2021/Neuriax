import { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Política de Cookies | Neuriax',
  description: 'Política de cookies de Neuriax - Información sobre qué cookies utilizamos y cómo gestionar tus preferencias.',
  robots: 'noindex, nofollow',
};

const toc = [
  { id: 'que-son', label: '¿Qué son las cookies?' },
  { id: 'cookies-utilizadas', label: 'Cookies Que Utilizamos' },
  { id: 'categorias', label: 'Categorías de Cookies' },
  { id: 'terceros', label: 'Cookies de Terceros' },
  { id: 'gestionar-cookies', label: 'Cómo Gestionar tus Cookies' },
  { id: 'navegadores', label: 'Instrucciones por Navegador' },
  { id: 'consentimiento', label: 'Consentimiento y Cambios' },
];

export default function PoliticaCookies() {
  return (
    <LegalLayout
      title="Política de Cookies"
      lastUpdated="16 de enero de 2026"
      toc={toc}
    >
      {/* ¿Qué son las cookies? */}
      <section id="que-son" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. ¿Qué son las Cookies?</h2>
        <p className="text-gray-700 mb-4">
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tableta, móvil) cuando visitas 
          un sitio web. Se envían entre tu navegador y nuestros servidores para recordar preferencias, autenticación y mejorar tu experiencia.
        </p>
        
        <h4 className="font-semibold text-gray-900 mt-4 mb-2">Características principales:</h4>
        <ul className="list-disc ml-6 space-y-1 text-gray-700 text-sm">
          <li><strong>Tamaño:</strong> Generalmente pequeños (menos de 4 KB)</li>
          <li><strong>Duración:</strong> Pueden ser de sesión (se elimina al cerrar navegador) o persistentes (duran días/meses)</li>
          <li><strong>Origen:</strong> Propias (neuriax.com) o de terceros (servicios integrados)</li>
          <li><strong>Privacidad:</strong> No contienen virus ni acceden a tu información personal sin consentimiento</li>
        </ul>

        <p className="text-gray-700 mt-4">
          <strong>¿Son legales?</strong> Sí, siempre que se use consentimiento previo en la UE (Directiva ePrivacy, RGPD, LSSI-CE). 
          Las cookies necesarias están exentas de requerir consentimiento.
        </p>
      </section>

      {/* Cookies Utilizadas */}
      <section id="cookies-utilizadas" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cookies que Utilizamos</h2>
        <p className="text-gray-700 mb-6">
          Neuriax utiliza cookies en las siguientes categorías. Puedes gestionar tu consentimiento en el banner al ingresar 
          o en la sección de preferencias.
        </p>

        {/* Tabla de Cookies */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left font-semibold">Nombre Cookie</th>
                <th className="border border-gray-300 p-3 text-left font-semibold">Tipo</th>
                <th className="border border-gray-300 p-3 text-left font-semibold">Duración</th>
                <th className="border border-gray-300 p-3 text-left font-semibold">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {/* Necesarias */}
              <tr className="bg-blue-50">
                <td colSpan={4} className="border border-gray-300 p-3 font-semibold text-blue-900 bg-blue-100">
                  🔒 Cookies Necesarias (Sin consentimiento)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">session_id</code></td>
                <td className="border border-gray-300 p-3">Sesión</td>
                <td className="border border-gray-300 p-3">Durante sesión</td>
                <td className="border border-gray-300 p-3">Identificar tu sesión activa en el sitio</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">csrf_token</code></td>
                <td className="border border-gray-300 p-3">Sesión</td>
                <td className="border border-gray-300 p-3">Durante sesión</td>
                <td className="border border-gray-300 p-3">Protección contra ataques CSRF</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">cookie_consent_v1</code></td>
                <td className="border border-gray-300 p-3">Persistente</td>
                <td className="border border-gray-300 p-3">1 año</td>
                <td className="border border-gray-300 p-3">Almacenar tus preferencias de cookies</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">user_preferences</code></td>
                <td className="border border-gray-300 p-3">Persistente</td>
                <td className="border border-gray-300 p-3">30 días</td>
                <td className="border border-gray-300 p-3">Idioma, tema oscuro, otras configuraciones</td>
              </tr>

              {/* Analíticas */}
              <tr className="bg-green-50">
                <td colSpan={4} className="border border-gray-300 p-3 font-semibold text-green-900 bg-green-100">
                  📊 Cookies Analíticas (Requiere consentimiento)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">[PENDIENTE]</code><br/>
                  <span className="text-xs text-gray-500">ej: _ga, _gid</span>
                </td>
                <td className="border border-gray-300 p-3">Persistente</td>
                <td className="border border-gray-300 p-3">[PENDIENTE]</td>
                <td className="border border-gray-300 p-3">
                  Google Analytics / [PENDIENTE: herramienta analítica]
                  <br/>
                  <span className="text-xs text-gray-500">
                    TODO: Confirmar si se utiliza Google Analytics, Hotjar u otra herramienta
                  </span>
                </td>
              </tr>

              {/* Marketing */}
              <tr className="bg-orange-50">
                <td colSpan={4} className="border border-gray-300 p-3 font-semibold text-orange-900 bg-orange-100">
                  🎯 Cookies de Marketing (Requiere consentimiento)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">[PENDIENTE]</code><br/>
                  <span className="text-xs text-gray-500">ej: fbp, fr</span>
                </td>
                <td className="border border-gray-300 p-3">Persistente</td>
                <td className="border border-gray-300 p-3">[PENDIENTE]</td>
                <td className="border border-gray-300 p-3">
                  Meta Pixel / Facebook Ads / [PENDIENTE: plataforma]
                  <br/>
                  <span className="text-xs text-gray-500">
                    TODO: Confirmar si se utiliza Meta Pixel, Google Ads, TikTok Pixel, etc.
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded p-4 text-sm">
          <p className="text-amber-900">
            <strong>⚠️ Nota:</strong> Los campos marcados con [PENDIENTE] serán completados una vez se integren las herramientas 
            definitivas. Las cookies de terceros seguirán los términos de privacidad de sus respectivos proveedores.
          </p>
        </div>
      </section>

      {/* Categorías de Cookies */}
      <section id="categorias" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Categorías de Cookies Detalladas</h2>

        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">🔒 Cookies Necesarias / Técnicas</h4>
            <p className="text-sm text-gray-700 mb-2">
              Esenciales para el funcionamiento correcto del sitio. Se cargan automáticamente sin consentimiento previo, 
              conforme a la Directiva ePrivacy.
            </p>
            <p className="text-sm text-gray-700"><strong>Ejemplos:</strong> Autenticación, CSRF, sesión, preferencias de accesibilidad</p>
            <p className="text-sm text-gray-700"><strong>Base legal:</strong> Art. 82 LSSI-CE, considerando 47 RGPD</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">📊 Cookies Analíticas / de Rendimiento</h4>
            <p className="text-sm text-gray-700 mb-2">
              Nos permiten entender cómo usas el sitio: qué páginas visitas, cuánto tiempo pasas, de dónde vienes, etc.
            </p>
            <p className="text-sm text-gray-700"><strong>Propósito:</strong> Mejorar diseño, contenido y velocidad</p>
            <p className="text-sm text-gray-700"><strong>Base legal:</strong> Consentimiento previo (Art. 6.1.a RGPD)</p>
            <p className="text-sm text-gray-700"><strong>Herramientas comunes:</strong> Google Analytics, Hotjar, Mixpanel</p>
            <p className="text-sm text-red-600"><strong>TODO:</strong> Confirmar cuál/cuáles se utiliza(n)</p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">🎯 Cookies de Marketing / Publicidad</h4>
            <p className="text-sm text-gray-700 mb-2">
              Rastrea tu comportamiento para mostrar publicidad personalizada relevante y medir efectividad de campañas.
            </p>
            <p className="text-sm text-gray-700"><strong>Propósito:</strong> Retargeting, conversiones, lookalike audiences</p>
            <p className="text-sm text-gray-700"><strong>Base legal:</strong> Consentimiento previo (Art. 6.1.a RGPD)</p>
            <p className="text-sm text-gray-700"><strong>Plataformas comunes:</strong> Meta Pixel, Google Ads, TikTok Pixel, LinkedIn</p>
            <p className="text-sm text-red-600"><strong>TODO:</strong> Confirmar cuál/cuáles se utiliza(n)</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">🔗 Cookies de Redes Sociales</h4>
            <p className="text-sm text-gray-700 mb-2">
              Establecidas por redes sociales (Facebook, Instagram, LinkedIn, TikTok) si usas botones "Compartir" o "Like".
            </p>
            <p className="text-sm text-gray-700"><strong>Controlador:</strong> Meta Platforms, Inc. / Otras redes</p>
            <p className="text-sm text-gray-700"><strong>Privacidad:</strong> Regida por políticas de cada red social</p>
          </div>
        </div>
      </section>

      {/* Cookies de Terceros */}
      <section id="terceros" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies de Terceros</h2>
        <p className="text-gray-700 mb-4">
          Utilizamos servicios de terceros que pueden establecer sus propias cookies:
        </p>

        <div className="space-y-3">
          <div className="bg-gray-50 border border-gray-200 rounded p-3">
            <p className="text-sm font-semibold text-gray-900">
              [PENDIENTE: Google Analytics]
            </p>
            <p className="text-xs text-gray-600">
              🔗 <a href="#" className="text-blue-600 hover:underline">Política de privacidad de Google Analytics</a>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded p-3">
            <p className="text-sm font-semibold text-gray-900">
              [PENDIENTE: Meta Pixel]
            </p>
            <p className="text-xs text-gray-600">
              🔗 <a href="#" className="text-blue-600 hover:underline">Política de privacidad de Meta</a>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded p-3">
            <p className="text-sm font-semibold text-gray-900">
              [PENDIENTE: Proveedor de Hosting / CDN]
            </p>
            <p className="text-xs text-gray-600">
              Puede establecer cookies para seguridad y rendimiento
            </p>
          </div>
        </div>

        <p className="text-gray-700 mt-4 text-sm">
          <strong>Nota:</strong> Consulta las políticas de privacidad de cada tercero para más información sobre cómo gestionan tus datos.
        </p>
      </section>

      {/* Gestionar Cookies */}
      <section id="gestionar-cookies" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cómo Gestionar tus Cookies</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Opción 1: Banner de Consentimiento (Recomendado)</h4>
        <p className="text-sm text-gray-700 mb-3">
          Verás un banner al ingresar al sitio. Puedes:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700 mb-4">
          <li><strong>Aceptar todo:</strong> Permitir todas las cookies (necesarias, analíticas, marketing)</li>
          <li><strong>Rechazar todo:</strong> Solo cookies necesarias (no analíticas ni marketing)</li>
          <li><strong>Configurar:</strong> Elegir qué categorías activar</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">Opción 2: Cambiar Preferencias Después</h4>
        <p className="text-sm text-gray-700 mb-3">
          En el pie de página (footer) verás el botón "Configurar cookies". Puedes cambiar tus preferencias cuando quieras.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3">Opción 3: Configurar desde tu Navegador</h4>
        <p className="text-sm text-gray-700 mb-3">
          Puedes gestionar, eliminar o rechazar cookies desde la configuración de tu navegador (ver sección siguiente).
        </p>

        <h4 className="font-semibold text-gray-900 mb-3">Opción 4: Opt-Out de Google Analytics</h4>
        <p className="text-sm text-gray-700">
          Si Google Analytics está habilitado, puedes instalar la extensión "Google Analytics Opt-out Browser Add-on":
        </p>
        <p className="text-sm text-blue-600 mt-2">
          🔗 <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="hover:underline">
            tools.google.com/dlpage/gaoptout
          </a>
        </p>
      </section>

      {/* Navegadores */}
      <section id="navegadores" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Instrucciones por Navegador</h2>
        <p className="text-gray-700 mb-4">
          Si prefieres rechazar todas las cookies desde tu navegador, sigue estos pasos:
        </p>

        <div className="space-y-4">
          <div className="border rounded p-4">
            <h4 className="font-semibold text-gray-900 mb-2">🌐 Google Chrome</h4>
            <ol className="list-decimal ml-6 space-y-1 text-sm text-gray-700">
              <li>Haz clic en el icono de menú (⋮) en la esquina superior derecha</li>
              <li>Selecciona <strong>Configuración</strong></li>
              <li>Ve a <strong>Privacidad y seguridad</strong> → <strong>Cookies y otros datos de sitios</strong></li>
              <li>Elige tu preferencia: <strong>Bloquear todas las cookies</strong> o <strong>Bloquear cookies de terceros en navegación privada</strong></li>
            </ol>
          </div>

          <div className="border rounded p-4">
            <h4 className="font-semibold text-gray-900 mb-2">🔥 Mozilla Firefox</h4>
            <ol className="list-decimal ml-6 space-y-1 text-sm text-gray-700">
              <li>Haz clic en el icono de menú (☰) en la esquina superior derecha</li>
              <li>Selecciona <strong>Configuración</strong></li>
              <li>Ve a <strong>Privacidad y seguridad</strong></li>
              <li>En <strong>Cookies y datos de sitios</strong>, elige <strong>Bloquear cookies de terceros problemáticas</strong> o <strong>Bloquear todas las cookies</strong></li>
            </ol>
          </div>

          <div className="border rounded p-4">
            <h4 className="font-semibold text-gray-900 mb-2">🍎 Safari (Mac/iOS)</h4>
            <ol className="list-decimal ml-6 space-y-1 text-sm text-gray-700">
              <li><strong>Mac:</strong> Safari → Preferencias → Privacidad → Desactiva "Permitir cookies"</li>
              <li><strong>iOS:</strong> Ajustes → Safari → Privacidad → Desactiva "Permitir cookies" o selecciona "Nunca"</li>
            </ol>
          </div>

          <div className="border rounded p-4">
            <h4 className="font-semibold text-gray-900 mb-2">⚪ Microsoft Edge</h4>
            <ol className="list-decimal ml-6 space-y-1 text-sm text-gray-700">
              <li>Haz clic en el icono de menú (···) en la esquina superior derecha</li>
              <li>Selecciona <strong>Configuración</strong></li>
              <li>Ve a <strong>Privacidad, búsqueda y servicios</strong></li>
              <li>En <strong>Cookies y otros datos de sitios</strong>, elige tu nivel de bloqueo</li>
            </ol>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-4">
          <p className="text-sm text-blue-900">
            <strong>💡 Consejo:</strong> Si rechazas todas las cookies, el sitio puede funcionar con limitaciones (idioma guardado, preferencias, etc.).
          </p>
        </div>
      </section>

      {/* Consentimiento */}
      <section id="consentimiento" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Consentimiento y Cambios de Preferencias</h2>

        <h4 className="font-semibold text-gray-900 mb-3">¿Cómo obtenemos consentimiento?</h4>
        <p className="text-sm text-gray-700 mb-3">
          Conforme a la Directiva ePrivacy y RGPD, usamos un banner de consentimiento explícito:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700 mb-4">
          <li><strong>Consentimiento afirmativo:</strong> Debes aceptar activamente (no pre-marcadas)</li>
          <li><strong>Granular:</strong> Elige por categoría (necesarias, analíticas, marketing)</li>
          <li><strong>Rechazar tan fácil como aceptar:</strong> Botón "Rechazar" prominente</li>
          <li><strong>Accesible:</strong> Puedes cambiar en cualquier momento</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">¿Qué ocurre al aceptar?</h4>
        <p className="text-sm text-gray-700">
          Tu consentimiento se almacena en la cookie <code className="bg-gray-100 px-1 rounded text-xs">cookie_consent_v1</code> con:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700 mt-2 mb-4">
          <li>Categorías aceptadas</li>
          <li>Timestamp de aceptación</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">¿Cómo retirar consentimiento?</h4>
        <p className="text-sm text-gray-700 mb-2">
          Puedes cambiar o retirar el consentimiento en cualquier momento:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
          <li>Haz clic en "Configurar cookies" en el pie de página</li>
          <li>Cambia tus preferencias y guarda</li>
          <li>Limpia manualmente las cookies de tu navegador</li>
        </ul>

        <p className="text-gray-700 mt-4 text-sm">
          <strong>Retroactividad:</strong> Retirar consentimiento no afecta el tratamiento de datos realizado antes de la retirada.
        </p>
      </section>

      {/* Final Notice */}
      <section className="bg-gray-100 p-6 rounded-lg mt-12">
        <h3 className="font-semibold text-gray-900 mb-2">¿Preguntas sobre nuestras cookies?</h3>
        <p className="text-sm text-gray-700">
          Si tienes dudas sobre esta Política de Cookies, contacta con nosotros:
        </p>
        <div className="mt-3 space-y-2 text-sm text-gray-700">
          <p>📧 <a href="mailto:mateoclaramunt2021@gmail.com" className="text-blue-600 hover:underline">mateoclaramunt2021@gmail.com</a></p>
          <p>📞 +34 640 791 041</p>
          <p>🌐 www.neuriax.com</p>
        </div>
        <p className="text-xs text-gray-600 mt-4">
          <strong>Última actualización:</strong> 16 de enero de 2026. Esta política se puede actualizar en cualquier momento.
        </p>
      </section>
    </LegalLayout>
  );
}
