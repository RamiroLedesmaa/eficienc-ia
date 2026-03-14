import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import rutIaLogo from "@/assets/rutIaLogo.svg";
import WavePlane from "@/components/WavePlane";

const faqs = [
  { q: "¿Cuanto tiempo tarda implementar una solucion?", a: "Depende de la complejidad, pero la mayoria de nuestras implementaciones estan activas entre 2 y 6 semanas. Comenzamos con un diagnostico de 3 dias para definir el alcance exacto." },
  { q: "¿Necesito tener conocimientos tecnicos?", a: "Para nada. Nosotros nos encargamos de toda la parte tecnica. Solo necesitas conocer tu negocio — nosotros traducimos eso en soluciones de IA." },
  { q: "¿Cuanto cuesta?", a: "Cada proyecto es diferente segun el proceso, la complejidad y el alcance. Por eso no trabajamos con precios fijos — agenda el diagnostico gratuito y en 24hs te damos un rango exacto y sin compromiso." },
  { q: "¿Que pasa si la solucion no funciona como esperaba?", a: "Incluimos soporte post-lanzamiento en todos nuestros proyectos y seguimos iterando hasta que el resultado sea exactamente el que buscas." },
  { q: "¿Trabajan con empresas de cualquier rubro?", a: "Si. Hemos trabajado con clinicas, consultorios, e-commerce, servicios profesionales y mas. Si tenes un proceso repetitivo, muy probablemente podemos automatizarlo." },
];

const modules = [
  {
    title: "Historia clinica",
    description: "Accede al historial completo de cada paciente en segundos. Sin carpetas, sin Excel.",
  },
  {
    title: "Pacientes",
    description: "Seguimiento automatico de turnos, sesiones y controles. Que ningun paciente se pierda.",
  },
  {
    title: "Organizacion",
    description: "Agenda inteligente, recordatorios y tareas de tu equipo en un solo lugar.",
  },
  {
    title: "Facturacion",
    description: "Sabe exactamente quien debe, cuanto y desde cuando. Sin planillas.",
  },
  {
    title: "Chatbot",
    description: "Tus pacientes preguntan por WhatsApp y reciben respuesta al instante. 24/7.",
  },
];

const aboutBlocks = [
  { num: "01", title: "Diagnostico inteligente", desc: "Analizamos tus procesos actuales para identificar exactamente donde la IA genera mayor impacto." },
  { num: "02", title: "Desarrollo a medida", desc: "Construimos soluciones 100% personalizadas. Sin templates genericos, sin atajos." },
  { num: "03", title: "Implementacion y soporte", desc: "Acompañamos el lanzamiento y seguimos iterando hasta que el resultado sea perfecto." },
  { num: "04", title: "Tu equipo, en lo que importa", desc: "Cuando la IA se hace cargo de lo repetitivo, tu gente puede enfocarse en lo que realmente mueve el negocio." },
];

const stats = [
  { num: "60hs", label: "Tiempo ahorrado por persona al mes en tareas administrativas" },
  { num: "95%", label: "Reduccion de errores que afectan la atencion al paciente" },
  { num: "24/7", label: "Consultas respondidas sin que vos tengas que estar" },
  { num: "40%", label: "Reduccion de costos operativos en administracion y recepcion" },
];

const specialties = [
  "Automatizacion de procesos",
  "Chatbots con IA",
  "Historia clinica digital",
  "Agenda inteligente",
  "Integracion WhatsApp",
  "Facturacion automatica",
];

const ClinicLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;

    setSending(true);

    try {
      const response = await fetch("https://formspree.io/f/mwvrlekb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setSending(false);
    }
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
      }}
    >
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

        /* ── NAV ── */
        .nav-link {
          color: rgba(23,49,46,0.72);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: color 0.2s ease;
        }
        .nav-link:hover { color: #17312E; }
        .header-shell {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(23,49,46,0.08);
          box-shadow: 0 8px 28px rgba(23,49,46,0.07);
        }
        .desktop-nav .nav-link {
          padding: 10px 14px;
          border-radius: 999px;
        }
        .desktop-nav .nav-link:hover {
          background: rgba(31,107,104,0.08);
        }
        .nav-cta {
          padding: 14px 20px;
          box-shadow: none;
        }
        .logo-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }
        .logo-link img {
          display: block;
          width: 104px;
          height: auto;
        }
        .mobile-menu-btn {
          display: none;
          width: 52px;
          height: 52px;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          border: 1px solid rgba(23,49,46,0.1);
          background: rgba(255,255,255,0.82);
          color: #17312E;
          cursor: pointer;
          box-shadow: 0 14px 32px rgba(23,49,46,0.06);
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        .mobile-menu-btn:hover {
          transform: translateY(-1px);
          border-color: rgba(31,107,104,0.22);
          background: rgba(255,255,255,0.94);
        }
        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 48;
          background: rgba(23,49,46,0.18);
          backdrop-filter: blur(6px);
          animation: fadeIn 0.22s ease forwards;
        }
        .mobile-drawer {
          position: fixed;
          inset: 0 0 0 auto;
          z-index: 49;
          width: min(340px, 84vw);
          padding: 96px 18px 24px;
          background: rgba(255,255,255,0.96);
          border-left: 1px solid rgba(23,49,46,0.08);
          box-shadow: -24px 0 60px rgba(23,49,46,0.12);
          backdrop-filter: blur(20px);
          transform: translateX(100%);
          animation: slideInRight 0.26s ease forwards;
        }
        .mobile-panel-inner {
          display: grid;
          gap: 6px;
        }
        .mobile-link {
          display: block;
          padding: 14px 16px;
          border-radius: 18px;
          color: #17312E;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .mobile-link:hover {
          background: rgba(31,107,104,0.08);
        }
        .mobile-drawer .primary-btn {
          width: 100%;
          margin-top: 6px;
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
        }
        .secondary-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(31,107,104,0.28);
        }

        /* ── TYPOGRAPHY ── */
        .hero-title,
        .section-title {
          font-size: clamp(48px, 7vw, 100px);
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
          margin-left: -0.04em;
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
          font-size: 17px;
          font-weight: 500;
          line-height: 1.8;
        }
        .section-copy-mono {
          color: rgba(23,49,46,0.78);
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
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
          font-size: 13px;
          font-weight: 500;
          line-height: 1.5;
        }

        /* ── SPECIALTY TAGS ── */
        .specialties-bar {
          margin-top: 72px;
          padding-top: 40px;
          border-top: 1px solid rgba(23,49,46,0.08);
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        .specialties-label {
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          color: rgba(23,49,46,0.5);
          letter-spacing: 0.2em;
          margin-right: 8px;
          text-transform: uppercase;
        }
        .specialty-tag {
          display: inline-block;
          border: 1px solid rgba(31,107,104,0.18);
          color: #1F6B68;
          padding: 8px 16px;
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 999px;
          transition: all 0.2s ease;
          font-weight: 600;
        }
        .specialty-tag:hover {
          background: rgba(31,107,104,0.06);
          border-color: rgba(31,107,104,0.35);
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
          font-size: 14.5px;
          font-weight: 400;
          line-height: 1.7;
        }

        /* ── NOSOTROS ── */
        .nosotros-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
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
          font-size: 14.5px;
          font-weight: 400;
          line-height: 1.8;
        }

        /* ── CONTACT ── */
        .contact-card {
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(23,49,46,0.1);
          border-radius: 22px;
          box-shadow: 0 12px 40px rgba(23,49,46,0.1), 0 3px 10px rgba(23,49,46,0.05);
          padding: 36px;
        }
        .form-label {
          display: block;
          color: #17312E;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .input-field,
        .textarea-field {
          width: 100%;
          display: block;
          background: rgba(247,251,250,0.9);
          border: 1px solid rgba(23,49,46,0.12);
          color: #17312E;
          padding: 15px 16px;
          border-radius: 22px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          margin-bottom: 18px;
        }
        .input-field:focus,
        .textarea-field:focus {
          border-color: rgba(31,107,104,0.4);
          box-shadow: 0 0 0 3px rgba(31,107,104,0.08);
        }
        .textarea-field {
          resize: vertical;
          min-height: 136px;
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
          font-size: 15px;
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1180px) {
          .modules-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 960px) {
          .hero-layout,
          .nosotros-layout,
          .contact-layout { grid-template-columns: 1fr !important; }
          .nosotros-layout { gap: 40px !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .modules-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 720px) {
          .modules-grid { grid-template-columns: 1fr; }
          .hero-cta-group { width: 100%; }
          .primary-btn,
          .secondary-btn { width: 100%; }
          .hero-title,
          .section-title { max-width: none; }
          .specialties-bar { justify-content: center; }
          .specialties-label { width: 100%; text-align: center; }
        }
      `}</style>

      <WavePlane />
      <div className="grain" />

      <div className="page-shell">
        <div className="ambient-grid" />

        {/* ── NAV ── */}
        <nav
          style={{
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
          }}
        >
          <div className="header-shell">
            <a href="#inicio" className="logo-link" aria-label="Ir al inicio">
              <img src={rutIaLogo} alt="RutIA" />
            </a>

            <div className="desktop-nav">
              {[
                ["Servicios", "#servicios"],
                ["Nosotros", "#nosotros"],
                ["Contacto", "#contacto"],
              ].map(([label, href]) => (
                <a key={label} href={href} className="nav-link">
                  {label}
                </a>
              ))}
              <button
                className="primary-btn nav-cta"
                onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
              >
                Hablemos
              </button>
            </div>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={20} strokeWidth={2.2} /> : <Menu size={20} strokeWidth={2.2} />}
            </button>
          </div>
          {isMenuOpen && (
            <>
              <button
                type="button"
                className="mobile-overlay"
                aria-label="Cerrar menu"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="mobile-drawer">
                <div className="mobile-panel-inner">
                {[
                  ["Servicios", "#servicios"],
                  ["Nosotros", "#nosotros"],
                  ["Contacto", "#contacto"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="mobile-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
                <button
                  className="primary-btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Hablemos
                </button>
                </div>
              </div>
            </>
          )}
        </nav>

        {/* ── HERO ── */}
        <section
          id="inicio"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "140px clamp(24px, 5vw, 42px) 80px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
            <div
              className="hero-layout"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 420px",
                gap: 48,
                alignItems: "center",
              }}
            >
              <div>
                <h1 className="hero-title fade-up delay-1">
                  Tu rutina,
                  <br />
                  <em>rediseñada</em>
                  <br />
                  con IA.
                </h1>

                <p className="hero-summary fade-up delay-2">
                  Automatizamos las tareas que mas tiempo te consumen a vos y a tu equipo.
                  Conectado a tu forma de trabajar. Operativo en semanas.
                </p>

                <div
                  className="hero-cta-group fade-up delay-3"
                  style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 36 }}
                >
                  <button
                    className="primary-btn"
                    onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Agenda tu diagnostico gratis
                  </button>
                  <button
                    className="secondary-btn"
                    onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Ver servicios
                  </button>
                </div>
              </div>

              <div className="fade-up delay-3" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {stats.map((stat) => (
                  <div key={stat.num} className="stat-card">
                    <div className="stat-num">{stat.num}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <div className="divider" />

        {/* ── SERVICIOS ── */}
        <section id="servicios" style={{ padding: "120px clamp(24px, 5vw, 42px)", maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-tag">Servicios</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8, flexWrap: "wrap", gap: 24 }}>
            <h2 className="section-title">
              ¿Que podemos
              <br />
              <em>resolver juntos?</em>
            </h2>
            <p className="section-copy-mono" style={{ maxWidth: 380 }}>
              Cada solucion empieza con un problema concreto tuyo, no con una herramienta nuestra.
            </p>
          </div>

          <div className="modules-grid">
            {modules.map((module) => (
              <div key={module.title} className="module-card">
                <h3 className="module-title">{module.title}</h3>
                <p className="module-copy">{module.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ── NOSOTROS ── */}
        <section id="nosotros" style={{ padding: "120px clamp(24px, 5vw, 42px)", maxWidth: 1200, margin: "0 auto" }}>
          <div className="nosotros-layout">
            <div>
              <div className="section-tag">Nosotros</div>
              <h2 className="section-title">
                IA que
                <br />
                <em>realmente</em>
                <br />
                funciona.
              </h2>
              <p className="section-copy" style={{ maxWidth: 460, marginTop: 22 }}>
                Somos un equipo de ingenieros y diseñadores de procesos especializados en IA aplicada. Cada solucion que construimos esta hecha a medida del negocio que la necesita.
              </p>
            </div>

            <div className="about-blocks">
              {aboutBlocks.map((item) => (
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

        {/* ── FAQ ── */}
        <section style={{ padding: "120px clamp(24px, 5vw, 42px)", maxWidth: 860, margin: "0 auto" }}>
          <div className="section-tag">FAQ</div>
          <h2 className="section-title" style={{ marginBottom: 48 }}>
            Preguntas
            <br />
            <em>frecuentes.</em>
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

        {/* ── CONTACTO ── */}
        <section id="contacto" style={{ padding: "120px clamp(24px, 5vw, 42px) 92px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              className="contact-layout"
              style={{
                display: "grid",
                gridTemplateColumns: "0.95fr 1.05fr",
                gap: 48,
                alignItems: "start",
              }}
            >
              <div>
                <div className="section-tag">Contacto</div>
                <h2 className="section-title" style={{ maxWidth: "13ch" }}>
                  Contanos que
                  <br />
                  te gustaria
                  <br />
                  <em>automatizar.</em>
                </h2>
                <p className="section-copy-mono" style={{ maxWidth: 420, marginTop: 18 }}>
                  Agenda, historia clinica, cobros, seguimiento, WhatsApp — lo que sea. En 24hs te respondemos con un diagnostico gratis.
                </p>
              </div>

              {submitted ? (
                <div className="contact-card" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 52, color: "#1F6B68", marginBottom: 16 }}>✓</div>
                  <h3 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 12 }}>
                    Recibido
                  </h3>
                  <p className="section-copy-mono">
                    Te contacto para entender el caso y ver por donde empezar.
                  </p>
                </div>
              ) : (
                <div className="contact-card">
                  <label className="form-label" htmlFor="name">
                    Nombre
                  </label>
                  <input
                    id="name"
                    className="input-field"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  />

                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input-field"
                    placeholder="nombre@empresa.com"
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  />

                  <label className="form-label" htmlFor="message">
                    ¿Que te gustaria automatizar?
                  </label>
                  <textarea
                    id="message"
                    className="textarea-field"
                    placeholder="Contanos brevemente que procesos te consumen mas tiempo."
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  />

                  <button className="primary-btn" style={{ width: "100%" }} onClick={handleSubmit} disabled={sending}>
                    {sending ? "Enviando..." : "Enviar consulta"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            borderTop: "1px solid rgba(23,49,46,0.08)",
            padding: "30px clamp(24px, 5vw, 42px)",
            background: "rgba(255,255,255,0.6)",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 18,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={rutIaLogo} alt="RutIA" style={{ width: 84, height: "auto", display: "block" }} />
            </div>

            <div style={{ color: "rgba(23,49,46,0.5)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500, fontFamily: "'IBM Plex Mono', monospace" }}>
              © 2026 RutIA
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ClinicLanding;
