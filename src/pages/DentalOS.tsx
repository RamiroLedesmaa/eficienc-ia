import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import dentalosLogo from "@/assets/dentalos-logo.svg";
import WavePlane from "@/components/WavePlane";

const faqs = [
  {
    q: "¿Ya tuve una agenda online y fue un desastre. Las cancelaciones se dispararon.",
    a: "DentalOS no le da al paciente control sobre la agenda. El agente recibe la consulta, pero el turno lo asigna el sistema según las reglas que vos configurás. El control queda de tu lado. El trabajo administrativo, no.",
  },
  {
    q: "¿Y si el sistema falla cuando más lo necesito?",
    a: "El agente vive en la nube, no en tu computadora. Una falla de luz no lo afecta. Y si algo sale mal, el fundador responde personalmente.",
  },
  {
    q: "¿Mis datos de pacientes están seguros?",
    a: "Los datos se almacenan en infraestructura cloud con encriptación y backups automáticos. Podemos compartirte la documentación técnica si la necesitás.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "Entre 7 y 15 días para la Fase 1. La hace el fundador personalmente, con onboarding activo durante los primeros 15 días.",
  },
  {
    q: "¿Cuánto cuesta DentalOS?",
    a: "Antes del precio, la pregunta real es: ¿cuánto te está costando NO tenerlo? Un consultorio con 100 pacientes/día pierde más de $6.000.000/mes en horas administrativas. En la demo hacemos el cálculo con tus números reales y te damos la inversión exacta.",
  },
];

const problems = [
  {
    icon: "📱",
    title: "WhatsApp personal explotado",
    desc: "Tu WhatsApp es un caos entre tu vida personal, pacientes que escriben a cualquier hora y reprogramaciones de último momento. Terminás el día sintiéndote secretaria en vez de odontóloga.",
  },
  {
    icon: "💸",
    title: "Obras sociales: plata que se pierde en el camino",
    desc: "Códigos, autorizaciones, liquidaciones, rechazos. Cada obra social es un mundo y vos tenés que descifrarlos todos mientras atendés pacientes. Al final del mes, no sabés cuánto te deben, cuánto cobraste ni cuánto se te escapó.",
  },
  {
    icon: "📋",
    title: "Historias clínicas en papel",
    desc: "Fichas que no encontrás, historiales que reconstruís de memoria, estudios que sabés que están... en algún lado. Cada paciente que entra es una búsqueda del tesoro que nadie disfruta.",
  },
];

const beforeAfter = [
  { bad: "WhatsApp personal para turnos", good: "Agente responde y agenda 24/7" },
  { bad: "Sin saber cuánto facturaste este mes", good: "Dashboard financiero en tiempo real" },
  { bad: "Pacientes que abandonan sin aviso", good: "Alerta automática de tratamientos sin completar" },
  { bad: "Historia clínica en papel o Word", good: "Historia clínica digital + carga por voz" },
  { bad: "Atención solo en horario de trabajo", good: "Atención automatizada fuera de horario" },
];

const features = [
  {
    num: "01",
    title: "El agente que atiende cuando vos no podés",
    desc: "Son las 23:15. Una paciente escribe preguntando por un turno para el viernes. El agente responde en segundos, verifica disponibilidad, y confirma el turno automáticamente en tu agenda. Vos no hiciste nada.",
  },
  {
    num: "02",
    title: "El saldo que siempre quisiste saber. Ahora visible.",
    desc: "¿Cuántas prestaciones de OSDE/OSECAC/IAPOS están pendientes? El dashboard hace visible lo que siempre fue invisible.",
  },
  {
    num: "03",
    title: "La historia clínica que se carga sola (casi).",
    desc: "Terminás la consulta, grabás un audio de 2 minutos. DentalOS lo transcribe y completa la historia clínica automáticamente. Carga la prestación correspondiente. Sin escribir. Sin papel.",
  },
];


