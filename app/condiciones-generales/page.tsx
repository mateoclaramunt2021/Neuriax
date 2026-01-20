import { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Condiciones Generales | Neuriax',
  description: 'Condiciones generales de servicio de Neuriax - TÃ©rminos contractuales para servicios de automatizaciÃ³n e IA.',
  robots: 'noindex, nofollow',
};

const toc = [
  { id: 'objeto', label: 'Objeto de las Condiciones' },
  { id: 'servicios', label: 'DescripciÃ³n de Servicios' },
  { id: 'proceso', label: 'Proceso Comercial' },
  { id: 'tarifas', label: 'Tarifas y Pagos' },
  { id: 'plazos', label: 'Plazos' },
  { id: 'propiedad', label: 'Propiedad Intelectual' },
  { id: 'entregables', label: 'Entregables y AceptaciÃ³n' },
  { id: 'responsabilidad', label: 'LimitaciÃ³n de Responsabilidad' },
  { id: 'soporte', label: 'Soporte y Mantenimiento' },
  { id: 'confidencialidad', label: 'Confidencialidad' },
  { id: 'incumplimiento', label: 'Incumplimiento y ResoluciÃ³n' },
  { id: 'legislacion', label: 'LegislaciÃ³n Aplicable' },
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
          Estas Condiciones Generales establecen los tÃ©rminos y condiciones bajo los cuales Neuriax presta sus servicios de 
          automatizaciÃ³n digital, inteligencia artificial, integraciÃ³n de sistemas, desarrollo web y consultorÃ­a tecnolÃ³gica.
        </p>
        <p className="text-gray-700">
          El cliente, al solicitar un presupuesto, aceptar una propuesta o contratar servicios, acepta Ã­ntegramente estas condiciones. 
          Se entiende que los servicios son de carÃ¡cter B2B (empresa a empresa) o B2C (empresa a consumidor).
        </p>
      </section>

      {/* Servicios */}
      <section id="servicios" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. DescripciÃ³n de Servicios</h2>
        <p className="text-gray-700 mb-4">
          Neuriax ofrece:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li><strong>AutomatizaciÃ³n digital:</strong> Procesos automatizados, RPA, workflows, integraciones sin cÃ³digo</li>
          <li><strong>Soluciones de IA:</strong> Chatbots, anÃ¡lisis de datos, predicciones, procesamiento de lenguaje natural</li>
          <li><strong>Integraciones de sistemas:</strong> APIs, webhooks, sincronizaciÃ³n de datos entre aplicaciones</li>
          <li><strong>Desarrollo web:</strong> Sitios web profesionales, landing pages, aplicaciones web</li>
          <li><strong>ConsultorÃ­a:</strong> DiagnÃ³stico de procesos, recomendaciones tecnolÃ³gicas, asesoramiento digital</li>
        </ul>
        <p className="text-gray-700 mt-4">
          <strong>Alcance especÃ­fico:</strong> Cada servicio serÃ¡ detallado en la propuesta/presupuesto aceptado. 
          Se considerarÃ¡n servicios fuera del alcance pactado como trabajos adicionales y serÃ¡n facturados por separado.
        </p>
      </section>

      {/* Proceso Comercial */}
      <section id="proceso" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Proceso Comercial EstÃ¡ndar</h2>
        <p className="text-gray-700 mb-4">
          El flujo tÃ­pico de un proyecto es el siguiente:
        </p>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900">1. Solicitud Inicial</h4>
            <p className="text-sm text-gray-700">El cliente contacta con Neuriax describiendo sus necesidades y objetivos.</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900">2. DiagnÃ³stico/AnÃ¡lisis</h4>
            <p className="text-sm text-gray-700">Neuriax analiza la situaciÃ³n actual y propone soluciones preliminares.</p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">3. Propuesta y Presupuesto</h4>
            <p className="text-sm text-gray-700">Se emite presupuesto detallado con alcance, plazos y condiciones econÃ³micas.</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900">4. AceptaciÃ³n</h4>
            <p className="text-sm text-gray-700">El cliente acepta el presupuesto (por correo, firma digital o contrato formal).</p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold text-gray-900">5. EjecuciÃ³n</h4>
            <p className="text-sm text-gray-700">Neuriax realiza el trabajo segÃºn especificaciones. Se proporcionan actualizaciones periÃ³dicas.</p>
          </div>

          <div className="border-l-4 border-pink-500 pl-4">
            <h4 className="font-semibold text-gray-900">6. Entrega y AceptaciÃ³n</h4>
            <p className="text-sm text-gray-700">Se entrega el trabajo finalizado. El cliente dispone de plazo para aceptaciÃ³n/cambios.</p>
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

        <h4 className="font-semibold text-gray-900 mb-3">Modelos de FacturaciÃ³n</h4>
        <p className="text-sm text-gray-700 mb-3">
          <strong>[PENDIENTE: Especificar modelo/s de facturaciÃ³n]</strong> Las tarifas pueden ser:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mb-4">
          <li><strong>Por proyecto (fijo):</strong> Precio Ãºnico para el proyecto completo</li>
          <li><strong>Por hora:</strong> Tarifa horaria aplicable a trabajos variables</li>
          <li><strong>Por fase/hito:</strong> Pagos escalonados segÃºn avance</li>
          <li><strong>Por resultados:</strong> Condicional a logro de objetivos especÃ­ficos</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">Condiciones de Pago</h4>
        <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-4">
          <p className="text-sm text-amber-900">
            <strong>[PENDIENTE: Especificar]</strong>
          </p>
          <ul className="list-disc ml-6 space-y-1 text-sm text-amber-900 mt-2">
            <li>DepÃ³sito inicial: [PENDIENTE: %]</li>
            <li>MÃ©todo de pago: [PENDIENTE: Transferencia/Tarjeta/Otros]</li>
            <li>Plazo de pago: [PENDIENTE: dÃ­as despuÃ©s de factura]</li>
            <li>Intereses de demora: Aplicables segÃºn Ley 3/2004</li>
          </ul>
        </div>

        <h4 className="font-semibold text-gray-900 mb-3">Impuestos y Gastos</h4>
        <p className="text-sm text-gray-700 mb-2">
          <strong>IVA:</strong> Aplicable segÃºn normativa espaÃ±ola (21% estÃ¡ndar, salvo exenciÃ³n).
        </p>
        <p className="text-sm text-gray-700">
          <strong>Gastos adicionales:</strong> Costos de terceros, licencias especiales o viajes necesarios se facturan por separado previa aceptaciÃ³n.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Cambios de Alcance y Sobrecostos</h4>
        <p className="text-sm text-gray-700">
          Si el cliente solicita cambios o trabajos adicionales fuera del alcance pactado, se emitirÃ¡ un presupuesto adicional. 
          Los sobrecostos no se aplicarÃ¡n sin consentimiento escrito previo.
        </p>
      </section>

      {/* Plazos */}
      <section id="plazos" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Plazos de EjecuciÃ³n</h2>
        <p className="text-gray-700 mb-4">
          <strong>Naturaleza orientativa:</strong> Los plazos indicados en presupuestos y propuestas son orientativos. 
          Se definen con precisiÃ³n en el contrato o acuerdo especÃ­fico.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Factores que pueden afectar plazos:</strong>
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Retrasos en respuestas o informaciÃ³n del cliente</li>
          <li>Cambios de requisitos o alcance</li>
          <li>Complejidad tÃ©cnica inesperada</li>
          <li>Dependencia de terceros (hosting, APIs, integraciones externas)</li>
          <li>Fuerza mayor o eventos imprevistos</li>
        </ul>
        <p className="text-gray-700 mt-4">
          <strong>ComunicaciÃ³n:</strong> Neuriax informarÃ¡ al cliente de cualquier desviaciÃ³n estimada en plazos lo antes posible.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Retrasos Atribuibles al Cliente</h4>
        <p className="text-sm text-gray-700">
          Si el cliente causa retrasos (informaciÃ³n incompleta, aprobaciones tardÃ­as, cambios de especificaciones), 
          los plazos se extenderÃ¡n de mutuo acuerdo.
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
          <li>MetodologÃ­as, procesos y frameworks propios</li>
          <li>LibrerÃ­as de cÃ³digo reutilizable</li>
          <li>Templates y componentes pre-desarrollados</li>
          <li>DocumentaciÃ³n general y herramientas internas</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">Entregables y Transferencia</h4>
        <p className="text-sm text-gray-700">
          <strong>[PENDIENTE: Especificar modelo de cesiÃ³n]</strong>
        </p>
        <p className="text-sm text-gray-700 mt-3">
          El cliente recibe los derechos de los entregables (cÃ³digo, diseÃ±os, contenido) segÃºn lo especificado en contrato:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mt-2">
          <li><strong>CesiÃ³n completa:</strong> El cliente propietario exclusivo tras pago final</li>
          <li><strong>Licencia de uso:</strong> Cliente usa bajo condiciones (no revender, no sublicenciar)</li>
          <li><strong>ExplotaciÃ³n conjunta:</strong> Ambas partes con derechos de uso y explotaciÃ³n</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">CrÃ©ditos y AtribuciÃ³n</h4>
        <p className="text-sm text-gray-700">
          Neuriax puede mencionar al cliente como caso de uso/referencia a menos que se acuerde lo contrario en confidencialidad.
        </p>
      </section>

      {/* Entregables y AceptaciÃ³n */}
      <section id="entregables" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Entregables y AceptaciÃ³n</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Forma de Entrega</h4>
        <p className="text-sm text-gray-700 mb-3">
          Los entregables se proporcionarÃ¡n de forma:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>Acceso a entorno online (para webs, aplicaciones)</li>
          <li>Descarga de archivos (cÃ³digo, documentos, diseÃ±os)</li>
          <li>Almacenamiento en nube (Google Drive, OneDrive, etc.)</li>
          <li>PresentaciÃ³n y handover personalizado</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">PerÃ­odo de AceptaciÃ³n</h4>
        <p className="text-sm text-gray-700 mb-2">
          El cliente tendrÃ¡ <strong>[PENDIENTE: dÃ­as]</strong> para revisar y aceptar entregables.
        </p>
        <p className="text-sm text-gray-700">
          <strong>Cambios menores:</strong> SerÃ¡n incluidos sin coste adicional si estÃ¡n dentro del alcance.
          <br/>
          <strong>Cambios mayores:</strong> Se presupuestarÃ¡n como trabajo adicional.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">AceptaciÃ³n TÃ¡cita</h4>
        <p className="text-sm text-gray-700">
          Si el cliente no reporta cambios en el perÃ­odo indicado, se considera aceptado el trabajo.
        </p>
      </section>

      {/* Responsabilidad */}
      <section id="responsabilidad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. LimitaciÃ³n de Responsabilidad</h2>

        <h4 className="font-semibold text-gray-900 mb-3">GarantÃ­as Limitadas</h4>
        <p className="text-sm text-gray-700 mb-3">
          Neuriax no garantiza:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>Disponibilidad 100% del sitio web (puede haber mantenimiento, fallos de proveedores)</li>
          <li>GeneraciÃ³n de ingresos o ventas especÃ­ficas</li>
          <li>Posicionamiento SEO (se aplican mejores prÃ¡cticas, pero Google decide rankings)</li>
          <li>Compatibilidad perfecta con todos navegadores/dispositivos antiguos</li>
          <li>Ausencia total de bugs o errores (se aplican estÃ¡ndares de calidad razonables)</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Responsabilidad MÃ¡xima</h4>
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
          <p className="text-sm text-red-900">
            La responsabilidad total de Neuriax por cualquier daÃ±o derivado del incumplimiento de estas condiciones 
            <strong> no excederÃ¡ el 50% del importe pagado</strong> por el cliente en los 12 meses previos, 
            o [PENDIENTE: cantidad mÃ­nima/mÃ¡xima].
          </p>
        </div>

        <h4 className="font-semibold text-gray-900 mb-3">ExclusiÃ³n de DaÃ±os Indirectos</h4>
        <p className="text-sm text-gray-700">
          Neuriax no es responsable de daÃ±os indirectos, incidentales, especiales o punitivos, incluyendo:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mt-2">
          <li>PÃ©rdida de ingresos o datos</li>
          <li>DaÃ±o reputacional</li>
          <li>Interrupciones de negocio</li>
          <li>Costos de sustituciÃ³n de servicios</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Excepciones</h4>
        <p className="text-sm text-gray-700">
          Esta limitaciÃ³n no se aplica a: negligencia grave, fraude, incumplimiento de obligaciones legales imperativas, 
          o daÃ±os derivados de violaciÃ³n de seguridad por culpa directa de Neuriax.
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
          <li>Soporte tÃ©cnico por correo durante 30 dÃ­as post-entrega (bugs, errores crÃ­ticos)</li>
          <li>Asesoramiento sobre uso e implementaciÃ³n del entregable</li>
          <li>DocumentaciÃ³n tÃ©cnica bÃ¡sica</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">No Incluido / Adicional</h4>
        <p className="text-sm text-gray-700 mb-2">
          Fuera de la garantÃ­a inicial:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li><strong>[PENDIENTE: Especificar servicios opcionales]</strong></li>
          <li>Mantenimiento de servidores, actualizaciones del sistema operativo</li>
          <li>Backups y recuperaciÃ³n ante desastres (si aplica)</li>
          <li>Soporte 24/7 o SLA especÃ­fico</li>
          <li>Modificaciones por cambios en requisitos del negocio</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">ContrataciÃ³n de Servicios Continuos</h4>
        <p className="text-sm text-gray-700">
          El cliente puede contratar paquetes de mantenimiento, soporte o evoluciÃ³n mensual/anual con tÃ©rminos especÃ­ficos.
        </p>
      </section>

      {/* Confidencialidad */}
      <section id="confidencialidad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Confidencialidad</h2>
        <p className="text-gray-700 mb-4">
          Ambas partes acuerdan mantener confidencial toda informaciÃ³n sensible compartida durante el proyecto, 
          incluyendo especificaciones tÃ©cnicas, datos de negocio, clientes, financieros, etc.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Excepciones:</strong> InformaciÃ³n que es pÃºblicamente disponible, o que debe ser divulgada por ley.
        </p>
        <p className="text-gray-700">
          <strong>DuraciÃ³n:</strong> La confidencialidad se mantiene durante la vigencia del contrato y 
          <strong> [PENDIENTE: aÃ±os] aÃ±os</strong> despuÃ©s de su tÃ©rmino.
        </p>
      </section>

      {/* Incumplimiento */}
      <section id="incumplimiento" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Incumplimiento y ResoluciÃ³n</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Causas de ResoluciÃ³n</h4>
        <p className="text-sm text-gray-700 mb-3">
          Cualquiera de las partes puede resolver el contrato si:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>La otra parte incumple obligaciones principales y no subsana en 15 dÃ­as tras aviso formal</li>
          <li>Se declara insolvencia, concurso o liquidaciÃ³n de cualquiera</li>
          <li>Acuerdo mutuo por escrito</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Consecuencias de ResoluciÃ³n</h4>
        <p className="text-sm text-gray-700">
          <strong>Pagos pendientes:</strong> El cliente debe pagar trabajo realizado hasta la fecha de resoluciÃ³n.
          <br/>
          <strong>Entregables parciales:</strong> Se entregarÃ¡n trabajos en estado actual (no necesariamente funcional).
          <br/>
          <strong>RecuperaciÃ³n de costos:</strong> Neuriax puede cobrar gastos incurridos no recuperables.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">ResoluciÃ³n por Convenio Mutuuo</h4>
        <p className="text-sm text-gray-700">
          Las partes pueden resolver en cualquier momento si acuerdan los tÃ©rminos de liquidaciÃ³n por escrito.
        </p>
      </section>

      {/* LegislaciÃ³n */}
      <section id="legislacion" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. LegislaciÃ³n Aplicable y ResoluciÃ³n de Disputas</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Ley Aplicable</h4>
        <p className="text-sm text-gray-700 mb-3">
          Estas Condiciones Generales se rigen por la legislaciÃ³n espaÃ±ola, en particular:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
          <li>CÃ³digo Civil EspaÃ±ol</li>
          <li>Ley de Servicios de la Sociedad de la InformaciÃ³n (LSSI-CE)</li>
          <li>RGPD y LOPDGDD (si aplica protecciÃ³n de datos)</li>
          <li>Regulaciones aplicables a contratos electrÃ³nicos</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">ResoluciÃ³n de Disputas</h4>
        <p className="text-sm text-gray-700 mb-3">
          <strong>Procedimiento preferido:</strong> NegociaciÃ³n amistosa entre partes.
        </p>
        <p className="text-sm text-gray-700 mb-3">
          <strong>MediaciÃ³n:</strong> Si no se resuelve, se puede acudir a mediaciÃ³n conforme a normas espaÃ±olas.
        </p>
        <p className="text-sm text-gray-700">
          <strong>JurisdicciÃ³n:</strong> Ambas partes se someten a la jurisdicciÃ³n de los juzgados y tribunales 
          competentes en <strong>EspaÃ±a</strong>, renunciando a cualquier otra jurisdicciÃ³n.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">ClÃ¡usula de Salvaguardia</h4>
        <p className="text-sm text-gray-700">
          Si alguna disposiciÃ³n de estas condiciones es declarada invÃ¡lida, las demÃ¡s disposiciones permanecen en vigor.
        </p>
      </section>

      {/* Final Notice */}
      <section className="bg-gray-100 p-6 rounded-lg mt-12">
        <h3 className="font-semibold text-gray-900 mb-3">AceptaciÃ³n de Condiciones</h3>
        <p className="text-sm text-gray-700 mb-3">
          Al solicitar un presupuesto, aceptar una propuesta o firmar un contrato con Neuriax, 
          <strong> aceptas Ã­ntegramente estas Condiciones Generales</strong>.
        </p>
        <p className="text-sm text-gray-700 mb-3">
          En caso de conflicto entre estas Condiciones Generales y un contrato especÃ­fico, 
          prevalecerÃ¡ lo acordado en el contrato particular.
        </p>
        <p className="text-sm text-gray-700">
          <strong>Ãšltima actualizaciÃ³n:</strong> 16 de enero de 2026. Neuriax se reserva el derecho a modificar 
          estas condiciones con aviso previo razonable.
        </p>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p>ðŸ“§ <a href="mailto:neuriaxx@gmail.com" className="text-blue-600 hover:underline">neuriaxx@gmail.com</a></p>
          <p>ðŸ“ž +34 640 791 041</p>
          <p>ðŸŒ www.neuriax.com</p>
        </div>
      </section>
    </LegalLayout>
  );
}

