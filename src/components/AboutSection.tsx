import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nosotros" className="py-24 bg-secondary">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-foreground mb-8">
            No vendemos tecnología.
            <br />
            <span className="text-primary">Vendemos tiempo y escala.</span>
          </h2>

          <div className="border-l-4 border-primary pl-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              EficiencIA nació con una convicción simple: la Inteligencia Artificial
              no es solo para las grandes corporaciones. Trabajamos con empresas que
              tienen procesos que repetir, clientes que atender y decisiones que
              tomar — y que hoy dependen demasiado del factor humano para hacerlo todo.
            </p>
            <p>
              Nuestro trabajo es identificar dónde tu negocio pierde tiempo, dinero
              o energía, y construir la solución exacta para eliminarlo. Sin
              burocracia. Sin soluciones genéricas. Sin vueltas.
            </p>
            <p className="text-foreground font-semibold">
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
