import { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Aviso Legal | Neuriax',
  description: 'Aviso legal de Neuriax - InformaciÃ³n sobre el titular, objeto del sitio y condiciones de uso.',
  robots: 'noindex, nofollow',
};

const toc = [
  { id: 'titular', label: 'Titular del Sitio Web' },
  { id: 'objeto', label: 'Objeto del Sitio' },
  { id: 'condiciones', label: 'Condiciones de Uso' },
  { id: 'propiedad', label: 'Propiedad Intelectual' },
  { id: 'responsabilidad', label: 'LimitaciÃ³n de Responsabilidad' },
  { id: 'enlaces', label: 'PolÃ­tica de Enlaces' },
  { id: 'legislacion', label: 'LegislaciÃ³n Aplicable' },
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

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">âš ï¸ Datos en Proceso de FormalizaciÃ³n</h3>
          <p className="text-sm text-gray-700 mb-2">
            Este proyecto estÃ¡ en proceso de constituciÃ³n como entidad legal. Los datos fiscales definitivos serÃ¡n completados una vez se finalice el trÃ¡mite de alta:
          </p>
          <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
            <li><strong>[PENDIENTE: NIF/CIF]</strong> â€“ Se actualizarÃ¡ al obtener el nÃºmero de identificaciÃ³n fiscal</li>
            <li><strong>[PENDIENTE: RAZÃ“N SOCIAL / DOMICILIO FISCAL]</strong> â€“ Se completarÃ¡ con el domicilio profesional definitivo</li>
          </ul>
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Nombre comercial:</strong> Neuriax
          </p>
          <p>
            <strong>Titular provisional:</strong> Mateo Claramunt GonzÃ¡lez (persona fÃ­sica)
          </p>
          <p>
            <strong>Domicilio provisional de contacto:</strong> [PENDIENTE: DOMICILIO FISCAL/PROFESIONAL]
          </p>
          <p>
            <strong>Correo electrÃ³nico:</strong>{' '}
            <a href="mailto:neuriaxx@gmail.com" className="text-blue-600 hover:underline">
              neuriaxx@gmail.com
            </a>
          </p>
          <p>
            <strong>TelÃ©fono:</strong> +34 640 791 041
          </p>
          <p>
            <strong>Dominio:</strong> neuriax.com
          </p>
          <p>
            <strong>Estado legal:</strong> En proceso de alta / constituciÃ³n. Se actualizarÃ¡ este aviso una vez se complete la formalizaciÃ³n.
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
          <li>Servicios de automatizaciÃ³n digital y procesos</li>
          <li>Soluciones de inteligencia artificial aplicada a negocio</li>
          <li>IntegraciÃ³n de sistemas y herramientas tecnolÃ³gicas</li>
          <li>Desarrollo y diseÃ±o de sitios web profesionales</li>
          <li>Asesoramiento y consultorÃ­a tecnolÃ³gica</li>
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
          El acceso y uso de este sitio web estÃ¡ sujeto a las siguientes condiciones:
        </p>
        <ul className="list-disc ml-6 space-y-3 text-gray-700">
          <li>
            <strong>Legalidad:</strong> El usuario se compromete a utilizar el sitio web de conformidad con la ley 
            espaÃ±ola y europea, incluyendo la Ley de Servicios de la Sociedad de la InformaciÃ³n y de Comercio ElectrÃ³nico (LSSI-CE).
          </li>
          <li>
            <strong>Prohibiciones:</strong> Queda prohibido el acceso y uso del sitio web para:
            <ul className="list-circle ml-6 mt-2 space-y-1">
              <li>Realizar actividades ilegales o que incumplan normas aplicables</li>
              <li>Enviar o transmitir contenido difamatorio, abusivo, obsceno o que viole derechos de terceros</li>
              <li>Interferir con el funcionamiento normal del sitio o sus servidores</li>
              <li>Realizar ataques de negaciÃ³n de servicio (DoS) u otros actos malintencionados</li>
              <li>Scrapear, minar datos o usar bots automatizados sin autorizaciÃ³n expresa</li>
            </ul>
          </li>
          <li>
            <strong>ModificaciÃ³n de tÃ©rminos:</strong> Neuriax se reserva el derecho de modificar estos tÃ©rminos en cualquier 
            momento. El uso continuado del sitio tras la publicaciÃ³n de cambios implica aceptaciÃ³n de los nuevos tÃ©rminos.
          </li>
        </ul>
      </section>

      {/* Propiedad Intelectual */}
      <section id="propiedad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propiedad Intelectual</h2>
        <p className="text-gray-700 mb-4">
          Todos los contenidos de este sitio web (textos, imÃ¡genes, logos, diseÃ±o, cÃ³digo, etc.) estÃ¡n protegidos por derechos 
          de propiedad intelectual e industrial, siendo titularidad de Neuriax o sus correspondientes licenciadores.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Licencia de uso:</strong> Se concede al usuario una licencia limitada, no exclusiva y revocable para ver y usar 
          el contenido de este sitio web para propÃ³sitos personales y no comerciales.
        </p>
        <p className="text-gray-700">
          <strong>Prohibiciones:</strong> Queda expresamente prohibido:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-3">
          <li>Reproducir, distribuir, modificar o transmitir cualquier contenido sin autorizaciÃ³n expresa</li>
          <li>Utilizar el contenido con fines comerciales o competitivos</li>
          <li>Eliminar, ocultar o alterar avisos de copyright, marcas registradas o de derechos de propiedad</li>
          <li>Crear obras derivadas basadas en el contenido del sitio</li>
        </ul>
      </section>

      {/* LimitaciÃ³n de Responsabilidad */}
      <section id="responsabilidad" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. LimitaciÃ³n de Responsabilidad</h2>
        <p className="text-gray-700 mb-4">
          <strong>Descargo de garantÃ­as:</strong> El contenido de este sitio web se proporciona "tal cual" sin garantÃ­a alguna, 
          explÃ­cita o implÃ­cita. Neuriax no garantiza que el contenido sea preciso, completo, oportuno, seguro o libre de errores.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Responsabilidad limitada:</strong> En la mÃ¡xima medida permitida por la ley, Neuriax no serÃ¡ responsable por:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>DaÃ±os directos, indirectos, incidentales, especiales o punitivos derivados del acceso o uso del sitio</li>
          <li>PÃ©rdida de datos, ingresos, oportunidades de negocio o informaciÃ³n</li>
          <li>Interrupciones, retrasos o fallos en el servicio</li>
          <li>Virus, malware u otros daÃ±os derivados de terceros</li>
        </ul>
        <p className="text-gray-700">
          <strong>Excepciones:</strong> Esta limitaciÃ³n no se aplicarÃ¡ a daÃ±os derivados de negligencia grave, fraude o incumplimiento 
          de obligaciones legales imperativas.
        </p>
      </section>

      {/* PolÃ­tica de Enlaces */}
      <section id="enlaces" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. PolÃ­tica de Enlaces</h2>
        <p className="text-gray-700 mb-4">
          Este sitio web puede contener enlaces a sitios web de terceros. Neuriax no es responsable del contenido, exactitud, 
          legalidad o disponibilidad de dichos sitios externos.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>GeneraciÃ³n de enlaces entrantes:</strong> Se permite enlazar a este sitio web siempre que:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>El enlace sea legÃ­timo y no engaÃ±oso</li>
          <li>No se incurra en competencia desleal o daÃ±o reputacional</li>
          <li>No se implique aprobaciÃ³n de terceros sin autorizaciÃ³n expresa</li>
          <li>Se respeten los derechos de propiedad intelectual de Neuriax</li>
        </ul>
      </section>

      {/* LegislaciÃ³n Aplicable */}
      <section id="legislacion" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. LegislaciÃ³n Aplicable y JurisdicciÃ³n</h2>
        <p className="text-gray-700 mb-4">
          Este aviso legal se rige por la legislaciÃ³n espaÃ±ola:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li><strong>Ley de Servicios de la Sociedad de la InformaciÃ³n y de Comercio ElectrÃ³nico (LSSI-CE)</strong> â€“ Ley 34/1988</li>
          <li><strong>Ley General de Publicidad (LGP)</strong> â€“ Ley 34/1988</li>
          <li><strong>Reglamento General de ProtecciÃ³n de Datos (RGPD)</strong> â€“ Reglamento (UE) 2016/679</li>
          <li><strong>Ley OrgÃ¡nica de ProtecciÃ³n de Datos (LOPDGDD)</strong> â€“ Ley OrgÃ¡nica 3/2018</li>
          <li><strong>CÃ³digo Civil EspaÃ±ol</strong> â€“ ArtÃ­culos aplicables a responsabilidad civil y contratos</li>
        </ul>
        <p className="text-gray-700 mb-4">
          <strong>Competencia territorial:</strong> Ambas partes se someten a la jurisdicciÃ³n de los juzgados y tribunales 
          competentes de <strong>EspaÃ±a</strong>, renunciando a cualquier otra jurisdicciÃ³n que pudiera corresponderle.
        </p>
        <p className="text-gray-700">
          En caso de conflicto, se intentarÃ¡ resolver mediante negociaciÃ³n amistosa. Si no se alcanza acuerdo, cualquiera de las 
          partes puede ejercitar acciones ante los tribunales espaÃ±oles competentes.
        </p>
      </section>

      {/* Final Notice */}
      <section className="bg-gray-100 p-6 rounded-lg mt-12">
        <h3 className="font-semibold text-gray-900 mb-2">Ãšltima ActualizaciÃ³n</h3>
        <p className="text-sm text-gray-700">
          Este aviso legal fue actualizado por Ãºltima vez el <strong>16 de enero de 2026</strong>. 
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

