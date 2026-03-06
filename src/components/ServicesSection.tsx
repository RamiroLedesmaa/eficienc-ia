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
    title: "Chatbots e IA Conversacional",
    description:
      "Implementamos asistentes de IA que responden consultas, califican clientes y gestionan comunicaciones en tiempo real — incluso cuando tu equipo no está disponible. Atención Inteligente 24/7.",
  },
  {
    icon: Settings,
    title: "Soluciones Personalizadas",
    description:
      "Desarrollo a Medida. Analizamos tu operación, detectamos el cuello de botella y construimos la herramienta exacta que necesitás. Nada de plantillas. Todo diseñado para vos.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
            ¿Qué podemos hacer por tu empresa?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.15 }}
              className="bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
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
