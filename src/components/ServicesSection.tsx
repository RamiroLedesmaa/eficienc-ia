import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { RefreshCw, MessageSquare, Settings } from "lucide-react";

const services = [
  {
    icon: RefreshCw,
    title: "Automatización de Procesos Internos",
    description:
      "Eliminamos las tareas manuales y repetitivas que consumen el tiempo de tu equipo. Desde la gestión de datos hasta el seguimiento de operaciones: todo fluyendo solo, sin errores, sin demoras.",
  },
  {
    icon: MessageSquare,
    title: "Atención Inteligente 24/7",
    description:
      "Implementamos asistentes de IA que responden consultas, califican clientes y gestionan comunicaciones en tiempo real — incluso cuando tu equipo no está disponible.",
  },
  {
    icon: Settings,
    title: "Desarrollo a Medida",
    description:
      "Cada empresa tiene un desafío distinto. Analizamos tu operación, detectamos el cuello de botella y construimos la herramienta exacta que necesitás. Nada de plantillas. Todo diseñado para vos.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="py-32 relative">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Servicios
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            ¿Qué podemos hacer{" "}
            <span className="text-gradient">por tu empresa?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="relative p-8 rounded-2xl bg-card border border-border group hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5">
                <service.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
