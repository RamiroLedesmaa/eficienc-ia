import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      {/* Floating decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary/20 rounded-full animate-float" />
      <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-primary/10 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-primary/15 rounded-full animate-float" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              IA Generativa & Automatización
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6"
          >
            Tu negocio trabaja.{" "}
            <br className="hidden md:block" />
            Nosotros hacemos que{" "}
            <span className="text-primary">trabaje solo.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-lg mb-8"
          >
            En EficiencIA diseñamos soluciones de Inteligencia Artificial a medida
            para empresas que quieren crecer sin multiplicar su estructura. Menos
            fricción, más resultados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <a
              href="#contacto"
              className="group bg-primary text-primary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2 shadow-lg shadow-primary/25"
            >
              Quiero automatizar mi negocio
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Right side decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-float" />
            <div className="absolute inset-8 bg-primary/5 rounded-full animate-float" style={{ animationDelay: "1s" }} />
            <div className="absolute inset-16 bg-primary/10 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: "2s" }}>
              <svg className="w-20 h-20 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
