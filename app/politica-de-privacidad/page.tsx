import { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Neuriax',
  description: 'Política de privacidad de Neuriax - RGPD, LOPDGDD, tratamiento de datos personales y derechos.',
  robots: 'noindex, nofollow',
};

const toc = [
  { id: 'responsable', label: 'Responsable del Tratamiento' },
  { id: 'datos-personales', label: 'Datos Personales que Tratamos' },
  { id: 'finalidades', label: 'Finalidades del Tratamiento' },
  { id: 'bases-juridicas', label: 'Bases Jurídicas' },
  { id: 'destinatarios', label: 'Destinatarios / Encargados' },
  { id: 'transferencias', label: 'Transferencias Internacionales' },
  { id: 'plazo-conservacion', label: 'Plazo de Conservación' },
  { id: 'derechos-interesados', label: 'Derechos de los Interesados' },
  { id: 'seguridad', label: 'Medidas de Seguridad' },
  { id: 'menores', label: 'Menores de Edad' },
  { id: 'cambios-politica', label: 'Cambios en la Política' },
];

export default function PoliticaPrivacidad() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      lastUpdated="16 de enero de 2026"
      toc={toc}
    >
      {/* Responsable del Tratamiento */}
      <section id="responsable" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Responsable del Tratamiento de Datos</h2>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">⚠️ Identificación en Proceso</h3>
          <p className="text-sm text-gray-700 mb-2">
            La identificación fiscal está en trámite de completarse:
          </p>
          <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
            <li><strong>NIF/CIF: [PENDIENTE]</strong></li>
            <li><strong>Domicilio fiscal/profesional: [PENDIENTE: DOMICILIO COMPLETO]</strong></li>
          </ul>
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Nombre:</strong> Neuriax (Mateo Claramunt González)
          </p>
          <p>
            <strong>Tipo de entidad:</strong> Persona física (en proceso de formalización)
          </p>
          <p>
            <strong>Correo:</strong>{' '}
            <a href="mailto:mateoclaramunt2021@gmail.com" className="text-blue-600 hover:underline">
              mateoclaramunt2021@gmail.com
            </a>
          </p>
          <p>
            <strong>Teléfono:</strong> +34 640 791 041
          </p>
          <p>
            <strong>Domicilio provisional:</strong> [PENDIENTE]
          </p>
        </div>

        <p className="text-gray-700 mt-4">
          Neuriax es el responsable del tratamiento de tus datos personales de conformidad con el Reglamento General de Protección de Datos (RGPD - Reglamento UE 2016/679).
        </p>
      </section>

      {/* Datos Personales */}
      <section id="datos-personales" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Datos Personales que Tratamos</h2>
        <p className="text-gray-700 mb-4">
          Recabamos y tratamos los siguientes datos personales que proporciones voluntariamente:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li><strong>Datos de identificación:</strong> Nombre, apellidos, correo electrónico, teléfono</li>
          <li><strong>Datos profesionales:</strong> Empresa, cargo, sector de actividad</li>
          <li><strong>Datos de consulta:</strong> Contenido del mensaje, asuntos de interés, servicios solicitados</li>
          <li><strong>Datos de navegación:</strong> IP, dispositivo, navegador, páginas visitadas (mediante cookies)</li>
          <li><strong>Datos de contrato:</strong> Si contratas servicios: información de facturación, datos bancarios, historial de servicios</li>
        </ul>
        <p className="text-gray-700 mt-4">
          <strong>No recabamos datos sensibles:</strong> No solicitamos información de categoría especial (origen étnico, opiniones políticas, 
          convicciones religiosas, datos biométricos, etc.) a menos que sea absolutamente necesario y con consentimiento específico.
        </p>
      </section>

      {/* Finalidades */}
      <section id="finalidades" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalidades del Tratamiento</h2>
        <p className="text-gray-700 mb-4">
          Utilizamos tus datos personales para las siguientes finalidades:
        </p>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">1. Responder a Consultas y Solicitudes de Información</h4>
            <p className="text-sm text-gray-700">
              Procesar y responder a tus preguntas, formularios de contacto y solicitudes de información sobre nuestros servicios.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">2. Preparar Propuestas y Presupuestos</h4>
            <p className="text-sm text-gray-700">
              Analizar tus necesidades y elaborar presupuestos y propuestas personalizadas de servicios de automatización e IA.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">3. Gestión Precontractual y Contractual</h4>
            <p className="text-sm text-gray-700">
              Ejecutar contratos, gestionar solicitudes de servicios, seguimiento de proyectos, facturación y gestión de cobros.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">4. Comunicaciones Comerciales (Consentimiento Requerido)</h4>
            <p className="text-sm text-gray-700">
              Enviar información sobre servicios, novedades, promociones y eventos. <strong>Solo si has dado consentimiento expreso.</strong>
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">5. Análisis y Mejora del Sitio Web</h4>
            <p className="text-sm text-gray-700">
              Analizar comportamientos de usuarios para mejorar la experiencia, diseño y funcionalidad del sitio.
              {/* TODO: Especificar herramientas analíticas utilizadas */}
              <strong> [PENDIENTE: Especificar herramientas concretas]</strong>
            </p>
          </div>

          <div className="border-l-4 border-pink-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">6. Cumplimiento de Obligaciones Legales</h4>
            <p className="text-sm text-gray-700">
              Cumplir con obligaciones legales, fiscales y administrativas en España y la UE.
            </p>
          </div>
        </div>
      </section>

      {/* Bases Jurídicas */}
      <section id="bases-juridicas" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Bases Jurídicas del Tratamiento</h2>
        <p className="text-gray-700 mb-4">
          El tratamiento de tus datos se realiza en base a:
        </p>

        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left font-semibold">Finalidad</th>
              <th className="border border-gray-300 p-3 text-left font-semibold">Base Jurídica (RGPD Art. 6)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-3">Responder consultas y contacto</td>
              <td className="border border-gray-300 p-3">Consentimiento (Art. 6.1.a) e interés legítimo (Art. 6.1.f)</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-3">Presupuestos y propuestas</td>
              <td className="border border-gray-300 p-3">Medidas precontractuales (Art. 6.1.b)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">Ejecución de contratos</td>
              <td className="border border-gray-300 p-3">Cumplimiento de contrato (Art. 6.1.b)</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-3">Comunicaciones de marketing</td>
              <td className="border border-gray-300 p-3">Consentimiento (Art. 6.1.a)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">Análisis web</td>
              <td className="border border-gray-300 p-3">Consentimiento vía cookies (Art. 6.1.a)</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-3">Cumplimiento legal</td>
              <td className="border border-gray-300 p-3">Obligación legal (Art. 6.1.c)</td>
            </tr>
          </tbody>
        </table>

        <p className="text-gray-700 mt-4">
          <strong>Interés legítimo:</strong> Cuando aplicamos esta base, tu interés en proteger tus datos no prevalece sobre nuestro interés 
          legítimo en contactarte sobre servicios relacionados que pueda ofrecerte.
        </p>
      </section>

      {/* Destinatarios */}
      <section id="destinatarios" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Destinatarios / Encargados de Tratamiento</h2>
        <p className="text-gray-700 mb-4">
          Tus datos pueden ser compartidos con los siguientes terceros encargados del tratamiento:
        </p>

        <div className="space-y-3">
          <div className="border-l-4 border-gray-300 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">📧 Proveedor de Email</h4>
            <p className="text-sm text-gray-700">
              <strong>[PENDIENTE: Especificar proveedor]</strong> – Para envío de respuestas y comunicaciones.
            </p>
          </div>

          <div className="border-l-4 border-gray-300 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">🖥️ Proveedor de Hosting</h4>
            <p className="text-sm text-gray-700">
              <strong>[PENDIENTE: Especificar proveedor]</strong> – Almacenamiento y gestión del sitio web.
            </p>
          </div>

          <div className="border-l-4 border-gray-300 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">💼 CRM / Base de Datos</h4>
            <p className="text-sm text-gray-700">
              <strong>[PENDIENTE: Especificar sistema CRM]</strong> – Gestión de relaciones con clientes y propuestas.
            </p>
          </div>

          <div className="border-l-4 border-gray-300 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">📊 Herramientas de Analítica</h4>
            <p className="text-sm text-gray-700">
              <strong>[PENDIENTE: Google Analytics / Hotjar / Otras]</strong> – Análisis de comportamiento del sitio.
              <br />
              <em>TODO: Confirmar si se usan y sus respectivas políticas de privacidad.</em>
            </p>
          </div>

          <div className="border-l-4 border-gray-300 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">🎯 Plataformas de Marketing</h4>
            <p className="text-sm text-gray-700">
              <strong>[PENDIENTE: Meta Pixel / Google Ads / Otras]</strong> – Publicidad personalizada y retargeting.
              <br />
              <em>TODO: Confirmar uso y vínculos de privacidad.</em>
            </p>
          </div>

          <div className="border-l-4 border-gray-300 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">📋 Organismos Públicos y Autoridades</h4>
            <p className="text-sm text-gray-700">
              Cuando sea requerido por ley: Administración Tributaria, Seguridad Social, autoridades judiciales, etc.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mt-4 text-sm">
          <strong>Nota:</strong> Todos los encargados están vinculados por contrato de procesamiento de datos y acuerdan proteger 
          tus datos de conformidad con el RGPD.
        </p>
      </section>

      {/* Transferencias Internacionales */}
      <section id="transferencias" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Transferencias Internacionales de Datos</h2>
        <p className="text-gray-700 mb-4">
          <strong>[PENDIENTE: Evaluar si hay transferencias fuera de la UE/EEE]</strong>
        </p>
        <p className="text-gray-700">
          En caso de que utilizamos proveedores ubicados fuera de la Unión Europea, aseguramos que existan mecanismos de protección 
          adecuados, como:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-3">
          <li>Decisión de adecuación de la Comisión Europea</li>
          <li>Cláusulas Contractuales Estándar (SCCs) aprobadas por la UE</li>
          <li>Normas Corporativas Vinculantes (BCRs)</li>
        </ul>
      </section>

      {/* Plazo Conservación */}
      <section id="plazo-conservacion" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Plazo de Conservación de Datos</h2>
        <p className="text-gray-700 mb-4">
          Tus datos se conservarán durante los siguientes plazos:
        </p>

        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm text-gray-700">
              <strong>Formularios de contacto no convertidos en clientes:</strong> [PENDIENTE: Especificar, ej. 2 años]
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm text-gray-700">
              <strong>Clientes activos:</strong> Mientras dure la relación contractual + [PENDIENTE: años adicionales]
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm text-gray-700">
              <strong>Suscriptores a comunicaciones:</strong> Hasta solicitar baja o retirar consentimiento
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm text-gray-700">
              <strong>Registros de auditoría y seguridad:</strong> [PENDIENTE: período de retención]
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm text-gray-700">
              <strong>Datos fiscales y contables:</strong> 4 años, conforme a obligaciones legales españolas
            </p>
          </div>
        </div>

        <p className="text-gray-700 mt-4">
          Después de estos períodos, los datos serán eliminados o anonimizados de forma segura, a menos que exista una 
          obligación legal que nos requiera conservarlos más tiempo.
        </p>
      </section>

      {/* Derechos de los Interesados */}
      <section id="derechos-interesados" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Derechos de los Interesados</h2>
        <p className="text-gray-700 mb-4">
          Tienes derecho a ejercer los siguientes derechos respecto a tus datos personales:
        </p>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">✓ Derecho de Acceso</h4>
            <p className="text-sm text-gray-700">
              Solicitar qué datos personales tenemos sobre ti y cómo los procesamos.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">✓ Derecho de Rectificación</h4>
            <p className="text-sm text-gray-700">
              Solicitar la corrección de datos inexactos o incompletos.
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">✓ Derecho de Supresión ("Derecho al Olvido")</h4>
            <p className="text-sm text-gray-700">
              Solicitar la eliminación de tus datos en determinadas circunstancias (ej: cuando ya no sean necesarios, revocación de consentimiento).
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">✓ Derecho de Limitación</h4>
            <p className="text-sm text-gray-700">
              Solicitar que limitemos el procesamiento de tus datos mientras se resuelven disputas.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">✓ Derecho de Portabilidad</h4>
            <p className="text-sm text-gray-700">
              Recibir tus datos en un formato estructurado y portátil, y transferirlos a otro responsable si es posible.
            </p>
          </div>

          <div className="border-l-4 border-pink-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">✓ Derecho de Oposición</h4>
            <p className="text-sm text-gray-700">
              Oponerté al procesamiento de tus datos por interés legítimo o para marketing directo.
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-900">✓ Derecho a Retirar Consentimiento</h4>
            <p className="text-sm text-gray-700">
              Retirar el consentimiento que hayas otorgado en cualquier momento, sin que afecte a tratamientos anteriores.
            </p>
          </div>
        </div>

        <h4 className="font-semibold text-gray-900 mt-6 mb-3">📋 Cómo Ejercer tus Derechos</h4>
        <p className="text-gray-700 mb-3">
          Para ejercer cualquiera de estos derechos, contáctanos en:
        </p>
        <div className="bg-gray-100 p-4 rounded text-sm text-gray-700 space-y-2">
          <p><strong>Email:</strong> <a href="mailto:mateoclaramunt2021@gmail.com" className="text-blue-600 hover:underline">mateoclaramunt2021@gmail.com</a></p>
          <p><strong>Teléfono:</strong> +34 640 791 041</p>
          <p><strong>Asunto:</strong> "Ejercicio de derechos RGPD"</p>
        </div>

        <p className="text-gray-700 mt-4 text-sm">
          Responderemos tu solicitud en un plazo máximo de <strong>30 días</strong> (extensible a 60 días si es compleja).
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-3">⚠️ Derecho a Reclamación ante la Autoridad de Control</h4>
        <p className="text-gray-700">
          Si consideras que el tratamiento de tus datos viola el RGPD, tienes derecho a presentar una reclamación ante la 
          <strong> Autoridad de Protección de Datos (AEPD)</strong>:
        </p>
        <div className="bg-gray-100 p-4 rounded text-sm text-gray-700 space-y-2 mt-3">
          <p><strong>Agencia Española de Protección de Datos (AEPD)</strong></p>
          <p><strong>Sitio web:</strong> <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aepd.es</a></p>
          <p><strong>Teléfono:</strong> 901 100 099</p>
          <p><strong>Correo:</strong> consultas@aepd.es</p>
        </div>
      </section>

      {/* Seguridad */}
      <section id="seguridad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Medidas de Seguridad</h2>
        <p className="text-gray-700 mb-4">
          Neuriax implementa medidas técnicas y organizativas para proteger tus datos personales:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li><strong>Encriptación:</strong> Transmisión de datos con SSL/TLS (HTTPS)</li>
          <li><strong>Control de acceso:</strong> Autenticación y autorización de personal</li>
          <li><strong>Firewall y antimalware:</strong> Protección perimetral de sistemas</li>
          <li><strong>Copias de seguridad:</strong> Almacenamiento redundante de datos críticos</li>
          <li><strong>Auditorías:</strong> Revisiones periódicas de conformidad</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Sin embargo, no podemos garantizar seguridad absoluta. Si detectas una brecha de seguridad, notifícalo de inmediato a 
          <a href="mailto:mateoclaramunt2021@gmail.com" className="text-blue-600 hover:underline"> mateoclaramunt2021@gmail.com</a>.
        </p>
      </section>

      {/* Menores */}
      <section id="menores" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Menores de Edad</h2>
        <p className="text-gray-700">
          Este sitio web <strong>no está dirigido a menores de 14 años</strong>. No recabamos conscientemente datos personales de menores. 
          Si un menor nos proporciona datos sin consentimiento parental, nos comprometemos a eliminarlos sin demora.
        </p>
        <p className="text-gray-700 mt-3">
          Si eres menor de 14 años y el titular de la patria potestad desea ejercer derechos, puede contactarnos en 
          <a href="mailto:mateoclaramunt2021@gmail.com" className="text-blue-600 hover:underline"> mateoclaramunt2021@gmail.com</a>.
        </p>
      </section>

      {/* Cambios Política */}
      <section id="cambios-politica" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Cambios en esta Política de Privacidad</h2>
        <p className="text-gray-700">
          Neuriax se reserva el derecho a modificar esta Política de Privacidad en cualquier momento para adaptarse a cambios legales, 
          técnicos o operacionales. La versión actualizada será publicada en esta página con fecha de última revisión.
        </p>
        <p className="text-gray-700 mt-3">
          El uso continuado del sitio tras la publicación de cambios implica aceptación de los nuevos términos. Te recomendamos 
          revisar esta política periódicamente.
        </p>
      </section>

      {/* Final Notice */}
      <section className="bg-gray-100 p-6 rounded-lg mt-12">
        <h3 className="font-semibold text-gray-900 mb-2">Dudas o Consultas</h3>
        <p className="text-sm text-gray-700">
          Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer tus derechos RGPD:
        </p>
        <div className="mt-3 space-y-2 text-sm text-gray-700">
          <p>📧 <a href="mailto:mateoclaramunt2021@gmail.com" className="text-blue-600 hover:underline">mateoclaramunt2021@gmail.com</a></p>
          <p>📞 +34 640 791 041</p>
          <p>🌐 www.neuriax.com</p>
        </div>
      </section>
    </LegalLayout>
  );
}
