import { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Condiciones Generales | Neuriax',
  description: 'Condiciones generales de servicio de Neuriax - Té©rminos contractuales para servicios de automatizacié³n e IA.',
  robots: 'noindex, nofollow',
};

const toc = [
  { id: 'objeto', label: 'Objeto de las Condiciones' },
  { id: 'servicios', label: 'Descripcié³n de Servicios' },
  { id: 'proceso', label: 'Proceso Comercial' },
  { id: 'tarifas', label: 'Tarifas y Pagos' },
  { id: 'plazos', label: 'Plazos' },
  { id: 'propiedad', label: 'Propiedad Intelectual' },
  { id: 'Entregables', label: 'Entregables y Aceptacié³n' },
  { id: 'responsabilidad', label: 'Limitacié³n de Responsabilidad' },
  { id: 'soporte', label: 'Soporte y Mantenimiento' },
  { id: 'confidencialidad', label: 'Confidencialidad' },
  { id: 'incumplimiento', label: 'Incumplimiento y Resolucié³n' },
  { id: 'legislacion', label: 'Legislacié³n Aplicable' },
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
          Estas Condiciones Generales establecen los té©rminos y condiciones bajo los cuales Neuriax presta sus servicios de 
          automatizacié³n digital, inteligencia artificial, integracié³n de sistemas, desarrollo web y consultoré­a tecnolé³gica.
        </p>
        <p className="text-gray-700">
          El cliente, al solicitar un presupuesto, aceptar una propuesta o contratar servicios, acepta é­ntegramente estas condiciones. 
          Se entiende que los servicios son de caré¡cter B2B (empresa a empresa) o B2C (empresa a consumidor).
        </p>
      </section>

      {/* Servicios */}
      <section id="servicios" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descripcié³n de Servicios</h2>
        <p className="text-gray-700 mb-4">
          Neuriax ofrece:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li><strong>Automatizacié³n digital:</strong> Procesos automatizados, RPA, workflows, integraciones sin cé³digo</li>
          <li><strong>Soluciones de IA:</strong> Chatbots, análisis de datos, predicciones, procesamiento de lenguaje natural</li>
          <li><strong>Integraciones de sistemas:</strong> APIs, webhooks, sincronizaciéƒa³n de datos entre aplicaciones</li>
          <li><strong>Desarrollo web:</strong> Sitios web profesionales, landing pages, aplicaciones web</li>
          <li><strong>Consultoré­a:</strong> Diagné³stico de procesos, recomendaciones tecnoléƒa³gicas, asesoramiento digital</li>
        </ul>
        <p className="text-gray-700 mt-4">
          <strong>Alcance especéƒa­fico:</strong> Cada servicio seré¡ detallado en la propuesta/presupuesto aceptado. 
          Se consideraré¡n servicios fuera del alcance pactado como trabajos adicionales y seré¡n facturados por separado.
        </p>
      </section>

      {/* Proceso Comercial */}
      <section id="proceso" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Proceso Comercial Esté¡ndar</h2>
        <p className="text-gray-700 mb-4">
          El flujo téƒa­pico de un proyecto es el siguiente:
        </p>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900">1. Solicitud Inicial</h4>
            <p className="text-sm text-gray-700">El cliente contacta con Neuriax describiendo sus necesidades y objetivos.</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900">2. Diagné³stico/análisis</h4>
            <p className="text-sm text-gray-700">Neuriax analiza la situaciéƒa³n actual y propone soluciones preliminares.</p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">3. Propuesta y Presupuesto</h4>
            <p className="text-sm text-gray-700">Se emite presupuesto detallado con alcance, plazos y condiciones econéƒa³micas.</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900">4. Aceptacié³n</h4>
            <p className="text-sm text-gray-700">El cliente acepta el presupuesto (por correo, firma digital o contrato formal).</p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold text-gray-900">5. Ejecucié³n</h4>
            <p className="text-sm text-gray-700">Neuriax realiza el trabajo segéºn especificaciones. Se proporcionan actualizaciones periéƒa³dicas.</p>
          </div>

          <div className="border-l-4 border-pink-500 pl-4">
            <h4 className="font-semibold text-gray-900">6. Entrega y Aceptacié³n</h4>
            <p className="text-sm text-gray-700">Se Entrega el trabajo finalizado. El cliente dispone de plazo para aceptacié³n/cambios.</p>
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

        <h4 className="font-semibold text-gray-900 mb-3">Modelos de Facturacié³n</h4>
        <p className="text-sm text-gray-700 mb-3">
          <strong>[PENDIENTE: Especificar modelo/s de facturacié³n]</strong> Las tarifas pueden ser:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mb-4">
          <li><strong>Por proyecto (fijo):</strong> Precio éºnico para el proyecto completo</li>
          <li><strong>Por hora:</strong> Tarifa horaria aplicable a trabajos variables</li>
          <li><strong>Por fase/hito:</strong> Pagos escalonados segéºn avance</li>
          <li><strong>Por resultados:</strong> Condicional a logro de objetivos especéƒa­ficos</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">Condiciones de Pago</h4>
        <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-4">
          <p className="text-sm text-amber-900">
            <strong>[PENDIENTE: Especificar]</strong>
          </p>
          <ul className="list-disc ml-6 space-y-1 text-sm text-amber-900 mt-2">
            <li>Depéƒa³sito inicial: [PENDIENTE: %]</li>
            <li>Méƒa©todo de pago: [PENDIENTE: Transferencia/Tarjeta/Otros]</li>
            <li>Plazo de pago: [PENDIENTE: dé­as despué©s de factura]</li>
            <li>Intereses de demora: Aplicables segéºn Ley 3/2004</li>
          </ul>
        </div>

        <h4 className="font-semibold text-gray-900 mb-3">Impuestos y Gastos</h4>
        <p className="text-sm text-gray-700 mb-2">
          <strong>IVA:</strong> Aplicable segéºn normativa espaé±ola (21% esté¡ndar, salvo exenciéƒa³n).
        </p>
        <p className="text-sm text-gray-700">
          <strong>Gastos adicionales:</strong> Costos de terceros, licencias especiales o viajes necesarios se facturan por separado previa aceptacié³n.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Cambios de Alcance y Sobrecostos</h4>
        <p className="text-sm text-gray-700">
          Si el cliente solicita cambios o trabajos adicionales fuera del alcance pactado, se emitirá un presupuesto adicional. 
          Los sobrecostos no se aplicarán sin consentimiento escrito previo.
        </p>
      </section>

      {/* Plazos */}
      <section id="plazos" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Plazos de Ejecucié³n</h2>
        <p className="text-gray-700 mb-4">
          <strong>Naturaleza orientativa:</strong> Los plazos indicados en presupuestos y propuestas son orientativos. 
          Se definen con precisiéƒa³n en el contrato o acuerdo especéƒa­fico.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Factores que pueden afectar plazos:</strong>
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Retrasos en respuestas o informaciéƒa³n del cliente</li>
          <li>Cambios de requisitos o alcance</li>
          <li>Complejidad té©cnica inesperada</li>
          <li>Dependencia de terceros (hosting, APIs, integraciones externas)</li>
          <li>Fuerza mayor o eventos imprevistos</li>
        </ul>
        <p className="text-gray-700 mt-4">
          <strong>Comunicaciéƒa³n:</strong> Neuriax informará al cliente de cualquier desviaciéƒa³n estimada en plazos lo antes posible.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Retrasos Atribuibles al Cliente</h4>
        <p className="text-sm text-gray-700">
          Si el cliente causa retrasos (informaciéƒa³n incompleta, aprobaciones tardé­as, cambios de especificaciones), 
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
          <li>Metodologéƒa­as, procesos y frameworks propios</li>
          <li>Libreréƒa­as de cé³digo reutilizable</li>
          <li>Templates y componentes pre-desarrollados</li>
          <li>Documentaciéƒa³n general y herramientas internas</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3">Entregables y Transferencia</h4>
        <p className="text-sm text-gray-700">
          <strong>[PENDIENTE: Especificar modelo de cesiéƒa³n]</strong>
        </p>
        <p className="text-sm text-gray-700 mt-3">
          El cliente recibe los derechos de los Entregables (cé³digo, diseé±os, contenido) segéºn lo especificado en contrato:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mt-2">
          <li><strong>Cesiéƒa³n completa:</strong> El cliente propietario exclusivo tras pago final</li>
          <li><strong>Licencia de uso:</strong> Cliente usa bajo condiciones (no revender, no sublicenciar)</li>
          <li><strong>Explotaciéƒa³n conjunta:</strong> Ambas partes con derechos de uso y explotaciéƒa³n</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Créƒa©ditos y Atribuciéƒa³n</h4>
        <p className="text-sm text-gray-700">
          Neuriax puede mencionar al cliente como caso de uso/referencia a menos que se acuerde lo contrario en confidencialidad.
        </p>
      </section>

      {/* Entregables y Aceptacié³n */}
      <section id="Entregables" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Entregables y Aceptacié³n</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Forma de Entrega</h4>
        <p className="text-sm text-gray-700 mb-3">
          Los Entregables se proporcionaréƒa¡n de forma:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>Acceso a entorno online (para webs, aplicaciones)</li>
          <li>Descarga de archivos (cé³digo, documentos, diseé±os)</li>
          <li>Almacenamiento en nube (Google Drive, OneDrive, etc.)</li>
          <li>Presentaciéƒa³n y handover personalizado</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Peréƒa­odo de Aceptacié³n</h4>
        <p className="text-sm text-gray-700 mb-2">
          El cliente tendréƒa¡ <strong>[PENDIENTE: dé­as]</strong> para revisar y aceptar Entregables.
        </p>
        <p className="text-sm text-gray-700">
          <strong>Cambios menores:</strong> Seréƒa¡n incluidos sin coste adicional si estéƒa¡n dentro del alcance.
          <br/>
          <strong>Cambios mayores:</strong> Se presupuestaréƒa¡n como trabajo adicional.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Aceptacié³n Téƒa¡cita</h4>
        <p className="text-sm text-gray-700">
          Si el cliente no reporta cambios en el peréƒa­odo indicado, se considera aceptado el trabajo.
        </p>
      </section>

      {/* Responsabilidad */}
      <section id="responsabilidad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitacié³n de Responsabilidad</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Garantéƒa­as Limitadas</h4>
        <p className="text-sm text-gray-700 mb-3">
          Neuriax no garantiza:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>Disponibilidad 100% del sitio web (puede haber mantenimiento, fallos de proveedores)</li>
          <li>Generaciéƒa³n de ingresos o ventas especéƒa­ficas</li>
          <li>Posicionamiento SEO (se aplican mejores préƒa¡cticas, pero Google decide rankings)</li>
          <li>Compatibilidad perfecta con todos navegadores/dispositivos antiguos</li>
          <li>Ausencia total de bugs o errores (se aplican esté¡ndares de calidad razonables)</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Responsabilidad Méƒa¡xima</h4>
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
          <p className="text-sm text-red-900">
            La responsabilidad total de Neuriax por cualquier daé±o derivado del incumplimiento de estas condiciones 
            <strong> no excederéƒa¡ el 50% del importe pagado</strong> por el cliente en los 12 meses previos, 
            o [PENDIENTE: cantidad méƒa­nima/méƒa¡xima].
          </p>
        </div>

        <h4 className="font-semibold text-gray-900 mb-3">Exclusiéƒa³n de Daé±os Indirectos</h4>
        <p className="text-sm text-gray-700">
          Neuriax no es responsable de daé±os indirectos, incidentales, especiales o punitivos, incluyendo:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700 mt-2">
          <li>Péƒa©rdida de ingresos o datos</li>
          <li>Daé±o reputacional</li>
          <li>Interrupciones de negocio</li>
          <li>Costos de sustituciéƒa³n de servicios</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Excepciones</h4>
        <p className="text-sm text-gray-700">
          Esta limitacié³n no se aplica a: negligencia grave, fraude, incumplimiento de obligaciones legales imperativas, 
          o daé±os derivados de violaciéƒa³n de seguridad por culpa directa de Neuriax.
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
          <li>Soporte téƒa©cnico por correo durante 30 dé­as post-Entrega (bugs, errores créƒa­ticos)</li>
          <li>Asesoramiento sobre uso e implementaciéƒa³n del Entregable</li>
          <li>Documentaciéƒa³n té©cnica béƒa¡sica</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">No Incluido / Adicional</h4>
        <p className="text-sm text-gray-700 mb-2">
          Fuera de la garantéƒa­a inicial:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li><strong>[PENDIENTE: Especificar servicios opcionales]</strong></li>
          <li>Mantenimiento de servidores, actualizaciones del sistema operativo</li>
          <li>Backups y recuperaciéƒa³n ante desastres (si aplica)</li>
          <li>Soporte 24/7 o SLA especéƒa­fico</li>
          <li>Modificaciones por cambios en requisitos del negocio</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Contrataciéƒa³n de Servicios Continuos</h4>
        <p className="text-sm text-gray-700">
          El cliente puede contratar paquetes de mantenimiento, soporte o evoluciéƒa³n mensual/anual con té©rminos especéƒa­ficos.
        </p>
      </section>

      {/* Confidencialidad */}
      <section id="confidencialidad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Confidencialidad</h2>
        <p className="text-gray-700 mb-4">
          Ambas partes acuerdan mantener confidencial toda informaciéƒa³n sensible compartida durante el proyecto, 
          incluyendo especificaciones té©cnicas, datos de negocio, clientes, financieros, etc.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Excepciones:</strong> Informaciéƒa³n que es péƒaºblicamente disponible, o que debe ser divulgada por ley.
        </p>
        <p className="text-gray-700">
          <strong>Duraciéƒa³n:</strong> La confidencialidad se mantiene durante la vigencia del contrato y 
          <strong> [PENDIENTE: aé±os] aé±os</strong> despué©s de su téƒa©rmino.
        </p>
      </section>

      {/* Incumplimiento */}
      <section id="incumplimiento" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Incumplimiento y Resolucié³n</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Causas de Resolucié³n</h4>
        <p className="text-sm text-gray-700 mb-3">
          Cualquiera de las partes puede resolver el contrato si:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-sm text-gray-700">
          <li>La otra parte incumple obligaciones principales y no subsana en 15 dé­as tras aviso formal</li>
          <li>Se declara insolvencia, concurso o liquidaciéƒa³n de cualquiera</li>
          <li>Acuerdo mutuo por escrito</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Consecuencias de Resolucié³n</h4>
        <p className="text-sm text-gray-700">
          <strong>Pagos pendientes:</strong> El cliente debe pagar trabajo realizado hasta la fecha de resolucié³n.
          <br/>
          <strong>Entregables parciales:</strong> Se Entregaréƒa¡n trabajos en estado actual (no necesariamente funcional).
          <br/>
          <strong>Recuperaciéƒa³n de costos:</strong> Neuriax puede cobrar gastos incurridos no recuperables.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Resolucié³n por Convenio Mutuuo</h4>
        <p className="text-sm text-gray-700">
          Las partes pueden resolver en cualquier momento si acuerdan los té©rminos de liquidaciéƒa³n por escrito.
        </p>
      </section>

      {/* Legislacié³n */}
      <section id="legislacion" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Legislacié³n Aplicable y Resolucié³n de Disputas</h2>

        <h4 className="font-semibold text-gray-900 mb-3">Ley Aplicable</h4>
        <p className="text-sm text-gray-700 mb-3">
          Estas Condiciones Generales se rigen por la legislacié³n espaé±ola, en particular:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
          <li>Cé³digo Civil Espaé±ol</li>
          <li>Ley de Servicios de la Sociedad de la Informaciéƒa³n (LSSI-CE)</li>
          <li>RGPD y LOPDGDD (si aplica protecciéƒa³n de datos)</li>
          <li>Regulaciones aplicables a contratos electré³nicos</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Resolucié³n de Disputas</h4>
        <p className="text-sm text-gray-700 mb-3">
          <strong>Procedimiento preferido:</strong> Negociaciéƒa³n amistosa entre partes.
        </p>
        <p className="text-sm text-gray-700 mb-3">
          <strong>Mediaciéƒa³n:</strong> Si no se resuelve, se puede acudir a mediaciéƒa³n conforme a normas espaé±olas.
        </p>
        <p className="text-sm text-gray-700">
          <strong>Jurisdicciéƒa³n:</strong> Ambas partes se someten a la jurisdicciéƒa³n de los juzgados y tribunales 
          competentes en <strong>Espaé±a</strong>, renunciando a cualquier otra jurisdicciéƒa³n.
        </p>

        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Cléƒa¡usula de Salvaguardia</h4>
        <p className="text-sm text-gray-700">
          Si alguna disposiciéƒa³n de estas condiciones es declarada invéƒa¡lida, las deméƒa¡s disposiciones permanecen en vigor.
        </p>
      </section>

      {/* Final Notice */}
      <section className="bg-gray-100 p-6 rounded-lg mt-12">
        <h3 className="font-semibold text-gray-900 mb-3">Aceptacié³n de Condiciones</h3>
        <p className="text-sm text-gray-700 mb-3">
          Al solicitar un presupuesto, aceptar una propuesta o firmar un contrato con Neuriax, 
          <strong> aceptas éƒa­ntegramente estas Condiciones Generales</strong>.
        </p>
        <p className="text-sm text-gray-700 mb-3">
          En caso de conflicto entre estas Condiciones Generales y un contrato especéƒa­fico, 
          prevaleceréƒa¡ lo acordado en el contrato particular.
        </p>
        <p className="text-sm text-gray-700">
          <strong>éƒÅ¡ltima actualizaciéƒa³n:</strong> 16 de enero de 2026. Neuriax se reserva el derecho a modificar 
          estas condiciones con aviso previo razonable.
        </p>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p>é°Å¸a€œa§ <a href="mailto:neuriaxx@gmail.com" className="text-blue-600 hover:underline">neuriaxx@gmail.com</a></p>
          <p>é°Å¸a€œÅ¾ +34 640 791 041</p>
          <p>é°Å¸Å’a www.neuriax.com</p>
        </div>
      </section>
    </LegalLayout>
  );
}


