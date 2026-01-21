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
  { id: 'Entregables', label: 'Entregables y Aceptación' },
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
          El cliente, al solicitar un presupuesto, aceptar una propuesta o contratar servicios, acepta é©Â­ntegramente estas condiciones. 
          Se entiende que los servicios son de caré©Â¡cter B2B (empresa a empresa) o B2C (empresa a consumidor).
        </p>
      </section>

      {/* Servicios */}
      <section id="servicios" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descripcié©Â³n de Servicios</h2>
        <p className="text-gray-700 mb-4">
          Neuriax ofrece:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li><strong>Automatizacié©Â³n digital:</strong> Procesos automatizados, RPA, workflows, integraciones sin cé©Â³digo</li>
          <li><strong>Soluciones de IA:</strong> Chatbots, análisis de datos, predicciones, procesamiento de lenguaje natural</li>
          <li><strong>Integraciones de sistemas:</strong> APIs, webhooks, sincronizacié©Æ’aÂ³n de datos entre aplicaciones</li>
          <li><strong>Desarrollo web:</strong> Sitios web profesionales, landing pages, aplicaciones web</li>
          <li><strong>Consultoré©Â­a:</strong> Diagné©Â³stico de procesos, recomendaciones tecnolé©Æ’aÂ³gicas, asesoramiento digital</li>
        </ul>
        <p className="text-gray-700 mt-4">
          <strong>Alcance especé©Æ’aÂ­fico:</strong> Cada servicio seré©Â¡ detallado en la propuesta/presupuesto aceptado. 
          Se consideraré©Â¡n servicios fuera del alcance pactado como trabajos adicionales y seré©Â¡n facturados por separado.
        </p>
      </section>

      {/* Proceso Comercial */}
      <section id="proceso" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Proceso Comercial Esté©Â¡ndar</h2>
        <p className="text-gray-700 mb-4">
          El flujo té©Æ’aÂ­pico de un proyecto es el siguiente:
        </p>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900">1. Solicitud Inicial</h4>
            <p className="text-sm text-gray-700">El cliente contacta con Neuriax describiendo sus necesidades y objetivos.</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900">2. Diagné©Â³stico/análisis</h4>
            <p className="text-sm text-gray-700">Neuriax analiza la situacié©Æ’aÂ³n actual y propone soluciones preliminares.</p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">3. Propuesta y Presupuesto</h4>
            <p className="text-sm text-gray-700">Se emite presupuesto detallado con alcance, plazos y condiciones econé©Æ’aÂ³micas.</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900">4. Aceptacié©Â³n</h4>
            <p className="text-sm text-gray-700">El cliente acepta el presupuesto (por correo, firma digital o contrato formal).</p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold text-gray-900">5. Ejecucié©Â³n</h4>
            <p className="text-sm text-gray-700">Neuriax realiza el trabajo segé©Âºn especificaciones. Se proporcionan actualizaciones perié©Æ’aÂ³dicas.</p>
          </div>

          <div className="border-l-4 border-pink-500 pl-4">
            <h4 className="font-semibold text-gray-900">6. Entrega y Aceptacié©Â³n</h4>
            <p className="text-sm text-gray-700">Se Entrega el trabajo finalizado. El cliente dispone de plazo para aceptacié©Â³n/cambios.</p>
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

        <h4 className="font-semibold text-gray-900 mb-3">Modelos de Facturacié©Â³n</h4>
        <p className="text-sm text-gray-700 mb-3">
          <strong>[PENDIENTE: Especificar modelo/s de facturacié©Â³n]</strong> Las tarifas pueden ser:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mb-4">
          <li><strong>Por proyecto (fijo):</strong> Precio é©Âºnico para el proyecto completo</li>
          <li><strong>Por hora:</strong> Tarifa horaria aplicable a trabajos variables</li>
          <li><strong>Por fase/hito:</strong> Pagos escalonados segé©Âºn avance</li>
          <li><strong>Por resultados:</strong> Condicional a logro de objetivos especé©Æ’aÂ­ficos</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">Condiciones de Pago</h4>
        <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-4">
          <p className="text-sm text-amber-900">
            <strong>[PENDIENTE: Especificar]</strong>
          </p>
          <ul className="list-disc ml-6 space-y-1 text-sm text-amber-900 mt-2">
            <li>Depé©Æ’aÂ³sito inicial: [PENDIENTE: %]</li>
            <li>Mé©Æ’aÂ©todo de pago: [PENDIENTE: Transferencia/Tarjeta/Otros]</li>
            <li>Plazo de pago: [PENDIENTE: dé©Â­as despué©Â©s de factura]</li>
            <li>Intereses de demora: Aplicables segé©Âºn Ley 3/2004</li>
          </ul>
        </div>

        <h4 className="font-semibold text-gray-900 mb-3">Impuestos y Gastos</h4>
        <p className="text-sm text-gray-700 mb-2">
          <strong>IVA:</strong> Aplicable segé©Âºn normativa espaé©Â±ola (21% esté©Â¡ndar, salvo exencié©Æ’aÂ³n).
        </p>
        <p className="text-sm text-gray-700">
          <strong>Gastos adicionales:</strong> Costos de terceros, licencias especiales o viajes necesarios se facturan por separado previa aceptacié©Â³n.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Cambios de Alcance y Sobrecostos</h4>
        <p className="text-sm text-gray-700">
          Si el cliente solicita cambios o trabajos adicionales fuera del alcance pactado, se emitirá un presupuesto adicional. 
          Los sobrecostos no se aplicarán sin consentimiento escrito previo.
        </p>
      </section>

      {/* Plazos */}
      <section id="plazos" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Plazos de Ejecucié©Â³n</h2>
        <p className="text-gray-700 mb-4">
          <strong>Naturaleza orientativa:</strong> Los plazos indicados en presupuestos y propuestas son orientativos. 
          Se definen con precisié©Æ’aÂ³n en el contrato o acuerdo especé©Æ’aÂ­fico.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Factores que pueden afectar plazos:</strong>
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Retrasos en respuestas o informacié©Æ’aÂ³n del cliente</li>
          <li>Cambios de requisitos o alcance</li>
          <li>Complejidad té©Â©cnica inesperada</li>
          <li>Dependencia de terceros (hosting, APIs, integraciones externas)</li>
          <li>Fuerza mayor o eventos imprevistos</li>
        </ul>
        <p className="text-gray-700 mt-4">
          <strong>Comunicacié©Æ’aÂ³n:</strong> Neuriax informará al cliente de cualquier desviacié©Æ’aÂ³n estimada en plazos lo antes posible.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Retrasos Atribuibles al Cliente</h4>
        <p className="text-sm text-gray-700">
          Si el cliente causa retrasos (informacié©Æ’aÂ³n incompleta, aprobaciones tardé©Â­as, cambios de especificaciones), 
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
          <li>Metodologé©Æ’aÂ­as, procesos y frameworks propios</li>
          <li>Libreré©Æ’aÂ­as de cé©Â³digo reutilizable</li>
          <li>Templates y componentes pre-desarrollados</li>
          <li>Documentacié©Æ’aÂ³n general y herramientas internas</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">Entregables y Transferencia</h4>
        <p className="text-sm text-gray-700">
          <strong>[PENDIENTE: Especificar modelo de cesié©Æ’aÂ³n]</strong>
        </p>
        <p className="text-sm text-gray-700 mt-3">
          El cliente recibe los derechos de los Entregables (cé©Â³digo, diseé©Â±os, contenido) segé©Âºn lo especificado en contrato:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mt-2">
          <li><strong>Cesié©Æ’aÂ³n completa:</strong> El cliente propietario exclusivo tras pago final</li>
          <li><strong>Licencia de uso:</strong> Cliente usa bajo condiciones (no revender, no sublicenciar)</li>
          <li><strong>Explotacié©Æ’aÂ³n conjunta:</strong> Ambas partes con derechos de uso y explotacié©Æ’aÂ³n</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Cré©Æ’aÂ©ditos y Atribucié©Æ’aÂ³n</h4>
        <p className="text-sm text-gray-700">
          Neuriax puede mencionar al cliente como caso de uso/referencia a menos que se acuerde lo contrario en confidencialidad.
        </p>
      </section>

      {/* Entregables y Aceptacié©Â³n */}
      <section id="Entregables" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Entregables y Aceptacié©Â³n</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Forma de Entrega</h4>
        <p className="text-sm text-gray-700 mb-3">
          Los Entregables se proporcionaré©Æ’aÂ¡n de forma:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>Acceso a entorno online (para webs, aplicaciones)</li>
          <li>Descarga de archivos (cé©Â³digo, documentos, diseé©Â±os)</li>
          <li>Almacenamiento en nube (Google Drive, OneDrive, etc.)</li>
          <li>Presentacié©Æ’aÂ³n y handover personalizado</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Peré©Æ’aÂ­odo de Aceptacié©Â³n</h4>
        <p className="text-sm text-gray-700 mb-2">
          El cliente tendré©Æ’aÂ¡ <strong>[PENDIENTE: dé©Â­as]</strong> para revisar y aceptar Entregables.
        </p>
        <p className="text-sm text-gray-700">
          <strong>Cambios menores:</strong> Seré©Æ’aÂ¡n incluidos sin coste adicional si esté©Æ’aÂ¡n dentro del alcance.
          <br/>
          <strong>Cambios mayores:</strong> Se presupuestaré©Æ’aÂ¡n como trabajo adicional.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Aceptacié©Â³n Té©Æ’aÂ¡cita</h4>
        <p className="text-sm text-gray-700">
          Si el cliente no reporta cambios en el peré©Æ’aÂ­odo indicado, se considera aceptado el trabajo.
        </p>
      </section>

      {/* Responsabilidad */}
      <section id="responsabilidad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitacié©Â³n de Responsabilidad</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Garanté©Æ’aÂ­as Limitadas</h4>
        <p className="text-sm text-gray-700 mb-3">
          Neuriax no garantiza:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>Disponibilidad 100% del sitio web (puede haber mantenimiento, fallos de proveedores)</li>
          <li>Generacié©Æ’aÂ³n de ingresos o ventas especé©Æ’aÂ­ficas</li>
          <li>Posicionamiento SEO (se aplican mejores pré©Æ’aÂ¡cticas, pero Google decide rankings)</li>
          <li>Compatibilidad perfecta con todos navegadores/dispositivos antiguos</li>
          <li>Ausencia total de bugs o errores (se aplican esté©Â¡ndares de calidad razonables)</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Responsabilidad Mé©Æ’aÂ¡xima</h4>
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
          <p className="text-sm text-red-900">
            La responsabilidad total de Neuriax por cualquier daé©Â±o derivado del incumplimiento de estas condiciones 
            <strong> no excederé©Æ’aÂ¡ el 50% del importe pagado</strong> por el cliente en los 12 meses previos, 
            o [PENDIENTE: cantidad mé©Æ’aÂ­nima/mé©Æ’aÂ¡xima].
          </p>
        </div>

        <h4 className="font-semibold text-gray-900 mb-3">Exclusié©Æ’aÂ³n de Daé©Â±os Indirectos</h4>
        <p className="text-sm text-gray-700">
          Neuriax no es responsable de daé©Â±os indirectos, incidentales, especiales o punitivos, incluyendo:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mt-2">
          <li>Pé©Æ’aÂ©rdida de ingresos o datos</li>
          <li>Daé©Â±o reputacional</li>
          <li>Interrupciones de negocio</li>
          <li>Costos de sustitucié©Æ’aÂ³n de servicios</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Excepciones</h4>
        <p className="text-sm text-gray-700">
          Esta limitacié©Â³n no se aplica a: negligencia grave, fraude, incumplimiento de obligaciones legales imperativas, 
          o daé©Â±os derivados de violacié©Æ’aÂ³n de seguridad por culpa directa de Neuriax.
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
          <li>Soporte té©Æ’aÂ©cnico por correo durante 30 dé©Â­as post-Entrega (bugs, errores cré©Æ’aÂ­ticos)</li>
          <li>Asesoramiento sobre uso e implementacié©Æ’aÂ³n del Entregable</li>
          <li>Documentacié©Æ’aÂ³n té©Â©cnica bé©Æ’aÂ¡sica</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">No Incluido / Adicional</h4>
        <p className="text-sm text-gray-700 mb-2">
          Fuera de la garanté©Æ’aÂ­a inicial:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li><strong>[PENDIENTE: Especificar servicios opcionales]</strong></li>
          <li>Mantenimiento de servidores, actualizaciones del sistema operativo</li>
          <li>Backups y recuperacié©Æ’aÂ³n ante desastres (si aplica)</li>
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
          Ambas partes acuerdan mantener confidencial toda informacié©Æ’aÂ³n sensible compartida durante el proyecto, 
          incluyendo especificaciones té©Â©cnicas, datos de negocio, clientes, financieros, etc.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Excepciones:</strong> Informacié©Æ’aÂ³n que es pé©Æ’aÂºblicamente disponible, o que debe ser divulgada por ley.
        </p>
        <p className="text-gray-700">
          <strong>Duracié©Æ’aÂ³n:</strong> La confidencialidad se mantiene durante la vigencia del contrato y 
          <strong> [PENDIENTE: aé©Â±os] aé©Â±os</strong> despué©Â©s de su té©Æ’aÂ©rmino.
        </p>
      </section>

      {/* Incumplimiento */}
      <section id="incumplimiento" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Incumplimiento y Resolucié©Â³n</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Causas de Resolucié©Â³n</h4>
        <p className="text-sm text-gray-700 mb-3">
          Cualquiera de las partes puede resolver el contrato si:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>La otra parte incumple obligaciones principales y no subsana en 15 dé©Â­as tras aviso formal</li>
          <li>Se declara insolvencia, concurso o liquidacié©Æ’aÂ³n de cualquiera</li>
          <li>Acuerdo mutuo por escrito</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Consecuencias de Resolucié©Â³n</h4>
        <p className="text-sm text-gray-700">
          <strong>Pagos pendientes:</strong> El cliente debe pagar trabajo realizado hasta la fecha de resolucié©Â³n.
          <br/>
          <strong>Entregables parciales:</strong> Se Entregaré©Æ’aÂ¡n trabajos en estado actual (no necesariamente funcional).
          <br/>
          <strong>Recuperacié©Æ’aÂ³n de costos:</strong> Neuriax puede cobrar gastos incurridos no recuperables.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Resolucié©Â³n por Convenio Mutuuo</h4>
        <p className="text-sm text-gray-700">
          Las partes pueden resolver en cualquier momento si acuerdan los té©Â©rminos de liquidacié©Æ’aÂ³n por escrito.
        </p>
      </section>

      {/* Legislacié©Â³n */}
      <section id="legislacion" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Legislacié©Â³n Aplicable y Resolucié©Â³n de Disputas</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Ley Aplicable</h4>
        <p className="text-sm text-gray-700 mb-3">
          Estas Condiciones Generales se rigen por la legislacié©Â³n espaé©Â±ola, en particular:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
          <li>Cé©Â³digo Civil Espaé©Â±ol</li>
          <li>Ley de Servicios de la Sociedad de la Informacié©Æ’aÂ³n (LSSI-CE)</li>
          <li>RGPD y LOPDGDD (si aplica proteccié©Æ’aÂ³n de datos)</li>
          <li>Regulaciones aplicables a contratos electré©Â³nicos</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Resolucié©Â³n de Disputas</h4>
        <p className="text-sm text-gray-700 mb-3">
          <strong>Procedimiento preferido:</strong> Negociacié©Æ’aÂ³n amistosa entre partes.
        </p>
        <p className="text-sm text-gray-700 mb-3">
          <strong>Mediacié©Æ’aÂ³n:</strong> Si no se resuelve, se puede acudir a mediacié©Æ’aÂ³n conforme a normas espaé©Â±olas.
        </p>
        <p className="text-sm text-gray-700">
          <strong>Jurisdiccié©Æ’aÂ³n:</strong> Ambas partes se someten a la jurisdiccié©Æ’aÂ³n de los juzgados y tribunales 
          competentes en <strong>Espaé©Â±a</strong>, renunciando a cualquier otra jurisdiccié©Æ’aÂ³n.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Clé©Æ’aÂ¡usula de Salvaguardia</h4>
        <p className="text-sm text-gray-700">
          Si alguna disposicié©Æ’aÂ³n de estas condiciones es declarada invé©Æ’aÂ¡lida, las demé©Æ’aÂ¡s disposiciones permanecen en vigor.
        </p>
      </section>

      {/* Final Notice */}
      <section className="bg-gray-100 p-6 rounded-lg mt-12">
        <h3 className="font-semibold text-gray-900 mb-3">Aceptacié©Â³n de Condiciones</h3>
        <p className="text-sm text-gray-700 mb-3">
          Al solicitar un presupuesto, aceptar una propuesta o firmar un contrato con Neuriax, 
          <strong> aceptas é©Æ’aÂ­ntegramente estas Condiciones Generales</strong>.
        </p>
        <p className="text-sm text-gray-700 mb-3">
          En caso de conflicto entre estas Condiciones Generales y un contrato especé©Æ’aÂ­fico, 
          prevaleceré©Æ’aÂ¡ lo acordado en el contrato particular.
        </p>
        <p className="text-sm text-gray-700">
          <strong>é©Æ’é…Â¡ltima actualizacié©Æ’aÂ³n:</strong> 16 de enero de 2026. Neuriax se reserva el derecho a modificar 
          estas condiciones con aviso previo razonable.
        </p>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p>é©Â°é…Â¸aâ‚¬Å“aÂ§ <a href="mailto:neuriaxx@gmail.com" className="text-blue-600 hover:underline">neuriaxx@gmail.com</a></p>
          <p>é©Â°é…Â¸aâ‚¬Å“é…Â¾ +34 640 791 041</p>
          <p>é©Â°é…Â¸é…â™aÂ www.neuriax.com</p>
        </div>
      </section>
    </LegalLayout>
  );
}


