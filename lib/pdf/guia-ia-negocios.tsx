import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

const colors = {
  primary: '#0891b2',    // cyan-600
  primaryDark: '#0e7490', // cyan-700
  dark: '#0f172a',       // slate-900
  medium: '#475569',     // slate-600
  light: '#94a3b8',      // slate-400
  bg: '#f8fafc',         // slate-50
  white: '#ffffff',
  accent: '#06b6d4',     // cyan-500
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    paddingHorizontal: 50,
    paddingVertical: 40,
    fontFamily: 'Helvetica',
  },
  // ─── Cover ───
  coverPage: {
    backgroundColor: colors.dark,
    paddingHorizontal: 50,
    paddingVertical: 60,
    fontFamily: 'Helvetica',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 30,
  },
  coverBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  coverTitle: {
    color: colors.white,
    fontSize: 36,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 1.2,
  },
  coverSubtitle: {
    color: colors.accent,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 1.4,
  },
  coverLine: {
    width: 80,
    height: 3,
    backgroundColor: colors.accent,
    marginBottom: 40,
  },
  coverAuthor: {
    color: colors.light,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  coverUrl: {
    color: colors.accent,
    fontSize: 12,
    textAlign: 'center',
  },
  // ─── Headers ───
  sectionNumber: {
    color: colors.primary,
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
  },
  sectionTitle: {
    color: colors.dark,
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  sectionLine: {
    width: 50,
    height: 3,
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
  // ─── Body ───
  paragraph: {
    color: colors.medium,
    fontSize: 11,
    lineHeight: 1.7,
    marginBottom: 12,
    textAlign: 'justify',
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  // ─── Lists ───
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 4,
  },
  listBullet: {
    color: colors.primary,
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginRight: 8,
    width: 14,
  },
  listText: {
    color: colors.medium,
    fontSize: 11,
    lineHeight: 1.6,
    flex: 1,
  },
  // ─── Highlight Box ───
  highlightBox: {
    backgroundColor: '#ecfeff', // cyan-50
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    padding: 16,
    marginVertical: 16,
    borderRadius: 4,
  },
  highlightTitle: {
    color: colors.primaryDark,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  highlightText: {
    color: colors.primaryDark,
    fontSize: 10,
    lineHeight: 1.6,
  },
  // ─── Stat Box ───
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.bg,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statNumber: {
    color: colors.primary,
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  statLabel: {
    color: colors.medium,
    fontSize: 9,
    textAlign: 'center',
  },
  // ─── CTA ───
  ctaBox: {
    backgroundColor: colors.dark,
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  ctaTitle: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaText: {
    color: colors.light,
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 1.6,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  ctaButtonText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  ctaContact: {
    color: colors.accent,
    fontSize: 10,
  },
  // ─── Footer ───
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
  footerText: {
    color: colors.light,
    fontSize: 8,
  },
  // ─── Table of Contents ───
  tocItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tocNumber: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    width: 30,
  },
  tocTitle: {
    color: colors.dark,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    flex: 1,
  },
  tocPage: {
    color: colors.light,
    fontSize: 10,
  },
});

const Footer = ({ pageNum }: { pageNum: number }) => (
  <View style={styles.footer} fixed>
    <Text style={styles.footerText}>Neuriax — Guía IA para Negocios</Text>
    <Text style={styles.footerText}>neuriax.com</Text>
    <Text style={styles.footerText}>Pág. {pageNum}</Text>
  </View>
);

const ListItem = ({ children }: { children: string }) => (
  <View style={styles.listItem}>
    <Text style={styles.listBullet}>→</Text>
    <Text style={styles.listText}>{children}</Text>
  </View>
);

const HighlightBox = ({ title, text }: { title: string; text: string }) => (
  <View style={styles.highlightBox}>
    <Text style={styles.highlightTitle}>{title}</Text>
    <Text style={styles.highlightText}>{text}</Text>
  </View>
);

// ═══════════════════════════════════════════════════════
// PDF Document
// ═══════════════════════════════════════════════════════
export const GuiaIANegociosPDF = () => (
  <Document
    title="Cómo la Inteligencia Artificial Transforma tu Negocio — Neuriax"
    author="Neuriax"
    subject="Guía profesional sobre IA aplicada a negocios"
    keywords="inteligencia artificial, negocios, automatización, IA, productividad"
  >
    {/* ═══ PORTADA ═══ */}
    <Page size="A4" style={styles.coverPage}>
      <View style={styles.coverBadge}>
        <Text style={styles.coverBadgeText}>Guía Exclusiva 2026</Text>
      </View>
      <Text style={styles.coverTitle}>
        Cómo la Inteligencia{'\n'}Artificial Transforma{'\n'}tu Negocio
      </Text>
      <View style={styles.coverLine} />
      <Text style={styles.coverSubtitle}>
        Estrategias prácticas, casos reales y{'\n'}un plan de acción para implementar IA hoy
      </Text>
      <Text style={styles.coverAuthor}>Una guía de</Text>
      <Text style={styles.coverUrl}>neuriax.com</Text>
    </Page>

    {/* ═══ ÍNDICE ═══ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>Contenido</Text>
      <Text style={styles.sectionTitle}>Lo que encontrarás</Text>
      <View style={styles.sectionLine} />

      {[
        { n: '01', title: '¿Qué es la IA aplicada a negocios?', pg: '3' },
        { n: '02', title: '5 áreas donde la IA genera ROI inmediato', pg: '4' },
        { n: '03', title: 'Casos de uso reales con métricas', pg: '5' },
        { n: '04', title: 'Herramientas que puedes usar hoy', pg: '6' },
        { n: '05', title: 'Plan de acción: tus primeros 30 días con IA', pg: '7' },
        { n: '06', title: '¿Por qué Neuriax?', pg: '8' },
      ].map((item) => (
        <View key={item.n} style={styles.tocItem}>
          <Text style={styles.tocNumber}>{item.n}</Text>
          <Text style={styles.tocTitle}>{item.title}</Text>
          <Text style={styles.tocPage}>{item.pg}</Text>
        </View>
      ))}

      <HighlightBox
        title="💡 ¿Sabías que..."
        text="El 72% de las empresas que implementan IA reportan un aumento del 30% en productividad en los primeros 6 meses. Esta guía te muestra exactamente cómo hacerlo."
      />
      <Footer pageNum={2} />
    </Page>

    {/* ═══ SECCIÓN 1: ¿Qué es la IA? ═══ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>Sección 01</Text>
      <Text style={styles.sectionTitle}>¿Qué es la IA aplicada a negocios?</Text>
      <View style={styles.sectionLine} />

      <Text style={styles.paragraph}>
        La Inteligencia Artificial aplicada a negocios no se trata de robots ni de ciencia ficción.
        Se trata de <Text style={styles.bold}>herramientas inteligentes que automatizan tareas repetitivas,
        analizan datos y toman decisiones</Text> para que tú puedas enfocarte en lo que realmente importa:
        hacer crecer tu empresa.
      </Text>

      <Text style={styles.paragraph}>
        Desde un chatbot que atiende a tus clientes 24/7 hasta un sistema que predice qué productos
        se van a vender más la próxima semana, la IA ya está al alcance de cualquier negocio,
        sin importar su tamaño.
      </Text>

      <HighlightBox
        title="La diferencia clave"
        text="Un software tradicional hace exactamente lo que le programas. Un sistema con IA aprende de los datos, mejora con el tiempo y se adapta a patrones que un humano no podría detectar manualmente."
      />

      <Text style={styles.paragraph}>
        En 2026, implementar IA ya no es una ventaja competitiva — <Text style={styles.bold}>es una necesidad</Text>.
        Las empresas que no adopten estas tecnologías perderán terreno frente a competidores que sí lo hacen.
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>85%</Text>
          <Text style={styles.statLabel}>de tareas repetitivas{'\n'}se pueden automatizar</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>40%</Text>
          <Text style={styles.statLabel}>reducción de costes{'\n'}operativos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3x</Text>
          <Text style={styles.statLabel}>más rápida la{'\n'}toma de decisiones</Text>
        </View>
      </View>

      <Footer pageNum={3} />
    </Page>

    {/* ═══ SECCIÓN 2: 5 Áreas de ROI ═══ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>Sección 02</Text>
      <Text style={styles.sectionTitle}>5 áreas donde la IA genera ROI inmediato</Text>
      <View style={styles.sectionLine} />

      <ListItem>
        Atención al Cliente — Chatbots inteligentes que resuelven el 70% de consultas sin intervención humana. Disponibles 24/7, sin esperas, sin errores. Resultado: clientes más satisfechos y menos carga para tu equipo.
      </ListItem>

      <ListItem>
        Ventas y Conversión — Sistemas que cualifican leads automáticamente, priorizan los más calientes y sugieren el mejor momento para contactar. Las empresas que usan IA en ventas cierran un 25% más de operaciones.
      </ListItem>

      <ListItem>
        Marketing Personalizado — Campañas de email que se adaptan al comportamiento de cada usuario. Contenido dinámico que cambia según quién lo ve. Segmentación inteligente que multiplica el ROI publicitario.
      </ListItem>

      <ListItem>
        Operaciones y Procesos — Automatización de facturación, gestión de inventario predictiva, y flujos de trabajo que eliminan el 80% del trabajo manual. Menos errores, más velocidad.
      </ListItem>

      <ListItem>
        Análisis y Predicción — Dashboards que no solo muestran qué pasó, sino que predicen qué va a pasar. Anticipa tendencias, detecta problemas antes de que ocurran y toma decisiones basadas en datos reales.
      </ListItem>

      <HighlightBox
        title="🎯 Dato clave"
        text="Las PYMEs que implementan IA en al menos 2 de estas áreas ven un retorno de la inversión medio del 280% en el primer año."
      />

      <Footer pageNum={4} />
    </Page>

    {/* ═══ SECCIÓN 3: Casos de Uso Reales ═══ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>Sección 03</Text>
      <Text style={styles.sectionTitle}>Casos de uso reales con métricas</Text>
      <View style={styles.sectionLine} />

      <Text style={{ ...styles.paragraph, fontFamily: 'Helvetica-Bold', color: colors.dark, fontSize: 13, marginBottom: 4 }}>
        🏪 E-commerce de moda (12 empleados)
      </Text>
      <Text style={styles.paragraph}>
        Implementaron un chatbot de atención al cliente + recomendaciones personalizadas.
        <Text style={styles.bold}> Resultado: +47% en ventas online, -60% en tickets de soporte.</Text> Tiempo de implementación: 3 semanas.
      </Text>

      <Text style={{ ...styles.paragraph, fontFamily: 'Helvetica-Bold', color: colors.dark, fontSize: 13, marginBottom: 4 }}>
        🔧 Empresa de servicios de mantenimiento (8 empleados)
      </Text>
      <Text style={styles.paragraph}>
        Automatizaron la programación de citas, recordatorios por WhatsApp y facturación.
        <Text style={styles.bold}> Resultado: 20 horas/semana ahorradas, 0 citas olvidadas.</Text> ROI en 2 meses.
      </Text>

      <Text style={{ ...styles.paragraph, fontFamily: 'Helvetica-Bold', color: colors.dark, fontSize: 13, marginBottom: 4 }}>
        📋 Consultoría financiera (5 personas)
      </Text>
      <Text style={styles.paragraph}>
        Usaron IA para analizar documentos, generar informes automáticos y cualificar leads.
        <Text style={styles.bold}> Resultado: 3x más clientes atendidos con el mismo equipo.</Text> Tiempo de entrega reducido un 70%.
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>47%</Text>
          <Text style={styles.statLabel}>aumento en{'\n'}ventas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>20h</Text>
          <Text style={styles.statLabel}>ahorradas{'\n'}por semana</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3x</Text>
          <Text style={styles.statLabel}>más clientes{'\n'}atendidos</Text>
        </View>
      </View>

      <Footer pageNum={5} />
    </Page>

    {/* ═══ SECCIÓN 4: Herramientas ═══ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>Sección 04</Text>
      <Text style={styles.sectionTitle}>Herramientas que puedes usar hoy</Text>
      <View style={styles.sectionLine} />

      <Text style={styles.paragraph}>
        No necesitas un departamento de tecnología ni un presupuesto millonario.
        Estas son herramientas accesibles que cualquier negocio puede empezar a usar:
      </Text>

      <ListItem>
        Chatbots inteligentes — Asistentes virtuales en tu web y WhatsApp que atienden, cualifican y agendan reuniones automáticamente. Funcionan 24/7 y aprenden de cada conversación.
      </ListItem>

      <ListItem>
        Automatización de emails — Secuencias de email personalizadas que se envían automáticamente según el comportamiento del usuario. Onboarding, seguimiento, nurturing.
      </ListItem>

      <ListItem>
        CRM con IA — Gestión de clientes que prioriza leads, predice cierres y automatiza tareas de seguimiento. Tu pipeline siempre actualizado sin trabajo manual.
      </ListItem>

      <ListItem>
        Agentes de voz IA — Asistentes telefónicos que contestan llamadas, resuelven dudas y agendan citas. Igual que un empleado, pero disponible siempre y sin errores.
      </ListItem>

      <ListItem>
        Análisis predictivo — Herramientas que analizan tus datos históricos y predicen tendencias de ventas, rotación de clientes y oportunidades de crecimiento.
      </ListItem>

      <ListItem>
        Generación de contenido — IA que crea textos para tu blog, redes sociales y emails de manera coherente con tu marca. Multiplica tu presencia online sin multiplicar tu equipo.
      </ListItem>

      <HighlightBox
        title="⚡ Consejo"
        text="No intentes implementar todo a la vez. Empieza con UNA herramienta que resuelva tu problema más urgente. Una vez dominada, añade la siguiente. Paso a paso se llega más lejos."
      />

      <Footer pageNum={6} />
    </Page>

    {/* ═══ SECCIÓN 5: Plan de Acción 30 Días ═══ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>Sección 05</Text>
      <Text style={styles.sectionTitle}>Plan de acción: tus primeros 30 días con IA</Text>
      <View style={styles.sectionLine} />

      <Text style={{ ...styles.paragraph, fontFamily: 'Helvetica-Bold', color: colors.primary, fontSize: 13 }}>
        Semana 1: Diagnóstico
      </Text>
      <ListItem>Identifica las 3 tareas que más tiempo te quitan cada semana</ListItem>
      <ListItem>Mide cuántas horas dedicas a trabajo repetitivo vs estratégico</ListItem>
      <ListItem>Lista los puntos de contacto con clientes que podrían automatizarse</ListItem>

      <Text style={{ ...styles.paragraph, fontFamily: 'Helvetica-Bold', color: colors.primary, fontSize: 13, marginTop: 8 }}>
        Semana 2: Primera implementación
      </Text>
      <ListItem>Elige la tarea más repetitiva y busca la herramienta de IA adecuada</ListItem>
      <ListItem>Implementa un chatbot básico en tu web o un flujo de email automatizado</ListItem>
      <ListItem>Configura métricas para medir el impacto (tiempo, conversiones, satisfacción)</ListItem>

      <Text style={{ ...styles.paragraph, fontFamily: 'Helvetica-Bold', color: colors.primary, fontSize: 13, marginTop: 8 }}>
        Semana 3: Optimización
      </Text>
      <ListItem>Analiza los primeros datos y ajusta la configuración</ListItem>
      <ListItem>Recoge feedback de tu equipo y clientes</ListItem>
      <ListItem>Identifica la segunda área de mejora</ListItem>

      <Text style={{ ...styles.paragraph, fontFamily: 'Helvetica-Bold', color: colors.primary, fontSize: 13, marginTop: 8 }}>
        Semana 4: Escalado
      </Text>
      <ListItem>Implementa la segunda herramienta de IA</ListItem>
      <ListItem>Conecta los sistemas entre sí (CRM + chatbot + emails)</ListItem>
      <ListItem>Documenta procesos y resultados para tu equipo</ListItem>

      <Footer pageNum={7} />
    </Page>

    {/* ═══ SECCIÓN 6: CTA Final ═══ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>Sección 06</Text>
      <Text style={styles.sectionTitle}>¿Por qué Neuriax?</Text>
      <View style={styles.sectionLine} />

      <Text style={styles.paragraph}>
        En Neuriax no vendemos tecnología — <Text style={styles.bold}>vendemos resultados</Text>.
        Somos especialistas en implementar soluciones de IA que generan impacto real
        desde el primer mes.
      </Text>

      <ListItem>
        Implementación rápida — En 2-4 semanas tienes tu primer sistema de IA funcionando. Sin proyectos interminables ni sobrecostes.
      </ListItem>

      <ListItem>
        Adaptado a tu negocio — No usamos plantillas genéricas. Cada solución se diseña para tu sector, tu tamaño y tus objetivos específicos.
      </ListItem>

      <ListItem>
        Soporte continuo — No te dejamos solo después de la implementación. Monitorizamos, optimizamos y escalamos contigo.
      </ListItem>

      <ListItem>
        ROI garantizado — Si no ves resultados medibles en los primeros 90 días, trabajamos gratis hasta que los veas.
      </ListItem>

      <View style={styles.ctaBox}>
        <Text style={styles.ctaTitle}>¿Listo para transformar{'\n'}tu negocio con IA?</Text>
        <Text style={styles.ctaText}>
          Agenda una consulta gratuita de 30 minutos. Te mostraremos{'\n'}
          exactamente qué puedes automatizar y cuánto puedes ahorrar.
        </Text>
        <Link src="https://neuriax.com/contacto">
          <View style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Agendar Consulta Gratuita</Text>
          </View>
        </Link>
        <Text style={styles.ctaContact}>hola@neuriax.com — neuriax.com</Text>
      </View>

      <Footer pageNum={8} />
    </Page>
  </Document>
);

export default GuiaIANegociosPDF;
