import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
    q: "¿Tienen integración con obras sociales?",
    a: "El dashboard muestra saldo deudor y estado de prestaciones por obra social. La integración directa es parte del roadmap — te actualizamos en la demo.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "Entre 7 y 15 días para la Fase 1. La hace el fundador personalmente, con onboarding activo durante los primeros 15 días.",
  },
  {
    q: "¿Funciona para clínicas con varios profesionales?",
    a: "DentalOS Fase 1 está optimizado para consultorios de 1-3 profesionales. Si tenés una clínica más grande, hablemos — podemos ver si encaja o somos honestos si no es el momento.",
  },
];

const problems = [
  {
    icon: "📱",
    title: "WhatsApp personal para turnos",
    desc: "El odontólogo pierde 1-2 horas por día gestionando mensajes. Pacientes que preguntan fuera de horario. Confirmaciones manuales. Cancelaciones sin aviso.",
  },
  {
    icon: "💸",
    title: "Obras sociales: deuda que no se ve",
    desc: "IOMA, OSDE, Swiss Medical, PAMI. Cada una con sus códigos, sus tiempos y sus rechazos. El saldo deudor acumulado existe, pero nadie sabe exactamente cuánto es.",
  },
  {
    icon: "📋",
    title: "Historia clínica en papel o Word",
    desc: "Fichas físicas desorganizadas, sin búsqueda, sin trazabilidad. Cada vez que entra un paciente, hay que reconstruir el historial a mano.",
  },
];

const beforeAfter = [
  { bad: "WhatsApp personal para turnos", good: "Agente responde y agenda 24/7" },
  { bad: "Sin saber cuánto facturaste este mes", good: "Dashboard financiero en tiempo real" },
  { bad: "Obras sociales: deuda invisible", good: "Saldo deudor por obra social, visible" },
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
    desc: "¿Cuánto te debe IOMA este mes? ¿Cuántas prestaciones de OSDE están pendientes? El dashboard hace visible lo que siempre fue opaco.",
  },
  {
    num: "03",
    title: "La historia clínica que se carga sola (casi).",
    desc: "Terminás la consulta, grabás un audio de 2 minutos. DentalOS lo transcribe y completa la historia clínica automáticamente. Sin escribir. Sin papel.",
  },
  {
    num: "04",
    title: "El briefing del día, sin que lo pidas.",
    desc: "Cada mañana, DentalOS te envía un resumen: turnos de hoy, quién confirmó, quién no, cuánto se facturó ayer.",
  },
  {
    num: "05",
    title: "El paciente que iba a desaparecer. Ahora no.",
    desc: "DentalOS detecta automáticamente los casos inactivos y te alerta para hacer el seguimiento.",
  },
];

const heroStats = [
  { num: "68%", label: "turnos confirmados automáticamente sin intervención humana" },
  { num: "90 seg", label: "tiempo de respuesta promedio del agente WhatsApp 24/7" },
  { num: "~6 hs", label: "semanales recuperadas por la odontóloga" },
];

