import { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'PolÃ­tica de Cookies | Neuriax',
  description: 'PolÃ­tica de cookies de Neuriax - InformaciÃ³n sobre quÃ© cookies utilizamos y cÃ³mo gestionar tus preferencias.',
  robots: 'noindex, nofollow',
};

const toc = [
  { id: 'que-son', label: 'Â¿QuÃ© son las cookies?' },
  { id: 'cookies-utilizadas', label: 'Cookies Que Utilizamos' },
  { id: 'categorias', label: 'CategorÃ­as de Cookies' },
  { id: 'terceros', label: 'Cookies de Terceros' },
  { id: 'gestionar-cookies', label: 'CÃ³mo Gestionar tus Cookies' },
  { id: 'navegadores', label: 'Instrucciones por Navegador' },
  { id: 'consentimiento', label: 'Consentimiento y Cambios' },
];

export default function PoliticaCookies() {
  return (
    <LegalLayout
      title="PolÃ­tica de Cookies"
      lastUpdated="16 de enero de 2026"
      toc={toc}
    >
      {/* Â¿QuÃ© son las cookies? */}
      <section id="que-son" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Â¿QuÃ© son las Cookies?</h2>
        <p className="text-gray-700 mb-4">
          Las cookies son pequeÃ±os archivos de texto que se almacenan en tu dispositivo (ordenador, tableta, mÃ³vil) cuando visitas 
          un sitio web. Se envÃ­an entre tu navegador y nuestros servidores para recordar preferencias, autenticaciÃ³n y mejorar tu experiencia.
        </p>
        
        <h4 className="font-semibold text-gray-900 mt-4 mb-2">CaracterÃ­sticas principales:</h4>
        <ul className="list-disc ml-6 space-y-1 text-gray-700 text-sm">
          <li><strong>TamaÃ±o:</strong> Generalmente pequeÃ±os (menos de 4 KB)</li>
          <li><strong>DuraciÃ³n:</strong> Pueden ser de sesiÃ³n (se elimina al cerrar navegador) o persistentes (duran dÃ­as/meses)</li>
          <li><strong>Origen:</strong> Propias (neuriax.com) o de terceros (servicios integrados)</li>
          <li><strong>Privacidad:</strong> No contienen virus ni acceden a tu informaciÃ³n personal sin consentimiento</li>
        </ul>

        <p className="text-gray-700 mt-4">
          <strong>Â¿Son legales?</strong> SÃ­, siempre que se use consentimiento previo en la UE (Directiva ePrivacy, RGPD, LSSI-CE). 
          Las cookies necesarias estÃ¡n exentas de requerir consentimiento.
        </p>
      </section>

      {/* Cookies Utilizadas */}
      <section id="cookies-utilizadas" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cookies que Utilizamos</h2>
        <p className="text-gray-700 mb-6">
          Neuriax utiliza cookies en las siguientes categorÃ­as. Puedes gestionar tu consentimiento en el banner al ingresar 
          o en la secciÃ³n de preferencias.
        </p>

        {/* Tabla de Cookies */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left font-semibold">Nombre Cookie</th>
                <th className="border border-gray-300 p-3 text-left font-semibold">Tipo</th>
                <th className="border border-gray-300 p-3 text-left font-semibold">DuraciÃ³n</th>
                <th className="border border-gray-300 p-3 text-left font-semibold">DescripciÃ³n</th>
              </tr>
            </thead>
            <tbody>
              {/* Necesarias */}
              <tr className="bg-blue-50">
                <td colSpan={4} className="border border-gray-300 p-3 font-semibold text-blue-900 bg-blue-100">
                  ðŸ”’ Cookies Necesarias (Sin consentimiento)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">session_id</code></td>
                <td className="border border-gray-300 p-3">SesiÃ³n</td>
                <td className="border border-gray-300 p-3">Durante sesiÃ³n</td>
                <td className="border border-gray-300 p-3">Identificar tu sesiÃ³n activa en el sitio</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">csrf_token</code></td>
                <td className="border border-gray-300 p-3">SesiÃ³n</td>
                <td className="border border-gray-300 p-3">Durante sesiÃ³n</td>
                <td className="border border-gray-300 p-3">ProtecciÃ³n contra ataques CSRF</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">cookie_consent_v1</code></td>
                <td className="border border-gray-300 p-3">Persistente</td>
                <td className="border border-gray-300 p-3">1 aÃ±o</td>
                <td className="border border-gray-300 p-3">Almacenar tus preferencias de cookies</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">user_preferences</code></td>
                <td className="border border-gray-300 p-3">Persistente</td>
                <td className="border border-gray-300 p-3">30 dÃ­as</td>
                <td className="border border-gray-300 p-3">Idioma, tema oscuro, otras configuraciones</td>
              </tr>

              {/* AnalÃ­ticas */}
              <tr className="bg-green-50">
                <td colSpan={4} className="border border-gray-300 p-3 font-semibold text-green-900 bg-green-100">
                  ðŸ“Š Cookies AnalÃ­ticas (Requiere consentimiento)
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
                  Google Analytics / [PENDIENTE: herramienta analÃ­tica]
                  <br/>
                  <span className="text-xs text-gray-500">
                    TODO: Confirmar si se utiliza Google Analytics, Hotjar u otra herramienta
                  </span>
                </td>
              </tr>

              {/* Marketing */}
              <tr className="bg-orange-50">
                <td colSpan={4} className="border border-gray-300 p-3 font-semibold text-orange-900 bg-orange-100">
                  ðŸŽ¯ Cookies de Marketing (Requiere consentimiento)
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
            <strong>âš ï¸ Nota:</strong> Los campos marcados con [PENDIENTE] serÃ¡n completados una vez se integren las herramientas 
            definitivas. Las cookies de terceros seguirÃ¡n los tÃ©rminos de privacidad de sus respectivos proveedores.
          </p>
        </div>
      </section>

      {/* CategorÃ­as de Cookies */}
      <section id="categorias" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. CategorÃ­as de Cookies Detalladas</h2>

        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">ðŸ”’ Cookies Necesarias / TÃ©cnicas</h4>
            <p className="text-sm text-gray-700 mb-2">
              Esenciales para el funcionamiento correcto del sitio. Se cargan automÃ¡ticamente sin consentimiento previo, 
              conforme a la Directiva ePrivacy.
            </p>
            <p className="text-sm text-gray-700"><strong>Ejemplos:</strong> AutenticaciÃ³n, CSRF, sesiÃ³n, preferencias de accesibilidad</p>
            <p className="text-sm text-gray-700"><strong>Base legal:</strong> Art. 82 LSSI-CE, considerando 47 RGPD</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">ðŸ“Š Cookies AnalÃ­ticas / de Rendimiento</h4>
            <p className="text-sm text-gray-700 mb-2">
              Nos permiten entender cÃ³mo usas el sitio: quÃ© pÃ¡ginas visitas, cuÃ¡nto tiempo pasas, de dÃ³nde vienes, etc.
            </p>
            <p className="text-sm text-gray-700"><strong>PropÃ³sito:</strong> Mejorar diseÃ±o, contenido y velocidad</p>
            <p className="text-sm text-gray-700"><strong>Base legal:</strong> Consentimiento previo (Art. 6.1.a RGPD)</p>
            <p className="text-sm text-gray-700"><strong>Herramientas comunes:</strong> Google Analytics, Hotjar, Mixpanel</p>
            <p className="text-sm text-red-600"><strong>TODO:</strong> Confirmar cuÃ¡l/cuÃ¡les se utiliza(n)</p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">ðŸŽ¯ Cookies de Marketing / Publicidad</h4>
            <p className="text-sm text-gray-700 mb-2">
              Rastrea tu comportamiento para mostrar publicidad personalizada relevante y medir efectividad de campaÃ±as.
            </p>
            <p className="text-sm text-gray-700"><strong>PropÃ³sito:</strong> Retargeting, conversiones, lookalike audiences</p>
            <p className="text-sm text-gray-700"><strong>Base legal:</strong> Consentimiento previo (Art. 6.1.a RGPD)</p>
            <p className="text-sm text-gray-700"><strong>Plataformas comunes:</strong> Meta Pixel, Google Ads, TikTok Pixel, LinkedIn</p>
            <p className="text-sm text-red-600"><strong>TODO:</strong> Confirmar cuÃ¡l/cuÃ¡les se utiliza(n)</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">ðŸ”— Cookies de Redes Sociales</h4>
            <p className="text-sm text-gray-700 mb-2">
              Establecidas por redes sociales (Facebook, Instagram, LinkedIn, TikTok) si usas botones "Compartir" o "Like".
            </p>
            <p className="text-sm text-gray-700"><strong>Controlador:</strong> Meta Platforms, Inc. / Otras redes</p>
            <p className="text-sm text-gray-700"><strong>Privacidad:</strong> Regida por polÃ­ticas de cada red social</p>
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
              ðŸ”— <a href="#" className="text-blue-600 hover:underline">PolÃ­tica de privacidad de Google Analytics</a>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded p-3">
            <p className="text-sm font-semibold text-gray-900">
              [PENDIENTE: Meta Pixel]
            </p>
            <p className="text-xs text-gray-600">
              ðŸ”— <a href="#" className="text-blue-600 hover:underline">PolÃ­tica de privacidad de Meta</a>
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
          <strong>Nota:</strong> Consulta las polÃ­ticas de privacidad de cada tercero para mÃ¡s informaciÃ³n sobre cÃ³mo gestionan tus datos.
        </p>
      </section>

      {/* Gestionar Cookies */}
      <section id="gestionar-cookies" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. CÃ³mo Gestionar tus Cookies</h2>

        <h4 className="font-semibold text-gray-900 mb-3">OpciÃ³n 1: Banner de Consentimiento (Recomendado)</h4>
        <p className="text-sm text-gray-700 mb-3">
          VerÃ¡s un banner al ingresar al sitio. Puedes:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700 mb-4">
          <li><strong>Aceptar todo:</strong> Permitir todas las cookies (necesarias, analÃ­ticas, marketing)</li>
          <li><strong>Rechazar todo:</strong> Solo cookies necesarias (no analÃ­ticas ni marketing)</li>
          <li><strong>Configurar:</strong> Elegir quÃ© categorÃ­as activar</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">OpciÃ³n 2: Cambiar Preferencias DespuÃ©s</h4>
        <p className="text-sm text-gray-700 mb-3">
          En el pie de pÃ¡gina (footer) verÃ¡s el botÃ³n "Configurar cookies". Puedes cambiar tus preferencias cuando quieras.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3">OpciÃ³n 3: Configurar desde tu Navegador</h4>
        <p className="text-sm text-gray-700 mb-3">
          Puedes gestionar, eliminar o rechazar cookies desde la configuraciÃ³n de tu navegador (ver secciÃ³n siguiente).
        </p>

        <h4 className="font-semibold text-gray-900 mb-3">OpciÃ³n 4: Opt-Out de Google Analytics</h4>
        <p className="text-sm text-gray-700">
          Si Google Analytics estÃ¡ habilitado, puedes instalar la extensiÃ³n "Google Analytics Opt-out Browser Add-on":
        </p>
        <p className="text-sm text-blue-600 mt-2">
          ðŸ”— <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="hover:underline">
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
            <h4 className="font-semibold text-gray-900 mb-2">ðŸŒ Google Chrome</h4>
            <ol className="list-decimal ml-6 space-y-1 text-sm text-gray-700">
              <li>Haz clic en el icono de menÃº (â‹®) en la esquina superior derecha</li>
              <li>Selecciona <strong>ConfiguraciÃ³n</strong></li>
              <li>Ve a <strong>Privacidad y seguridad</strong> â†’ <strong>Cookies y otros datos de sitios</strong></li>
              <li>Elige tu preferencia: <strong>Bloquear todas las cookies</strong> o <strong>Bloquear cookies de terceros en navegaciÃ³n privada</strong></li>
            </ol>
          </div>

          <div className="border rounded p-4">
            <h4 className="font-semibold text-gray-900 mb-2">ðŸ”¥ Mozilla Firefox</h4>
            <ol className="list-decimal ml-6 space-y-1 text-sm text-gray-700">
              <li>Haz clic en el icono de menÃº (â˜°) en la esquina superior derecha</li>
              <li>Selecciona <strong>ConfiguraciÃ³n</strong></li>
              <li>Ve a <strong>Privacidad y seguridad</strong></li>
              <li>En <strong>Cookies y datos de sitios</strong>, elige <strong>Bloquear cookies de terceros problemÃ¡ticas</strong> o <strong>Bloquear todas las cookies</strong></li>
            </ol>
          </div>

          <div className="border rounded p-4">
            <h4 className="font-semibold text-gray-900 mb-2">ðŸŽ Safari (Mac/iOS)</h4>
            <ol className="list-decimal ml-6 space-y-1 text-sm text-gray-700">
              <li><strong>Mac:</strong> Safari â†’ Preferencias â†’ Privacidad â†’ Desactiva "Permitir cookies"</li>
              <li><strong>iOS:</strong> Ajustes â†’ Safari â†’ Privacidad â†’ Desactiva "Permitir cookies" o selecciona "Nunca"</li>
            </ol>
          </div>

          <div className="border rounded p-4">
            <h4 className="font-semibold text-gray-900 mb-2">âšª Microsoft Edge</h4>
            <ol className="list-decimal ml-6 space-y-1 text-sm text-gray-700">
              <li>Haz clic en el icono de menÃº (Â·Â·Â·) en la esquina superior derecha</li>
              <li>Selecciona <strong>ConfiguraciÃ³n</strong></li>
              <li>Ve a <strong>Privacidad, bÃºsqueda y servicios</strong></li>
              <li>En <strong>Cookies y otros datos de sitios</strong>, elige tu nivel de bloqueo</li>
            </ol>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-4">
          <p className="text-sm text-blue-900">
            <strong>ðŸ’¡ Consejo:</strong> Si rechazas todas las cookies, el sitio puede funcionar con limitaciones (idioma guardado, preferencias, etc.).
          </p>
        </div>
      </section>

      {/* Consentimiento */}
      <section id="consentimiento" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Consentimiento y Cambios de Preferencias</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Â¿CÃ³mo obtenemos consentimiento?</h4>
        <p className="text-sm text-gray-700 mb-3">
          Conforme a la Directiva ePrivacy y RGPD, usamos un banner de consentimiento explÃ­cito:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700 mb-4">
          <li><strong>Consentimiento afirmativo:</strong> Debes aceptar activamente (no pre-marcadas)</li>
          <li><strong>Granular:</strong> Elige por categorÃ­a (necesarias, analÃ­ticas, marketing)</li>
          <li><strong>Rechazar tan fÃ¡cil como aceptar:</strong> BotÃ³n "Rechazar" prominente</li>
          <li><strong>Accesible:</strong> Puedes cambiar en cualquier momento</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">Â¿QuÃ© ocurre al aceptar?</h4>
        <p className="text-sm text-gray-700">
          Tu consentimiento se almacena en la cookie <code className="bg-gray-100 px-1 rounded text-xs">cookie_consent_v1</code> con:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700 mt-2 mb-4">
          <li>CategorÃ­as aceptadas</li>
          <li>Timestamp de aceptaciÃ³n</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">Â¿CÃ³mo retirar consentimiento?</h4>
        <p className="text-sm text-gray-700 mb-2">
          Puedes cambiar o retirar el consentimiento en cualquier momento:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
          <li>Haz clic en "Configurar cookies" en el pie de pÃ¡gina</li>
          <li>Cambia tus preferencias y guarda</li>
          <li>Limpia manualmente las cookies de tu navegador</li>
        </ul>

        <p className="text-gray-700 mt-4 text-sm">
          <strong>Retroactividad:</strong> Retirar consentimiento no afecta el tratamiento de datos realizado antes de la retirada.
        </p>
      </section>

      {/* Final Notice */}
      <section className="bg-gray-100 p-6 rounded-lg mt-12">
        <h3 className="font-semibold text-gray-900 mb-2">Â¿Preguntas sobre nuestras cookies?</h3>
        <p className="text-sm text-gray-700">
          Si tienes dudas sobre esta PolÃ­tica de Cookies, contacta con nosotros:
        </p>
        <div className="mt-3 space-y-2 text-sm text-gray-700">
          <p>ðŸ“§ <a href="mailto:neuriaxx@gmail.com" className="text-blue-600 hover:underline">neuriaxx@gmail.com</a></p>
          <p>ðŸ“ž +34 640 791 041</p>
          <p>ðŸŒ www.neuriax.com</p>
        </div>
        <p className="text-xs text-gray-600 mt-4">
          <strong>Ãšltima actualizaciÃ³n:</strong> 16 de enero de 2026. Esta polÃ­tica se puede actualizar en cualquier momento.
        </p>
      </section>
    </LegalLayout>
  );
}

