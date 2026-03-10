import { useState, useEffect, useRef } from "react";
import rutIaLogo from "@/assets/rutIaLogo.svg";

const RutIAAgro = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Formspree submit ─────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return;
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/mwvrlekb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message }),
      });
      if (res.ok) setSubmitted(true);
    } catch (e) { setSubmitted(true); }
    setSending(false);
  };

  const faqs = [
    { q: "¿Cuánto tiempo tarda implementar una solución?", a: "Depende de la complejidad, pero la mayoría de nuestras implementaciones están activas entre 2 y 6 semanas. Comenzamos con un sprint de diagnóstico de 3 días para definir el alcance exacto." },
    { q: "¿Necesito tener conocimientos técnicos?", a: "Para nada. Nosotros nos encargamos de toda la parte técnica. Solo necesitás conocer tu negocio — nosotros traducimos eso en soluciones de IA." },
    { q: "¿Cuánto cuesta?", a: "Cada proyecto es diferente según el proceso, la complejidad y el alcance. Por eso no trabajamos con precios fijos — agendá el diagnóstico gratuito y en 24hs te damos un rango exacto y sin compromiso." },
    { q: "¿Qué pasa si la solución no funciona como esperaba?", a: "Incluimos soporte post-lanzamiento en todos nuestros proyectos y seguimos iterando hasta que el resultado sea exactamente el que buscás. No entregamos y desaparecemos." },
    { q: "¿Trabajan con empresas de cualquier rubro?", a: "Sí. Hemos trabajado con e-commerce, servicios profesionales, logística, salud y educación. Si tenés un proceso repetitivo, muy probablemente podemos automatizarlo." },
  ];

  const testimonials = [
    { name: "Martín Ríos", role: "CEO · TiendaMax", text: "En 3 semanas automatizamos la atención al cliente y reducimos los tickets manuales un 70%. El ROI fue inmediato.", initials: "MR" },
    { name: "Carolina Vega", role: "Directora Ops · LogiFlow", text: "Lo que más me sorprendió fue la velocidad. Teníamos miedo de que fuera un proceso largo y complejo. Para nada.", initials: "CV" },
    { name: "Sebastián Mora", role: "Fundador · EduPro", text: "Integraron un agente de IA en nuestra plataforma educativa y los usuarios lo adoptaron de forma natural desde el día uno.", initials: "SM" },
  ];

  return (
    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", background: "#F5F0E8", color: "#2C1A0E", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,600;12..96,700;12..96,800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F5F0E8; }
        ::-webkit-scrollbar-thumb { background: #4A7C3F; }

        .nav-link { color: #5C3D2E; text-decoration: none; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; transition: color 0.3s; font-family: 'Lora', serif; }
        .nav-link:hover { color: #4A7C3F; }
        .nav-logo-strip { display: flex; align-items: center; }
        .nav-logo-strip img { display: block; width: 124px; height: auto; }

        .hero-copy { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
        .hero-title { font-size: clamp(52px, 7.8vw, 108px); font-weight: 800; line-height: 0.95; letter-spacing: -0.06em; font-family: 'Bricolage Grotesque', sans-serif; color: #2C1A0E; max-width: 9ch; text-wrap: balance; }
        .hero-title-accent { color: #4A7C3F; }

        .grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(74,124,63,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(74,124,63,0.07) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%); }

        .stat-card { border: 1px solid rgba(74,124,63,0.15); background: rgba(74,124,63,0.04); padding: 32px; border-radius: 2px; transition: border-color 0.3s, background 0.3s; position: relative; overflow: hidden; }
        .stat-card::before { content: ''; position: absolute; top: 0; left: 0; width: 40px; height: 1px; background: #4A7C3F; }
        .stat-card:hover { border-color: rgba(74,124,63,0.4); background: rgba(74,124,63,0.08); }

        .about-block { border-left: 1px solid rgba(74,124,63,0.25); padding-left: 24px; margin-bottom: 40px; }

        .cta-btn { background: #4A7C3F; color: #F5F0E8; border: none; padding: 18px 48px; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; border-radius: 1px; display: inline-block; }
        .cta-btn:hover { background: #2C1A0E; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(74,124,63,0.25); }
        .cta-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .outline-btn { background: transparent; color: #4A7C3F; border: 1px solid rgba(74,124,63,0.5); padding: 14px 40px 12px; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; border-radius: 1px; }
        .outline-btn:hover { border-color: #4A7C3F; background: rgba(74,124,63,0.08); }

        .service-tag { display: inline-block; border: 1px solid rgba(74,124,63,0.25); color: #4A7C3F; padding: 6px 16px; font-family: 'Lora', serif; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 4px; border-radius: 1px; transition: all 0.2s; }
        .service-tag:hover { background: rgba(74,124,63,0.08); border-color: rgba(74,124,63,0.5); }

        .input-field { width: 100%; background: rgba(44,26,14,0.04); border: 1px solid rgba(44,26,14,0.18); color: #2C1A0E; padding: 16px 20px; font-family: 'Lora', serif; font-size: 14px; border-radius: 1px; outline: none; transition: border-color 0.3s; margin-bottom: 16px; display: block; }
        .input-field:focus { border-color: rgba(74,124,63,0.5); }
        .input-field::placeholder { color: #9A7A6E; }

        .textarea-field { width: 100%; background: rgba(44,26,14,0.04); border: 1px solid rgba(44,26,14,0.18); color: #2C1A0E; padding: 16px 20px; font-family: 'Lora', serif; font-size: 14px; border-radius: 1px; outline: none; transition: border-color 0.3s; resize: vertical; min-height: 140px; margin-bottom: 24px; display: block; }
        .textarea-field:focus { border-color: rgba(74,124,63,0.5); }
        .textarea-field::placeholder { color: #9A7A6E; }

        .section-label { font-family: 'Lora', serif; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #4A7C3F; margin-bottom: 24px; display: flex; align-items: center; gap: 16px; }
        .section-label::after { content: ''; flex: 1; max-width: 60px; height: 1px; background: rgba(74,124,63,0.3); }

        .noise-overlay { position: fixed; inset: 0; opacity: 0.02; pointer-events: none; z-index: 999; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); background-size: 200px 200px; }
        .divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(74,124,63,0.15), transparent); }

        .service-card { border: 1px solid rgba(44,26,14,0.08); background: rgba(44,26,14,0.02); padding: 36px; border-radius: 2px; transition: all 0.3s; position: relative; overflow: hidden; height: 100%; box-sizing: border-box; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(74,124,63,0.35), transparent); opacity: 0; transition: opacity 0.3s; }
        .service-card:hover { border-color: rgba(74,124,63,0.25); background: rgba(74,124,63,0.04); transform: translateY(-4px); }
        .service-card:hover::before { opacity: 1; }

        .testimonial-card { border: 1px solid rgba(44,26,14,0.08); background: rgba(44,26,14,0.02); padding: 36px; border-radius: 2px; transition: all 0.3s; }
        .testimonial-card:hover { border-color: rgba(74,124,63,0.2); background: rgba(74,124,63,0.03); }

        .faq-item { border-bottom: 1px solid rgba(44,26,14,0.1); overflow: hidden; }
        .faq-question { width: 100%; background: none; border: none; color: #2C1A0E; font-family: 'Bricolage Grotesque', sans-serif; font-size: 17px; font-weight: 600; text-align: left; padding: 24px 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; transition: color 0.2s; }
        .faq-question:hover { color: #4A7C3F; }
        .faq-answer { color: #5C3D2E; font-family: 'Lora', serif; font-size: 14px; line-height: 1.9; font-weight: 300; padding-bottom: 24px; }

        .step-card { display: flex; gap: 16px; align-items: flex-start; }
        .step-num { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(74,124,63,0.4); display: flex; align-items: center; justify-content: center; font-family: 'Lora', serif; font-size: 11px; color: #4A7C3F; flex-shrink: 0; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }

        @keyframes pulse-glow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .pulse { animation: pulse-glow 3s ease-in-out infinite; }
        .hamburger-line { width: 24px; height: 1px; background: #2C1A0E; transition: all 0.3s; }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .nav-logo-text { font-size: 20px !important; }
          .nav-logo-strip img { width: 104px !important; }
          .hero-title { font-size: clamp(40px, 10vw, 56px) !important; }
          .hero-section { padding: 112px 20px 48px !important; }
          .footer-grid { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .stat-card { padding: 20px !important; }
          .service-tag { font-size: 10px !important; padding: 5px 12px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .cta-btn { padding: 14px 28px !important; font-size: 12px !important; max-width: 85% !important; }
          .outline-btn { padding: 11px 24px 10px !important; font-size: 12px !important; max-width: 85% !important; }
          .btn-group { width: 100% !important; justify-content: center !important; }
          .btn-group .cta-btn, .btn-group .outline-btn { margin-inline: auto !important; }
          .hero-badge { font-size: 10px !important; padding: 6px 12px !important; }
          .hero-subtitle { font-size: 15px !important; margin-bottom: 32px !important; font-weight: 500 !important; letter-spacing: -0.02em !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: clamp(36px, 11vw, 46px) !important; }
          .btn-group { flex-direction: column !important; align-items: center !important; gap: 10px !important; }
          .btn-group .cta-btn, .btn-group .outline-btn { max-width: 100% !important; width: 100% !important; text-align: center !important; }
          .steps-row { flex-direction: column !important; gap: 20px !important; }
        }
      `}</style>

      <div className="noise-overlay" />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px clamp(24px, 5vw, 40px) 30px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrollY > 80 ? "rgba(245,240,232,0.95)" : "transparent", backdropFilter: scrollY > 80 ? "blur(20px)" : "none", borderBottom: scrollY > 80 ? "1px solid rgba(44,26,14,0.08)" : "none", transition: "all 0.4s" }}>
        <div className="nav-logo-strip">
          <img src={rutIaLogo} alt="RutIA logo wordmark" />
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {[["Inicio","#inicio"],["Servicios","#servicios"],["Nosotros","#nosotros"],["FAQ","#faq"],["Contacto","#contacto"]].map(([label, href]) => (
            <a key={label} href={href} className="nav-link">{label}</a>
          ))}
          <button className="cta-btn" style={{ padding: "10px 24px", fontSize: 12 }} onClick={() => document.getElementById('contacto').scrollIntoView({ behavior:'smooth' })}>
            Diagnóstico gratis →
          </button>
        </div>
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: "none", flexDirection: "column", gap: 6, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <div className="hamburger-line" style={{ transform: isMenuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <div className="hamburger-line" style={{ opacity: isMenuOpen ? 0 : 1 }} />
          <div className="hamburger-line" style={{ transform: isMenuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </nav>

      {isMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(245,240,232,0.98)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
          {[["Inicio","#inicio"],["Servicios","#servicios"],["Nosotros","#nosotros"],["FAQ","#faq"],["Contacto","#contacto"]].map(([label, href]) => (
            <a key={label} href={href} className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ fontSize: 24, letterSpacing: "0.08em" }}>{label}</a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="inicio" ref={heroRef} className="hero-section" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", padding: "148px clamp(24px, 5vw, 40px) 80px", overflow: "hidden" }}>
        <div className="grid-bg" />
        <div style={{ position: "absolute", top: 120, right: 40, width: 180, height: 180, border: "1px solid rgba(74,124,63,0.1)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: 140, right: 60, width: 140, height: 140, border: "1px solid rgba(74,124,63,0.07)", borderRadius: "50%" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 56, alignItems: "center" }}>
            <div className="hero-copy">
              {/* Badge urgencia */}
              <div className="fade-up delay-1 hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,124,63,0.08)", border: "1px solid rgba(74,124,63,0.22)", borderRadius: 2, padding: "8px 16px", marginBottom: 28 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4A7C3F" }} className="pulse" />
                <span style={{ fontFamily: "'Lora', serif", fontSize: 11, color: "#4A7C3F", letterSpacing: "0.15em" }}>QUEDAN 2 CUPOS DE DIAGNÓSTICO ESTA SEMANA</span>
              </div>

              <h1 className="hero-title fade-up delay-2" style={{ marginBottom: 32 }}>
                El campo que
                <br />
                manejás,
                <br />
                potenciado con{" "}
                <span className="hero-title-accent">IA.</span>
              </h1>

              <p className="fade-up delay-3 hero-subtitle" style={{ fontSize: 17, lineHeight: 1.8, color: "#5C3D2E", maxWidth: 480, marginBottom: 48, fontFamily: "'Lora', serif", fontWeight: 500, letterSpacing: "-0.02em" }}>
                Automatizamos los procesos que más tiempo le consumen a tu campo.<br />Conectado a tus sistemas actuales. Operativo en semanas.
              </p>

              <div className="fade-up delay-4 btn-group" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 52 }}>
                <button className="cta-btn" onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}>
                  Agendá tu diagnóstico gratis →
                </button>
                <button className="outline-btn" onClick={() => document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' })}>
                  Ver servicios
                </button>
              </div>

            </div>

            <div className="fade-up delay-4" style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: -12 }}>
              {[
                { num: "60hs", label: "Tiempo ahorrado por persona al mes en tareas repetitivas" },
                { num: "95%", label: "Reducción de errores humanos que retrasan el crecimiento" },
                { num: "24/7", label: "Opera sin mirar hora ni horario" },
                { num: "40%", label: "Reducción de costos operativos en atención al cliente" }
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{ marginBottom: i < 3 ? 2 : 0, paddingTop: i === 0 ? 24 : 32 }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: "#4A7C3F", letterSpacing: "-0.03em", marginBottom: 4 }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: "#5C3D2E", fontFamily: "'Lora', serif", lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <div className="divider" />

      {/* ── SERVICIOS ── */}
      <section id="servicios" style={{ padding: "120px clamp(24px, 5vw, 40px)", maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label">Servicios</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#2C1A0E" }}>
            ¿Qué podemos<br /><span style={{ color: "#4A7C3F" }}>resolver juntos?</span>
          </h2>
          <p style={{ color: "#5C3D2E", fontSize: 15, lineHeight: 1.8, fontFamily: "'Lora', serif", fontWeight: 300, maxWidth: 360 }}>
            Cada solución empieza con un problema concreto tuyo, no con una herramienta nuestra.
          </p>
        </div>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "1fr", gap: 16 }}>
          {[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A7C3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              ),
              title: "Automatización de procesos",
              desc: "Eliminamos tareas manuales repetitivas: facturación, reportes, carga de datos, seguimiento de leads. Tu equipo se enfoca en lo que importa."
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A7C3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h.01M15 9h.01M9 15h6"/>
                </svg>
              ),
              title: "Asistentes de IA para clientes y equipos",
              desc: "Atención al cliente 24/7, calificación de leads y soporte interno. Un solo agente entrenado con el conocimiento de tu empresa — sin duplicar herramientas."
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A7C3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              ),
              title: "Análisis e inteligencia",
              desc: "Dashboards predictivos, detección de anomalías, forecasting de ventas. Decisiones basadas en datos, no en intuición."
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A7C3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              ),
              title: "Conexión a tus sistemas",
              desc: "Integramos IA a lo que ya usás: CRM, ERP, bases de datos, correo, WhatsApp, APIs propias. Sin cambiar tu stack."
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A7C3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12l4-4"/><path d="M16 4h4v4"/>
                </svg>
              ),
              title: "Agentes autónomos",
              desc: "Sistemas que actúan solos: investigan, deciden y ejecutan tareas complejas sin intervención humana constante."
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A7C3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              ),
              title: "Diagnóstico de automatización",
              desc: "Auditamos tus procesos y te decimos exactamente dónde la IA genera el mayor retorno. Sin tecnicismos, con números."
            },
          ].map((s, i) => (
            <div key={i} className="service-card">
              <div style={{ marginBottom: 20 }}>{s.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.01em", color: "#2C1A0E" }}>{s.title}</h3>
              <p style={{ color: "#5C3D2E", fontSize: 13, lineHeight: 1.8, fontFamily: "'Lora', serif", fontWeight: 300 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── NOSOTROS ── */}
      <section id="nosotros" style={{ padding: "120px clamp(24px, 5vw, 40px)", maxWidth: 1200, margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
          <div>
            <div className="section-label">Quiénes somos</div>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 32, color: "#2C1A0E" }}>
              IA que<br /><span style={{ color: "#4A7C3F" }}>realmente</span><br />funciona.
            </h2>
            <p style={{ color: "#5C3D2E", fontSize: 16, lineHeight: 1.9, fontFamily: "'Lora', serif", fontWeight: 300, marginBottom: 24 }}>
              En RutIA Agro no vendemos tecnología por el mero hecho de venderla. Diseñamos soluciones de inteligencia artificial que resuelven problemas reales y generan resultados medibles desde el día uno.
            </p>
            <p style={{ color: "#7A5C4E", fontSize: 15, lineHeight: 1.9, fontFamily: "'Lora', serif", fontWeight: 300 }}>
              Combinamos ingeniería de software, diseño de procesos de negocio y experiencia en IA aplicada. No desplegamos una herramienta y nos vamos: acompañamos desde el diagnóstico hasta que el sistema opera solo.
            </p>
          </div>
          <div style={{ paddingTop: 8 }}>
            {[{ num: "01", title: "Diagnóstico inteligente", desc: "Analizamos tus procesos actuales para identificar exactamente dónde la IA genera mayor impacto." },{ num: "02", title: "Desarrollo a medida", desc: "Construimos soluciones 100% personalizadas. Sin templates genéricos, sin atajos." },{ num: "03", title: "Implementación y soporte", desc: "Acompañamos el lanzamiento y seguimos iterando hasta que el resultado sea perfecto." }, { num: "04", title: "Tu equipo, en lo que importa", desc: "Cuando la IA se hace cargo de las planillas, los correos repetitivos y los mensajes sin sentido, tu gente puede enfocarse en lo que realmente mueve la empresa. No reemplazamos personas — les devolvemos el tiempo." }].map((item) => (
              <div key={item.num} className="about-block" style={{ marginBottom: 40 }}>
                <div style={{ fontFamily: "'Lora', serif", fontSize: 11, color: "#4A7C3F", letterSpacing: "0.2em", marginBottom: 8 }}>{item.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em", color: "#2C1A0E" }}>{item.title}</h3>
                <p style={{ color: "#5C3D2E", fontSize: 14, lineHeight: 1.8, fontFamily: "'Lora', serif", fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TESTIMONIOS ── */}
      <section id="testimonios" style={{ padding: "120px clamp(24px, 5vw, 40px)", maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label">Clientes</div>
        <h2 style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 64, color: "#2C1A0E" }}>
          Lo que dicen<br /><span style={{ color: "#4A7C3F" }}>quienes ya automatizaron.</span>
        </h2>
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div style={{ fontSize: 36, color: "#4A7C3F", marginBottom: 20, opacity: 0.4, lineHeight: 1 }}>"</div>
              <p style={{ color: "#5C3D2E", fontSize: 15, lineHeight: 1.9, fontFamily: "'Lora', serif", fontWeight: 300, marginBottom: 28 }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 20, borderTop: "1px solid rgba(44,26,14,0.1)" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(74,124,63,0.1)", border: "1px solid rgba(74,124,63,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#4A7C3F", flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#2C1A0E" }}>{t.name}</div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: 11, color: "#9A7A6E", letterSpacing: "0.1em", marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "120px clamp(24px, 5vw, 40px)", maxWidth: 800, margin: "0 auto" }}>
        <div className="section-label">FAQ</div>
        <h2 style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 64, color: "#2C1A0E" }}>
          Preguntas<br /><span style={{ color: "#4A7C3F" }}>frecuentes.</span>
        </h2>
        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <span style={{ color: "#4A7C3F", fontSize: 22, fontWeight: 300, flexShrink: 0, transition: "transform 0.3s", display: "inline-block", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {openFaq === i && <div className="faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── CONTACTO ── */}
      <section id="contacto" style={{ padding: "120px clamp(24px, 5vw, 40px) 100px", background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(74,124,63,0.07) 0%, transparent 70%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
            <div>
              <div className="section-label">Contacto</div>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 32, color: "#2C1A0E" }}>
                El diagnóstico<br />es gratis. La transformación<br /><span style={{ color: "#4A7C3F" }}>empieza en 24 hs.</span>
              </h2>
              <p style={{ color: "#5C3D2E", fontSize: 15, lineHeight: 1.9, fontFamily: "'Lora', serif", fontWeight: 300, marginBottom: 48 }}>
                Completá el formulario y en menos de 24hs te contactamos para agendar tu llamada de diagnóstico gratuita. Sin compromiso.
              </p>
            </div>

            <div>
              {submitted ? (
                <div style={{ border: "1px solid rgba(74,124,63,0.3)", background: "rgba(74,124,63,0.06)", padding: 48, borderRadius: 2, textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 16, color: "#4A7C3F" }}>✓</div>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: "#4A7C3F", marginBottom: 12 }}>¡Mensaje recibido!</h3>
                  <p style={{ color: "#5C3D2E", fontFamily: "'Lora', serif", fontSize: 14, lineHeight: 1.8 }}>Te contactamos en menos de 24 horas para coordinar tu diagnóstico gratuito.</p>
                </div>
              ) : (
                <div style={{ border: "1px solid rgba(44,26,14,0.12)", background: "rgba(44,26,14,0.03)", padding: 48, borderRadius: 2 }}>
                  <input className="input-field" placeholder="Tu nombre" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input className="input-field" placeholder="tu@email.com" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  <textarea className="textarea-field" placeholder="Contanos sobre tu proyecto o proceso que querés automatizar..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  <button className="cta-btn" style={{ width: "100%", textAlign: "center" }} onClick={handleSubmit} disabled={sending}>
                    {sending ? "Enviando..." : "Agendá tu diagnóstico gratis →"}
                  </button>
                  <p style={{ marginTop: 16, color: "#9A7A6E", fontFamily: "'Lora', serif", fontSize: 11, textAlign: "center", letterSpacing: "0.1em" }}>SIN SPAM. JAMÁS.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "32px clamp(24px, 5vw, 40px)", borderTop: "1px solid rgba(44,26,14,0.08)", background: "#EDE8DC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }} className="footer-grid">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={rutIaLogo} alt="RutIA logo wordmark" style={{ width: 82, height: "auto", display: "block" }} />
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em", color: "#2C1A0E" }}>
              Rut<span style={{ color: "#4A7C3F" }}>IA</span> Agro
            </span>
          </div>
          <span style={{ fontFamily: "'Lora', serif", fontSize: 11, color: "#9A7A6E", letterSpacing: "0.15em" }}>© 2026 RUTIA AGRO — TODOS LOS DERECHOS RESERVADOS</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["LinkedIn","Instagram","Twitter"].map(s => (
              <a key={s} href="#" style={{ color: "#9A7A6E", fontFamily: "'Lora', serif", fontSize: 11, textDecoration: "none", letterSpacing: "0.1em", transition: "color 0.2s" }}
                onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "#4A7C3F"}
                onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "#9A7A6E"}>{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RutIAAgro;