const DentalOS = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calVisible, setCalVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const videoRef = useRef<HTMLDivElement>(null);
  const calSectionRef = useRef<HTMLDivElement>(null);

  // Start 90s timer when video enters viewport
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setTimeout(() => {
            setCalVisible(true);
          }, 90000);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Scroll to calendar section when it becomes visible
  useEffect(() => {
    if (calVisible && calSectionRef.current) {
      setTimeout(() => {
        calSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [calVisible]);

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
        paddingTop: "100px",
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
        padding: "18px clamp(24px, 5vw, 42px)",
        backdropFilter: scrollY > 40 ? "blur(18px)" : "none",
        background: scrollY > 40 ? "rgba(247,251,250,0.84)" : "transparent",
        borderBottom: scrollY > 40 ? "1px solid rgba(23,49,46,0.08)" : "none",
        transition: "all 0.25s ease",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <img src={dentalosLogo} alt="DentalOS" className="h-16 md:h-28 w-auto" />
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
          display: inline-block;
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
        .ba-table tbody tr:hover { background: rgba(31,107,104,0.03); }
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

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .features-layout { grid-template-columns: 1fr !important; }
          .modules-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .sticky-cta-mobile { display: block; }
          .modules-grid { grid-template-columns: 1fr; }
          .hero-cta-group { width: 100%; }
          .primary-btn,
          .secondary-btn { width: 100%; }
          .hero-title,
          .section-title { max-width: none; }
          .stat-num { font-size: 32px !important; }
          .stat-label { font-size: 13px; }
          .section-padding { padding-top: 64px !important; padding-bottom: 64px !important; }
          .page-shell { padding-bottom: 72px; }
        }
      `}</style>

      <div className="grain" />

      <div className="page-shell">
        <div className="ambient-grid" />

        {/* ── HERO ── */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px clamp(24px, 5vw, 42px) 24px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, textAlign: "center" }}>
            <h1 className="hero-title fade-up delay-1" style={{ maxWidth: "none", margin: "0 auto" }}>
              Tu consultorio,
              <br />
              <em>funcionando</em>
              <br />
              <span style={{ marginLeft: "0.1em" }}>solo.</span>
            </h1>

            <p className="hero-summary fade-up delay-2" style={{ maxWidth: 620, margin: "16px auto 0", textAlign: "center" }}>
              DentalOS es el primer sistema de gestión inteligente construido para el consultorio odontológico argentino.
            </p>

            {/* VSL Embed */}
            <div
              ref={videoRef}
              className="fade-up delay-3"
              style={{
                width: "100%",
                maxWidth: 860,
                margin: "20px auto",
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

            <div className="fade-up delay-4">
              <button
                onClick={openCalPopup}
                className="primary-btn"
                style={{ padding: "20px 36px", fontSize: 14 }}
              >
                Agendar demo de 20 minutos →
              </button>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  color: "rgba(23,49,46,0.55)",
                  fontWeight: 500,
                }}
              >
                Sin compromiso. Sin tarjeta de crédito. Con el fundador.
              </p>
            </div>
          </div>
        </section>

        {/* ── CALENDARIO CAL.COM ── */}
        <div
          id="calendario-section"
          ref={calSectionRef}
          style={{
            opacity: calVisible ? 1 : 0,
            maxHeight: calVisible ? 2000 : 0,
            overflow: "hidden",
            transition: "all 0.8s ease",
            background: "rgba(255,255,255,0.6)",
            borderTop: "1px solid rgba(23,49,46,0.08)",
            borderBottom: "1px solid rgba(23,49,46,0.08)",
            padding: calVisible ? "80px clamp(24px, 5vw, 42px)" : "0 clamp(24px, 5vw, 42px)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Agendá tu demo</div>
            <h2 className="section-title" style={{ maxWidth: "none", margin: "0 auto 12px" }}>
              Elegí el horario que
              <br />
              <em>mejor te quede.</em>
            </h2>
            <p className="section-copy-mono" style={{ maxWidth: 480, margin: "0 auto 0" }}>
              Demo de 30 minutos con el fundador. Sin compromiso.
            </p>
          </div>
          <iframe
            src="https://cal.com/dentalos/30min?embed=true&layout=month_view"
            style={{ width: "100%", height: "600px", border: "none", borderRadius: "12px" }}
            title="Agendar demo DentalOS"
          />
        </div>

        {/* ── TRUST BAR ── */}
        <div className="trust-bar">
          <div className="trust-bar-inner">
            <span className="trust-item">🦷 Construido para odontología argentina</span>
            <span className="trust-item">📅 Pilotos activos en consultorios reales</span>
            <span className="trust-item">💰 Precio en USD, sin sorpresas de inflación</span>
            <span className="trust-item">🤝 Implementación personalizada por el fundador</span>
          </div>
        </div>

        <div className="divider" />

        {/* ── EL PROBLEMA ── */}
        <section className="section-padding" style={{ padding: "120px clamp(24px, 5vw, 42px)", maxWidth: 1200, margin: "0 auto" }}>
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
        </section>

        <div className="divider" />

        {/* ── ANTES / DESPUÉS ── */}
        <section className="section-padding" style={{ padding: "120px clamp(24px, 5vw, 42px)", maxWidth: 1200, margin: "0 auto" }}>
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

        {/* ── PRUEBA SOCIAL ── */}
        <section className="section-padding" style={{ padding: "120px clamp(24px, 5vw, 42px)", maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-tag">Resultados</div>
          <h2 className="section-title">
            Resultados
            <br />
            <em>reales.</em>
          </h2>
          <p className="section-copy-mono" style={{ maxWidth: 460, marginTop: 12, marginBottom: 48 }}>
            Primeros 30 días de piloto.
          </p>

          <div className="modules-grid">
            {heroStats.map((stat) => (
              <div key={stat.num} className="stat-card" style={{ padding: "36px 28px", textAlign: "center" }}>
                <div className="stat-num" style={{ fontSize: 48, marginBottom: 10 }}>{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="about-block" style={{ marginTop: 40 }}>
            <p className="about-copy" style={{ fontStyle: "italic", marginBottom: 12, fontSize: 18 }}>
              "Antes el domingo a la noche revisaba WhatsApp por si había mensajes de pacientes. Ahora no. Eso solo ya valió la implementación."
            </p>
            <p style={{ fontSize: 14, color: "rgba(23,49,46,0.55)", fontWeight: 600 }}>
              — Odontóloga, piloto activo, CABA
            </p>
          </div>
        </section>

        <div className="divider" />

        {/* ── FAQ ── */}
        <section className="section-padding" style={{ padding: "120px clamp(24px, 5vw, 42px)", maxWidth: 860, margin: "0 auto" }}>
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
        </section>

        <div className="divider" />

        {/* ── CTA FINAL ── */}
        <section className="section-padding" style={{ padding: "120px clamp(24px, 5vw, 42px) 92px", textAlign: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Demo</div>
            <h2 className="section-title" style={{ maxWidth: "none", margin: "0 auto 24px" }}>
              20 minutos para saber si DentalOS
              <br />
              <em>es para vos.</em>
            </h2>
            <p className="section-copy" style={{ maxWidth: 560, margin: "0 auto 40px" }}>
              No te pedimos que tomes ninguna decisión en la demo. Te mostramos el sistema funcionando, aplicado a un consultorio como el tuyo. La demo la hace el fundador. No un equipo de ventas.
            </p>
            <button
              onClick={openCalPopup}
              className="primary-btn"
              style={{ padding: "20px 36px", fontSize: 14 }}
            >
              Agendar mi demo de 20 minutos →
            </button>
            <p style={{ marginTop: 20, fontSize: 14, color: "rgba(23,49,46,0.55)", fontWeight: 500 }}>
              ✓ Sin compromiso de compra · ✓ Sin tarjeta de crédito · ✓ Con el fundador, no con un vendedor
            </p>
            <iframe
              src="https://cal.com/dentalos/30min?embed=true&layout=month_view"
              style={{ width: "100%", height: "600px", border: "none", borderRadius: "12px", marginTop: "32px" }}
              title="Agendar demo DentalOS"
            />
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            borderTop: "1px solid rgba(23,49,46,0.08)",
            padding: "30px clamp(24px, 5vw, 42px)",
            background: "rgba(255,255,255,0.6)",
            textAlign: "center",
          }}
        >
          <p style={{ color: "rgba(23,49,46,0.6)", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
            DentalOS — Sistema de gestión inteligente para consultorios odontológicos argentinos
          </p>
          <p style={{ color: "rgba(23,49,46,0.45)", fontSize: 13, fontWeight: 400 }}>
            Buenos Aires, Argentina · info@dentalos.com.ar
          </p>
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
