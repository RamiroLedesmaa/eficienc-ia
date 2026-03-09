import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Animated section wrapper ────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = "", style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// ─── Color schemes ───────────────────────────────────────────────────────────
const schemes = {
  emerald: {
    primary: "#059669",
    primaryHover: "#047857",
    primaryLight: "#f0fdf4",
    primaryBorder: "#bbf7d0",
    primarySoft: "rgba(5, 150, 105, 0.08)",
    primaryText: "#065f46",
    gradient: "linear-gradient(135deg, #059669, #10b981)",
    topBar: "#059669",
  },
  blue: {
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primaryLight: "#eff6ff",
    primaryBorder: "#bfdbfe",
    primarySoft: "rgba(37, 99, 235, 0.08)",
    primaryText: "#1e40af",
    gradient: "linear-gradient(135deg, #2563eb, #3b82f6)",
    topBar: "#2563eb",
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const painPoints = [
  { icon: "📋", title: "Copiar información", desc: "Datos que pasan manualmente entre sistemas, con riesgo de errores." },
  { icon: "📊", title: "Revisar planillas", desc: "Horas revisando Excel, organizando datos y cruzando información." },
  { icon: "📝", title: "Generar reportes", desc: "Reportes que podrían generarse automáticamente en segundos." },
];

const benefits = [
  { icon: "⏱", title: "Más tiempo", desc: "Tu equipo deja de hacer trabajo repetitivo y se enfoca en lo que importa." },
  { icon: "📊", title: "Procesos ordenados", desc: "La información fluye automáticamente entre tus sistemas." },
  { icon: "⚡", title: "Automatización inteligente", desc: "La IA ejecuta tareas que antes eran manuales, sin errores." },
  { icon: "🚀", title: "Implementación rápida", desc: "Soluciones simples y adaptadas a tu empresa, operativas en semanas." },
];

const beforeAfter = [
  { before: "Copiar datos manualmente", after: "Procesos automáticos" },
  { before: "Revisar planillas una por una", after: "Datos organizados al instante" },
  { before: "Hacer reportes manuales", after: "Reportes automáticos" },
  { before: "Horas de trabajo operativo", after: "Más tiempo para decisiones estratégicas" },
];

const steps = [
  { num: "01", title: "Analizamos tus procesos", desc: "Estudiamos cómo trabaja tu equipo día a día." },
  { num: "02", title: "Detectamos tareas repetitivas", desc: "Identificamos dónde se pierde tiempo y energía." },
  { num: "03", title: "Creamos automatizaciones con IA", desc: "Desarrollamos soluciones a medida para tu empresa." },
  { num: "04", title: "Tu empresa trabaja más simple", desc: "Menos fricción, más resultados, desde el día uno." },
];

const processes = [
  "Generación automática de reportes",
  "Clasificación de documentos",
  "Carga automática de datos",
  "Análisis de información",
  "Flujos de aprobación",
  "Consultas internas automatizadas",
];

const testimonials = [
  { name: "Martín Ríos", role: "CEO · TiendaMax", text: "En 3 semanas automatizamos la atención al cliente y reducimos los tickets manuales un 70%. El ROI fue inmediato.", initials: "MR" },
  { name: "Carolina Vega", role: "Directora Ops · LogiFlow", text: "Lo que más me sorprendió fue la velocidad. Teníamos miedo de que fuera un proceso largo y complejo. Para nada.", initials: "CV" },
  { name: "Sebastián Mora", role: "Fundador · EduPro", text: "Integraron un agente de IA en nuestra plataforma educativa y los usuarios lo adoptaron de forma natural desde el día uno.", initials: "SM" },
];

const faqs = [
  { q: "¿Cuánto tiempo tarda implementar una solución?", a: "Depende de la complejidad, pero la mayoría de nuestras implementaciones están activas entre 2 y 6 semanas. Comenzamos con un sprint de diagnóstico de 3 días para definir el alcance exacto." },
  { q: "¿Necesito tener conocimientos técnicos?", a: "Para nada. Nosotros nos encargamos de toda la parte técnica. Solo necesitás conocer tu negocio — nosotros traducimos eso en soluciones de IA." },
  { q: "¿Cuánto cuesta?", a: "Cada proyecto es diferente según el proceso, la complejidad y el alcance. Agendá el diagnóstico gratuito y en 24hs te damos un rango exacto y sin compromiso." },
  { q: "¿Qué pasa si la solución no funciona como esperaba?", a: "Incluimos soporte post-lanzamiento en todos nuestros proyectos y seguimos iterando hasta que el resultado sea exactamente el que buscás." },
  { q: "¿Trabajan con empresas de cualquier rubro?", a: "Sí. Hemos trabajado con e-commerce, servicios profesionales, logística, salud y educación. Si tenés un proceso repetitivo, muy probablemente podemos automatizarlo." },
];

const stats = [
  { num: "60hs", label: "Tiempo ahorrado por persona al mes en tareas repetitivas" },
  { num: "95%", label: "Reducción de errores humanos que retrasan el crecimiento" },
  { num: "24/7", label: "Opera sin mirar hora ni horario" },
  { num: "40%", label: "Reducción de costos operativos en atención al cliente" },
];

const specialties = ["Automatización de procesos", "Chatbots con IA", "Análisis predictivo", "Integración de LLMs", "Agentes autónomos", "Machine Learning"];

// ─── Main Component ──────────────────────────────────────────────────────────
const RutIA = () => {
  const [scheme, setScheme] = useState<"emerald" | "blue">("emerald");
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const c = schemes[scheme];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // TODO: Uncomment when Calendly section is re-enabled
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://assets.calendly.com/assets/external/widget.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => { document.body.removeChild(script); };
  // }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: "Inicio", id: "inicio" },
    { label: "Servicios", id: "servicios" },
    { label: "Cómo funciona", id: "proceso" },
    { label: "FAQ", id: "faq" },
    { label: "Contacto", id: "contacto" },
  ];

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: "#FAFAF8", color: "#1a1a2e", minHeight: "100vh", fontWeight: 500 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${c.primarySoft}; }
        @keyframes pulse-dot { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
      `}</style>

      {/* ── Top accent bar ── */}
      <div style={{ height: 4, background: c.gradient, position: "fixed", top: 0, left: 0, right: 0, zIndex: 200 }} />

      {/* ── Color toggle ── */}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 200, display: "flex", gap: 10, background: "white", padding: "10px 14px", borderRadius: 50, boxShadow: "0 4px 24px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb", alignItems: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em", marginRight: 4 }}>COLOR</span>
        {(["emerald", "blue"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setScheme(s)}
            style={{
              width: 28, height: 28, borderRadius: "50%", border: scheme === s ? "3px solid #1a1a2e" : "2px solid #d1d5db",
              background: s === "emerald" ? "#059669" : "#2563eb", cursor: "pointer", transition: "all 0.2s",
              transform: scheme === s ? "scale(1.15)" : "scale(1)",
            }}
            title={s === "emerald" ? "Verde esmeralda" : "Azul corporativo"}
          />
        ))}
      </div>

      {/* ── Header ── */}
      <header style={{
        position: "fixed", top: 4, left: 0, right: 0, zIndex: 100,
        padding: "16px clamp(20px, 5vw, 48px)",
        background: scrolled ? "rgba(250,250,248,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => scrollTo("inicio")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, fontWeight: 400, color: "#1a1a2e", letterSpacing: "-0.02em" }}>
              Rut<span style={{ color: c.primary, fontStyle: "italic" }}>IA</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#475569", transition: "color 0.2s", fontFamily: "'Manrope', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = c.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contacto")}
              style={{ background: c.primary, color: "white", border: "none", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background 0.2s", fontFamily: "'Manrope', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = c.primaryHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = c.primary)}
            >
              Diagnóstico gratis
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, flexDirection: "column", gap: 5 }}
          >
            <div style={{ width: 22, height: 2, background: "#1a1a2e", borderRadius: 2, transition: "all 0.3s", transform: isMenuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
            <div style={{ width: 22, height: 2, background: "#1a1a2e", borderRadius: 2, transition: "all 0.3s", opacity: isMenuOpen ? 0 : 1 }} />
            <div style={{ width: 22, height: 2, background: "#1a1a2e", borderRadius: 2, transition: "all 0.3s", transform: isMenuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
          </button>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      {isMenuOpen && (
        <div style={{ position: "fixed", inset: 0, top: 4, zIndex: 99, background: "rgba(250,250,248,0.98)", backdropFilter: "blur(16px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)} style={{ background: "none", border: "none", fontSize: 22, fontWeight: 600, color: "#1a1a2e", cursor: "pointer", fontFamily: "'Manrope', sans-serif" }}>
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo("contacto")} style={{ background: c.primary, color: "white", border: "none", padding: "14px 36px", borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "'Manrope', sans-serif" }}>
            Diagnóstico gratis
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px clamp(20px, 5vw, 48px) 80px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 64, alignItems: "center" }} className="hero-grid">
            <div>
              {/* Urgency badge */}
              <FadeIn>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: c.primarySoft, border: `1px solid ${c.primaryBorder}`, borderRadius: 100, padding: "8px 18px", marginBottom: 28 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.primary, animation: "pulse-dot 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: c.primaryText, letterSpacing: "0.04em" }}>QUEDAN 2 CUPOS DE DIAGNÓSTICO ESTA SEMANA</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1a1a2e", marginBottom: 24 }}>
                  La rutina de tu negocio,{" "}
                  <span style={{ color: c.primary, fontStyle: "italic" }}>rediseñada con IA.</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#475569", maxWidth: 480, marginBottom: 40 }}>
                  Automatizamos las tareas que más tiempo le consumen a tu equipo. Conectado a tus sistemas actuales. Operativo en semanas.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }} className="btn-group">
                  <button
                    onClick={() => scrollTo("contacto")}
                    style={{ background: c.primary, color: "white", border: "none", padding: "16px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "'Manrope', sans-serif", boxShadow: `0 4px 14px ${c.primarySoft}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = c.primaryHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = c.primary; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    Agendá tu diagnóstico gratis →
                  </button>
                  <button
                    onClick={() => scrollTo("servicios")}
                    style={{ background: "transparent", color: "#1a1a2e", border: "2px solid #e2e8f0", padding: "16px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "'Manrope', sans-serif" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primary; e.currentTarget.style.color = c.primary; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#1a1a2e"; }}
                  >
                    Ver servicios
                  </button>
                </div>
              </FadeIn>

              {/* Mini steps */}
              <FadeIn delay={0.4}>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }} className="steps-row">
                  {[["01", "Completás el formulario"], ["02", "Llamada de diagnóstico gratis"], ["03", "Recibís tu propuesta"]].map(([num, label]) => (
                    <div key={num} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${c.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: c.primary, flexShrink: 0 }}>{num}</div>
                      <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.4 }}>{label}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Stat cards */}
            <FadeIn delay={0.3}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {stats.map((s, i) => (
                  <div key={i} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "24px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "all 0.3s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primaryBorder; e.currentTarget.style.boxShadow = `0 4px 20px ${c.primarySoft}`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
                  >
                    <div style={{ fontSize: 32, fontWeight: 800, color: c.primary, letterSpacing: "-0.03em", marginBottom: 2 }}>{s.num}</div>
                    <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Specialties bar */}
          <FadeIn delay={0.5}>
            <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid #e5e7eb", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", marginRight: 8 }}>ESPECIALIDADES →</span>
              {specialties.map((tag) => (
                <span key={tag} style={{ display: "inline-block", border: `1px solid ${c.primaryBorder}`, color: c.primaryText, padding: "6px 14px", fontSize: 12, fontWeight: 600, borderRadius: 6, transition: "all 0.2s", cursor: "default" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = c.primarySoft; e.currentTarget.style.borderColor = c.primary; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = c.primaryBorder; }}
                >{tag}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section id="servicios" style={{ padding: "100px clamp(20px, 5vw, 48px)", background: "white" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.15, color: "#1a1a2e", marginBottom: 16 }}>
                Muchas empresas pierden horas en{" "}
                <span style={{ color: c.primary, fontStyle: "italic" }}>tareas repetitivas</span>
              </h2>
              <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.7 }}>
                Todos los días tu equipo pierde tiempo en procesos manuales que podrían ser automáticos.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {painPoints.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: "#FAFAF8", border: "1px solid #f1f5f9", borderRadius: 14, padding: "32px 28px", transition: "all 0.3s", height: "100%" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primaryBorder; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${c.primarySoft}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f1f5f9"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION STATEMENT ── */}
      <section style={{ padding: "80px clamp(20px, 5vw, 48px)", background: c.primaryLight }}>
        <FadeIn>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400, lineHeight: 1.2, color: "#1a1a2e" }}>
              RutIA simplifica esos procesos con{" "}
              <span style={{ color: c.primary, fontStyle: "italic" }}>inteligencia artificial</span>
            </h2>
            <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.7, marginTop: 16 }}>
              Analizamos tus rutinas de trabajo y desarrollamos automatizaciones con IA que eliminan tareas repetitivas.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ padding: "100px clamp(20px, 5vw, 48px)", background: "white" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.15, color: "#1a1a2e" }}>
                Qué cambia cuando usás{" "}
                <span style={{ color: c.primary, fontStyle: "italic" }}>RutIA</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {benefits.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: "#FAFAF8", border: "1px solid #f1f5f9", borderRadius: 14, padding: "28px 24px", transition: "all 0.3s", height: "100%" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primaryBorder; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f1f5f9"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{item.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section style={{ padding: "100px clamp(20px, 5vw, 48px)", background: "#FAFAF8" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.15, color: "#1a1a2e" }}>
                De procesos complejos a{" "}
                <span style={{ color: c.primary, fontStyle: "italic" }}>trabajo simple</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", border: "1px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "2px solid #f1f5f9" }}>
                <div style={{ padding: "18px 28px", fontWeight: 700, fontSize: 14, color: "#94a3b8", letterSpacing: "0.03em" }}>ANTES</div>
                <div style={{ padding: "18px 28px", fontWeight: 700, fontSize: 14, color: c.primaryText, letterSpacing: "0.03em", background: c.primarySoft }}>DESPUÉS CON RUTIA</div>
              </div>
              {beforeAfter.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: i < beforeAfter.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <div style={{ padding: "18px 28px", fontSize: 15, color: "#94a3b8", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#e2e8f0" }}>✕</span> {row.before}
                  </div>
                  <div style={{ padding: "18px 28px", fontSize: 15, color: c.primaryText, fontWeight: 500, background: c.primarySoft, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: c.primary }}>✓</span> {row.after}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="proceso" style={{ padding: "100px clamp(20px, 5vw, 48px)", background: "white" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.15, color: "#1a1a2e" }}>
                Cómo{" "}
                <span style={{ color: c.primary, fontStyle: "italic" }}>funciona</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ textAlign: "center", padding: "8px 0" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: c.primarySoft, border: `2px solid ${c.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 18, fontWeight: 800, color: c.primary }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSES WE SIMPLIFY ── */}
      <section style={{ padding: "80px clamp(20px, 5vw, 48px)", background: c.primaryLight }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400, lineHeight: 1.2, color: "#1a1a2e" }}>
                Procesos que podemos{" "}
                <span style={{ color: c.primary, fontStyle: "italic" }}>simplificar</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {processes.map((p, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px 22px", fontSize: 15, fontWeight: 500, color: "#1a1a2e", display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primary; e.currentTarget.style.background = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
                >
                  <span style={{ color: c.primary, fontWeight: 700, fontSize: 18 }}>→</span>
                  {p}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "100px clamp(20px, 5vw, 48px)", background: "white" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.15, color: "#1a1a2e" }}>
                Lo que dicen{" "}
                <span style={{ color: c.primary, fontStyle: "italic" }}>nuestros clientes</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: "#FAFAF8", border: "1px solid #f1f5f9", borderRadius: 14, padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primaryBorder; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f1f5f9"; }}
                >
                  <div style={{ fontSize: 40, color: c.primary, opacity: 0.3, lineHeight: 1, marginBottom: 12 }}>"</div>
                  <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, flex: 1, marginBottom: 24 }}>{t.text}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: c.primarySoft, border: `1px solid ${c.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: c.primary, flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{t.name}</div>
                      <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={{ padding: "80px clamp(20px, 5vw, 48px)", background: "#FAFAF8" }}>
        <FadeIn>
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400, lineHeight: 1.3, color: "#1a1a2e", marginBottom: 20 }}>
              La tecnología no tiene que ser{" "}
              <span style={{ color: c.primary, fontStyle: "italic" }}>complicada</span>
            </h2>
            <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.8 }}>
              En RutIA creemos que la mejor tecnología es la que simplifica el trabajo.
              Nuestro objetivo es simple: <strong style={{ color: "#1a1a2e" }}>hacer que los procesos dentro de tu empresa funcionen de forma más simple.</strong>
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "100px clamp(20px, 5vw, 48px)", background: "white" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.15, color: "#1a1a2e" }}>
                Preguntas{" "}
                <span style={{ color: c.primary, fontStyle: "italic" }}>frecuentes</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ borderTop: "1px solid #e5e7eb" }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%", background: "none", border: "none", cursor: "pointer",
                      padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                      fontFamily: "'Manrope', sans-serif", fontSize: 16, fontWeight: 600, color: "#1a1a2e", textAlign: "left",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = c.primary)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1a2e")}
                  >
                    <span>{faq.q}</span>
                    <span style={{ color: c.primary, fontSize: 24, fontWeight: 300, flexShrink: 0, transition: "transform 0.3s", display: "inline-block", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.25 }}
                      style={{ paddingBottom: 22, fontSize: 15, color: "#475569", lineHeight: 1.8 }}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT / CALENDLY ── (commented out - TODO: re-enable with real Calendly link)
      <section id="contacto" style={{ padding: "100px clamp(20px, 5vw, 48px) 60px", background: c.primaryLight }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.15, color: "#1a1a2e", marginBottom: 16 }}>
                El diagnóstico es gratis. La transformación{" "}
                <span style={{ color: c.primary, fontStyle: "italic" }}>empieza en 24hs.</span>
              </h2>
              <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
                Elegí un horario y en 30 minutos te mostramos exactamente dónde la IA puede simplificar tu trabajo. Sin compromiso.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/rutia/demo?hide_gdpr_banner=1&background_color=fafaf8&primary_color=059669"
                style={{ minWidth: 320, height: 660, width: "100%" }}
              />
            </div>
          </FadeIn>
        </div>
      </section>
      */}

      {/* ── FOOTER ── */}
      <footer style={{ padding: "32px clamp(20px, 5vw, 48px)", background: "white", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }} className="footer-grid">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: "#1a1a2e" }}>
              Rut<span style={{ color: c.primary, fontStyle: "italic" }}>IA</span>
            </span>
            <span style={{ fontSize: 13, color: "#94a3b8", marginLeft: 8 }}>Tu rutina con IA</span>
          </div>

          <span style={{ fontSize: 13, color: "#cbd5e1" }}>© 2026 RutIA — Todos los derechos reservados</span>

          <div style={{ display: "flex", gap: 20 }}>
            {["LinkedIn", "Instagram"].map((s) => (
              <a key={s} href="#" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = c.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >{s}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .footer-grid { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .btn-group { flex-direction: column !important; }
          .btn-group button { width: 100% !important; text-align: center !important; }
          .steps-row { flex-direction: column !important; gap: 16px !important; }
        }
      `}</style>
    </div>
  );
};

export default RutIA;
