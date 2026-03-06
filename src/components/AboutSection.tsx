import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nosotros" className="py-32 relative">
      <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />

      <div ref={ref} className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Nosotros
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            No vendemos tecnología.{" "}
            <span className="text-gradient">Vendemos tiempo y escala.</span>
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              EficiencIA nació con una convicción simple: la Inteligencia Artificial
              no es solo para las grandes corporaciones.
            </p>
            <p>
              Trabajamos con empresas que tienen procesos que repetir, clientes que
              atender y decisiones que tomar — y que hoy dependen demasiado del
              factor humano para hacerlo todo.
            </p>
            <p>
              Nuestro trabajo es identificar dónde tu negocio pierde tiempo, dinero
              o energía, y construir la solución exacta para eliminarlo. Sin
              burocracia. Sin soluciones genéricas. Sin vueltas.
            </p>
            <p className="text-foreground font-medium">
              Profesionalismo. Innovación. Eficiencia. Esos no son valores de
              adorno — son la forma en que entregamos cada proyecto.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
