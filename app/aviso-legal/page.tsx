import { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Aviso Legal | Neuriax',
  description: 'Aviso legal de Neuriax - Información sobre el titular, objeto del sitio y condiciones de uso.',
  robots: 'noindex, nofollow',
};

const toc = [
  { id: 'titular', label: 'Titular del Sitio Web' },
  { id: 'objeto', label: 'Objeto del Sitio' },
  { id: 'condiciones', label: 'Condiciones de Uso' },
  { id: 'propiedad', label: 'Propiedad Intelectual' },
  { id: 'responsabilidad', label: 'Limitación de Responsabilidad' },
  { id: 'enlaces', label: 'Política de Enlaces' },
  { id: 'legislacion', label: 'Legislación Aplicable' },
];

export default function AvisoLegal() {
  return (
    <LegalLayout
      title="Aviso Legal"
      lastUpdated="16 de enero de 2026"
      toc={toc}
    >
      {/* Titular del Sitio Web */}
      <section id="titular" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Titular del Sitio Web</h2>



        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Nombre comercial:</strong> Neuriax
          </p>
          <p>
            <strong>Titular:</strong> Mateo Claramunt González
          </p>
          <p>
            <strong>NIF:</strong> 48099847Q
          </p>
          <p>
            <strong>Domicilio fiscal:</strong> Arcadi Balaguer 62
          </p>
          <p>
            <strong>Correo electrónico:</strong>{' '}
            <a href="mailto:neuriaxx@gmail.com" className="text-blue-600 hover:underline">
              neuriaxx@gmail.com
            </a>
          </p>
          <p>
            <strong>Teléfono:</strong> +34 640 791 041
          </p>
          <p>
            <strong>Dominio:</strong> neuriax.com
          </p>
          <p>
            <strong>Estado legal:</strong> En proceso de alta / constitución. Se actualizará este aviso una vez se complete la formalización.
          </p>
        </div>
      </section>

      {/* Objeto del Sitio */}
      <section id="objeto" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Objeto del Sitio Web</h2>
        <p className="text-gray-700 mb-3">
          Este sitio web tiene como finalidad presentar y divulgar los servicios prestados por Neuriax, entre otros:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Servicios de automatización digital y procesos</li>
          <li>Soluciones de inteligencia artificial aplicada a negocio</li>
          <li>Integración de sistemas y herramientas tecnológicas</li>
          <li>Desarrollo y diseño de sitios web profesionales</li>
          <li>Asesoramiento y consultoría tecnológica</li>
        </ul>
        <p className="text-gray-700">
          El contenido de este sitio web es de naturaleza informativa y comercial. Neuriax se reserva el derecho a modificar, 
          actualizar o eliminar cualquier contenido sin aviso previo.
        </p>
      </section>

      {/* Condiciones de Uso */}
      <section id="condiciones" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Condiciones de Uso</h2>
        <p className="text-gray-700 mb-4">
          El acceso y uso de este sitio web está sujeto a las siguientes condiciones:
        </p>
        <ul className="list-disc ml-6 space-y-3 text-gray-700">
          <li>
            <strong>Legalidad:</strong> El usuario se compromete a utilizar el sitio web de conformidad con la ley 
            española y europea, incluyendo la Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).
          </li>
          <li>
            <strong>Prohibiciones:</strong> Queda prohibido el acceso y uso del sitio web para:
            <ul className="list-circle ml-6 mt-2 space-y-1">
              <li>Realizar actividades ilegales o que incumplan normas aplicables</li>
              <li>Enviar o transmitir contenido difamatorio, abusivo, obsceno o que viole derechos de terceros</li>
              <li>Interferir con el funcionamiento normal del sitio o sus servidores</li>
              <li>Realizar ataques de negación de servicio (DoS) u otros actos malintencionados</li>
              <li>Scrapear, minar datos o usar bots automatizados sin autorización expresa</li>
            </ul>
          </li>
          <li>
            <strong>Modificación de términos:</strong> Neuriax se reserva el derecho de modificar estos términos en cualquier 
            momento. El uso continuado del sitio tras la publicación de cambios implica aceptación de los nuevos términos.
          </li>
        </ul>
      </section>

      {/* Propiedad Intelectual */}
      <section id="propiedad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propiedad Intelectual</h2>
        <p className="text-gray-700 mb-4">
          Todos los contenidos de este sitio web (textos, imágenes, logos, diseño, código, etc.) están protegidos por derechos 
          de propiedad intelectual e industrial, siendo titularidad de Neuriax o sus correspondientes licenciadores.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Licencia de uso:</strong> Se concede al usuario una licencia limitada, no exclusiva y revocable para ver y usar 
          el contenido de este sitio web para propósitos personales y no comerciales.
        </p>
        <p className="text-gray-700">
          <strong>Prohibiciones:</strong> Queda expresamente prohibido:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-3">
          <li>Reproducir, distribuir, modificar o transmitir cualquier contenido sin autorización expresa</li>
          <li>Utilizar el contenido con fines comerciales o competitivos</li>
          <li>Eliminar, ocultar o alterar avisos de copyright, marcas registradas o de derechos de propiedad</li>
          <li>Crear obras derivadas basadas en el contenido del sitio</li>
        </ul>
      </section>

      {/* Limitación de Responsabilidad */}
      <section id="responsabilidad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitación de Responsabilidad</h2>
        <p className="text-gray-700 mb-4">
          <strong>Descargo de garantías:</strong> El contenido de este sitio web se proporciona "tal cual" sin garantía alguna, 
          explícita o implícita. Neuriax no garantiza que el contenido sea preciso, completo, oportuno, seguro o libre de errores.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Responsabilidad limitada:</strong> En la máxima medida permitida por la ley, Neuriax no será responsable por:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Daños directos, indirectos, incidentales, especiales o punitivos derivados del acceso o uso del sitio</li>
          <li>Pérdida de datos, ingresos, oportunidades de negocio o información</li>
          <li>Interrupciones, retrasos o fallos en el servicio</li>
          <li>Virus, malware u otros daños derivados de terceros</li>
        </ul>
        <p className="text-gray-700">
          <strong>Excepciones:</strong> Esta limitación no se aplicará a daños derivados de negligencia grave, fraude o incumplimiento 
          de obligaciones legales imperativas.
        </p>
      </section>

      {/* Política de Enlaces */}
      <section id="enlaces" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Política de Enlaces</h2>
        <p className="text-gray-700 mb-4">
          Este sitio web puede contener enlaces a sitios web de terceros. Neuriax no es responsable del contenido, exactitud, 
          legalidad o disponibilidad de dichos sitios externos.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Generación de enlaces entrantes:</strong> Se permite enlazar a este sitio web siempre que:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>El enlace sea legítimo y no engañoso</li>
          <li>No se incurra en competencia desleal o daño reputacional</li>
          <li>No se implique aprobación de terceros sin autorización expresa</li>
          <li>Se respeten los derechos de propiedad intelectual de Neuriax</li>
        </ul>
      </section>

      {/* Legislación Aplicable */}
      <section id="legislacion" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Legislación Aplicable y Jurisdicción</h2>
        <p className="text-gray-700 mb-4">
          Este aviso legal se rige por la legislación española:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li><strong>Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE)</strong> – Ley 34/1988</li>
          <li><strong>Ley General de Publicidad (LGP)</strong> – Ley 34/1988</li>
          <li><strong>Reglamento General de Protección de Datos (RGPD)</strong> – Reglamento (UE) 2016/679</li>
          <li><strong>Ley Orgánica de Protección de Datos (LOPDGDD)</strong> – Ley Orgánica 3/2018</li>
          <li><strong>Código Civil Español</strong> – Artículos aplicables a responsabilidad civil y contratos</li>
        </ul>
        <p className="text-gray-700 mb-4">
          <strong>Competencia territorial:</strong> Ambas partes se someten a la jurisdicción de los juzgados y tribunales 
          competentes de <strong>España</strong>, renunciando a cualquier otra jurisdicción que pudiera corresponderle.
        </p>
        <p className="text-gray-700">
          En caso de conflicto, se intentará resolver mediante negociación amistosa. Si no se alcanza acuerdo, cualquiera de las 
          partes puede ejercitar acciones ante los tribunales españoles competentes.
        </p>
      </section>

      {/* Final Notice */}
      <section className="bg-gray-100 p-6 rounded-lg mt-12">
        <h3 className="font-semibold text-gray-900 mb-2">Última Actualización</h3>
        <p className="text-sm text-gray-700">
          Este aviso legal fue actualizado por última vez el <strong>16 de enero de 2026</strong>. 
          Neuriax se reserva el derecho de modificarlo en cualquier momento sin aviso previo.
        </p>
        <p className="text-sm text-gray-700 mt-3">
          Para consultas o aclaraciones: <a href="mailto:neuriaxx@gmail.com" className="text-blue-600 hover:underline">
            neuriaxx@gmail.com
          </a>
        </p>
      </section>
    </LegalLayout>
  );
}
