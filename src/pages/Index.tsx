import { useState, useEffect, useRef } from "react";

const EficiencIA = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mousePosRef = useRef({ x: -9999, y: -9999 });

  // Neural network canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const NODE_COUNT = 90;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
    }));

    const MAX_DIST = 160;
    const MOUSE_DIST = 200;
    const MOUSE_REPEL = 220;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      nodes.forEach(n => {
        n.pulse += n.pulseSpeed;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        const dx = n.x - mx, dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL && dist > 0) {
          const force = (MOUSE_REPEL - dist) / MOUSE_REPEL * 0.6;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
          const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
          if (speed > 3) { n.vx = (n.vx / speed) * 3; n.vy = (n.vy / speed) * 3; }
        }
        n.vx *= 0.995;
        n.vy *= 0.995;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.22;
            const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
            const mdx = midX - mx, mdy = midY - my;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            const boost = mDist < MOUSE_DIST ? (1 - mDist / MOUSE_DIST) * 0.55 : 0;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(57,255,143,${alpha + boost})`;
            ctx.lineWidth = boost > 0.1 ? 1 : 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        const dx = n.x - mx, dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nearMouse = dist < MOUSE_DIST;
        const glowIntensity = nearMouse ? (1 - dist / MOUSE_DIST) : 0;
        const pulseFactor = 0.5 + 0.5 * Math.sin(n.pulse);

        if (glowIntensity > 0) {
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 14);
          grd.addColorStop(0, `rgba(57,255,143,${glowIntensity * 0.4})`);
          grd.addColorStop(1, "rgba(57,255,143,0)");
          ctx.beginPath();
          ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulseFactor * 0.8 + glowIntensity * 2, 0, Math.PI * 2);
        ctx.fillStyle = nearMouse
          ? `rgba(57,255,143,${0.7 + glowIntensity * 0.3})`
          : `rgba(57,255,143,${0.15 + pulseFactor * 0.25})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = () => {
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  const glowX = (mousePos.x / window.innerWidth) * 100;
  const glowY = (mousePos.y / window.innerHeight) * 100;

  return (
    <div style={{
      fontFamily: "'Bricolage Grotesque', sans-serif",
      background: "#030303",
      color: "#f0f0f0",
      minHeight: "100vh",
      overflowX: "hidden",
      cursor: "default",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,600;12..96,700;12..96,800&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #030303; }
        ::-webkit-scrollbar-thumb { background: #39ff8f; }

        .nav-link {
          color: #888;
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: color 0.3s;
          font-family: 'IBM Plex Mono', monospace;
        }
        .nav-link:hover { color: #39ff8f; }

        .hero-title {
          font-size: clamp(40px, 6vw, 88px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.04em;
          font-family: 'Bricolage Grotesque', sans-serif;
          background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 50%, #39ff8f 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glow-dot {
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(57,255,143,0.08) 0%, transparent 70%);
          position: fixed;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: left 0.15s ease, top 0.15s ease;
          z-index: 0;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(57,255,143,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57,255,143,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }

        .stat-card {
          border: 1px solid rgba(57,255,143,0.12);
          background: rgba(57,255,143,0.03);
          padding: 32px;
          border-radius: 2px;
          transition: border-color 0.3s, background 0.3s;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40px; height: 1px;
          background: #39ff8f;
        }
        .stat-card:hover {
          border-color: rgba(57,255,143,0.4);
          background: rgba(57,255,143,0.06);
        }

        .about-block {
          border-left: 1px solid rgba(57,255,143,0.2);
          padding-left: 24px;
          margin-bottom: 40px;
        }

        .cta-btn {
          background: #39ff8f;
          color: #030303;
          border: none;
          padding: 18px 48px;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 1px;
          display: inline-block;
        }
        .cta-btn:hover {
          background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(57,255,143,0.3);
        }

        .outline-btn {
          background: transparent;
          color: #39ff8f;
          border: 1px solid rgba(57,255,143,0.4);
          padding: 16px 40px;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 1px;
        }
        .outline-btn:hover {
          border-color: #39ff8f;
          background: rgba(57,255,143,0.05);
        }

        .service-tag {
          display: inline-block;
          border: 1px solid rgba(57,255,143,0.2);
          color: #39ff8f;
          padding: 6px 16px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 4px;
          border-radius: 1px;
          transition: all 0.2s;
        }
        .service-tag:hover {
          background: rgba(57,255,143,0.08);
          border-color: rgba(57,255,143,0.5);
        }

        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #f0f0f0;
          padding: 16px 20px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          border-radius: 1px;
          outline: none;
          transition: border-color 0.3s;
          margin-bottom: 16px;
          display: block;
        }
        .input-field:focus {
          border-color: rgba(57,255,143,0.4);
        }
        .input-field::placeholder { color: #444; }

        .textarea-field {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #f0f0f0;
          padding: 16px 20px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          border-radius: 1px;
          outline: none;
          transition: border-color 0.3s;
          resize: vertical;
          min-height: 140px;
          margin-bottom: 24px;
          display: block;
        }
        .textarea-field:focus { border-color: rgba(57,255,143,0.4); }
        .textarea-field::placeholder { color: #444; }

        .section-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #39ff8f;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          max-width: 60px;
          height: 1px;
          background: rgba(57,255,143,0.3);
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          opacity: 0.025;
          pointer-events: none;
          z-index: 999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(57,255,143,0.15), transparent);
          margin: 0;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .pulse { animation: pulse-glow 3s ease-in-out infinite; }

        .hamburger-line {
          width: 24px; height: 1px;
          background: #f0f0f0;
          transition: all 0.3s;
        }
        
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-title { font-size: clamp(34px, 9vw, 52px) !important; }
          .footer-grid { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .stat-card { padding: 20px !important; }
          .cta-btn { padding: 14px 28px !important; font-size: 12px !important; }
          .service-tag { font-size: 10px !important; padding: 5px 12px !important; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 9vw !important; }
          .btn-group { flex-direction: column !important; }
          .btn-group button { width: 100% !important; }
        }
      `}</style>

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Mouse glow */}
      <div className="glow-dot" style={{ left: mousePos.x, top: mousePos.y }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "24px clamp(24px, 5vw, 40px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 80 ? "rgba(3,3,3,0.92)" : "transparent",
        backdropFilter: scrollY > 80 ? "blur(20px)" : "none",
        borderBottom: scrollY > 80 ? "1px solid rgba(255,255,255,0.04)" : "none",
        transition: "all 0.4s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#39ff8f", boxShadow: "0 0 12px #39ff8f",
          }} className="pulse" />
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
            Eficienc<span style={{ color: "#39ff8f" }}>IA</span>
          </span>
        </div>

        <div className="desktop-nav" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Inicio", "Nosotros", "Contacto"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
          ))}
          <button className="cta-btn" style={{ padding: "10px 24px", fontSize: 12 }}>
            Hablar con un experto
          </button>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: "none", flexDirection: "column", gap: 6,
            background: "none", border: "none", cursor: "pointer", padding: 4,
          }}
        >
          <div className="hamburger-line" style={{ transform: isMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <div className="hamburger-line" style={{ opacity: isMenuOpen ? 0 : 1 }} />
          <div className="hamburger-line" style={{ transform: isMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(3,3,3,0.97)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 40,
        }}>
          {["Inicio", "Nosotros", "Contacto"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link"
              onClick={() => setIsMenuOpen(false)}
              style={{ fontSize: 24, letterSpacing: "0.08em" }}>
              {item}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="inicio" ref={heroRef} style={{
        minHeight: "100vh", position: "relative",
        display: "flex", alignItems: "center",
        padding: "120px clamp(24px, 5vw, 40px) 80px",
        overflow: "hidden",
      }}>
        {/* Neural network canvas */}
        <canvas ref={canvasRef} style={{
          position: "fixed", top: 0, left: 0,
          width: "100vw", height: "100vh",
          pointerEvents: "none", zIndex: 0,
          opacity: 0.85,
        }} />

        <div className="grid-bg" />

        {/* Decorative corner lines */}
        <div style={{
          position: "absolute", top: 120, right: 40,
          width: 180, height: 180,
          border: "1px solid rgba(57,255,143,0.08)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", top: 140, right: 60,
          width: 140, height: 140,
          border: "1px solid rgba(57,255,143,0.05)",
          borderRadius: "50%",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 80, alignItems: "center" }}>
            <div>
              <div className="section-label fade-up delay-1">
                <span>Agencia de IA</span>
              </div>

              <h1 className="hero-title fade-up delay-2" style={{ marginBottom: 32 }}>
                Automatizá.<br />
                Escalá.<br />
                <span style={{ fontStyle: "italic", opacity: 0.6 }}>Dominá.</span>
              </h1>

              <p className="fade-up delay-3" style={{
                fontSize: 18, lineHeight: 1.7, color: "#d0d0d0",
                maxWidth: 480, marginBottom: 48,
                fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300,
              }}>
                Transformamos procesos lentos en sistemas inteligentes. 
                Desarrollamos soluciones de IA que trabajan por vos, 24/7.
              </p>

              <div className="fade-up delay-4 btn-group" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="cta-btn" onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}>
                  Comenzar ahora
                </button>
                <button className="outline-btn" onClick={() => document.getElementById('nosotros').scrollIntoView({ behavior: 'smooth' })}>
                  Conocer más
                </button>
              </div>
            </div>

            {/* Stats panel */}
            <div className="fade-up delay-4" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { num: "10×", label: "Más rápido que procesos manuales" },
                { num: "98%", label: "Precisión en automatizaciones" },
                { num: "24/7", label: "Operación continua sin interrupciones" },
                { num: "60%", label: "Reducción de costos operativos" },
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{ marginBottom: i < 3 ? 2 : 0 }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: "#39ff8f", letterSpacing: "-0.03em", marginBottom: 4 }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: 13, color: "#ccc", fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services tags */}
          <div style={{ marginTop: 80, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#444", letterSpacing: "0.2em", marginRight: 16 }}>
              ESPECIALIDADES →
            </span>
            {["Automatización de procesos", "Chatbots con IA", "Análisis predictivo", "Integración de LLMs", "Agentes autónomos", "Machine Learning"].map(tag => (
              <span key={tag} className="service-tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ABOUT */}
      <section id="nosotros" style={{
        padding: "120px clamp(24px, 5vw, 40px)",
        maxWidth: 1200, margin: "0 auto",
      }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
          
          <div>
            <div className="section-label">Quiénes somos</div>
            <h2 style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: "-0.03em", marginBottom: 32,
            }}>
              IA que<br />
              <span style={{ color: "#39ff8f" }}>realmente</span><br />
              funciona.
            </h2>
            <p style={{ color: "#ccc", fontSize: 16, lineHeight: 1.9, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300, marginBottom: 24 }}>
              En EficiencIA no vendemos tecnología por el mero hecho de venderla. 
              Diseñamos soluciones de inteligencia artificial que resuelven problemas reales 
              y generan resultados medibles desde el día uno.
            </p>
            <p style={{ color: "#d0d0d0", fontSize: 15, lineHeight: 1.9, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300 }}>
              Somos un equipo obsesionado con la eficiencia, que combina experiencia en 
              ingeniería, diseño de sistemas y estrategia de negocio para entregar 
              automatizaciones que escalan con tu empresa.
            </p>
          </div>

          <div style={{ paddingTop: 8 }}>
            {[
              {
                num: "01",
                title: "Diagnóstico inteligente",
                desc: "Analizamos tus procesos actuales para identificar exactamente dónde la IA genera mayor impacto."
              },
              {
                num: "02",
                title: "Desarrollo a medida",
                desc: "Construimos soluciones 100% personalizadas. Sin templates genéricos, sin atajos."
              },
              {
                num: "03",
                title: "Implementación y soporte",
                desc: "Acompañamos el lanzamiento y seguimos iterando hasta que el resultado sea perfecto."
              },
            ].map((item) => (
              <div key={item.num} className="about-block" style={{ marginBottom: 40 }}>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
                  color: "#39ff8f", letterSpacing: "0.2em", marginBottom: 8
                }}>
                  {item.num}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.8, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CONTACT */}
      <section id="contacto" style={{
        padding: "120px clamp(24px, 5vw, 40px) 100px",
        background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(57,255,143,0.04) 0%, transparent 70%)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
            
            <div>
              <div className="section-label">Contacto</div>
              <h2 style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 800, lineHeight: 1.05,
                letterSpacing: "-0.03em", marginBottom: 32,
              }}>
                ¿Listo para<br />
                transformar tu<br />
                <span style={{ color: "#39ff8f" }}>negocio?</span>
              </h2>
              <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.9, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300, marginBottom: 48 }}>
                Contanos sobre tu proyecto. Respondemos en menos de 24 horas 
                con un análisis inicial sin costo ni compromiso.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { label: "Email", value: "hola@eficiencia.ai" },
                  { label: "Respuesta", value: "Menos de 24hs" },
                  { label: "Consulta inicial", value: "Sin cargo" },
                ].map(info => (
                  <div key={info.label} style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#39ff8f", letterSpacing: "0.2em", minWidth: 100 }}>
                      {info.label.toUpperCase()}
                    </span>
                    <span style={{ color: "#d0d0d0", fontSize: 14, fontFamily: "'IBM Plex Mono', monospace" }}>
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {submitted ? (
                <div style={{
                  border: "1px solid rgba(57,255,143,0.3)",
                  background: "rgba(57,255,143,0.04)",
                  padding: 48, borderRadius: 2, textAlign: "center",
                }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: "#39ff8f", marginBottom: 12 }}>
                    ¡Mensaje recibido!
                  </h3>
                  <p style={{ color: "#ccc", fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, lineHeight: 1.8 }}>
                    Te contactamos en menos de 24 horas.
                  </p>
                </div>
              ) : (
                <div style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.015)",
                  padding: 48, borderRadius: 2,
                }}>
                  <input
                    className="input-field"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    className="input-field"
                    placeholder="tu@email.com"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                  <textarea
                    className="textarea-field"
                    placeholder="Contanos sobre tu proyecto o proceso que querés automatizar..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                  <button className="cta-btn" style={{ width: "100%", textAlign: "center" }} onClick={handleSubmit}>
                    Enviar mensaje →
                  </button>
                  <p style={{ marginTop: 16, color: "#444", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, textAlign: "center", letterSpacing: "0.1em" }}>
                    SIN SPAM. JAMÁS.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "32px clamp(24px, 5vw, 40px)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        background: "#030303",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 16,
        }} className="footer-grid">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#39ff8f" }} />
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>
              Eficienc<span style={{ color: "#39ff8f" }}>IA</span>
            </span>
          </div>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
            color: "#333", letterSpacing: "0.15em",
          }}>
            © 2025 EFICIENCIA AI — TODOS LOS DERECHOS RESERVADOS
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["LinkedIn", "Instagram", "Twitter"].map(s => (
              <a key={s} href="#" style={{ color: "#444", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, textDecoration: "none", letterSpacing: "0.1em", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#39ff8f"}
                onMouseLeave={e => e.target.style.color = "#444"}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EficiencIA;
