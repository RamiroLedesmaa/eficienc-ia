import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Analizamos tus procesos actuales, identificamos cuellos de botella y oportunidades de automatización.",
  },
  {
    number: "02",
    title: "Estrategia",
    description: "Diseñamos un plan de implementación adaptado a tu negocio, con prioridades claras y ROI estimado.",
  },
  {
    number: "03",
    title: "Implementación",
    description: "Construimos e integramos las soluciones de IA en tu flujo de trabajo de manera ágil y sin interrupciones.",
  },
  {
    number: "04",
    title: "Optimización",
    description: "Monitoreamos, medimos y ajustamos continuamente para maximizar los resultados obtenidos.",
  },
];

const MethodSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="metodo" className="py-32 relative">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Nuestro Método
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Un proceso{" "}
            <span className="text-gradient">probado y efectivo</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Cuatro pasos para llevar tu operación al siguiente nivel con inteligencia artificial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="relative p-8 rounded-2xl bg-card border border-border group hover:border-primary/30 transition-all duration-500"
            >
              <span className="text-6xl font-bold text-gradient opacity-30 block mb-4 font-['Space_Grotesk']">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
