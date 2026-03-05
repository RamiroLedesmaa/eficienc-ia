import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Target, TrendingUp, Bot } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Automatización con IA",
    description: "Diseñamos flujos inteligentes que eliminan tareas manuales y aceleran tus operaciones diarias.",
  },
  {
    icon: Target,
    title: "Estrategia personalizada",
    description: "Cada negocio es único. Analizamos tu operación para crear soluciones a medida.",
  },
  {
    icon: Zap,
    title: "Implementación rápida",
    description: "No necesitas meses de espera. Desplegamos soluciones funcionales en semanas.",
  },
  {
    icon: TrendingUp,
    title: "Resultados medibles",
    description: "Métricas claras que demuestran el impacto real en tu productividad y rentabilidad.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nosotros" className="py-32 relative">
      <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Nosotros
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            No somos una agencia más.{" "}
            <span className="text-gradient">Somos tu socio en eficiencia.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Combinamos conocimiento de negocio con tecnología de punta para transformar
            la forma en que trabajas. La IA no es el futuro — es el ahora.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5">
                <feature.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