const DentalOS = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [leadFormData, setLeadFormData] = useState({ nombre: "", whatsapp: "", pacientes: "" });
  const [leadSending, setLeadSending] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Load Cal.com popup script on mount
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "popup", {origin:"https://app.cal.com"});
      Cal.ns["popup"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.head.appendChild(script);
  }, []);

  const openCalPopup = () => {
    const Cal = (window as any).Cal;
    if (!Cal) return;
    Cal.ns["popup"]("modal", {
      calLink: "dentalos/30min",
      config: { layout: "month_view" },
    });
  };

  return (
    <div
      style={{
        fontFamily: "'Manrope', sans-serif",
        background:
          "radial-gradient(circle at top left, rgba(31,107,104,0.08), transparent 28%), radial-gradient(circle at right 15%, rgba(233,222,214,0.55), transparent 22%), #F7FBFA",
        color: "#17312E",
        minHeight: "100vh",
        overflowX: "hidden",
        paddingTop: "clamp(80px, 12vw, 100px)",
      }}
    >
      <WavePlane />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "14px clamp(24px, 5vw, 42px)",
        backdropFilter: scrollY > 40 ? "blur(18px)" : "none",
        background: scrollY > 40 ? "rgba(247,251,250,0.84)" : "transparent",
        borderBottom: scrollY > 40 ? "1px solid rgba(23,49,46,0.08)" : "none",
        transition: "all 0.25s ease",
      }}>
        <div className="flex items-center justify-center md:justify-between" style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}>
          <img src={dentalosLogo} alt="DentalOS" className="h-12 md:h-[73px] w-auto" />
          <button
            onClick={openCalPopup}
            className="primary-btn hidden md:inline-block"
            style={{ padding: "14px 24px", fontSize: 13, letterSpacing: "0.08em" }}
          >
            AGENDAR AHORA
          </button>
        </div>
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Manrope:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F7FBFA; }
        ::-webkit-scrollbar-thumb { background: rgba(31,107,104,0.4); border-radius: 999px; }

        .page-shell { position: relative; }
        .ambient-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(23,49,46,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(23,49,46,0.04) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 80%);
          pointer-events: none;
        }
        .grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.06;
          background-image:
            radial-gradient(circle at 25% 25%, rgba(23,49,46,0.14) 0.6px, transparent 0.8px),
            radial-gradient(circle at 75% 40%, rgba(31,107,104,0.09) 0.8px, transparent 1px);
          background-size: 24px 24px, 30px 30px;
        }

        /* ── BUTTONS ── */
        .primary-btn {
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #1F6B68, #2D8A84);
          color: #F7FBFA;
          padding: 17px 26px;
          border-radius: 18px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 18px 45px rgba(31,107,104,0.24);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          text-align: center;
        }
        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 22px 54px rgba(31,107,104,0.32);
        }
        .secondary-btn {
          border: 1px solid rgba(23,49,46,0.14);
          cursor: pointer;
          background: rgba(255,255,255,0.72);
          color: #17312E;
          padding: 16px 22px;
          border-radius: 18px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          transition: transform 0.2s ease, border-color 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .secondary-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(31,107,104,0.28);
        }

        /* ── TYPOGRAPHY ── */
        .hero-title,
        .section-title {
          font-size: clamp(45px, 6.25vw, 80px);
          font-weight: 800;
          line-height: 0.94;
          letter-spacing: -0.06em;
          color: #17312E;
          text-wrap: balance;
        }
        .section-title {
          font-size: clamp(34px, 5vw, 62px);
          max-width: 14ch;
        }
        .hero-title em,
        .section-title em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          color: #1F6B68;
          display: inline-block;
          margin-left: 0.1em;
        }
        .hero-summary {
          color: #17312E;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.8;
          max-width: 520px;
          margin-top: 24px;
        }
        .section-copy {
          color: #17312E;
          font-size: 19px;
          font-weight: 500;
          line-height: 1.8;
        }
        .section-copy-mono {
          color: rgba(23,49,46,0.78);
          font-family: 'Manrope', sans-serif;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.9;
        }
        .section-tag {
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          color: #1F6B68;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .section-tag::after {
          content: '';
          flex: 1;
          max-width: 60px;
          height: 1px;
          background: rgba(31,107,104,0.3);
        }

        /* ── STAT CARDS ── */
        .stat-card {
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(23,49,46,0.08);
          border-radius: 22px;
          box-shadow: 0 8px 30px rgba(23,49,46,0.07), 0 2px 8px rgba(23,49,46,0.04);
          padding: 28px 28px;
          transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: #1F6B68;
          border-radius: 0 0 2px 0;
        }
        .stat-card:hover {
          border-color: rgba(31,107,104,0.25);
          background: rgba(255,255,255,0.97);
          box-shadow: 0 14px 40px rgba(23,49,46,0.1), 0 4px 12px rgba(23,49,46,0.06);
        }
        .stat-num {
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #1F6B68;
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          color: rgba(23,49,46,0.7);
          font-size: 15px;
          font-weight: 500;
          line-height: 1.5;
        }

        /* ── MODULE CARDS ── */
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        .stats-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 24px;
        }
        .module-card {
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(23,49,46,0.08);
          border-radius: 22px;
          box-shadow: 0 10px 32px rgba(23,49,46,0.08), 0 2px 8px rgba(23,49,46,0.04);
          padding: 28px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .module-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(31,107,104,0.3), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .module-card:hover {
          border-color: rgba(31,107,104,0.2);
          background: rgba(255,255,255,0.92);
          transform: translateY(-4px);
          box-shadow: 0 18px 48px rgba(23,49,46,0.12), 0 4px 14px rgba(23,49,46,0.06);
        }
        .module-card:hover::before {
          opacity: 1;
        }
        .module-icon {
          font-size: 28px;
          margin-bottom: 14px;
        }
        .module-title {
          font-size: 20px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 10px;
          color: #17312E;
        }
        .module-copy {
          color: rgba(23,49,46,0.82);
          font-family: 'Manrope', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.7;
        }

        /* ── ABOUT BLOCKS ── */
        .about-blocks {
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-top: 8px;
        }
        .about-block {
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(23,49,46,0.06);
          border-left: 2px solid rgba(31,107,104,0.25);
          border-radius: 16px;
          box-shadow: 0 6px 24px rgba(23,49,46,0.06), 0 2px 6px rgba(23,49,46,0.03);
          padding: 22px 24px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .about-block:hover {
          border-color: rgba(23,49,46,0.06);
          border-left-color: rgba(31,107,104,0.6);
          box-shadow: 0 10px 32px rgba(23,49,46,0.09), 0 3px 8px rgba(23,49,46,0.04);
        }
        .about-num {
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: #1F6B68;
          letter-spacing: 0.2em;
          margin-bottom: 8px;
        }
        .about-title {
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          color: #17312E;
        }
        .about-copy {
          color: rgba(23,49,46,0.82);
          font-family: 'Manrope', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.8;
        }

        /* ── BEFORE/AFTER TABLE ── */
        .ba-wrap {
          overflow-x: auto;
          margin-top: 48px;
          border-radius: 22px;
          border: 1px solid rgba(23,49,46,0.08);
          background: rgba(255,255,255,0.88);
          box-shadow: 0 10px 32px rgba(23,49,46,0.08), 0 2px 8px rgba(23,49,46,0.04);
        }
        .ba-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 480px;
        }
        .ba-table thead th {
          padding: 20px 28px;
          text-align: left;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: rgba(23,49,46,0.5);
          border-bottom: 1px solid rgba(23,49,46,0.08);
        }
        .ba-table thead th:last-child { color: #1F6B68; }
        .ba-table tbody tr {
          border-bottom: 1px solid rgba(23,49,46,0.06);
          transition: background 0.15s;
        }
        .ba-table tbody tr:last-child { border-bottom: none; }
        .ba-table tbody tr:hover { background: rgba(31,107,104,0.05); transition: background 0.2s ease; }
        .ba-table tbody tr:hover .ba-good { color: #1F6B68; }
        .ba-table td {
          padding: 18px 28px;
          font-size: 16px;
          font-weight: 500;
          vertical-align: middle;
          line-height: 1.5;
        }
        .ba-bad { color: rgba(23,49,46,0.5); }
        .ba-good { color: #17312E; font-weight: 600; }

        /* ── TRUST BAR ── */
        .trust-bar {
          background: rgba(255,255,255,0.6);
          border-top: 1px solid rgba(23,49,46,0.08);
          border-bottom: 1px solid rgba(23,49,46,0.08);
          padding: 20px clamp(24px, 5vw, 42px);
        }
        .trust-bar-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px 32px;
        }
        .trust-item {
          font-size: 14px;
          color: rgba(23,49,46,0.7);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: normal;
        }

        /* ── FAQ ── */
        .faq-item {
          border-bottom: 1px solid rgba(23,49,46,0.08);
          overflow: hidden;
        }
        .faq-question {
          width: 100%;
          background: none;
          border: none;
          color: #17312E;
          font-family: 'Manrope', sans-serif;
          font-size: 17px;
          font-weight: 700;
          text-align: left;
          padding: 24px 0;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          transition: color 0.2s ease;
        }
        .faq-question:hover { color: #1F6B68; }
        .faq-question svg {
          flex-shrink: 0;
          transition: transform 0.3s ease;
          color: #1F6B68;
        }
        .faq-answer {
          color: rgba(23,49,46,0.78);
          font-size: 17px;
          line-height: 1.8;
          font-weight: 500;
          padding-bottom: 24px;
        }

        /* ── DIVIDER ── */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(23,49,46,0.12), transparent);
          margin: 0 auto;
          max-width: 1200px;
        }

        /* ── ANIMATIONS ── */
        .fade-up {
          opacity: 0;
          transform: translateY(18px);
          animation: fadeUp 0.8s ease forwards;
        }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.24s; }
        .delay-4 { animation-delay: 0.32s; }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── STICKY CTA (mobile) ── */
        .sticky-cta-mobile {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 999;
          background: rgba(247,251,250,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(23,49,46,0.08);
          padding: 12px 20px;
        }
        .sticky-cta-mobile .primary-btn {
          display: block;
          width: 100%;
          text-align: center;
        }

        /* ── DESKTOP HERO ── */
        @media (min-width: 960px) {
          .hero-section {
            min-height: 85vh;
            display: flex;
            align-items: center;
          }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .features-layout { grid-template-columns: 1fr !important; }
          .modules-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-grid-4 { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .sticky-cta-mobile { display: block; padding: 12px 20px calc(12px + env(safe-area-inset-bottom)); }
          .chatbot-video-layout { flex-direction: column !important; gap: 24px !important; text-align: center; }
          .chatbot-video-layout > div:first-child { width: 100% !important; max-width: min(320px, 85vw); margin: 0 auto; }
          .modules-grid { grid-template-columns: 1fr; }
          .stats-grid-4 { grid-template-columns: 1fr; }
          .hero-cta-group { width: 100%; }
          .primary-btn,
          .secondary-btn { width: 100%; }
          .hero-title { font-size: clamp(32px, 9vw, 48px) !important; line-height: 0.96 !important; }
          .hero-title,
          .section-title { max-width: none; }
          .hero-summary { font-size: 15px !important; margin-top: 16px !important; }
          .stat-num { font-size: 32px !important; }
          .stat-label { font-size: 13px; }
          .section-padding { padding-top: 64px !important; padding-bottom: 64px !important; }
          .page-shell { padding-bottom: 72px; }
          .ba-table { min-width: unset !important; }
          .ba-table thead { display: none; }
          .ba-table tbody tr { display: flex; flex-direction: column; padding: 16px 20px; gap: 8px; }
          .ba-table td { padding: 0 !important; display: block; font-size: 15px !important; }
          .ba-table .ba-bad::before { content: '❌ '; }
          .ba-table .ba-good::before { content: '✅ '; }
          .features-layout { gap: 32px !important; }
          .trust-bar-inner { gap: 8px 16px !important; justify-content: flex-start !important; }
          .trust-item { font-size: 13px !important; }
          .faq-question { font-size: 15px !important; }
          .faq-answer { font-size: 15px !important; }
          .cost-table thead th { padding: 12px 14px !important; font-size: 12px !important; }
          .cost-table td { padding: 12px 14px !important; font-size: 13px !important; }
          .cal-embed-wrap iframe { height: 500px !important; }
        }
        @media (max-width: 480px) {
          .cost-table thead { display: none; }
          .cost-table tr { display: flex; flex-direction: column; padding: 16px; gap: 6px; border-bottom: 1px solid rgba(23,49,46,0.08); }
          .cost-table td { display: block !important; padding: 0 !important; font-size: 14px !important; }
          .cost-table td:first-child { font-weight: 700; margin-bottom: 4px; }
          .cost-table td:nth-child(2)::before { content: 'Sin DentalOS: '; font-weight: 600; color: rgba(23,49,46,0.5); }
          .cost-table td:nth-child(3)::before { content: 'Con DentalOS: '; font-weight: 600; color: #1F6B68; }
          .cal-embed-wrap { display: none; }
        }
      `}</style>

      <div className="grain" />

      <div className="page-shell">
        <div className="ambient-grid" />

        {/* ── HERO ── */}
        <section
          className="hero-section"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px clamp(24px, 5vw, 42px) 24px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, textAlign: "center" }}>
            <h1 className="hero-title fade-up delay-1" style={{ maxWidth: "none", margin: "0 auto" }}>
              La mitad de tu día
              <br />
              no es
              <br />
              <em>odontología.</em>
            </h1>

            <p className="hero-summary fade-up delay-2" style={{ maxWidth: 620, margin: "16px auto 0", textAlign: "center" }}>
              Y ese tiempo que perdés son pacientes que no atendés. DentalOS automatiza turnos, historias clínicas y WhatsApp para que vos vuelvas a hacer lo que elegiste.
            </p>

            {/* VSL Embed */}
            <div
              className="fade-up delay-3"
              style={{
                width: "100%",
                maxWidth: 860,
                margin: "40px auto",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(23,49,46,0.08)",
                boxShadow: "0 8px 30px rgba(23,49,46,0.07), 0 2px 8px rgba(23,49,46,0.04)",
              }}
            >
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src="https://www.loom.com/embed/627e2653a8334c75ba510bfdf6d3ad4a"
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  title="DentalOS Demo"
                />

              </div>
            </div>

            <div className="fade-up delay-4" style={{ marginTop: 32 }}>
              <button
                onClick={openCalPopup}
                className="primary-btn"
                style={{ padding: "20px 36px", fontSize: 14 }}
              >
                Agendar demo de 30 minutos →
              </button>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  color: "rgba(23,49,46,0.55)",
                  fontWeight: 500,
                }}
              >
                ✓ Sin compromiso · ✓ Con el fundador · ✓ Garantía de 60 días
              </p>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ── EL PROBLEMA ── */}
        <section className="section-padding" style={{ padding: "96px clamp(24px, 5vw, 42px)", maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-tag">El problema</div>
          <h2 className="section-title">
            Los consultorios
            <br />
            operan
            <br />
            <em>a ciegas.</em>
          </h2>

          <div className="modules-grid">
            {problems.map((problem) => (
              <div key={problem.title} className="module-card">
                <div className="module-icon">{problem.icon}</div>
                <h3 className="module-title">{problem.title}</h3>
                <p className="module-copy">{problem.desc}</p>
              </div>
            ))}
          </div>

          <p style={{
            marginTop: 48,
            fontSize: 19,
            fontWeight: 600,
            lineHeight: 1.8,
            color: "rgba(23,49,46,0.75)",
            maxWidth: 640,
            textAlign: "center",
            margin: "48px auto 0",
            fontStyle: "italic",
          }}>
            Abriste tu consultorio para vivir de lo que amás. No para pasarte el día entre papeles, turnos y mensajes sin contestar.
          </p>
        </section>

        <div className="divider" />

        {/* ── ANTES / DESPUÉS ── */}
        <section className="section-padding" style={{ padding: "96px clamp(24px, 5vw, 42px)", maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-tag">La solución</div>
          <h2 className="section-title">
            Antes y después
            <br />
            <em>con DentalOS.</em>
          </h2>

          <div className="ba-wrap">
            <table className="ba-table">
              <thead>
                <tr>
                  <th>❌ Sin DentalOS</th>
                  <th>✅ Con DentalOS</th>
                </tr>
              </thead>
              <tbody>
                {beforeAfter.map((row, i) => (
                  <tr key={i}>
                    <td className="ba-bad">{row.bad}</td>
                    <td className="ba-good">{row.good}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="divider" />

        {/* ── FEATURES ── */}
        <section className="section-padding" style={{ padding: "120px clamp(24px, 5vw, 42px)", maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="features-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "start",
            }}
          >
            <div>
              <div className="section-tag">Lo que hace</div>
              <h2 className="section-title">
                Lo que DentalOS
                <br />
                hace por
                <br />
                <em>tu consultorio.</em>
              </h2>
              <p className="section-copy" style={{ maxWidth: 460, marginTop: 22 }}>
                Cinco funcionalidades concretas que cambian la operación diaria de un consultorio odontológico.
              </p>
            </div>

            <div className="about-blocks">
              {features.map((item) => (
                <div key={item.num} className="about-block">
                  <div className="about-num">{item.num}</div>
                  <h3 className="about-title">{item.title}</h3>
                  <p className="about-copy">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ── CASO DE ÉXITO DENTAL QUALITY ── */}
        <section className="section-padding" style={{ padding: "120px clamp(24px, 5vw, 42px)", maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-tag">Caso de éxito</div>
          <h2 className="section-title">
            Lo que cambió en
            <br />
            <em>Dental Quality.</em>
          </h2>
          <p className="section-copy-mono" style={{ maxWidth: 560, marginTop: 12, marginBottom: 40 }}>
            Lanús y Lomas de Zamora · 2 sucursales · +20 profesionales · +100 pacientes/día
          </p>

          <div className="about-block" style={{ background: "rgba(31,107,104,0.04)", marginBottom: 48 }}>
            <p className="about-copy" style={{ fontStyle: "italic", fontSize: 18, lineHeight: 1.9 }}>
              "Las secretarias pasaban el día entero dando turnos por teléfono y llamando para confirmar. Los profesionales perdían horas respondiendo consultas por WhatsApp y cargando historias clínicas a mano. La atención presencial se resentía."
            </p>
          </div>

          <div className="section-tag">Después de DentalOS</div>

          <div className="stats-grid-4">
            <div className="stat-card" style={{ padding: "28px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>📋</div>
              <div className="stat-num" style={{ fontSize: 38 }}>42 hs/sem</div>
              <div className="stat-label">ahorradas en historias clínicas (ahora se completan en 1 min por audio)</div>
            </div>
            <div className="stat-card" style={{ padding: "28px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>📱</div>
              <div className="stat-num" style={{ fontSize: 38 }}>16 hs/día</div>
              <div className="stat-label">de gestión de turnos reemplazadas por autogestión WhatsApp 24/7</div>
            </div>
            <div className="stat-card" style={{ padding: "28px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>🩺</div>
              <div className="stat-num" style={{ fontSize: 38 }}>4 hs/sem</div>
              <div className="stat-label">recuperadas por profesional (consultas filtradas por IA)</div>
            </div>
            <div className="stat-card" style={{ padding: "28px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>⏰</div>
              <div className="stat-num" style={{ fontSize: 38 }}>24/7</div>
              <div className="stat-label">atención automatizada: noches, fines de semana, feriados</div>
            </div>
          </div>

          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(23,49,46,0.1), transparent)", margin: "64px 0" }} />

          {/* Video del chatbot */}
          <div className="chatbot-video-layout" style={{
            display: "flex",
            alignItems: "center",
            gap: 48,
            maxWidth: 800,
            margin: "0 auto",
          }}>
            <div style={{ flex: "0 0 auto" }}>
              <div style={{
                width: 320,
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(23,49,46,0.08)",
                boxShadow: "0 8px 30px rgba(23,49,46,0.07), 0 2px 8px rgba(23,49,46,0.04)",
              }}>
                <div style={{ position: "relative", paddingBottom: "177.78%", height: 0 }}>
                  <iframe
                    src="https://www.youtube.com/embed/1XceLQmf6Pg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    title="DentalOS agente en acción"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: "#17312E", marginBottom: 12, lineHeight: 1.2 }}>
                Mirá el agente<br />en acción.
              </h3>
              <p style={{ fontSize: 16, color: "rgba(23,49,46,0.7)", lineHeight: 1.8, maxWidth: 340 }}>
                Un paciente escribe por WhatsApp a las 23hs. El agente responde, verifica disponibilidad y confirma el turno. Sin intervención humana.
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(23,49,46,0.1), transparent)", margin: "64px 0" }} />

          {/* ── LEAD MAGNET ── */}
          {!leadSubmitted ? (
            <div style={{
              background: "rgba(247,251,250,0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(31,107,104,0.12)",
              borderRadius: 22,
              padding: "clamp(20px, 5vw, 36px)",
              maxWidth: 620,
              margin: "0 auto",
              textAlign: "center",
            }}>
              <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: "#17312E", marginBottom: 8 }}>
                Hacé la cuenta con tu consultorio.
              </h3>
              <p style={{ fontSize: 15, color: "rgba(23,49,46,0.7)", lineHeight: 1.7, marginBottom: 24 }}>
                ¿Cuántos pacientes atendés por día? Te calculamos cuánto estás perdiendo en tareas administrativas y te lo mandamos por WhatsApp.
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={leadFormData.nombre}
                  onChange={(e) => setLeadFormData({ ...leadFormData, nombre: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 16,
                    border: "1px solid rgba(23,49,46,0.12)",
                    background: "rgba(247,251,250,0.9)",
                    fontFamily: "inherit",
                    fontSize: 15,
                    marginBottom: 12,
                    outline: "none",
                    color: "#17312E",
                  }}
                />
                <input
                  type="tel"
                  placeholder="Tu WhatsApp (ej: 11 5555-1234)"
                  value={leadFormData.whatsapp}
                  onChange={(e) => setLeadFormData({ ...leadFormData, whatsapp: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 16,
                    border: "1px solid rgba(23,49,46,0.12)",
                    background: "rgba(247,251,250,0.9)",
                    fontFamily: "inherit",
                    fontSize: 15,
                    marginBottom: 12,
                    outline: "none",
                    color: "#17312E",
                  }}
                />
                <div style={{ position: "relative", marginBottom: 0 }}>
                  <select
                    value={leadFormData.pacientes}
                    onChange={(e) => setLeadFormData({ ...leadFormData, pacientes: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: 16,
                      border: "1px solid rgba(23,49,46,0.12)",
                      background: "rgba(247,251,250,0.9)",
                      fontFamily: "inherit",
                      fontSize: 15,
                      appearance: "none",
                      outline: "none",
                      color: leadFormData.pacientes ? "#17312E" : "rgba(23,49,46,0.45)",
                      cursor: "pointer",
                    }}
                  >
                    <option value="" disabled>¿Cuántos pacientes atendés por día?</option>
                    <option value="Menos de 20">Menos de 20</option>
                    <option value="20-50">20-50</option>
                    <option value="50-100">50-100</option>
                    <option value="Más de 100">Más de 100</option>
                  </select>
                  <span style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "rgba(23,49,46,0.45)",
                    fontSize: 12,
                  }}>▼</span>
                </div>
                <button
                  className="primary-btn"
                  style={{ width: "100%", marginTop: 8 }}
                  disabled={leadSending}
                  onClick={async () => {
                    if (!leadFormData.nombre || !leadFormData.whatsapp || !leadFormData.pacientes) return;
                    setLeadSending(true);
                    try {
                      await fetch("https://formspree.io/f/mwvrlekb", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          nombre: leadFormData.nombre,
                          whatsapp: leadFormData.whatsapp,
                          pacientes: leadFormData.pacientes,
                        }),
                      });
                      setLeadSubmitted(true);
                    } finally {
                      setLeadSending(false);
                    }
                  }}
                >
                  {leadSending ? "Enviando..." : "Quiero mi cálculo personalizado"}
                </button>
                <p style={{ fontSize: 13, color: "rgba(23,49,46,0.5)", marginTop: 12 }}>
                  Te lo mandamos por WhatsApp en menos de 24hs
                </p>
              </div>
            </div>
          ) : (
            <div style={{
              background: "rgba(31,107,104,0.04)",
              border: "1px solid rgba(31,107,104,0.12)",
              borderRadius: 22,
              padding: "clamp(20px, 5vw, 36px)",
              maxWidth: 620,
              margin: "0 auto",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#17312E" }}>
                ¡Listo! Te contactamos en menos de 24hs.
              </p>
            </div>
          )}

          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(23,49,46,0.1), transparent)", margin: "48px 0" }} />

          {/* La cuenta que nadie hace */}
          <div style={{
            background: "rgba(247,251,250,0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(31,107,104,0.12)",
            borderRadius: 22,
            padding: 28,
            marginTop: 0,
          }}>
            <div className="section-tag" style={{ marginBottom: 20 }}>La cuenta que nadie hace</div>
            <div style={{ overflowX: "auto", borderRadius: 14, border: "1px solid rgba(23,49,46,0.08)" }}>
              <table className="cost-table" style={{ width: "100%", borderCollapse: "collapse", minWidth: 0 }}>
                <thead>
                  <tr style={{ background: "#1F6B68" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "#fff", fontSize: 14, fontWeight: 700 }}>Concepto</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "#fff", fontSize: 14, fontWeight: 700 }}>Sin DentalOS</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "#fff", fontSize: 14, fontWeight: 700 }}>Con DentalOS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      concepto: "Historias clínicas",
                      sin: "42 hs/sem × $25.000/h = $1.050.000/sem",
                      con: "1 min por paciente (audio)",
                    },
                    {
                      concepto: "Gestión de turnos WhatsApp",
                      sin: "2 secretarias full time = $1.800.000/mes",
                      con: "Autogestión 24/7, $0 extra",
                    },
                    {
                      concepto: "Consultas al profesional",
                      sin: "4 hs/sem × $25.000/h = $100.000/sem",
                      con: "IA filtra, solo llegan urgencias",
                    },
                    {
                      concepto: "Sin atención post 18hs ni fines de semana",
                      sin: "Pacientes perdidos (no cuantificable)",
                      con: "Atención 24/7 automática",
                    },
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "rgba(31,107,104,0.03)", borderBottom: "1px solid rgba(23,49,46,0.06)" }}>
                      <td style={{ padding: "16px 20px", fontSize: 15, fontWeight: 600, color: "#17312E" }}>{row.concepto}</td>
                      <td style={{ padding: "16px 20px", fontSize: 15, color: "rgba(23,49,46,0.55)" }}>{row.sin}</td>
                      <td style={{ padding: "16px 20px", fontSize: 15, fontWeight: 700, color: "#1F6B68" }}>{row.con}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bloque resumen */}
            <div style={{
              background: "#fff",
              border: "1px solid rgba(31,107,104,0.15)",
              borderRadius: 14,
              padding: "24px 28px",
              marginTop: 20,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(23,49,46,0.7)" }}>Costo mensual total sin DentalOS</span>
                <span style={{ fontSize: 26, fontWeight: 800, color: "#C0392B", letterSpacing: "-0.02em" }}>$6.400.000/mes</span>
              </div>
              <div style={{ height: 1, background: "rgba(23,49,46,0.08)", margin: "16px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(23,49,46,0.7)" }}>Costo mensual con DentalOS</span>
                <span style={{ fontSize: 26, fontWeight: 800, color: "#1F6B68", letterSpacing: "-0.02em" }}>~$0</span>
              </div>
              <div style={{ height: 1, background: "rgba(23,49,46,0.08)", margin: "16px 0" }} />
              <p style={{ textAlign: "center", fontWeight: 700, fontSize: 16, color: "#17312E", lineHeight: 1.6 }}>
                Cada mes que pasa sin automatizar, tu centro pierde $6.400.000 en tareas que una IA resuelve sola.
              </p>
            </div>

            <p style={{ marginTop: 16, fontSize: 13, color: "rgba(23,49,46,0.45)", lineHeight: 1.6 }}>
              * Valor hora odontólogo según AOA: $25.000. Sueldo secretaria promedio: $900.000/mes. Cálculo basado en 5 días/semana, 4 semanas/mes.
            </p>
          </div>

          {/* Link Instagram */}
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <a
              href="https://www.instagram.com/dentalqualitylanus/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                color: "#1F6B68",
                border: "1px solid rgba(31,107,104,0.25)",
                borderRadius: 12,
                padding: "10px 20px",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                transition: "border-color 0.2s ease",
              }}
            >
              📸 @dentalqualitylanus
            </a>
          </div>
        </section>

        <div className="divider" />

        {/* ── FAQ ── */}
        <section className="section-padding" style={{ padding: "96px clamp(24px, 5vw, 42px)", background: "rgba(247,251,250,0.85)", backdropFilter: "blur(8px)" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <div className="section-tag">FAQ</div>
            <h2 className="section-title" style={{ marginBottom: 48 }}>
              Las dudas que
              <br />
              probablemente
              <br />
              <em>tenés.</em>
            </h2>

            <div>
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <ChevronDown
                      size={20}
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "none" }}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="faq-answer">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ── CTA FINAL ── */}
        <section className="section-padding" style={{ padding: "140px clamp(24px, 5vw, 42px) 120px", textAlign: "center", background: "rgba(247,251,250,0.85)", backdropFilter: "blur(8px)" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Demo</div>
            <h2 className="section-title" style={{ maxWidth: "none", margin: "0 auto 24px" }}>
              30 minutos para saber si DentalOS
              <br />
              <em>es para vos.</em>
            </h2>
            <p className="section-copy" style={{ maxWidth: 560, margin: "0 auto 40px" }}>
              DentalOS no es para todos — y preferimos ser honestos con eso. Por eso la demo no es un pitch: nos sentamos juntos, miramos tus números reales, y vemos si tiene sentido para tu consultorio. Si no es rentable para vos, te lo decimos. Y si arrancás y en 60 días no funciona, te devolvemos el dinero.
            </p>
            <button
              onClick={openCalPopup}
              className="primary-btn"
              style={{ padding: "20px 36px", fontSize: 14 }}
            >
              Agendar mi demo de 30 minutos →
            </button>
            <p style={{ marginTop: 20, fontSize: 14, color: "rgba(23,49,46,0.55)", fontWeight: 500 }}>
              ✓ Sin compromiso · ✓ Con el fundador, no con un vendedor · ✓ Garantía de 60 días
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          borderTop: "1px solid rgba(23,49,46,0.08)",
          padding: "48px clamp(24px, 5vw, 42px) 36px",
          background: "rgba(255,255,255,0.6)",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
            <div>
              <p style={{ color: "#17312E", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                DentalOS
              </p>
              <p style={{ color: "rgba(23,49,46,0.55)", fontSize: 13, fontWeight: 400 }}>
                Sistema de gestión inteligente para consultorios odontológicos argentinos
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <a
                href="https://www.instagram.com/dentalqualitylanus/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(23,49,46,0.6)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              >
                Instagram
              </a>
              <a
                href="mailto:comercialrutia@gmail.com"
                style={{ color: "rgba(23,49,46,0.6)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              >
                comercialrutia@gmail.com
              </a>
            </div>
          </div>
          <div style={{ maxWidth: 1200, margin: "16px auto 0", borderTop: "1px solid rgba(23,49,46,0.06)", paddingTop: 16, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p style={{ color: "rgba(23,49,46,0.4)", fontSize: 12 }}>
              © 2025 DentalOS · Buenos Aires, Argentina
            </p>
            <p style={{ color: "rgba(23,49,46,0.4)", fontSize: 12 }}>
              Un producto de RutIA
            </p>
          </div>
        </footer>
      </div>

      {/* ── STICKY CTA (mobile) ── */}
      <div className="sticky-cta-mobile">
        <button onClick={openCalPopup} className="primary-btn">
          Agendar demo →
        </button>
      </div>
    </div>
  );
};

export default DentalOS;
