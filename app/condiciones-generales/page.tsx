import { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Condiciones Generales | Neuriax',
  description: 'Condiciones generales de servicio de Neuriax - Términos contractuales para servicios de automatización e IA.',
  robots: 'noindex, nofollow',
};

const toc = [
  { id: 'objeto', label: 'Objeto de las Condiciones' },
  { id: 'servicios', label: 'Descripción de Servicios' },
  { id: 'proceso', label: 'Proceso Comercial' },
  { id: 'tarifas', label: 'Tarifas y Pagos' },
  { id: 'plazos', label: 'Plazos' },
  { id: 'propiedad', label: 'Propiedad Intelectual' },
  { id: 'entregables', label: 'Entregables y Aceptación' },
  { id: 'responsabilidad', label: 'Limitación de Responsabilidad' },
  { id: 'soporte', label: 'Soporte y Mantenimiento' },
  { id: 'confidencialidad', label: 'Confidencialidad' },
  { id: 'incumplimiento', label: 'Incumplimiento y Resolución' },
  { id: 'legislacion', label: 'Legislación Aplicable' },
];

export default function CondicionesGenerales() {
  return (
    <LegalLayout
      title="Condiciones Generales de Servicio"
      lastUpdated="16 de enero de 2026"
      toc={toc}
    >
      {/* Objeto */}
      <section id="objeto" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Objeto de las Condiciones Generales</h2>
        <p className="text-gray-700 mb-4">
          Estas Condiciones Generales establecen los términos y condiciones bajo los cuales Neuriax presta sus servicios de 
          automatización digital, inteligencia artificial, integración de sistemas, desarrollo web y consultoría tecnológica.
        </p>
        <p className="text-gray-700">
          El cliente, al solicitar un presupuesto, aceptar una propuesta o contratar servicios, acepta íntegramente estas condiciones. 
          Se entiende que los servicios son de carácter B2B (empresa a empresa) o B2C (empresa a consumidor).
        </p>
      </section>

      {/* Servicios */}
      <section id="servicios" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descripción de Servicios</h2>
        <p className="text-gray-700 mb-4">
          Neuriax ofrece:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li><strong>Automatización digital:</strong> Procesos automatizados, RPA, workflows, integraciones sin código</li>
          <li><strong>Soluciones de IA:</strong> Chatbots, análisis de datos, predicciones, procesamiento de lenguaje natural</li>
          <li><strong>Integraciones de sistemas:</strong> APIs, webhooks, sincronización de datos entre aplicaciones</li>
          <li><strong>Desarrollo web:</strong> Sitios web profesionales, landing pages, aplicaciones web</li>
          <li><strong>Consultoría:</strong> Diagnóstico de procesos, recomendaciones tecnológicas, asesoramiento digital</li>
        </ul>
        <p className="text-gray-700 mt-4">
          <strong>Alcance específico:</strong> Cada servicio será detallado en la propuesta/presupuesto aceptado. 
          Se considerarán servicios fuera del alcance pactado como trabajos adicionales y serán facturados por separado.
        </p>
      </section>

      {/* Proceso Comercial */}
      <section id="proceso" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Proceso Comercial Estándar</h2>
        <p className="text-gray-700 mb-4">
          El flujo típico de un proyecto es el siguiente:
        </p>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900">1. Solicitud Inicial</h4>
            <p className="text-sm text-gray-700">El cliente contacta con Neuriax describiendo sus necesidades y objetivos.</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900">2. Diagnóstico/Análisis</h4>
            <p className="text-sm text-gray-700">Neuriax analiza la situación actual y propone soluciones preliminares.</p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">3. Propuesta y Presupuesto</h4>
            <p className="text-sm text-gray-700">Se emite presupuesto detallado con alcance, plazos y condiciones económicas.</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900">4. Aceptación</h4>
            <p className="text-sm text-gray-700">El cliente acepta el presupuesto (por correo, firma digital o contrato formal).</p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold text-gray-900">5. Ejecución</h4>
            <p className="text-sm text-gray-700">Neuriax realiza el trabajo según especificaciones. Se proporcionan actualizaciones periódicas.</p>
          </div>

          <div className="border-l-4 border-pink-500 pl-4">
            <h4 className="font-semibold text-gray-900">6. Entrega y Aceptación</h4>
            <p className="text-sm text-gray-700">Se entrega el trabajo finalizado. El cliente dispone de plazo para aceptación/cambios.</p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4">
            <h4 className="font-semibold text-gray-900">7. Pago y Cierre</h4>
            <p className="text-sm text-gray-700">Se genera factura y se realiza el pago conforme a condiciones acordadas.</p>
          </div>
        </div>
      </section>

      {/* Tarifas y Pagos */}
      <section id="tarifas" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Tarifas y Condiciones de Pago</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Modelos de Facturación</h4>
        <p className="text-sm text-gray-700 mb-3">
          <strong>[PENDIENTE: Especificar modelo/s de facturación]</strong> Las tarifas pueden ser:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mb-4">
          <li><strong>Por proyecto (fijo):</strong> Precio único para el proyecto completo</li>
          <li><strong>Por hora:</strong> Tarifa horaria aplicable a trabajos variables</li>
          <li><strong>Por fase/hito:</strong> Pagos escalonados según avance</li>
          <li><strong>Por resultados:</strong> Condicional a logro de objetivos específicos</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">Condiciones de Pago</h4>
        <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-4">
          <p className="text-sm text-amber-900">
            <strong>[PENDIENTE: Especificar]</strong>
          </p>
          <ul className="list-disc ml-6 space-y-1 text-sm text-amber-900 mt-2">
            <li>Depósito inicial: [PENDIENTE: %]</li>
            <li>Método de pago: [PENDIENTE: Transferencia/Tarjeta/Otros]</li>
            <li>Plazo de pago: [PENDIENTE: días después de factura]</li>
            <li>Intereses de demora: Aplicables según Ley 3/2004</li>
          </ul>
        </div>

        <h4 className="font-semibold text-gray-900 mb-3">Impuestos y Gastos</h4>
        <p className="text-sm text-gray-700 mb-2">
          <strong>IVA:</strong> Aplicable según normativa española (21% estándar, salvo exención).
        </p>
        <p className="text-sm text-gray-700">
          <strong>Gastos adicionales:</strong> Costos de terceros, licencias especiales o viajes necesarios se facturan por separado previa aceptación.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Cambios de Alcance y Sobrecostos</h4>
        <p className="text-sm text-gray-700">
          Si el cliente solicita cambios o trabajos adicionales fuera del alcance pactado, se emitirá un presupuesto adicional. 
          Los sobrecostos no se aplicarán sin consentimiento escrito previo.
        </p>
      </section>

      {/* Plazos */}
      <section id="plazos" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Plazos de Ejecución</h2>
        <p className="text-gray-700 mb-4">
          <strong>Naturaleza orientativa:</strong> Los plazos indicados en presupuestos y propuestas son orientativos. 
          Se definen con precisión en el contrato o acuerdo específico.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Factores que pueden afectar plazos:</strong>
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Retrasos en respuestas o información del cliente</li>
          <li>Cambios de requisitos o alcance</li>
          <li>Complejidad técnica inesperada</li>
          <li>Dependencia de terceros (hosting, APIs, integraciones externas)</li>
          <li>Fuerza mayor o eventos imprevistos</li>
        </ul>
        <p className="text-gray-700 mt-4">
          <strong>Comunicación:</strong> Neuriax informará al cliente de cualquier desviación estimada en plazos lo antes posible.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Retrasos Atribuibles al Cliente</h4>
        <p className="text-sm text-gray-700">
          Si el cliente causa retrasos (información incompleta, aprobaciones tardías, cambios de especificaciones), 
          los plazos se extenderán de mutuo acuerdo.
        </p>
      </section>

      {/* Propiedad Intelectual */}
      <section id="propiedad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Propiedad Intelectual</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Derechos Previos</h4>
        <p className="text-sm text-gray-700 mb-4">
          Neuriax conserva la propiedad intelectual de:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mb-4">
          <li>Metodologías, procesos y frameworks propios</li>
          <li>Librerías de código reutilizable</li>
          <li>Templates y componentes pre-desarrollados</li>
          <li>Documentación general y herramientas internas</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">Entregables y Transferencia</h4>
        <p className="text-sm text-gray-700">
          <strong>[PENDIENTE: Especificar modelo de cesión]</strong>
        </p>
        <p className="text-sm text-gray-700 mt-3">
          El cliente recibe los derechos de los entregables (código, diseños, contenido) según lo especificado en contrato:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mt-2">
          <li><strong>Cesión completa:</strong> El cliente propietario exclusivo tras pago final</li>
          <li><strong>Licencia de uso:</strong> Cliente usa bajo condiciones (no revender, no sublicenciar)</li>
          <li><strong>Explotación conjunta:</strong> Ambas partes con derechos de uso y explotación</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Créditos y Atribución</h4>
        <p className="text-sm text-gray-700">
          Neuriax puede mencionar al cliente como caso de uso/referencia a menos que se acuerde lo contrario en confidencialidad.
        </p>
      </section>

      {/* Entregables y Aceptación */}
      <section id="entregables" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Entregables y Aceptación</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Forma de Entrega</h4>
        <p className="text-sm text-gray-700 mb-3">
          Los entregables se proporcionarán de forma:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>Acceso a entorno online (para webs, aplicaciones)</li>
          <li>Descarga de archivos (código, documentos, diseños)</li>
          <li>Almacenamiento en nube (Google Drive, OneDrive, etc.)</li>
          <li>Presentación y handover personalizado</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Período de Aceptación</h4>
        <p className="text-sm text-gray-700 mb-2">
          El cliente tendrá <strong>[PENDIENTE: días]</strong> para revisar y aceptar entregables.
        </p>
        <p className="text-sm text-gray-700">
          <strong>Cambios menores:</strong> Serán incluidos sin coste adicional si están dentro del alcance.
          <br/>
          <strong>Cambios mayores:</strong> Se presupuestarán como trabajo adicional.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Aceptación Tácita</h4>
        <p className="text-sm text-gray-700">
          Si el cliente no reporta cambios en el período indicado, se considera aceptado el trabajo.
        </p>
      </section>

      {/* Responsabilidad */}
      <section id="responsabilidad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitación de Responsabilidad</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Garantías Limitadas</h4>
        <p className="text-sm text-gray-700 mb-3">
          Neuriax no garantiza:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>Disponibilidad 100% del sitio web (puede haber mantenimiento, fallos de proveedores)</li>
          <li>Generación de ingresos o ventas específicas</li>
          <li>Posicionamiento SEO (se aplican mejores prácticas, pero Google decide rankings)</li>
          <li>Compatibilidad perfecta con todos navegadores/dispositivos antiguos</li>
          <li>Ausencia total de bugs o errores (se aplican estándares de calidad razonables)</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Responsabilidad Máxima</h4>
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
          <p className="text-sm text-red-900">
            La responsabilidad total de Neuriax por cualquier daño derivado del incumplimiento de estas condiciones 
            <strong> no excederá el 50% del importe pagado</strong> por el cliente en los 12 meses previos, 
            o [PENDIENTE: cantidad mínima/máxima].
          </p>
        </div>

        <h4 className="font-semibold text-gray-900 mb-3">Exclusión de Daños Indirectos</h4>
        <p className="text-sm text-gray-700">
          Neuriax no es responsable de daños indirectos, incidentales, especiales o punitivos, incluyendo:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mt-2">
          <li>Pérdida de ingresos o datos</li>
          <li>Daño reputacional</li>
          <li>Interrupciones de negocio</li>
          <li>Costos de sustitución de servicios</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Excepciones</h4>
        <p className="text-sm text-gray-700">
          Esta limitación no se aplica a: negligencia grave, fraude, incumplimiento de obligaciones legales imperativas, 
          o daños derivados de violación de seguridad por culpa directa de Neuriax.
        </p>
      </section>

      {/* Soporte y Mantenimiento */}
      <section id="soporte" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Soporte y Mantenimiento</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Incluido en Servicio</h4>
        <p className="text-sm text-gray-700 mb-2">
          Neuriax proporciona:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>Soporte técnico por correo durante 30 días post-entrega (bugs, errores críticos)</li>
          <li>Asesoramiento sobre uso e implementación del entregable</li>
          <li>Documentación técnica básica</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">No Incluido / Adicional</h4>
        <p className="text-sm text-gray-700 mb-2">
          Fuera de la garantía inicial:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li><strong>[PENDIENTE: Especificar servicios opcionales]</strong></li>
          <li>Mantenimiento de servidores, actualizaciones del sistema operativo</li>
          <li>Backups y recuperación ante desastres (si aplica)</li>
          <li>Soporte 24/7 o SLA específico</li>
          <li>Modificaciones por cambios en requisitos del negocio</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Contratación de Servicios Continuos</h4>
        <p className="text-sm text-gray-700">
          El cliente puede contratar paquetes de mantenimiento, soporte o evolución mensual/anual con términos específicos.
        </p>
      </section>

      {/* Confidencialidad */}
      <section id="confidencialidad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Confidencialidad</h2>
        <p className="text-gray-700 mb-4">
          Ambas partes acuerdan mantener confidencial toda información sensible compartida durante el proyecto, 
          incluyendo especificaciones técnicas, datos de negocio, clientes, financieros, etc.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Excepciones:</strong> Información que es públicamente disponible, o que debe ser divulgada por ley.
        </p>
        <p className="text-gray-700">
          <strong>Duración:</strong> La confidencialidad se mantiene durante la vigencia del contrato y 
          <strong> [PENDIENTE: años] años</strong> después de su término.
        </p>
      </section>

      {/* Incumplimiento */}
      <section id="incumplimiento" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Incumplimiento y Resolución</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Causas de Resolución</h4>
        <p className="text-sm text-gray-700 mb-3">
          Cualquiera de las partes puede resolver el contrato si:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>La otra parte incumple obligaciones principales y no subsana en 15 días tras aviso formal</li>
          <li>Se declara insolvencia, concurso o liquidación de cualquiera</li>
          <li>Acuerdo mutuo por escrito</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Consecuencias de Resolución</h4>
        <p className="text-sm text-gray-700">
          <strong>Pagos pendientes:</strong> El cliente debe pagar trabajo realizado hasta la fecha de resolución.
          <br/>
          <strong>Entregables parciales:</strong> Se entregarán trabajos en estado actual (no necesariamente funcional).
          <br/>
          <strong>Recuperación de costos:</strong> Neuriax puede cobrar gastos incurridos no recuperables.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Resolución por Convenio Mutuuo</h4>
        <p className="text-sm text-gray-700">
          Las partes pueden resolver en cualquier momento si acuerdan los términos de liquidación por escrito.
        </p>
      </section>

      {/* Legislación */}
      <section id="legislacion" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Legislación Aplicable y Resolución de Disputas</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Ley Aplicable</h4>
        <p className="text-sm text-gray-700 mb-3">
          Estas Condiciones Generales se rigen por la legislación española, en particular:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
          <li>Código Civil Español</li>
          <li>Ley de Servicios de la Sociedad de la Información (LSSI-CE)</li>
          <li>RGPD y LOPDGDD (si aplica protección de datos)</li>
          <li>Regulaciones aplicables a contratos electrónicos</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Resolución de Disputas</h4>
        <p className="text-sm text-gray-700 mb-3">
          <strong>Procedimiento preferido:</strong> Negociación amistosa entre partes.
        </p>
        <p className="text-sm text-gray-700 mb-3">
          <strong>Mediación:</strong> Si no se resuelve, se puede acudir a mediación conforme a normas españolas.
        </p>
        <p className="text-sm text-gray-700">
          <strong>Jurisdicción:</strong> Ambas partes se someten a la jurisdicción de los juzgados y tribunales 
          competentes en <strong>España</strong>, renunciando a cualquier otra jurisdicción.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Cláusula de Salvaguardia</h4>
        <p className="text-sm text-gray-700">
          Si alguna disposición de estas condiciones es declarada inválida, las demás disposiciones permanecen en vigor.
        </p>
      </section>

      {/* Final Notice */}
      <section className="bg-gray-100 p-6 rounded-lg mt-12">
        <h3 className="font-semibold text-gray-900 mb-3">Aceptación de Condiciones</h3>
        <p className="text-sm text-gray-700 mb-3">
          Al solicitar un presupuesto, aceptar una propuesta o firmar un contrato con Neuriax, 
          <strong> aceptas íntegramente estas Condiciones Generales</strong>.
        </p>
        <p className="text-sm text-gray-700 mb-3">
          En caso de conflicto entre estas Condiciones Generales y un contrato específico, 
          prevalecerá lo acordado en el contrato particular.
        </p>
        <p className="text-sm text-gray-700">
          <strong>Última actualización:</strong> 16 de enero de 2026. Neuriax se reserva el derecho a modificar 
          estas condiciones con aviso previo razonable.
        </p>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p>📧 <a href="mailto:mateoclaramunt2021@gmail.com" className="text-blue-600 hover:underline">mateoclaramunt2021@gmail.com</a></p>
          <p>📞 +34 640 791 041</p>
          <p>🌐 www.neuriax.com</p>
        </div>
      </section>
    </LegalLayout>
  );
}
