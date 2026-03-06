import { useState, useEffect, useRef } from "react";

// ─── Logo SVG component ───────────────────────────────────────────────────────
const Logo = ({ size = 36, color = "#39ff8f" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 250 250"
    fill="none"
    style={{ display: "block", flexShrink: 0 }}
  >
    <path
      d="m236.8 106.4c-0.71 0-1.4 0.12-2.05 0.34l-14.11-32.79c1.99-1.66 3.04-4.52 2.11-7.49-1.57-5.18-7.22-6.24-10.82-3.69l-27.07-23.2c1.04-3.05-0.08-7.22-3.56-8.94-4.21-2.02-8.06 0.04-9.79 3.29l-40.34-9.01c-0.69-3.91-3.04-5.9-6.16-5.9h-0.01c-3.8 0-5.74 2.63-6.57 5.56l-42.64 8.02c-1.88-2.74-4.5-4.07-8.06-3.26-4.58 1.09-5.93 5.92-4.96 8.79l-23.68 16.46c-2.86-2.19-7.21-2-9.48 1.45-2.32 3.59-1.3 7.11 0.9 9.43l-15.88 25.37c-4.49-0.66-7.98 2.79-7.58 7.49 0.39 4.06 3.21 6 6.33 6.4l8.55 26.68c-3.2 1.72-4.6 5.67-2.62 9.32 2.82 5.28 9.45 4.01 11.67-0.45l28.6 5.48c0.86 5.82 5.86 7.75 9.5 6.32l15.32 17.56c-2.1 3.64-1.09 7.79 3.04 9.35 4.92 1.9 8.37-1.16 9.34-5.21l24.81-3.15c1.77 4.01 5.45 4.51 8.61 3.85l33.84 43.73c-2.31 3.91-1.51 8.53 3.41 10.47 4.68 1.85 8.69-2.25 8.49-6.25-0.2-3.69-2.61-6.15-5.83-7.24l-2.82-22.25c2.66-1.19 3.79-3.13 4.11-5.59l17.61-4.15c2.08 3.15 5.45 4.48 9.13 2.9 4.49-1.94 4.97-6.31 3.14-9.37l14.65-14c3 1.58 7.49 1.19 9.4-2.87 1.57-3.55 0.16-6.6-2.06-8.55l12.03-31.79c5 0.2 7.3-3.55 7.1-6.89-0.32-3.65-2.62-6.22-5.6-6.22zm-6.11 1.42c-1.13 0.88-1.86 1.94-2.35 2.5l-29.11-2.14c-0.6-1.52-1.25-2.54-2.22-3.1l16.93-29.86c0.89 0.2 1.59 0.2 2.56 0l14.19 32.6zm-21.55-42.69-45.18-0.2c-0.32-0.99-0.81-1.97-1.46-2.76l13.6-18.65c2.58 0.72 4.59 0.1 5.8-0.89l26.83 22.69c0.16 0.3 0.16-0.09 0.41-0.19zm-77.85-35.76 39.46 8.23c0.24 1.38 0.89 2.56 1.7 3.45l-13.68 19.24c-1.53-0.5-3.14-0.5-4.18-0.2l-23.79-30.27c0.16-0.2 0.33-0.3 0.49-0.45zm-8.7 2.96c1.61 0.6 3.54 0.6 4.89-0.19l22.31 30.08c-0.24 0.3-0.4 0.69-0.56 1.08l-38.78-8.13c-0.48-1.33-1.09-2.42-1.82-3.3l13.96-19.54zm-45.15 4.58 41.19-7.73c0 0.59 0.17 0.98 0.33 1.48l-13.76 18.16c-2.74-0.79-5.32-0.1-7.09 1.47l-20.92-12.4c0.08-0.29 0.16-0.59 0.25-0.98zm-12.21 4.83c1.27 0.89 2.5 1.39 3.94 1.49l11.87 41.66-0.81 0.69-37.55-24.7c0.08-1.18-0.08-2.56-0.81-3.35l23.36-15.79zm-46.78 61.69 1.35-0.79 20.03 8.51c-0.32 1.94 0.08 3.78 0.81 5.06l-12.8 14.7c-0.97-0.49-1.94-0.69-2.75-0.69l-8.05-26.2c0.61-0.29 1.01-0.49 1.41-0.59zm41.29 38.57-27.31-5.48c-0.08-1.28-0.48-2.46-1.09-3.45l12.59-14.89c1.53 0.79 3.3 1.08 4.75 0.69l12.51 21.65c-0.73 0.3-1.21 0.79-1.45 1.48zm-8.34-34.18c-1.35-1.38-2.97-2.07-4.49-2.17l-7.97-39.54 1.34-0.88 38.16 24.7c-0.16 0.89-0.08 1.97 0.24 2.86l-27.28 15.03zm13.59 30.13-12.11-20.76c1.45-1.94 1.77-4.2 1.05-6.24l26.06-14.4 0.81 0.69-14.72 40.71c-0.29-0.1-0.69-0.1-1.09 0zm6.55 1.73 13.59-41.66c3.12 0.1 5.34-1.08 6.46-1.87l26.15 14.8c-0.24 0.79-0.4 1.67-0.4 2.56l-44.19 26.37c-0.48-0.2-1.05-0.3-1.61-0.2zm15.11-55.28-13.01-43.15 0.89-0.79 22.23 13.68c-0.48 2.55 0 5.01 1.37 6.74l-11.48 23.52zm3.38 81.98-17.6-17.76c0.8-1.63 0.8-3.2 0.4-4.58l45.97-25.27-26.97 47.71c-0.56-0.2-1.24-0.2-1.8-0.1zm6.26 3.55-1.25-1.74 27.71-48.43 2.3 42.57c-3.37 1.18-4.25 3.64-4.58 5.37l-24.18 2.23zm23.78-63.19-27.96-14.84c0.65-2.76-0.32-4.8-1.77-6.08l12.36-23.4c0.73 0.1 1.37 0 1.94-0.2l15.99 43.93-0.56 0.59zm5.43-0.79c-0.73-0.19-1.46-0.19-2.27-0.1l-15.4-45.12c0.64-0.59 1.13-1.28 1.45-1.97l40.19 8.33c0.32 1.18 0.73 2.17 1.37 2.96l-25.34 35.9zm5.14 3.91-0.56-1.18 24.19-35.31c2.01 0.88 4.26 0.88 5.79 0.09l26.38 32.79c-0.48 0.59-0.81 1.28-1.05 2.07l-54.75 1.54zm36.29 104.4-32.28-40.32 23.71 11.11c-0.48 4.15 1.78 7.5 5.6 8.29l2.97 20.92zm-4.88-33.57c-1.53 0.2-2.8 0.79-3.84 1.88l-23.72-13.37c-0.24-0.89-0.64-1.67-1.21-2.36l32.45-16.36c0.72 0.59 1.45 1.08 2.34 1.38l-6.02 28.83zm4.88-40.45-34.78-24.5 0.49-0.99 52.75-1.94c0.4 1.08 0.97 1.97 1.86 2.66l-14.56 23.39c-2.17-0.69-4.18-0.1-5.76 1.38zm4.27 42.03c-0.97-1.94-2.32-3.02-3.51-3.51l5.25-26.66 1.61-0.5 14.91 23.6c-0.97 1.18-1.62 2.47-1.78 3.95l-16.48 3.12zm38.63-112 1.05 2.94-17.68 30.35c-1.35-0.3-2.8-0.3-4.07 0.1l-25.17-33.39 0.65-1.38 43.53 1.09c0.4 0 1.04 0.1 1.69 0.29zm-13.79 103.6c-0.97-0.39-2.14-0.59-3.31-0.49l-14.83-23.5 0.48-0.89 32.82 7.44c0.33 1.18 0.89 2.27 1.54 3.06l-13.83 14.49c-0.81-0.3-1.86-0.4-2.87-0.11zm15.89-21.2-33.63-8.03c0-1.84-0.56-3.52-1.61-4.8l14.04-22.99c1.16 0.3 2.21 0.3 3.1 0l18.67 34.06c-0.57 0.49-0.73 1.08-0.57 1.76zm7.73-3.74c-0.57-0.1-1.13-0.2-1.7-0.2l-20.1-34.06c0.89-0.79 1.54-1.87 1.94-2.96l28.79 3.06c0.48 1.94 1.62 3.32 3.06 4.11l-11.99 30.05z"
      fill={color}
    />
  </svg>
);

const RutIA = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mousePosRef = useRef({ x: -9999, y: -9999 });

  // ─── Neural network canvas ───────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
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

    const MAX_DIST = 160, MOUSE_DIST = 200, MOUSE_REPEL = 220;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mousePosRef.current.x, my = mousePosRef.current.y;

      nodes.forEach(n => {
        n.pulse += n.pulseSpeed;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        const dx = n.x - mx, dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL && dist > 0) {
          const force = (MOUSE_REPEL - dist) / MOUSE_REPEL * 0.6;
          n.vx += (dx / dist) * force; n.vy += (dy / dist) * force;
          const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
          if (speed > 3) { n.vx = (n.vx / speed) * 3; n.vy = (n.vy / speed) * 3; }
        }
        n.vx *= 0.995; n.vy *= 0.995;
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
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(57,255,143,${alpha + boost})`;
            ctx.lineWidth = boost > 0.1 ? 1 : 0.5; ctx.stroke();
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
          ctx.beginPath(); ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
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
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    const handleMouse = (e) => { setMousePos({ x: e.clientX, y: e.clientY }); mousePosRef.current = { x: e.clientX, y: e.clientY }; };
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("mousemove", handleMouse); window.removeEventListener("scroll", handleScroll); };
  }, []);

  // ─── Formspree submit ─────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return;
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/xnjgqdvq", {
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
    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", background: "#030303", color: "#f0f0f0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,600;12..96,700;12..96,800&family=IBM+Plex+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #030303; }
        ::-webkit-scrollbar-thumb { background: #39ff8f; }

        .nav-link { color: #e0e0e0; text-decoration: none; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; transition: color 0.3s; font-family: 'IBM Plex Mono', monospace; }
        .nav-link:hover { color: #39ff8f; }

        .hero-title { font-size: clamp(40px, 6vw, 88px); font-weight: 800; line-height: 1.05; letter-spacing: -0.04em; font-family: 'Bricolage Grotesque', sans-serif; background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 50%, #39ff8f 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .glow-dot { width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(57,255,143,0.08) 0%, transparent 70%); position: fixed; pointer-events: none; transform: translate(-50%, -50%); transition: left 0.15s ease, top 0.15s ease; z-index: 0; }

        .grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(57,255,143,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,143,0.04) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%); }

        .stat-card { border: 1px solid rgba(57,255,143,0.12); background: rgba(57,255,143,0.03); padding: 32px; border-radius: 2px; transition: border-color 0.3s, background 0.3s; position: relative; overflow: hidden; }
        .stat-card::before { content: ''; position: absolute; top: 0; left: 0; width: 40px; height: 1px; background: #39ff8f; }
        .stat-card:hover { border-color: rgba(57,255,143,0.4); background: rgba(57,255,143,0.06); }

        .about-block { border-left: 1px solid rgba(57,255,143,0.2); padding-left: 24px; margin-bottom: 40px; }

        .cta-btn { background: #39ff8f; color: #030303; border: none; padding: 18px 48px; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; border-radius: 1px; display: inline-block; }
        .cta-btn:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 0 40px rgba(57,255,143,0.3); }
        .cta-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .outline-btn { background: transparent; color: #39ff8f; border: 1px solid rgba(57,255,143,0.4); padding: 16px 40px; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; border-radius: 1px; }
        .outline-btn:hover { border-color: #39ff8f; background: rgba(57,255,143,0.05); }

        .service-tag { display: inline-block; border: 1px solid rgba(57,255,143,0.2); color: #39ff8f; padding: 6px 16px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 4px; border-radius: 1px; transition: all 0.2s; }
        .service-tag:hover { background: rgba(57,255,143,0.08); border-color: rgba(57,255,143,0.5); }

        .input-field { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.22); color: #f0f0f0; padding: 16px 20px; font-family: 'IBM Plex Mono', monospace; font-size: 14px; border-radius: 1px; outline: none; transition: border-color 0.3s; margin-bottom: 16px; display: block; }
        .input-field:focus { border-color: rgba(57,255,143,0.4); }
        .input-field::placeholder { color: #888; }

        .textarea-field { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.22); color: #f0f0f0; padding: 16px 20px; font-family: 'IBM Plex Mono', monospace; font-size: 14px; border-radius: 1px; outline: none; transition: border-color 0.3s; resize: vertical; min-height: 140px; margin-bottom: 24px; display: block; }
        .textarea-field:focus { border-color: rgba(57,255,143,0.4); }
        .textarea-field::placeholder { color: #888; }

        .section-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #39ff8f; margin-bottom: 24px; display: flex; align-items: center; gap: 16px; }
        .section-label::after { content: ''; flex: 1; max-width: 60px; height: 1px; background: rgba(57,255,143,0.3); }

        .noise-overlay { position: fixed; inset: 0; opacity: 0.025; pointer-events: none; z-index: 999; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); background-size: 200px 200px; }
        .divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(57,255,143,0.15), transparent); }

        .service-card { border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); padding: 36px; border-radius: 2px; transition: all 0.3s; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(57,255,143,0.3), transparent); opacity: 0; transition: opacity 0.3s; }
        .service-card:hover { border-color: rgba(57,255,143,0.2); background: rgba(57,255,143,0.03); transform: translateY(-4px); }
        .service-card:hover::before { opacity: 1; }

        .testimonial-card { border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); padding: 36px; border-radius: 2px; transition: all 0.3s; }
        .testimonial-card:hover { border-color: rgba(57,255,143,0.15); background: rgba(57,255,143,0.02); }

        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.06); overflow: hidden; }
        .faq-question { width: 100%; background: none; border: none; color: #f0f0f0; font-family: 'Bricolage Grotesque', sans-serif; font-size: 17px; font-weight: 600; text-align: left; padding: 24px 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; transition: color 0.2s; }
        .faq-question:hover { color: #39ff8f; }
        .faq-answer { color: #ccc; font-family: 'IBM Plex Mono', monospace; font-size: 14px; line-height: 1.9; font-weight: 300; padding-bottom: 24px; }

        .step-card { display: flex; gap: 16px; align-items: flex-start; }
        .step-num { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(57,255,143,0.3); display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #39ff8f; flex-shrink: 0; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }

        @keyframes pulse-glow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .pulse { animation: pulse-glow 3s ease-in-out infinite; }
        .hamburger-line { width: 24px; height: 1px; background: #f0f0f0; transition: all 0.3s; }

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
          .hero-title { font-size: clamp(34px, 9vw, 52px) !important; }
          .footer-grid { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .stat-card { padding: 20px !important; }
          .service-tag { font-size: 10px !important; padding: 5px 12px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 9vw !important; }
          .btn-group { flex-direction: column !important; }
          .btn-group button { width: 100% !important; }
          .steps-row { flex-direction: column !important; gap: 20px !important; }
        }
      `}</style>

      <div className="noise-overlay" />
      <div className="glow-dot" style={{ left: mousePos.x, top: mousePos.y }} />
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 0, opacity: 0.85 }} />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px clamp(24px, 5vw, 40px)", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrollY > 80 ? "rgba(3,3,3,0.92)" : "transparent", backdropFilter: scrollY > 80 ? "blur(20px)" : "none", borderBottom: scrollY > 80 ? "1px solid rgba(255,255,255,0.04)" : "none", transition: "all 0.4s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={38} color="#39ff8f" />
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
            Rut<span style={{ color: "#39ff8f" }}>IA</span>
          </span>
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
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(3,3,3,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
          {[["Inicio","#inicio"],["Servicios","#servicios"],["Nosotros","#nosotros"],["FAQ","#faq"],["Contacto","#contacto"]].map(([label, href]) => (
            <a key={label} href={href} className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ fontSize: 24, letterSpacing: "0.08em" }}>{label}</a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="inicio" ref={heroRef} style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", padding: "120px clamp(24px, 5vw, 40px) 80px", overflow: "hidden" }}>
        <div className="grid-bg" />
        <div style={{ position: "absolute", top: 120, right: 40, width: 180, height: 180, border: "1px solid rgba(57,255,143,0.08)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: 140, right: 60, width: 140, height: 140, border: "1px solid rgba(57,255,143,0.05)", borderRadius: "50%" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 80, alignItems: "center" }}>
            <div>
              {/* Badge urgencia */}
              <div className="fade-up delay-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(57,255,143,0.08)", border: "1px solid rgba(57,255,143,0.2)", borderRadius: 2, padding: "8px 16px", marginBottom: 28 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#39ff8f" }} className="pulse" />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#39ff8f", letterSpacing: "0.15em" }}>QUEDAN 2 CUPOS DE DIAGNÓSTICO ESTA SEMANA</span>
              </div>

              {/* ── H1 ACTUALIZADO ── */}
              <h1 className="hero-title fade-up delay-2" style={{ marginBottom: 32 }}>
                La rutina de<br />tu negocio,<br />rediseñada con{" "}
                <span style={{ WebkitTextFillColor: "#39ff8f", color: "#39ff8f" }}>IA.</span>
              </h1>

              <p className="fade-up delay-3" style={{ fontSize: 17, lineHeight: 1.8, color: "#ccc", maxWidth: 480, marginBottom: 48, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300 }}>
                Automatizamos las tareas que más tiempo le consumen a tu equipo.<br />Conectado a tus sistemas actuales. Operativo en semanas.
              </p>

              <div className="fade-up delay-4 btn-group" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 52 }}>
                <button className="cta-btn" onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}>
                  Agendá tu diagnóstico gratis →
                </button>
                <button className="outline-btn" onClick={() => document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' })}>
                  Ver servicios
                </button>
              </div>

              <div className="fade-up delay-4 steps-row" style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                {[["01","Completás el formulario"],["02","Llamada de diagnóstico gratis"],["03","Recibís tu propuesta"]].map(([num, label]) => (
                  <div key={num} className="step-card">
                    <div className="step-num">{num}</div>
                    <div style={{ paddingTop: 9, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#bbb", lineHeight: 1.6 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up delay-4" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { num: "60hs", label: "Tiempo ahorrado por persona al mes en tareas repetitivas" },
                { num: "95%", label: "Reducción de errores humanos que retrasan el crecimiento" },
                { num: "24/7", label: "Opera sin mirar hora ni horario" },
                { num: "40%", label: "Reducción de costos operativos en atención al cliente" }
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{ marginBottom: i < 3 ? 2 : 0 }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: "#39ff8f", letterSpacing: "-0.03em", marginBottom: 4 }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: "#ccc", fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 80, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.2em", marginRight: 16 }}>ESPECIALIDADES →</span>
            {["Automatización de procesos","Chatbots con IA","Análisis predictivo","Integración de LLMs","Agentes autónomos","Machine Learning"].map(tag => (
              <span key={tag} className="service-tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── SERVICIOS ── */}
      <section id="servicios" style={{ padding: "120px clamp(24px, 5vw, 40px)", maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label">Servicios</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            ¿Qué podemos<br /><span style={{ color: "#39ff8f" }}>resolver juntos?</span>
          </h2>
          <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.8, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300, maxWidth: 360 }}>
            Cada solución empieza con un problema concreto tuyo, no con una herramienta nuestra.
          </p>
        </div>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39ff8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              ),
              title: "Automatización de procesos",
              desc: "Eliminamos tareas manuales repetitivas: facturación, reportes, carga de datos, seguimiento de leads. Tu equipo se enfoca en lo que importa."
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39ff8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h.01M15 9h.01M9 15h6"/>
                </svg>
              ),
              title: "Asistentes de IA para clientes y equipos",
              desc: "Atención al cliente 24/7, calificación de leads y soporte interno. Un solo agente entrenado con el conocimiento de tu empresa — sin duplicar herramientas."
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39ff8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              ),
              title: "Análisis e inteligencia",
              desc: "Dashboards predictivos, detección de anomalías, forecasting de ventas. Decisiones basadas en datos, no en intuición."
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39ff8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              ),
              title: "Conexión a tus sistemas",
              desc: "Integramos IA a lo que ya usás: CRM, ERP, bases de datos, correo, WhatsApp, APIs propias. Sin cambiar tu stack."
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39ff8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12l4-4"/><path d="M16 4h4v4"/>
                </svg>
              ),
              title: "Agentes autónomos",
              desc: "Sistemas que actúan solos: investigan, deciden y ejecutan tareas complejas sin intervención humana constante."
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39ff8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              ),
              title: "Diagnóstico de automatización",
              desc: "Auditamos tus procesos y te decimos exactamente dónde la IA genera el mayor retorno. Sin tecnicismos, con números."
            },
          ].map((s, i) => (
            <div key={i} className="service-card">
              <div style={{ marginBottom: 20 }}>{s.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.01em" }}>{s.title}</h3>
              <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.8, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300 }}>{s.desc}</p>
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
            <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 32 }}>
              IA que<br /><span style={{ color: "#39ff8f" }}>realmente</span><br />funciona.
            </h2>
            <p style={{ color: "#ccc", fontSize: 16, lineHeight: 1.9, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300, marginBottom: 24 }}>
              En RutIA no vendemos tecnología por el mero hecho de venderla. Diseñamos soluciones de inteligencia artificial que resuelven problemas reales y generan resultados medibles desde el día uno.
            </p>
            <p style={{ color: "#bbb", fontSize: 15, lineHeight: 1.9, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300 }}>
              Combinamos ingeniería de software, diseño de procesos de negocio y experiencia en IA aplicada. No desplegamos una herramienta y nos vamos: acompañamos desde el diagnóstico hasta que el sistema opera solo.
            </p>
          </div>
          <div style={{ paddingTop: 8 }}>
            {[{ num: "01", title: "Diagnóstico inteligente", desc: "Analizamos tus procesos actuales para identificar exactamente dónde la IA genera mayor impacto." },{ num: "02", title: "Desarrollo a medida", desc: "Construimos soluciones 100% personalizadas. Sin templates genéricos, sin atajos." },{ num: "03", title: "Implementación y soporte", desc: "Acompañamos el lanzamiento y seguimos iterando hasta que el resultado sea perfecto." }, { num: "04", title: "Tu equipo, en lo que importa", desc: "Cuando la IA se hace cargo de las planillas, los correos repetitivos y los mensajes sin sentido, tu gente puede enfocarse en lo que realmente mueve la empresa. No reemplazamos personas — les devolvemos el tiempo." }].map((item) => (
              <div key={item.num} className="about-block" style={{ marginBottom: 40 }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#39ff8f", letterSpacing: "0.2em", marginBottom: 8 }}>{item.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>{item.title}</h3>
                <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.8, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TESTIMONIOS ── */}
      <section id="testimonios" style={{ padding: "120px clamp(24px, 5vw, 40px)", maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label">Clientes</div>
        <h2 style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 64 }}>
          Lo que dicen<br /><span style={{ color: "#39ff8f" }}>quienes ya automatizaron.</span>
        </h2>
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div style={{ fontSize: 36, color: "#39ff8f", marginBottom: 20, opacity: 0.3, lineHeight: 1 }}>"</div>
              <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.9, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300, marginBottom: 28 }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(57,255,143,0.1)", border: "1px solid rgba(57,255,143,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#39ff8f", flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#888", letterSpacing: "0.1em", marginTop: 2 }}>{t.role}</div>
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
        <h2 style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 64 }}>
          Preguntas<br /><span style={{ color: "#39ff8f" }}>frecuentes.</span>
        </h2>
        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <span style={{ color: "#39ff8f", fontSize: 22, fontWeight: 300, flexShrink: 0, transition: "transform 0.3s", display: "inline-block", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {openFaq === i && <div className="faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── CONTACTO ── */}
      <section id="contacto" style={{ padding: "120px clamp(24px, 5vw, 40px) 100px", background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(57,255,143,0.04) 0%, transparent 70%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
            <div>
              <div className="section-label">Contacto</div>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 32 }}>
                El diagnóstico<br />es gratis. La transformación<br /><span style={{ color: "#39ff8f" }}>empieza en 24 hs.</span>
              </h2>
              <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.9, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 300, marginBottom: 48 }}>
                Completá el formulario y en menos de 24hs te contactamos para agendar tu llamada de diagnóstico gratuita. Sin compromiso.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[{ label: "Email", value: "hola@rutia.ai" },{ label: "Respuesta", value: "Menos de 24hs" },{ label: "Consulta inicial", value: "Sin cargo" }].map(info => (
                  <div key={info.label} style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#39ff8f", letterSpacing: "0.2em", minWidth: 120 }}>{info.label.toUpperCase()}</span>
                    <span style={{ color: "#ccc", fontSize: 14, fontFamily: "'IBM Plex Mono', monospace" }}>{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {submitted ? (
                <div style={{ border: "1px solid rgba(57,255,143,0.3)", background: "rgba(57,255,143,0.04)", padding: 48, borderRadius: 2, textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 16, color: "#39ff8f" }}>✓</div>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: "#39ff8f", marginBottom: 12 }}>¡Mensaje recibido!</h3>
                  <p style={{ color: "#ccc", fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, lineHeight: 1.8 }}>Te contactamos en menos de 24 horas para coordinar tu diagnóstico gratuito.</p>
                </div>
              ) : (
                <div style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)", padding: 48, borderRadius: 2 }}>
                  <input className="input-field" placeholder="Tu nombre" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input className="input-field" placeholder="tu@email.com" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  <textarea className="textarea-field" placeholder="Contanos sobre tu proyecto o proceso que querés automatizar..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  <button className="cta-btn" style={{ width: "100%", textAlign: "center" }} onClick={handleSubmit} disabled={sending}>
                    {sending ? "Enviando..." : "Agendá tu diagnóstico gratis →"}
                  </button>
                  <p style={{ marginTop: 16, color: "#555", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, textAlign: "center", letterSpacing: "0.1em" }}>SIN SPAM. JAMÁS.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "32px clamp(24px, 5vw, 40px)", borderTop: "1px solid rgba(255,255,255,0.04)", background: "#030303" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }} className="footer-grid">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo size={28} color="#39ff8f" />
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>
              Rut<span style={{ color: "#39ff8f" }}>IA</span>
            </span>
          </div>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#333", letterSpacing: "0.15em" }}>© 2026 RUTIA — TODOS LOS DERECHOS RESERVADOS</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["LinkedIn","Instagram","Twitter"].map(s => (
              <a key={s} href="#" style={{ color: "#444", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, textDecoration: "none", letterSpacing: "0.1em", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#39ff8f"}
                onMouseLeave={e => e.target.style.color = "#444"}>{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RutIA;
